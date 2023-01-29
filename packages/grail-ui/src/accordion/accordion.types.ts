import type { Action } from 'svelte/action';
import type { Readable } from 'svelte/store';

export type AccordionItemState = 'open' | 'closed';

export type AccordionType = 'single' | 'multiple';

interface AccordionBaseConfig {
	/**
	 * Whether clicking any useAccordionTrigger element should toggle the respective accordion item.
	 *
	 * @defaultValue `false`
	 */
	disabled?: boolean;
}

export interface AccordionSingleConfig<T extends string> extends AccordionBaseConfig {
	/**
	 * Allow a single item to be opened at the same time.
	 */
	type?: 'single';

	/**
	 * Initial value (controls expanded state of accordion items).
	 */
	value?: T;

	/**
	 * Event handler called when the expanded state of the accordion changes.
	 */
	onValueChange?: (value: T) => void;
}

export interface AccordionMultipleConfig<T extends string> extends AccordionBaseConfig {
	/**
	 * Allow multiple items to be opened at the same time.
	 */
	type?: 'multiple';

	/**
	 * Initial value (controls expanded state of accordion items).
	 */
	value?: T[];

	/**
	 * Event handler called when the expanded state of the accordion changes.
	 */
	onValueChange?: (value: T[]) => void;
}

export type AccordionConfig<T extends string = string> =
	| AccordionSingleConfig<T>
	| AccordionMultipleConfig<T>;

export interface AccordionItemParams<T extends string> {
	/**
	 * Unique identifier. Used to control accordion item's expanded state.
	 */
	value: T;

	/**
	 * Whether clicking the useAccordionTrigger element should toggle the accordion item.
	 *
	 * @defaultValue `false`
	 */
	disabled?: boolean;
}

export interface AccordionParams {
	/**
	 * Whether clicking any useAccordionTrigger element should toggle the respective accordion item.
	 *
	 * @defaultValue `false`
	 */
	disabled?: boolean;
}

export interface AccordionReturn<T extends string> {
	/**
	 * Toggles a value between expanded and collapsed.
	 */
	toggle: (value: T) => void;

	/**
	 * Expands a value or an array of values.
	 */
	expand: (...values: T[]) => void;

	/**
	 * Collapses a value or an array of values.
	 */
	collapse: (...values: T[]) => void;

	/**
	 * Expands all the values.
	 */
	expandAll: () => void;

	/**
	 * Collapses all the values.
	 */
	collapseAll: () => void;

	/**
	 * The expanded state of the accordion.
	 */
	expanded: Readable<Set<T>>;

	/**
	 * Action for the accordion root element.
	 */
	useAccordion: Action<HTMLElement, AccordionParams>;

	/**
	 * HTML attributes for the accordion item element.
	 */
	itemAttrs: Readable<(params: AccordionItemParams<T> | T) => Record<string, string>>;

	/**
	 * HTML attributes for the trigger element.
	 */
	triggerAttrs: Readable<(params: AccordionItemParams<T> | T) => Record<string, string>>;

	/**
	 * HTML attributes for the content element.
	 */
	contentAttrs: Readable<(params: AccordionItemParams<T> | T) => Record<string, string>>;
}
