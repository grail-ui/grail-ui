import type { NumberInputConfig, NumberInputReturn } from './numberInput.types';
import type { Action } from 'svelte/action';
import { derived, get, readable, writable } from 'svelte/store';
import { createKeyStroke } from '../keyStroke/keyStroke.js';
import { coerceNumber } from '../coercion/number.js';
import { addEventListener } from '../eventListener/eventListener.js';
import { chain } from '../util/chain.js';
import { noop } from '../util/noop.js';
import { uniqueId } from '../util/id.js';
import { isClient } from '../util/is.js';
import { snapValueToStep } from '../util/number.js';
import { observeElement } from './numberInput.utils.js';

const defaultReg = /^[0-9+\-.]$/;
const defaultPasteReg = /^-?(0|[1-9]\d*)(\.\d+)?$/;

export const createNumberInput = (initConfig: NumberInputConfig = {}): NumberInputReturn => {
	const id = uniqueId('number-input');

	const {
		clampValueOnBlur = true,
		allowMouseWheel = true,
		inputMode = 'decimal',
		spinOnPress = true,
		pattern = '[0-9]*(.[0-9]+)?',
		incrementAriaLabel = 'Increment',
		decrementAriaLabel = 'Decrement',
	} = initConfig;

	const inputValueChange = writable(0);
	const min$ = writable<number | null | undefined>(initConfig.min);
	const max$ = writable<number | null | undefined>(initConfig.max);
	const step = writable(initConfig.step ?? 1);
	const step$ = derived(step, ($step) => {
		const step = coerceNumber($step, 1);
		return step > 0 ? step : 1;
	});

	const getInputEl = () =>
		isClient ? (document.getElementById(id) as HTMLInputElement | null) : null;

	const setValue = (value: string | number) => {
		const input = getInputEl();
		if (!input) return;

		input.value = `${value}`;
		input.dispatchEvent(new Event('input', { bubbles: true }));
	};

	const getValue = () => {
		const input = getInputEl();
		if (!input) return null;
		else return input.value;
	};

	const characterValidation = (event: KeyboardEvent) => {
		const character = event.key;
		const value = getValue();

		if (!defaultReg.test(character)) {
			return false;
		}

		if (
			character === '-' &&
			(value?.includes('-') || (event?.target as HTMLInputElement).selectionStart !== 0)
		) {
			return false;
		}

		if (
			character === '+' &&
			(value?.includes('+') || (event?.target as HTMLInputElement).selectionStart !== 0)
		) {
			return false;
		}

		return true;
	};

	const safeNextStep = (multiplier: 1 | -1, steps: number) => {
		const value = get(valueAsNumber) ?? 0;
		const min = get(min$);
		const max = get(max$);
		const step = get(step$);

		// First snap the current value to the nearest step. If it moves in the direction
		// we're going, use it as the first step.
		const newValue = snapValueToStep(value, min, max, step);
		if ((multiplier > 0 && newValue > value) || (multiplier < 0 && newValue < value)) {
			steps = steps - 1;
		}

		return steps === 0
			? newValue
			: snapValueToStep(newValue + multiplier * step * steps, min, max, step);
	};

	const inputValueHandler = (type: '+' | '-', event?: KeyboardEvent | PointerEvent) => {
		setValue(safeNextStep(type === '+' ? 1 : -1, event?.shiftKey ? 10 : 1));
	};

	const handleFocus = (event: PointerEvent) => {
		if (document?.activeElement === getInputEl()) {
			return;
		}
		if ((event as PointerEvent)?.pointerType === 'mouse') {
			getInputEl()?.focus();
		} else {
			(event.target as HTMLElement)?.focus();
		}
	};

	const increment = () => inputValueHandler('+');
	const decrement = () => inputValueHandler('-');

	const useNumberInput: Action<HTMLElement, void> = (node) => {
		const removeFocusoutEvent = addEventListener(node, 'focusout', (e) => {
			if (e.target === getInputEl() && clampValueOnBlur) {
				const $value = get(valueAsNumber);
				if ($value != null) {
					setValue(snapValueToStep($value, get(min$), get(max$), get(step$)));
				}
			}
		});
		const removeInputEvent = addEventListener(node, 'input', (e) => {
			const input = getInputEl();
			if (e.target === input) {
				inputValueChange.update((value) => ++value);
			}
		});

		let removePointerDownEvent = noop;
		let removePointerUpEvent = noop;

		let interval: ReturnType<typeof setInterval>;
		let timeout: ReturnType<typeof setTimeout>;
		removePointerDownEvent = addEventListener(node, 'pointerdown', (e: PointerEvent) => {
			const mode = (e.target as HTMLElement).dataset.mode;
			if (!mode) return;

			const handleAction = mode === '+' ? increment : decrement;

			e.preventDefault();
			handleAction();
			handleFocus(e);

			if (spinOnPress) {
				timeout = setTimeout(() => {
					interval = setInterval(handleAction, 60);
				}, 400);

				removePointerUpEvent = addEventListener(window.document, 'pointerup', () => {
					if (timeout) clearTimeout(timeout);
					if (interval) clearInterval(interval);

					removePointerUpEvent();
				});
			}
		});

		const keypressHandler = (e: KeyboardEvent) => {
			if (e.target === getInputEl()) {
				if (!characterValidation(e)) e.preventDefault();
			}
		};
		const removeKeypressEvent = createKeyStroke({
			key: true,
			target: node,
			handler: keypressHandler,
			eventName: 'keypress',
		});

		const pasteHandler = (e: Event) => {
			if (e.target === getInputEl()) {
				const clipboardData = (e as ClipboardEvent).clipboardData;
				const pastedData = clipboardData?.getData('text');

				if (pastedData && !defaultPasteReg.test(pastedData)) {
					e.stopPropagation();
					e.preventDefault();
				}
			}
		};
		const removePasteEvent = addEventListener(
			node,
			'paste' as keyof GlobalEventHandlersEventMap,
			pasteHandler
		);

		let removeWheelEvent = noop;
		if (allowMouseWheel) {
			const wheelHandler = (e: WheelEvent) => {
				const input = getInputEl();
				if (e.target === input && document?.activeElement === input) {
					e.preventDefault();
					if (e.deltaY < 0) increment();
					else decrement();
				}
			};
			removeWheelEvent = addEventListener(node, 'wheel', wheelHandler, { passive: false });
		}

		const removeIncButtonEvent = createKeyStroke({
			key: ['ArrowUp', 'PageUp', 'Shift+ArrowUp', 'Shift+PageUp'],
			handler: (e) => {
				if (e.target === getInputEl()) {
					e.preventDefault();
					inputValueHandler('+', e);
				}
			},
			target: node,
		});
		const removeDecButtonEvent = createKeyStroke({
			key: ['ArrowDown', 'PageDown', 'Shift+ArrowDown', 'Shift+PageDown'],
			handler: (e) => {
				if (e.target === getInputEl()) {
					e.preventDefault();
					inputValueHandler('-', e);
				}
			},
			target: node,
		});

		const removeHomeButtonEvent = createKeyStroke({
			key: 'Home',
			handler: (e) => {
				if (e.target === getInputEl()) {
					e.preventDefault();
					const min = get(min$);
					if (min != null) {
						setValue(min);
					}
				}
			},
			target: node,
		});

		const removeEndButtonEvent = createKeyStroke({
			key: 'End',
			handler: (e) => {
				if (e.target === getInputEl()) {
					e.preventDefault();

					const max = get(max$);
					if (max != null) {
						setValue(snapValueToStep(max, get(min$), max, get(step$)));
					}
				}
			},
			target: node,
		});

		observeElement(getInputEl()!, 'value', function () {
			inputValueChange.update((value) => ++value);
		});

		return {
			destroy() {
				chain(
					removeFocusoutEvent,
					removeInputEvent,
					removePointerDownEvent,
					removeKeypressEvent,
					removePasteEvent,
					removeWheelEvent,
					removeIncButtonEvent,
					removeDecButtonEvent,
					removeHomeButtonEvent,
					removeEndButtonEvent
				);
			},
		};
	};

	const labelAttrs = readable<Record<string, string>>({ for: id });

	const inputAttrs = derived([min$, max$], ([$min, $max]) => ({
		inputmode: inputMode,
		id,
		pattern,
		autocorrect: 'off',
		autocomplete: 'off',
		spellcheck: 'false',
		'aria-roledescription': 'numberfield',
		'aria-valuemin': $min == null ? null : `${$min}`,
		'aria-valuemax': $max == null ? null : `${$max}`,
	}));

	const valueAsNumber = derived(inputValueChange, () => coerceNumber(getValue()));

	const canDecrement = derived(
		[valueAsNumber, min$],
		([$value, $min]) => $value == null || $min == null || $value > $min
	);

	const canIncrement = derived(
		[valueAsNumber, min$, max$, step$],
		([$value, $min, $max, $step]) => {
			return $value == null || $max == null || $value < snapValueToStep($max, $min, $max, $step);
		}
	);

	const incrementAttrs = derived([canIncrement], ([$canIncrement]) => ({
		'aria-controls': id,
		tabindex: '-1',
		'data-mode': '+',
		'aria-label': incrementAriaLabel,
		disabled: !$canIncrement,
	}));

	const decrementAttrs = derived([canDecrement], ([$canDecrement]) => ({
		'aria-controls': id,
		tabindex: '-1',
		'data-mode': '-',
		'aria-label': decrementAriaLabel,
		disabled: !$canDecrement,
	}));

	const invalid = derived(
		[valueAsNumber, min$, max$, step$, step],
		([$value, $min, $max, $step$, $step]) =>
			$step !== 'any' && $value != null && $value !== snapValueToStep($value, $min, $max, $step$)
	);

	return {
		useNumberInput,
		labelAttrs,
		inputAttrs,
		incrementAttrs,
		decrementAttrs,
		min: min$,
		max: max$,
		step,
		invalid,
		valueAsNumber,
	};
};
