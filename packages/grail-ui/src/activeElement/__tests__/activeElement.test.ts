import { vi } from 'vitest';
import { get } from 'svelte/store';
import { fireEvent } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { activeElement } from '../activeElement';

describe('`activeElement`', () => {
	const user = userEvent.setup();

	beforeEach(() => {
		vi.restoreAllMocks();
	});

	let id = 0;
	const appendInput = () => {
		const el = document.createElement('input');
		el.id = `${id++}`;
		return document.body.appendChild(el);
	};

	it('should update based on focus', async () => {
		expect(get(activeElement)).toBe(document.body);

		const spy = vi.fn();
		const unsubscribe = activeElement.subscribe(spy);

		const input = appendInput();
		expect(spy).not.toHaveBeenCalledWith(input);
		await user.click(input);
		expect(spy).toHaveBeenCalledWith(input);
		expect(input).toHaveFocus();
		expect(get(activeElement)).toBe(input);

		const input2 = appendInput();
		await user.click(input2);
		expect(input2).toHaveFocus();
		expect(get(activeElement)).toBe(input2);

		unsubscribe();
	});

	it('should work correctly when unsubscribed', async () => {
		const spy = vi.fn();
		const unsubscribe = activeElement.subscribe(spy);

		const input = appendInput();
		await user.click(input);

		unsubscribe();

		const input2 = appendInput();
		await user.click(input2);
		expect(spy).not.toHaveBeenCalledWith(input2);
		expect(input2).toHaveFocus();

		// `get` will re-subscribe, so it must update with the current one
		expect(get(activeElement)).toBe(input2);
	});

	it(`should not fire for the same element`, async () => {
		const spy = vi.fn();
		const unsubscribe = activeElement.subscribe(spy);

		const input = appendInput();
		fireEvent(input, new FocusEvent('focus'));

		spy.mockReset();
		fireEvent(input, new FocusEvent('focus'));
		expect(spy).not.toHaveBeenCalled();

		unsubscribe();
	});

	it(`should not update store when target is not an element`, async () => {
		const spy = vi.fn();
		const unsubscribe = activeElement.subscribe(spy);

		spy.mockReset();

		fireEvent(window, new FocusEvent('focus'));
		expect(spy).not.toHaveBeenCalled();

		unsubscribe();
	});
});
