import type { Action } from 'svelte/action';
import type { Readable, Writable } from 'svelte/store';
import type { PositioningOptions } from '../floating/floating.types';

export type MenuConfig = {
	/**
	 * The open state of the popover when it is initially rendered.
	 *
	 * @defaultValue `false`
	 */
	open?: boolean;

	/**
	 * Where to place the floating element relative to its reference element.
	 *
	 * @defaultValue `{ placement: 'bottom' }`
	 */
	positioning?: Partial<PositioningOptions>;

	/**
	 * Where to "portal" the floating element outside it's initial DOM position.
	 * It can be a `HTMLElement` or a CSS selector that points to an already existing element.
	 *
	 * @defaultValue `null`
	 */
	portal?: string | HTMLElement | null;

	/**
	 * Event handler called when the open state of the menu changes.
	 */
	onOpenChange?: (value?: boolean) => void | undefined;

	/**
	 * Defines a string value that labels the current element.
	 *
	 * @defaultValue `Menu`
	 */
	ariaLabel?: string;

	/**
	 * Event handler called when an item is selected.
	 */
	onSelect?: (value: string) => void | undefined;
};

export type MenuReturn = {
	/**
	 * Action for the trigger element.
	 */
	useTrigger: Action<HTMLElement, void>;

	/**
	 * HTML attributes for the trigger element.
	 */
	triggerAttrs: Readable<Record<string, string | undefined>>;

	/**
	 * Action for the menu element.
	 */
	useMenu: Action<HTMLElement, void>;

	/**
	 * HTML attributes for the menu element.
	 */
	menuAttrs: Readable<Record<string, string>>;

	/**
	 * HTML attributes for the menu item element.
	 */
	itemAttrs: Readable<(params: string | { id: string; label: string }) => Record<string, string>>;

	/**
	 * HTML attributes for the element that is used to visually separate menu items.
	 */
	separatorAttrs: Readable<Record<string, string>>;

	/**
	 * The controlled open state of the menu.
	 */
	open: Writable<boolean>;
};
