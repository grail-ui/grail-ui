import type { Action } from 'svelte/action';
import type { Readable, Writable } from 'svelte/store';
import type { PositioningOptions } from '../floating/floating.types';

export type PopoverConfig = {
	/**
	 * The open state of the popover when it is initially rendered.
	 *
	 * @defaultValue `false`
	 */
	open?: boolean;

	/**
	 * Where to place the floating element relative to its reference element.
	 */
	positioning?: Partial<PositioningOptions>;

	/**
	 * Where to "portal" the floating element outside it's initial DOM position.
	 * It can be a `HTMLElement` or a CSS selector that points to an already existing element.
	 *
	 * @defaultValue `"body"`
	 */
	portal?: string | HTMLElement | null;

	/**
	 * Event handler called when the open state of the tooltip changes.
	 */
	onOpenChange?: (value?: boolean) => void | undefined;
};

export type PopoverReturn = {
	/**
	 * Action for the trigger element.
	 */
	usePopoverTrigger: Action<HTMLElement, void>;

	/**
	 * HTML attributes for the trigger element.
	 */
	triggerAttrs: Readable<Record<string, string | undefined>>;

	/**
	 * Action for the popover element.
	 */
	usePopover: Action<HTMLElement, void>;

	/**
	 * HTML attributes for the popover element.
	 */
	popoverAttrs: Readable<Record<string, string>>;

	/**
	 * HTML attributes for the popover element.
	 */
	closeButtonAttrs: Readable<Record<string, string>>;

	/**
	 * HTML attributes for the popover arrow element.
	 */
	arrowAttrs: Readable<Record<string, string>>;

	/**
	 * The controlled open state of the popover.
	 */
	open: Writable<boolean>;

	/**
	 * The element to which the popover should be attached.
	 * Defaults to the `usePopoverTrigger`.
	 */
	referenceEl: Writable<HTMLElement | undefined>;
};
