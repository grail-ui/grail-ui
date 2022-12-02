/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Readable } from 'svelte/store';
import type { SelectionChange, SelectionModelReturn } from './selectionModel.types';
import { describe, beforeEach, expect, it, vi, type Mock } from 'vitest';
import { getMultipleValuesInSingleSelectionError, selectionModel } from './selectionModel';

function subscribeSkipFirst(store: Readable<SelectionChange<string>>, spy: Mock<any[], any>) {
	let firedFirst = false;
	return store.subscribe((state) => {
		if (!firedFirst) {
			firedFirst = true;
		} else {
			spy(state);
		}
	});
}

describe('selection', () => {
	describe('single selection', () => {
		let model: SelectionModelReturn<any>;

		beforeEach(() => {
			model = selectionModel();
		});

		it('should be able to select a single value', () => {
			model.select(1);

			expect(model.selected.length).toBe(1);
			expect(model.isSelected(1)).toBe(true);
		});

		it('should deselect the previously selected value', () => {
			model.select(1);
			model.select(2);

			expect(model.isSelected(1)).toBe(false);
			expect(model.isSelected(2)).toBe(true);
		});

		it('should throw an error if multiple values are passed to model', () => {
			expect(() => model.select(1, 2)).toThrow(getMultipleValuesInSingleSelectionError());
		});

		it('should only preselect one value', () => {
			model = selectionModel({ multiple: false, initiallySelectedValues: [1, 2] });

			expect(model.selected.length).toBe(1);
			expect(model.isSelected(1)).toBe(true);
			expect(model.isSelected(2)).toBe(false);
		});
	});

	describe('multiple selection', () => {
		let model: SelectionModelReturn<any>;

		beforeEach(() => {
			model = selectionModel({ multiple: true });
		});

		it('should be able to select multiple options', () => {
			const changedSpy = vi.fn();

			subscribeSkipFirst(model.changed, changedSpy);
			model.select(1);
			model.select(2);

			expect(model.selected.length).toBe(2);
			expect(model.isSelected(1)).toBe(true);
			expect(model.isSelected(2)).toBe(true);
			expect(changedSpy).toHaveBeenCalledTimes(2);
		});

		it('should be able to select multiple options at the same time', () => {
			const changedSpy = vi.fn();

			model.changed.subscribe(changedSpy);
			model.select(1, 2);

			expect(model.selected.length).toBe(2);
			expect(model.isSelected(1)).toBe(true);
			expect(model.isSelected(2)).toBe(true);
			expect(changedSpy).toHaveBeenCalledTimes(2);
		});

		it('should be able to preselect multiple options', () => {
			model = selectionModel({ multiple: true, initiallySelectedValues: [1, 2] });

			expect(model.selected.length).toBe(2);
			expect(model.isSelected(1)).toBe(true);
			expect(model.isSelected(2)).toBe(true);
		});

		it('should be able to sort the selected values', () => {
			model = selectionModel({ multiple: true, initiallySelectedValues: [2, 3, 1] });

			expect(model.selected).toEqual([2, 3, 1]);

			model.sort();

			expect(model.selected).toEqual([1, 2, 3]);
		});

		it('should sort values if `selected` has not been accessed before', () => {
			model = selectionModel({ multiple: true, initiallySelectedValues: [2, 3, 1] });

			// Important: don't assert `selected` before sorting so the getter isn't invoked
			model.sort();
			expect(model.selected).toEqual([1, 2, 3]);
		});
	});

	describe('changed event', () => {
		it('should return the model that dispatched the event', () => {
			const model = selectionModel();
			const spy = vi.fn();

			model.changed.subscribe(spy);
			model.select(1);

			expect(spy).toHaveBeenCalled();
		});

		it('should return both the added and removed values', () => {
			const model = selectionModel();
			const spy = vi.fn();

			model.select(1);

			model.changed.subscribe(spy);

			model.select(2);

			const event = spy.mock.lastCall![0];

			expect(spy).toHaveBeenCalled();
			expect(event.removed).toEqual([1]);
			expect(event.added).toEqual([2]);
		});

		it('should have updated the selected value before emitting the change event', () => {
			const model = selectionModel({ multiple: true });
			const spy = vi.fn();

			// Note: this assertion is only here to run the getter.
			expect(model.selected).toEqual([]);

			model.changed.subscribe(() => spy(model.selected));
			model.select(1);

			expect(spy).toHaveBeenCalledWith([1]);
		});

		describe('selection', () => {
			let model: SelectionModelReturn<any>;
			let spy: Mock<any[], any>;

			beforeEach(() => {
				model = selectionModel({ multiple: true });
				spy = vi.fn();
				model.changed.subscribe(spy);
			});

			it('should emit an event when a value is selected', () => {
				model.select(1);
				const event = spy.mock.lastCall![0];
				expect(spy).toHaveBeenCalled();
				expect(event.added).toEqual([1]);
				expect(event.removed).toEqual([]);
			});

			it('should not emit multiple events for the same value', () => {
				model.select(1);
				model.select(1);
				expect(spy).toHaveBeenCalledTimes(2);
			});

			it('should emit an event when preselecting values', () => {
				model = selectionModel({ multiple: false, initiallySelectedValues: [1] });
				spy = vi.fn();
				model.changed.subscribe(spy);
				expect(spy).toHaveBeenCalledTimes(1);
			});
		});

		describe('deselection', () => {
			let model: SelectionModelReturn<any>;
			let spy: Mock<any[], any>;

			beforeEach(() => {
				model = selectionModel({ multiple: true, initiallySelectedValues: [1, 2, 3] });
				spy = vi.fn();

				subscribeSkipFirst(model.changed, spy);
			});

			it('should emit an event when a value is deselected', () => {
				model.deselect(1);

				const event = spy.mock.lastCall![0];

				expect(spy).toHaveBeenCalled();
				expect(event.removed).toEqual([1]);
			});

			it('should not emit an event when a non-selected value is deselected', () => {
				model.deselect(4);
				expect(spy).not.toHaveBeenCalled();
			});

			it('should emit a single event when clearing all of the selected options', () => {
				model.clear();

				const event = spy.mock.lastCall![0];

				expect(spy).toHaveBeenCalledTimes(1);
				expect(event.removed).toEqual([1, 2, 3]);
			});
		});
	});

	it('should be able to determine whether it is empty', () => {
		const model = selectionModel();

		expect(model.isEmpty()).toBe(true);

		model.select(1);

		expect(model.isEmpty()).toBe(false);
	});

	it('should be able to determine whether it has a value', () => {
		const model = selectionModel();

		expect(model.hasValue()).toBe(false);

		model.select(1);

		expect(model.hasValue()).toBe(true);
	});

	it('should be able to toggle an option', () => {
		const model = selectionModel();

		model.toggle(1);
		expect(model.isSelected(1)).toBe(true);

		model.toggle(1);
		expect(model.isSelected(1)).toBe(false);
	});

	it('should be able to clear the selected options', () => {
		const model = selectionModel({ multiple: true });

		model.select(1);
		model.select(2);

		expect(model.selected.length).toBe(2);

		model.clear();

		expect(model.selected.length).toBe(0);
		expect(model.isEmpty()).toBe(true);
	});

	it('should be empty if an empty array is passed for the preselected values', () => {
		expect(selectionModel({ multiple: false, initiallySelectedValues: [] }).selected).toEqual([]);
	});

	it('should be able to determine whether multiple values can be selected', () => {
		const multipleSelectionModel = selectionModel({ multiple: true });
		expect(multipleSelectionModel.isMultipleSelection()).toBe(true);

		const singleSelectionModel = selectionModel();
		expect(singleSelectionModel.isMultipleSelection()).toBe(false);
	});
});
