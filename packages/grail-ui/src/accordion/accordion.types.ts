import type { Action } from 'svelte/action';
import type { Readable, Writable } from 'svelte/store';

export type AccordionItemState = 'open' | 'closed';

export interface AccordionConfig<T extends string> {
	/**
	 * Allow multiple items to be opened at the same time.
	 */
	multiple?: boolean;

	/**
	 * Initially expanded items.
	 */
	value?: T | T[];

	/**
	 * The disabled keys of the accordion. Pass to true to disable all the accordion items.
	 *
	 * @defaultValue `false`
	 */
	disabled?: boolean | T | T[];

	/**
	 * Event handler called when the expanded state of the accordion changes.
	 */
	onValueChange?: (value: T | T[] | undefined) => void;
}

export interface AccordionReturn<T extends string> {
	/**
	 * Toggles a key between expanded and collapsed.
	 */
	toggle: (key: T) => void;

	/**
	 * Expands a key or an array of keys.
	 */
	expand: (...keys: T[]) => void;

	/**
	 * Collapses a key or an array of keys.
	 */
	collapse: (...keys: T[]) => void;

	/**
	 * Expands all the keys.
	 */
	expandAll: () => void;

	/**
	 * Collapses all the keys.
	 */
	collapseAll: () => void;

	/**
	 * The expanded state of the accordion.
	 */
	expanded: Readable<Set<T>>;

	/**
	 * The disabled keys of the accordion.
	 */
	disabled: Writable<boolean | T | T[]>;

	/**
	 * Action for the accordion root element.
	 */
	useAccordion: Action<HTMLElement, void>;

	/**
	 * HTML attributes for the accordion item element.
	 */
	itemAttrs: Readable<(key: T) => Record<string, string>>;

	/**
	 * HTML attributes for the trigger element.
	 */
	triggerAttrs: Readable<(key: T) => Record<string, string>>;

	/**
	 * HTML attributes for the content element.
	 */
	contentAttrs: Readable<(key: T) => Record<string, string>>;
}
