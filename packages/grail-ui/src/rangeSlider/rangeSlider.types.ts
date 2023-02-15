import type { Action } from 'svelte/action';
import type { Readable, Writable } from 'svelte/store';

export type RangeSliderConfig = {
	/**
	 * The orientation of the Slider.
	 * @defaultValue `horizontal`
	 */
	orientation?: 'horizontal' | 'vertical';

	/**
	 * The slider's minimum value.
	 * @defaultValue `0`
	 */
	minValue?: number;

	/**
	 * The slider's maximum value.
	 * @defaultValue `100`
	 */
	maxValue?: number;

	/**
	 * The slider's step value.
	 * @defaultValue `1`
	 */
	step?: number;

	/**
	 * The slider's initial values.
	 * @defaultValue `50`
	 */
	initialValues?: number | number[];
};

export type RangeSliderReturn = {
	useRangeSlider: Action<HTMLElement, void>;

	trackAttrs: Readable<Record<string, string>>;

	rangeAttrs: Readable<Record<string, string>>;

	thumbAttrs: Readable<(index: number) => Record<string, string>>;

	labelAttrs: Readable<Record<string, string>>;

	values: Readable<number[] | number>;
};
