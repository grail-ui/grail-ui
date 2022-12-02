import type { Writable } from 'svelte/store';

export type ClickOutsideConfig = {
	/**
	 * Whether the listener is active.
	 *
	 * @defaultValue `true`
	 */
	enabled?: boolean | Writable<boolean>;

	/**
	 * Callback when user clicks outside a given element.
	 */
	handler?: (evt: PointerEvent) => void;

	/**
	 * List of elements that should not trigger the event.
	 */
	ignore?: Element[];
};
