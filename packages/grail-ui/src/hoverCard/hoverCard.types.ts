import type { Action } from 'svelte/action';
import type { Readable, Writable } from 'svelte/store';
import type { PositioningOptions } from '../floating/floating.types';

export type HoverCardConfig = {
	/**
	 * The open state of the hover card when it is initially rendered.
	 *
	 * @defaultValue `false`
	 */
	open?: boolean;

	/**
	 * The duration from when the mouse enters a trigger until open is triggered.
	 *
	 * @defaultValue `700`
	 */
	openDelay?: number;

	/**
	 * The duration from when the mouse enters a trigger until open is triggered.
	 *
	 * @defaultValue `300`
	 */
	closeDelay?: number;

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
	 * Event handler called when the open state of the hover card changes.
	 */
	onOpenChange?: (value?: boolean) => void | undefined;
};

export type HoverCardReturn = {
	/**
	 * Action for the trigger element.
	 */
	useHoverCardTrigger: Action<HTMLElement, void>;

	/**
	 * Action for the hover card element.
	 */
	useHoverCard: Action<HTMLElement, void>;

	/**
	 * HTML attributes for the hover card arrow element.
	 */
	arrowAttrs: Readable<Record<string, string>>;

	/**
	 * The controlled open state of the hover card.
	 */
	open: Writable<boolean>;

	/**
	 * Utility function that shows the hover card.
	 */
	show: () => void;

	/**
	 * Utility function that hides the hover card.
	 */
	hide: () => void;
};
