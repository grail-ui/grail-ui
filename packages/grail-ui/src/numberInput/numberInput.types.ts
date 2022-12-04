import type { Action } from 'svelte/action';
import type { Readable, Writable } from 'svelte/store';

export type NumberInputConfig = {
	/**
	 * The pattern used to check the <input> element's value against.
	 * @defaultValue `[0-9]*(.[0-9]+)?`
	 */
	pattern?: string;

	/**
	 * The minimum value of the number input.
	 */
	min?: number;

	/**
	 * The maximum value of the number input.
	 */
	max?: number;

	/**
	 * The amount to increment or decrement the value by.
	 * @defaultValue `1`
	 */
	step?: number | 'any';

	/**
	 * Whether to allow mouse wheel to change the value.
	 * @defaultValue `true`
	 */
	allowMouseWheel?: boolean;

	/**
	 * Whether to clamp the value when the input loses focus (blur).
	 * @defaultValue `true`
	 */
	clampValueOnBlur?: boolean;

	/**
	 * Hints at the type of data that might be entered by the user. It also determines
	 * the type of keyboard shown to the user on mobile devices.
	 * @defaultValue `decimal`
	 */
	inputMode?: 'text' | 'numeric' | 'decimal';

	/**
	 * Whether to spin the value when the increment/decrement button is pressed.
	 * @defaultValue `true`
	 */
	spinOnPress?: boolean;

	/**
	 * A custom aria-label for the increment button.
	 * @defaultValue 'Increment'
	 */
	incrementAriaLabel?: string;

	/**
	 * A custom aria-label for the decrement button.
	 * @defaultValue 'Decrement'
	 */
	decrementAriaLabel?: string;
};

export type NumberInputReturn = {
	/**
	 * Action for the number input root element.
	 */
	useNumberInput: Action<HTMLElement, void>;

	/**
	 * HTML attributes for the label element.
	 */
	labelAttrs: Readable<Record<string, string>>;

	/**
	 * HTML attributes for the input element.
	 */
	inputAttrs: Readable<Record<string, string | null>>;

	/**
	 * HTML attributes for the increment button.
	 */
	incrementAttrs: Readable<Record<string, string | boolean>>;

	/**
	 * HTML attributes for the decrement button.
	 */
	decrementAttrs: Readable<Record<string, string | boolean>>;

	/**
	 * The controlled minimum value of the number input.
	 */
	min: Writable<number | null | undefined>;

	/**
	 * The controlled maximum value of the number input.
	 */
	max: Writable<number | null | undefined>;

	/**
	 * Whether the number input value is invalid.
	 */
	invalid: Readable<boolean>;

	/**
	 * The controlled amount to increment or decrement the value by.
	 */
	step: Writable<number | 'any'>;

	/**
	 * Current input value as number.
	 */
	valueAsNumber: Readable<number | undefined>;
};
