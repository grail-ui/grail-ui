import type { NumberInputConfig } from '../numberInput.types';
import { vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { get } from 'svelte/store';
import { tick } from 'svelte';
import { createNumberInput } from '../numberInput';
import NumberInputTest from './NumberInputTest.svelte';

describe('Number Input', () => {
	const user = userEvent.setup();
	const getEl = (value: string) => {
		return screen.getByTestId(value);
	};

	const clearValue = async (input = getEl('input')) => {
		await user.clear(input);
	};

	const typeValue = async (value: string | number) => {
		const input = getEl('input');
		await clearValue(input);
		await user.type(input, `${value}`);
	};

	const setup = (params: NumberInputConfig = {}) => {
		const api = createNumberInput(params);
		render(NumberInputTest, { api });
		const input = getEl('input') as HTMLInputElement;
		const increment = getEl('increment');
		const decrement = getEl('decrement');

		return { api, input, increment, decrement };
	};

	beforeEach(() => {
		vi.clearAllMocks();
		vi.restoreAllMocks();
	});

	it('should increment/decrement correctly with  inc/dec buttons and keyboard arrow up/arrow down-page up/page down(shift multiples step ten times)', async () => {
		const { input, increment, decrement } = setup({ step: 2, min: -50, max: 50 });

		await typeValue(1.2);
		expect(input).toHaveValue('1.2');
		await user.click(increment);
		expect(input).toHaveValue('2');
		await user.click(increment);
		expect(input).toHaveValue('4');

		await typeValue(2.4);
		await user.click(decrement);
		expect(input).toHaveValue('2');
		await user.click(decrement);
		expect(input).toHaveValue('0');

		const pressKey = ({ key, shiftKey = false }: { key: string; shiftKey?: boolean }) => {
			fireEvent(input, new KeyboardEvent('keydown', { key, shiftKey, bubbles: true }));
		};

		await pressKey({ key: 'ArrowUp' });
		expect(input).toHaveValue('2');
		await pressKey({ key: 'ArrowUp', shiftKey: true });
		expect(input).toHaveValue('22');

		await pressKey({ key: 'ArrowDown' });
		expect(input).toHaveValue('20');
		await pressKey({ key: 'ArrowDown', shiftKey: true });
		expect(input).toHaveValue('0');

		await pressKey({ key: 'PageUp' });
		expect(input).toHaveValue('2');
		await pressKey({ key: 'PageUp', shiftKey: true });
		expect(input).toHaveValue('22');

		await pressKey({ key: 'PageDown' });
		expect(input).toHaveValue('20');
		await pressKey({ key: 'PageDown', shiftKey: true });
		expect(input).toHaveValue('0');
	});

	it('should be able to change min, max, pattern, inputMode parameters for input', async () => {
		const { input } = setup({ min: 20, max: 30, pattern: 'test-pattern', inputMode: 'numeric' });

		expect(input).toHaveAttribute('aria-valuemin', '20');
		expect(input).toHaveAttribute('aria-valuemax', '30');
		expect(input).toHaveAttribute('pattern', 'test-pattern');
		expect(input).toHaveAttribute('inputMode', 'numeric');
	});

	it('check default attributes', async () => {
		const { input, increment, decrement } = setup();

		expect(input).toHaveValue('');
		expect(input).toHaveAttribute('pattern', '[0-9]*(.[0-9]+)?');
		expect(input).toHaveAttribute('inputMode', 'decimal');
		expect(input).toHaveAttribute('autocorrect', 'off');
		expect(input).toHaveAttribute('autocomplete', 'off');
		expect(input).toHaveAttribute('spellcheck', 'false');
		expect(increment).toHaveAttribute('aria-label', 'Increment');
		expect(increment).toHaveAttribute('aria-controls');
		expect(increment).toHaveAttribute('tabindex', '-1');
		expect(decrement).toHaveAttribute('aria-label', 'Decrement');
		expect(decrement).toHaveAttribute('aria-controls');
		expect(decrement).toHaveAttribute('tabindex', '-1');
	});

	describe('mouse wheel option', () => {
		it('should change value only if input is focused', async () => {
			const { input } = setup();

			await typeValue(25);
			expect(input).toHaveFocus();
			await fireEvent(input, new WheelEvent('wheel', { bubbles: true }));
			expect(input).toHaveValue('24');

			(document?.activeElement as HTMLElement).blur();
			expect(input).not.toHaveFocus();
			await fireEvent(input, new WheelEvent('wheel', { bubbles: true }));
			expect(input).toHaveValue('24');
		});

		it('can be disabled', async () => {
			const { input } = setup({ allowMouseWheel: false });

			await typeValue(25);
			await fireEvent(input, new WheelEvent('wheel', { bubbles: true }));
			expect(input).toHaveValue('25');
		});
	});

	describe('focusInputOnChange parameter', () => {
		it('should focus input when incrementing/decrementing with increment/decrement buttons', async () => {
			const { input, increment, decrement } = setup();

			expect(input).not.toHaveFocus();

			await user.click(increment);
			expect(input).toHaveFocus();

			(document.body.querySelector('input') as HTMLInputElement).blur();
			expect(input).not.toHaveFocus();

			await user.click(decrement);
			expect(input).toHaveFocus();
		});
	});

	describe('clamp value on blur', () => {
		it('should set value in min/max limits if is over for default true', async () => {
			const { input } = setup({ min: -10, max: 12 });

			await typeValue(15);

			await fireEvent(input, new FocusEvent('focusout', { bubbles: true }));
			expect(input).toHaveValue('12');

			await typeValue(-15);

			await fireEvent(input, new FocusEvent('focusout', { bubbles: true }));
			expect(input).toHaveValue('-10');

			await clearValue();
			await fireEvent(input, new FocusEvent('focusout', { bubbles: true }));
			expect(input).toHaveValue('');
		});

		it('should not change value out of min/max limits for false', async () => {
			const { input } = setup({ min: -10, max: 12, clampValueOnBlur: false });

			await typeValue(15);
			await fireEvent(input, new FocusEvent('focusout', { bubbles: true }));
			expect(input).toHaveValue('15');

			await typeValue(-20);
			await fireEvent(input, new FocusEvent('focusout', { bubbles: true }));
			expect(input).toHaveValue('-20');
		});
	});

	describe('character validation should work', () => {
		it('for default reg(numbers)', async () => {
			const { input } = setup();

			await typeValue(4);
			expect(input).toHaveValue('4');

			await user.type(input, 'a');
			expect(input).toHaveValue('4');
		});
	});

	describe('initial value to show when increment/decrement is used from empty input state', () => {
		it('when there is no min-max or min is less than 0 and max greater than 0 show 0', async () => {
			const { input, decrement, increment } = setup({ min: -50, max: 60 });

			expect(input).toHaveValue('');
			await user.click(increment);
			expect(input).toHaveValue('1');

			await user.clear(input);
			await user.click(decrement);
			expect(input).toHaveValue('-1');
		});

		it('when min is greater than 0 show min', async () => {
			const { input, decrement, increment } = setup({ min: 10 });

			expect(input).toHaveValue('');
			await user.click(increment);
			expect(input).toHaveValue('10');

			await user.clear(input);
			await user.click(decrement);
			expect(input).toHaveValue('10');
		});

		it('when no min and max is less than 0 show max', async () => {
			const { input, decrement, increment } = setup({ max: -10 });

			expect(input).toHaveValue('');
			await user.click(increment);
			expect(input).toHaveValue('-10');

			await user.clear(input);
			await user.click(decrement);
			expect(input).toHaveValue('-10');
		});
	});

	it('get min,max stores and set new values', async () => {
		const { api, input } = setup({ min: -10, max: 10 });

		expect(input).toHaveAttribute('aria-valuemin', '-10');
		expect(get(api.min)).toBe(-10);
		await fireEvent(input, new KeyboardEvent('keydown', { key: 'Home', bubbles: true }));
		expect(input).toHaveValue('-10');

		api.min.set(-5);
		await tick();
		expect(input).toHaveAttribute('aria-valuemin', '-5');
		await fireEvent(input, new KeyboardEvent('keydown', { key: 'Home', bubbles: true }));
		expect(input).toHaveValue('-5');

		expect(input).toHaveAttribute('aria-valuemax', '10');
		expect(get(api.max)).toBe(10);
		await fireEvent(input, new KeyboardEvent('keydown', { key: 'End', bubbles: true }));
		expect(input).toHaveValue('10');

		api.max.set(25);
		await tick();
		expect(input).toHaveAttribute('aria-valuemax', '25');
		await fireEvent(input, new KeyboardEvent('keydown', { key: 'End', bubbles: true }));
		expect(input).toHaveValue('25');
	});

	it('invalid store should should be true when value is under/over of min/max respectively or on valid step value', async () => {
		const { api } = setup({ min: -10, max: 10, step: 2 });

		expect(get(api.invalid)).toBe(false);
		await typeValue(15);
		expect(get(api.invalid)).toBe(true);

		await typeValue(8);
		expect(get(api.invalid)).toBe(false);

		await typeValue(-15);
		expect(get(api.invalid)).toBe(true);

		await typeValue(4);
		expect(get(api.invalid)).toBe(false);

		await typeValue(3);
		expect(get(api.invalid)).toBe(true);
	});

	it('get step store and set new value', async () => {
		const { api, input, increment } = setup();

		await typeValue(1);
		await user.click(increment);
		expect(input).toHaveValue('2');

		api.step.set(2);
		await tick();
		await user.click(increment);
		expect(input).toHaveValue('4');
	});

	it('round value on increment/decrement to avoid javascript decimals', async () => {
		const { input, increment, decrement } = setup({ step: 1.66 });

		await typeValue(0);
		await user.click(increment);
		expect(input).toHaveValue('1.66');
		await user.click(increment);
		expect(input).toHaveValue('3.32');
		await user.click(increment);
		expect(input).toHaveValue('4.98');
		await user.click(increment);
		expect(input).toHaveValue('6.64');
		await user.click(decrement);
		expect(input).toHaveValue('4.98');
		await user.click(decrement);
		expect(input).toHaveValue('3.32');
	});

	describe('Spin on press', () => {
		beforeEach(() => {
			vi.useFakeTimers();
		});
		afterEach(() => {
			vi.useRealTimers();
		});

		//should inc/dec three times in that time span
		const time = 400 + 2 * 60;
		const pointerEvents = async (element: HTMLElement, input: HTMLInputElement, value: string) => {
			await fireEvent(element, new Event('pointerdown', { bubbles: true }));
			vi.advanceTimersByTime(time);
			expect(input).toHaveValue(value);

			await fireEvent(document.body, new Event('pointerup', { bubbles: true }));
			vi.advanceTimersByTime(time);
			expect(input).toHaveValue(value);
		};

		it('should increment/decrement value initially and then every 60 ms after 400ms delay when buttons are clicked', async () => {
			const { input, increment, decrement } = setup();

			await pointerEvents(increment, input, '3');
			await pointerEvents(decrement, input, '0');
		});

		it('can be disabled', async () => {
			const { input, increment, decrement } = setup({ spinOnPress: false });

			await pointerEvents(increment, input, '1');
			await pointerEvents(decrement, input, '0');
		});
	});

	it('can type -(minus sign) only once and on the start of the input', async () => {
		const { input } = setup();

		await user.type(input, '3');
		expect(input).toHaveValue('3');

		await user.type(input, '{arrowleft}-');
		expect(input).toHaveValue(`-3`);

		await user.type(input, '-');
		expect(input).toHaveValue(`-3`);
	});

	it('can type +(plus sign) only once and on the start of the input', async () => {
		const { input } = setup();

		await user.type(input, '4');
		expect(input).toHaveValue('4');

		await user.type(input, '{arrowleft}+');
		expect(input).toHaveValue(`+4`);

		await user.type(input, '+');
		expect(input).toHaveValue(`+4`);
	});

	it('can use home button for min and end button for max allowed value', async () => {
		const { input } = setup({ min: -1, max: 10, step: 2 });

		await fireEvent(input, new KeyboardEvent('keydown', { key: 'Home', bubbles: true }));
		expect(input).toHaveValue('-1');

		await fireEvent(input, new KeyboardEvent('keydown', { key: 'End', bubbles: true }));
		expect(input).toHaveValue('9');
	});

	it("valueAsNumber store should have number input's current value as number", async () => {
		const { api, input } = setup();

		expect(input).toHaveValue('');
		expect(get(api.valueAsNumber)).toBe(undefined);
		await typeValue(3);
		expect(get(api.valueAsNumber)).toBe(3);
	});

	it('should disable inc/dec buttons and clamp value correctly for min zero', async () => {
		const { input, decrement, increment } = setup({ min: 0, max: 22 });
		expect(decrement).not.toHaveAttribute('disabled');
		expect(increment).not.toHaveAttribute('disabled');

		await typeValue(0);
		expect(decrement).toHaveAttribute('disabled');
		await typeValue(-10);
		expect(decrement).toHaveAttribute('disabled');
		expect(increment).not.toHaveAttribute('disabled');
		await user.click(increment);
		expect(input).toHaveValue('0');
		expect(decrement).toHaveAttribute('disabled');
		await user.click(increment);
		expect(input).toHaveValue('1');
		await typeValue(-20);
		await fireEvent(input, new FocusEvent('focusout', { bubbles: true }));
		expect(input).toHaveValue('0');
		expect(decrement).toHaveAttribute('disabled');
		expect(increment).not.toHaveAttribute('disabled');
	});

	it('should disable inc/dec buttons and clamp value correctly for max zero', async () => {
		const { input, decrement, increment } = setup({ min: -16, max: 0 });
		expect(decrement).not.toHaveAttribute('disabled');
		expect(increment).not.toHaveAttribute('disabled');

		await typeValue(0);
		expect(increment).toHaveAttribute('disabled');
		await typeValue(10);
		expect(decrement).not.toHaveAttribute('disabled');
		expect(increment).toHaveAttribute('disabled');
		await user.click(decrement);
		expect(input).toHaveValue('0');
		expect(increment).toHaveAttribute('disabled');
		await user.click(decrement);
		expect(input).toHaveValue('-1');
		await typeValue(20);
		await fireEvent(input, new FocusEvent('focusout', { bubbles: true }));
		expect(input).toHaveValue('0');
		expect(decrement).not.toHaveAttribute('disabled');
		expect(increment).toHaveAttribute('disabled');
	});

	it('invalid store and inc/dec buttons disabled attr getting updated when min,max or step value changes', async () => {
		const { api, increment, decrement } = setup({ min: -20, max: 20 });
		expect(decrement).not.toHaveAttribute('disabled');
		expect(increment).not.toHaveAttribute('disabled');

		await typeValue(-24);
		expect(get(api.invalid)).toBe(true);
		expect(decrement).toHaveAttribute('disabled');
		expect(increment).not.toHaveAttribute('disabled');
		await typeValue(4);
		expect(get(api.invalid)).toBe(false);
		expect(decrement).not.toHaveAttribute('disabled');
		expect(increment).not.toHaveAttribute('disabled');
		api.min.set(5);
		await tick();
		expect(get(api.invalid)).toBe(true);
		expect(decrement).toHaveAttribute('disabled');
		expect(increment).not.toHaveAttribute('disabled');

		await typeValue(30);
		expect(get(api.invalid)).toBe(true);
		expect(decrement).not.toHaveAttribute('disabled');
		expect(increment).toHaveAttribute('disabled');
		await typeValue(18);
		expect(get(api.invalid)).toBe(false);
		expect(decrement).not.toHaveAttribute('disabled');
		expect(increment).not.toHaveAttribute('disabled');
		api.max.set(15);
		await tick();
		expect(get(api.invalid)).toBe(true);
		expect(decrement).not.toHaveAttribute('disabled');
		expect(increment).toHaveAttribute('disabled');

		await typeValue(6);
		expect(get(api.invalid)).toBe(false);
		await typeValue(6.5);
		expect(get(api.invalid)).toBe(true);
		api.step.set(1.5);
		await tick();
		expect(get(api.invalid)).toBe(false);
	});

	describe('step should fallback on default one if', () => {
		it('is zero,null or negative number', async () => {
			const { api, input, increment } = setup({ step: 0 });

			await user.click(increment);
			expect(input).toHaveValue('1');

			api.step.set(null as unknown as number);
			await tick();
			await user.click(increment);
			expect(input).toHaveValue('2');

			api.step.set(-1);
			await tick();
			await user.click(increment);
			expect(input).toHaveValue('3');
		});

		it("is 'any' and values entered in input should not be invalid", async () => {
			const { api, input, increment } = setup({ step: 'any' });

			await user.click(increment);
			expect(input).toHaveValue('1');
			await user.click(increment);
			expect(input).toHaveValue('2');

			await typeValue(1.4);
			expect(get(api.invalid)).toBe(false);
		});
	});

	it('paste should work for numbers only', async () => {
		const { input } = setup();
		input.focus();
		await user.paste('-3.16');
		expect(input).toHaveValue('-3.16');

		clearValue();
		await user.paste('5');
		expect(input).toHaveValue('5');

		clearValue();
		await user.paste('abc');
		expect(input).toHaveValue('');
	});
});
