import type { Action } from 'svelte/action';
import type { Readable, Writable } from 'svelte/store';
import type { PositioningOptions } from '../floating/floating.types';

export type TooltipConfig = {
	/**
	 * The open state of the tooltip when it is initially rendered.
	 *
	 * @defaultValue `false`
	 */
	open?: boolean;

	/**
	 * The duration from when the mouse enters a trigger until open is triggered.
	 *
	 * @defaultValue `1000`
	 */
	openDelay?: number;

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

export type TooltipReturn = {
	/**
	 * Action for the trigger element.
	 */
	useTooltipTrigger: Action<HTMLElement, void>;

	/**
	 * HTML attributes for the trigger element.
	 */
	triggerAttrs: Readable<Record<string, string | undefined>>;

	/**
	 * Action for the tooltip element.
	 */
	useTooltip: Action<HTMLElement, void>;

	/**
	 * HTML attributes for the tooltip element.
	 */
	tooltipAttrs: Readable<Record<string, string>>;

	/**
	 * HTML attributes for the tooltip arrow element.
	 */
	arrowAttrs: Readable<Record<string, string>>;

	/**
	 * The controlled open state of the tooltip.
	 */
	open: Writable<boolean>;

	/**
	 * Utility function that shows the tooltip.
	 */
	show: () => void;

	/**
	 * Utility function that hides the tooltip.
	 */
	hide: () => void;

	/**
	 * Utility function that toggles the tooltip.
	 */
	toggle: () => void;
};
