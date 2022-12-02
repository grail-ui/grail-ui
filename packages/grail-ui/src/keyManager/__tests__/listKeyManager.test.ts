import type { ListKeyManagerConfig, ListKeyManagerReturn } from '../listKeyManager.types';
import { beforeEach, describe, expect, it, vi, type Mock } from 'vitest';
import { get, writable, type Writable } from 'svelte/store';
import { DOWN_ARROW, END, HOME, LEFT_ARROW, RIGHT_ARROW, TAB, UP_ARROW } from '../../util/keyboard';
import { listKeyManager } from '../listKeyManager';
import { createKeyboardEvent } from './helpers';

declare module 'vitest' {
	export interface TestContext {
		keyManager: ListKeyManagerReturn<HTMLElement>;
		items: Writable<HTMLElement[]>;
		elements: HTMLElement[];
		nextKeyEvent: KeyboardEvent;
		prevKeyEvent: KeyboardEvent;
		spy: Mock<unknown[], unknown>;
	}
}

describe('ListKeyManager', () => {
	function createElement(id: string | number): HTMLElement {
		const el = document.createElement('div');
		el.setAttribute('id', `${id}`);
		el.setAttribute('data-label', `${id}`);
		return el;
	}

	function createKeyManager(options?: Partial<ListKeyManagerConfig<HTMLElement>>) {
		const elements = [createElement('one'), createElement('two'), createElement('three')];
		const items = writable<HTMLElement[]>(elements);
		const keyManager = listKeyManager<HTMLElement>({ ...options, items });

		return { keyManager, items, elements };
	}

	it('should start off correctly', () => {
		const { keyManager } = createKeyManager();

		expect(keyManager.currentActiveItemIndex).toBe(-1);
		expect(keyManager.currentActiveItem).toBeNull();
	});

	it('should set the activeItem to null if an invalid index is passed in', () => {
		const { keyManager } = createKeyManager();

		keyManager.setActiveItem(1337);
		expect(keyManager.currentActiveItem).toBeNull();

		keyManager.setActiveItem(1);
		expect(keyManager.currentActiveItem?.id).toBe('two');
	});

	it('should maintain the active item if the amount of items changes', () => {
		const { keyManager, items, elements } = createKeyManager();
		keyManager.setFirstItemActive();

		expect(keyManager.currentActiveItemIndex).toBe(0);
		expect(keyManager.currentActiveItem?.id).toBe('one');
		items.set([createElement('zero'), ...elements]);

		expect(keyManager.currentActiveItemIndex).toBe(1);
		expect(keyManager.currentActiveItem?.id).toBe('one');
	});

	it('should clear the active item if removed from items', () => {
		const { keyManager, items } = createKeyManager();
		keyManager.setFirstItemActive();

		expect(keyManager.currentActiveItemIndex).toBe(0);
		expect(keyManager.currentActiveItem?.id).toBe('one');
		items.set([createElement('zero')]);

		expect(keyManager.currentActiveItemIndex).toBe(-1);
		expect(keyManager.currentActiveItem).toBeFalsy();
	});

	describe('Key events', () => {
		it('should emit `tabOut` when the tab key is pressed', () => {
			const spy = vi.fn();
			const { keyManager } = createKeyManager({ tabOut: spy });

			expect(spy).not.toHaveBeenCalled();
			keyManager.onKeydown(createKeyboardEvent({ key: TAB }));

			expect(spy).toHaveBeenCalledTimes(1);
		});

		it('should emit an event whenever the active item changes', () => {
			const { keyManager } = createKeyManager();

			const spy = vi.fn();
			const unsubscribe = keyManager.activeItemIndex.subscribe(spy);
			expect(spy).toHaveBeenCalledWith(-1);

			keyManager.onKeydown(createKeyboardEvent({ key: DOWN_ARROW }));
			expect(spy).toHaveBeenCalledWith(0);
			expect(spy).toHaveBeenCalledTimes(2);

			keyManager.onKeydown(createKeyboardEvent({ key: UP_ARROW }));
			expect(spy).toHaveBeenCalledTimes(2);

			unsubscribe();
		});

		it('should emit if the active item changed, even because of change in items', () => {
			const { keyManager, items, elements } = createKeyManager();

			const spy = vi.fn();
			const unsubscribe = keyManager.activeItemIndex.subscribe(spy);

			keyManager.setActiveItem(0);
			items.set([createElement('zero'), ...elements]);
			keyManager.setActiveItem(0);

			expect(spy).toHaveBeenCalledTimes(4);
			unsubscribe();
		});

		it('should activate the first item when pressing down on a clean key manager', () => {
			const { keyManager } = createKeyManager();

			expect(keyManager.currentActiveItemIndex).toBe(-1);

			const event = createKeyboardEvent({ key: DOWN_ARROW });
			keyManager.onKeydown(event);
			expect(keyManager.currentActiveItemIndex).toBe(0);
			expect(event.defaultPrevented).toBe(true);
		});

		it('should not do anything for unsupported key presses', () => {
			const { keyManager } = createKeyManager();

			keyManager.setActiveItem(1);

			expect(keyManager.currentActiveItemIndex).toBe(1);

			const event = createKeyboardEvent({ key: 'UNKNOWN' });
			keyManager.onKeydown(event);
			expect(keyManager.currentActiveItemIndex).toBe(1);
			expect(event.defaultPrevented).toBe(false);
		});

		it('should ignore the horizontal keys when only in vertical mode', () => {
			const { keyManager } = createKeyManager({ vertical: true, horizontal: null });

			keyManager.setFirstItemActive();
			expect(keyManager.currentActiveItemIndex).toBe(0);

			const event = createKeyboardEvent({ key: RIGHT_ARROW });
			keyManager.onKeydown(event);

			expect(keyManager.currentActiveItemIndex).toBe(0);
			expect(event.defaultPrevented).toBe(false);
		});

		it('should ignore the vertical keys when only in horizontal mode', () => {
			const { keyManager } = createKeyManager({ vertical: false, horizontal: 'ltr' });

			keyManager.setFirstItemActive();
			expect(keyManager.currentActiveItemIndex).toBe(0);

			const event = createKeyboardEvent({ key: DOWN_ARROW });
			keyManager.onKeydown(event);

			expect(keyManager.currentActiveItemIndex).toBe(0);
			expect(event.defaultPrevented).toBe(false);
		});

		describe('withHomeAndEnd', () => {
			it('should focus the first item when Home is pressed', () => {
				const { keyManager } = createKeyManager({ homeAndEnd: true });

				keyManager.setActiveItem(1);
				expect(keyManager.currentActiveItemIndex).toBe(1);

				const event = createKeyboardEvent({ key: HOME });
				keyManager.onKeydown(event);

				expect(keyManager.currentActiveItemIndex).toBe(0);
				expect(event.defaultPrevented).toBe(true);
			});

			it('should focus the last item when End is pressed', () => {
				const { keyManager, elements } = createKeyManager({ homeAndEnd: true });

				keyManager.setActiveItem(0);
				expect(keyManager.currentActiveItemIndex).toBe(0);

				const event = createKeyboardEvent({ key: END });
				keyManager.onKeydown(event);
				keyManager.setActiveItem(elements[2]);
				expect(keyManager.currentActiveItemIndex).toBe(elements.length - 1);
			});
		});

		describe('with `vertical` direction', () => {
			beforeEach((context) => {
				const { keyManager, items, elements } = createKeyManager({
					vertical: true,
					skipPredicate: (item) => 'disabled' in item.dataset,
				});

				keyManager.setFirstItemActive();

				context.keyManager = keyManager;
				context.items = items;
				context.elements = elements;
				context.nextKeyEvent = createKeyboardEvent({ key: DOWN_ARROW });
				context.prevKeyEvent = createKeyboardEvent({ key: UP_ARROW });
			});

			runDirectionalKeyTests();
		});

		describe('with `ltr` direction', () => {
			beforeEach((context) => {
				const { keyManager, items, elements } = createKeyManager({
					vertical: false,
					horizontal: 'ltr',
					skipPredicate: (item) => 'disabled' in item.dataset,
				});

				keyManager.setFirstItemActive();

				context.keyManager = keyManager;
				context.items = items;
				context.elements = elements;
				context.nextKeyEvent = createKeyboardEvent({ key: RIGHT_ARROW });
				context.prevKeyEvent = createKeyboardEvent({ key: LEFT_ARROW });
			});

			runDirectionalKeyTests();
		});

		describe('with `rtl` direction', () => {
			beforeEach((context) => {
				const { keyManager, items, elements } = createKeyManager({
					vertical: false,
					horizontal: 'rtl',
					skipPredicate: (item) => 'disabled' in item.dataset,
				});

				keyManager.setFirstItemActive();

				context.keyManager = keyManager;
				context.items = items;
				context.elements = elements;
				context.nextKeyEvent = createKeyboardEvent({ key: LEFT_ARROW });
				context.prevKeyEvent = createKeyboardEvent({ key: RIGHT_ARROW });
			});

			runDirectionalKeyTests();
		});

		/**
		 * Defines the directional key tests that should be run in a particular context. Note that
		 * parameters have to be passed in via Vitest's context object
		 * because this function has to run before any `beforeEach`, `beforeAll` etc. hooks.
		 */
		function runDirectionalKeyTests() {
			it('should set subsequent items as active when the next key is pressed', ({
				keyManager,
				nextKeyEvent,
			}) => {
				keyManager.onKeydown(nextKeyEvent);

				expect(keyManager.currentActiveItemIndex).toBe(1);

				keyManager.onKeydown(nextKeyEvent);
				expect(keyManager.currentActiveItemIndex).toBe(2);
			});

			it('should set first item active when the next key is pressed if no active item', ({
				keyManager,
				nextKeyEvent,
			}) => {
				keyManager.setActiveItem(-1);
				keyManager.onKeydown(nextKeyEvent);

				// Expected active item to be 0 after next key if active item was null
				expect(keyManager.currentActiveItemIndex).toBe(0);
			});

			it('should set previous items as active when the previous key is pressed', ({
				keyManager,
				nextKeyEvent,
				prevKeyEvent,
			}) => {
				keyManager.onKeydown(nextKeyEvent);

				// Expected active item to be 1 after one next key event
				expect(keyManager.currentActiveItemIndex).toBe(1);

				keyManager.onKeydown(prevKeyEvent);
				// Expected active item to be 0 after one next and one previous key event
				expect(keyManager.currentActiveItemIndex).toBe(0);
			});

			it('should do nothing when the prev key is pressed if no active item and not wrap', ({
				keyManager,
				prevKeyEvent,
			}) => {
				keyManager.setActiveItem(-1);
				keyManager.onKeydown(prevKeyEvent);

				// Expected nothing to happen if prev event occurs and no active item
				expect(keyManager.currentActiveItemIndex).toBe(-1);
			});

			it('should skip disabled items', ({
				keyManager,
				items,
				elements,
				nextKeyEvent,
				prevKeyEvent,
			}) => {
				elements[1].setAttribute('data-disabled', 'true');
				items.set(elements);

				// Next event should skip past disabled item from 0 to 2
				keyManager.onKeydown(nextKeyEvent);
				expect(keyManager.currentActiveItemIndex).toBe(2);

				// Previous event should skip past disabled item from 2 to 0
				keyManager.onKeydown(prevKeyEvent);
				expect(keyManager.currentActiveItemIndex).toBe(0);
			});

			it('should work normally when disabled property does not exist', ({
				keyManager,
				nextKeyEvent,
			}) => {
				keyManager.onKeydown(nextKeyEvent);
				// Expected active item to be 1 after one next event when disabled not set
				expect(keyManager.currentActiveItemIndex).toBe(1);

				keyManager.onKeydown(nextKeyEvent);
				// Expected active item to be 2 after two next events when disabled not set
				expect(keyManager.currentActiveItemIndex).toBe(2);
			});

			it('should not move active item past either end of the list', ({
				keyManager,
				nextKeyEvent,
				prevKeyEvent,
			}) => {
				keyManager.onKeydown(nextKeyEvent);
				keyManager.onKeydown(nextKeyEvent);
				// Expected last item of the list to be active
				expect(keyManager.currentActiveItemIndex).toBe(2);

				// This next event would move active item past the end of the list
				keyManager.onKeydown(nextKeyEvent);
				// Expected active item to remain at the end of the list
				expect(keyManager.currentActiveItemIndex).toBe(2);

				keyManager.onKeydown(prevKeyEvent);
				keyManager.onKeydown(prevKeyEvent);
				// Expected first item of the list to be active
				expect(keyManager.currentActiveItemIndex).toBe(0);

				// This prev event would move active item past the beginning of the list
				keyManager.onKeydown(prevKeyEvent);
				// Expected active item to remain at the beginning of the list
				expect(keyManager.currentActiveItemIndex).toBe(0);
			});

			it('should not move active item to end when the last item is disabled', ({
				keyManager,
				elements,
				nextKeyEvent,
			}) => {
				elements[2].setAttribute('data-disabled', 'true');

				keyManager.onKeydown(nextKeyEvent);
				// Expected second item of the list to be active
				expect(keyManager.currentActiveItemIndex).toBe(1);

				// This next key event would set active item to the last item, which is disabled
				keyManager.onKeydown(nextKeyEvent);
				// Expected the second item to remain active
				expect(keyManager.currentActiveItemIndex).toBe(1);
			});

			it('should prevent the default keyboard action of handled events', ({
				keyManager,
				nextKeyEvent,
				prevKeyEvent,
			}) => {
				expect(nextKeyEvent.defaultPrevented).toBe(false);
				keyManager.onKeydown(nextKeyEvent);
				expect(nextKeyEvent.defaultPrevented).toBe(true);

				expect(prevKeyEvent.defaultPrevented).toBe(false);
				keyManager.onKeydown(prevKeyEvent);
				expect(prevKeyEvent.defaultPrevented).toBe(true);
			});
		}
	});

	describe('programmatic focus', () => {
		beforeEach((context) => {
			const { keyManager, items, elements } = createKeyManager({
				skipPredicate: (item) => 'disabled' in item.dataset,
			});

			keyManager.setFirstItemActive();

			context.keyManager = keyManager;
			context.items = items;
			context.elements = elements;
		});

		it('should setActiveItem()', ({ keyManager }) => {
			expect(keyManager.currentActiveItemIndex).toBe(0);

			keyManager.setActiveItem(1);
			expect(keyManager.currentActiveItemIndex).toBe(1);
		});

		it('should be able to set the active item by reference', ({ keyManager, elements }) => {
			expect(keyManager.currentActiveItemIndex).toBe(0);

			keyManager.setActiveItem(elements[2]);
			expect(keyManager.currentActiveItemIndex).toBe(2);
		});

		it('should expose the active item correctly', ({ keyManager, elements }) => {
			const downEvent = createKeyboardEvent({ key: DOWN_ARROW });
			keyManager.onKeydown(downEvent);

			expect(keyManager.currentActiveItemIndex).toBe(1);
			expect(keyManager.currentActiveItem).toBe(elements[1]);

			keyManager.onKeydown(downEvent);
			expect(keyManager.currentActiveItemIndex).toBe(2);
			expect(keyManager.currentActiveItem).toBe(elements[2]);
		});

		it('should setFirstItemActive()', ({ keyManager }) => {
			keyManager.onKeydown(createKeyboardEvent({ key: DOWN_ARROW }));
			keyManager.onKeydown(createKeyboardEvent({ key: DOWN_ARROW }));
			expect(keyManager.currentActiveItemIndex).toBe(2);

			keyManager.setFirstItemActive();
			expect(keyManager.currentActiveItemIndex).toBe(0);
		});

		it('should set the active item to the second item if the first one is disabled', ({
			keyManager,
			elements,
		}) => {
			elements[0].setAttribute('data-disabled', 'true');

			keyManager.setFirstItemActive();
			expect(keyManager.currentActiveItemIndex).toBe(1);
		});

		it('should setLastItemActive()', ({ keyManager }) => {
			expect(keyManager.currentActiveItemIndex).toBe(0);

			keyManager.setLastItemActive();
			expect(keyManager.currentActiveItemIndex).toBe(2);
		});

		it('should set the active item to the second to last item if the last is disabled', ({
			keyManager,
			elements,
		}) => {
			elements[2].setAttribute('data-disabled', 'true');

			keyManager.setLastItemActive();
			expect(keyManager.currentActiveItemIndex).toBe(1);
		});

		it('should setNextItemActive()', ({ keyManager }) => {
			expect(keyManager.currentActiveItemIndex).toBe(0);

			keyManager.setNextItemActive();
			expect(keyManager.currentActiveItemIndex).toBe(1);
		});

		it('should set the active item to the next enabled item if next is disabled', ({
			keyManager,
			elements,
		}) => {
			elements[1].setAttribute('data-disabled', 'true');

			expect(keyManager.currentActiveItemIndex).toBe(0);

			keyManager.setNextItemActive();
			expect(keyManager.currentActiveItemIndex).toBe(2);
		});

		it('should setPreviousItemActive()', ({ keyManager }) => {
			keyManager.onKeydown(createKeyboardEvent({ key: DOWN_ARROW }));
			expect(keyManager.currentActiveItemIndex).toBe(1);

			keyManager.setPreviousItemActive();
			expect(keyManager.currentActiveItemIndex).toBe(0);
		});

		it('should skip disabled items when setPreviousItemActive() is called', ({
			keyManager,
			elements,
		}) => {
			elements[1].setAttribute('data-disabled', 'true');

			keyManager.onKeydown(createKeyboardEvent({ key: DOWN_ARROW }));
			keyManager.onKeydown(createKeyboardEvent({ key: DOWN_ARROW }));
			expect(keyManager.currentActiveItemIndex).toBe(2);

			keyManager.setPreviousItemActive();
			expect(keyManager.currentActiveItemIndex).toBe(0);
		});

		it('should not emit an event if the item did not change', ({ keyManager }) => {
			const spy = vi.fn();
			const unsubscribe = keyManager.activeItemIndex.subscribe(spy);

			spy.mockClear();
			keyManager.setActiveItem(2);
			keyManager.setActiveItem(2);
			expect(spy).toHaveBeenCalledTimes(1);

			unsubscribe();
		});
	});

	describe('wrap mode', () => {
		beforeEach((context) => {
			const { keyManager, items, elements } = createKeyManager({
				wrap: true,
				skipPredicate: (item) => 'disabled' in item.dataset,
			});

			keyManager.setFirstItemActive();

			context.keyManager = keyManager;
			context.items = items;
			context.elements = elements;
		});

		it('should wrap focus when arrow keying past items while in wrap mode', ({ keyManager }) => {
			keyManager.onKeydown(createKeyboardEvent({ key: DOWN_ARROW }));
			keyManager.onKeydown(createKeyboardEvent({ key: DOWN_ARROW }));

			expect(keyManager.currentActiveItemIndex).toBe(2);

			// this down arrow moves down past the end of the list
			keyManager.onKeydown(createKeyboardEvent({ key: DOWN_ARROW }));
			expect(keyManager.currentActiveItemIndex).toBe(0);

			// this up arrow moves up past the beginning of the list
			keyManager.onKeydown(createKeyboardEvent({ key: UP_ARROW }));
			expect(keyManager.currentActiveItemIndex).toBe(2);
		});

		it('should set last item active when up arrow is pressed if no active item', ({
			keyManager,
		}) => {
			keyManager.setActiveItem(-1);
			keyManager.onKeydown(createKeyboardEvent({ key: UP_ARROW }));

			expect(keyManager.currentActiveItemIndex).toBe(2);

			keyManager.onKeydown(createKeyboardEvent({ key: DOWN_ARROW }));
			expect(keyManager.currentActiveItemIndex).toBe(0);
		});

		it('should not get into an infinite loop if all items are disabled', ({
			keyManager,
			elements,
		}) => {
			keyManager.setActiveItem(0);
			elements.forEach((item) => item.setAttribute('data-disabled', 'true'));

			keyManager.onKeydown(createKeyboardEvent({ key: DOWN_ARROW }));
			expect(keyManager.currentActiveItemIndex).toBe(0);
		});
	});

	describe('`onActivate`', () => {
		beforeEach((context) => {
			const spy = vi.fn();
			const { keyManager, items, elements } = createKeyManager({
				onActivate: spy,
			});

			context.keyManager = keyManager;
			context.items = items;
			context.elements = elements;
			context.spy = spy;
		});

		it('should be called every time the active item changes', ({ keyManager, spy, elements }) => {
			expect(spy).not.toHaveBeenCalled();

			keyManager.onKeydown(createKeyboardEvent({ key: DOWN_ARROW }));
			expect(spy).toHaveBeenLastCalledWith(elements[0]);

			keyManager.onKeydown(createKeyboardEvent({ key: DOWN_ARROW }));
			expect(spy).toHaveBeenLastCalledWith(elements[1]);

			keyManager.onKeydown(createKeyboardEvent({ key: UP_ARROW }));
			expect(spy).toHaveBeenLastCalledWith(elements[0]);
			expect(spy).toHaveBeenCalledTimes(3);
		});
	});

	describe('typeahead mode', () => {
		const debounceInterval = 200;
		beforeEach((context) => {
			vi.useFakeTimers();
			const { keyManager, items, elements } = createKeyManager({
				typeahead: true,
				skipPredicate: (item) => 'disabled' in item.dataset,
			});

			context.keyManager = keyManager;
			context.items = items;
			context.elements = elements;
		});

		afterEach(() => vi.useRealTimers());

		it('should debounce the input key presses', ({ keyManager, elements }) => {
			keyManager.onKeydown(createKeyboardEvent({ key: 'o' }));
			keyManager.onKeydown(createKeyboardEvent({ key: 'n' }));
			keyManager.onKeydown(createKeyboardEvent({ key: 'e' }));

			expect(keyManager.currentActiveItem).not.toBe(elements[0]);
			vi.advanceTimersByTime(debounceInterval);
			expect(keyManager.currentActiveItem).toBe(elements[0]);
		});

		it('should focus the first item that starts with a letter', ({ keyManager, elements }) => {
			keyManager.onKeydown(createKeyboardEvent({ key: 't' }));
			vi.advanceTimersByTime(debounceInterval);
			expect(keyManager.currentActiveItem).toBe(elements[1]);
		});

		it('should focus the first item that starts with sequence of letters', ({
			keyManager,
			elements,
		}) => {
			keyManager.onKeydown(createKeyboardEvent({ key: 't' }));
			keyManager.onKeydown(createKeyboardEvent({ key: 'h' }));

			vi.advanceTimersByTime(debounceInterval);
			expect(keyManager.currentActiveItem).toBe(elements[2]);
		});

		it('should cancel any pending timers if a navigation key is pressed', ({
			keyManager,
			elements,
		}) => {
			keyManager.onKeydown(createKeyboardEvent({ key: 't' }));
			keyManager.onKeydown(createKeyboardEvent({ key: 'h' }));
			keyManager.onKeydown(createKeyboardEvent({ key: DOWN_ARROW }));

			vi.advanceTimersByTime(debounceInterval);
			expect(keyManager.currentActiveItem).toBe(elements[0]);
		});

		it('should not focus disabled items', ({ keyManager, elements }) => {
			expect(keyManager.currentActiveItem).toBeFalsy();

			elements[0].setAttribute('data-disabled', 'true');
			keyManager.onKeydown(createKeyboardEvent({ key: 'o' }));
			vi.advanceTimersByTime(debounceInterval);
			expect(keyManager.currentActiveItem).toBeFalsy();
		});

		it('should start looking for matches after the active item', ({ keyManager, items }) => {
			items.set([
				createElement('Bilbo'),
				createElement('Frodo'),
				createElement('Pippin'),
				createElement('Boromir'),
				createElement('Aragorn'),
			]);

			keyManager.setActiveItem(1);
			keyManager.onKeydown(createKeyboardEvent({ key: 'b' }));
			vi.advanceTimersByTime(debounceInterval);

			expect(keyManager.currentActiveItem).toBe(get(items)[3]);
		});

		it('should wrap back around if there were no matches after the active item', ({
			keyManager,
			items,
		}) => {
			items.set([
				createElement('Bilbo'),
				createElement('Frodo'),
				createElement('Pippin'),
				createElement('Boromir'),
				createElement('Aragorn'),
			]);

			keyManager.setActiveItem(3);
			keyManager.onKeydown(createKeyboardEvent({ key: 'b' }));
			vi.advanceTimersByTime(debounceInterval);

			expect(keyManager.currentActiveItem).toBe(get(items)[0]);
		});

		it('should wrap back around if the last item is active', ({ keyManager, elements }) => {
			keyManager.setActiveItem(2);
			keyManager.onKeydown(createKeyboardEvent({ key: 'o' }));
			vi.advanceTimersByTime(debounceInterval);

			expect(keyManager.currentActiveItem).toBe(elements[0]);
		});

		it('should be able to select the first item', ({ keyManager, elements }) => {
			keyManager.setActiveItem(-1);
			keyManager.onKeydown(createKeyboardEvent({ key: 'o' }));
			vi.advanceTimersByTime(debounceInterval);

			expect(keyManager.currentActiveItem).toBe(elements[0]);
		});

		it('should not do anything if there is no match', ({ keyManager, elements }) => {
			keyManager.setActiveItem(1);
			keyManager.onKeydown(createKeyboardEvent({ key: 'w' }));
			vi.advanceTimersByTime(debounceInterval);

			expect(keyManager.currentActiveItem).toBe(elements[1]);
		});
	});
});
