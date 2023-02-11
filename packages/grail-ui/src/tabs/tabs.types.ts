import type { Action } from 'svelte/action';
import type { Readable, Writable } from 'svelte/store';

export type TabItemState = 'active' | 'inactive';

export interface TabsConfig<T extends string = string> {
	/**
	 * Initial value (controls active state of tabs).
	 */
	value?: T;

	/**
	 * Event handler called when the active state of the tabs changes.
	 */
	onValueChange?: (value: T | undefined) => void;

	/**
	 * The tabs orientation. Affects arrow navigation.
	 *
	 * @defaultValue `horizontal`
	 */
	orientation?: 'horizontal' | 'vertical';

	/**
	 * When automatic, tabs are activated when they receive focus. When manual, tabs are activated when clicked.
	 *
	 * @defaultValue `automatic`
	 */
	activationMode?: 'automatic' | 'manual';

	/**
	 * The disabled tabs. Pass to true to disable all the tabs.
	 *
	 * @defaultValue `false`
	 */
	disabled?: boolean | T | T[];
}

export interface TabsReturn<T extends string> {
	/**
	 * Activates tab.
	 */
	activate: (value: T) => void;

	/**
	 * The active tab.
	 */
	active: Readable<T | undefined>;

	/**
	 * The disabled keys of the tabs.
	 */
	disabled: Writable<boolean | T | T[]>;

	/**
	 * Action for the tabs root element.
	 */
	useTabs: Action<HTMLElement, void>;

	/**
	 * HTML attributes for the element that contains the trigger and content elements.
	 */
	rootAttrs: Readable<Record<string, string>>;

	/**
	 * HTML attributes for the element that contains the triggers.
	 */
	listAttrs: Readable<Record<string, string>>;

	/**
	 * HTML attributes for the trigger element.
	 */
	triggerAttrs: Readable<(params: T) => Record<string, string>>;

	/**
	 * HTML attributes for the content element.
	 */
	contentAttrs: Readable<(params: T) => Record<string, string>>;
}
