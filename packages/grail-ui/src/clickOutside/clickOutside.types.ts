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
	 * A predicate function or a list of elements that should not trigger the event.
	 */
	ignore?: ((e: PointerEvent) => boolean) | Element[];
};
