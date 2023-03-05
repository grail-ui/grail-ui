import type { Action } from 'svelte/action';
import type { Readable } from 'svelte/store';

export type ResizeObserverConfig = {
	/**
	 * Called every time a resize event occurs for any of the observed elements.
	 */
	handler?: (entries: Record<string, ResizeObserverEntry>) => void;

	/**
	 * Sets which box model the observer will observe changes to. Possible values
	 * are `content-box` (the default), `border-box` and `device-pixel-content-box`.
	 *
	 * @defaultValue 'content-box'
	 */
	box?: ResizeObserverBoxOptions;
};

export type ResizeObserverUseConfig = {
	/**
	 * Called every time a resize event occurs for the current observed element.
	 */
	handler?: (entry: ResizeObserverEntry) => void;

	/**
	 * Sets which box model the observer will observe changes to. Possible values
	 * are `content-box` (the default), `border-box` and `device-pixel-content-box`.
	 *
	 * @defaultValue 'content-box'
	 */
	box?: ResizeObserverBoxOptions;
};

export type ResizeObserverReturn = {
	/**
	 * Whether `ResizeObserver` is supported.
	 */
	isSupported: boolean;

	/**
	 * The resize data for all observed elements.
	 */
	entries: Readable<Record<string, ResizeObserverEntry>>;

	/**
	 * Action for the element that needs to be observed.
	 */
	useResizeObserver: Action<HTMLElement, ResizeObserverUseConfig>;
};
