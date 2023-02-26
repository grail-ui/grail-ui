import type { Action } from 'svelte/action';
import type { Readable, Writable } from 'svelte/store';

export type ToggleItemState = 'on' | 'off';

export interface ToggleGroupConfig<T extends string> {
	/**
	 * Allow multiple items to be pressed at the same time.
	 *
	 * @defaultValue `false`
	 */
	multiple?: boolean;

	/**
	 * Initially pressed items.
	 */
	value?: Partial<T> | Partial<T>[];

	/**
	 * The toggle group orientation. Affects arrow navigation.
	 *
	 * @defaultValue `horizontal`
	 */
	orientation?: 'horizontal' | 'vertical';

	/**
	 * The disabled keys of the toggle group. Pass to true to disable all the toggle items.
	 *
	 * @defaultValue `false`
	 */
	disabled?: boolean | Partial<T> | Partial<T>[];

	/**
	 * Event handler called when the pressed state of the toggle group changes.
	 */
	onValueChange?: (value: Partial<T> | Partial<T>[] | undefined) => void;
}

export interface ToggleGroupReturn<T extends string> {
	/**
	 * Toggles a key between onn and off.
	 */
	toggle: (key: Partial<T>) => void;

	/**
	 * Presses a key or an array of keys.
	 */
	press: (...keys: Partial<T>[]) => void;

	/**
	 * Unpresses a key or an array of keys.
	 */
	unpress: (...keys: Partial<T>[]) => void;

	/**
	 * The pressed toggle item.
	 */
	pressed: Readable<Set<Partial<T>>>;

	/**
	 * The disabled keys of the toggle items.
	 */
	disabled: Writable<boolean | Partial<T> | Partial<T>[]>;

	/**
	 * Action for the toggle group root element.
	 */
	useToggleGroup: Action<HTMLElement, void>;

	/**
	 * HTML attributes for the toggle group root element.
	 */
	rootAttrs: Readable<Record<string, string>>;

	/**
	 * HTML attributes for the toggle item.
	 */
	itemAttrs: Readable<(key: T) => Record<string, string>>;
}
