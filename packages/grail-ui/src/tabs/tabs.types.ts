import type { Action } from 'svelte/action';
import type { Readable } from 'svelte/store';

export interface TabsConfig<T extends string = string> {
	/**
	 * Initial value (controls active state of tabs).
	 */
	value?: T;

	/**
	 * Event handler called when the active state of the tabs changes.
	 */
	onValueChange?: (value: T) => void;

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
}

export type TabsParams<T extends string> = Pick<TabsConfig<T>, 'activationMode'>;

export interface TabsTriggerParams<T extends string> {
	/**
	 * A unique identifier that associates the trigger with a content.
	 */
	value: T;

	/**
	 * Prevents the user from interacting with the tab.
	 *
	 * @defaultValue `false`
	 */
	disabled?: boolean;
}

export interface TabsContentParams<T extends string> {
	/**
	 * A unique identifier that associates the trigger with a content.
	 */
	value: T;
}

export interface TabsReturn<T extends string> {
	/**
	 * Activates tab.
	 */
	activate: (value: T) => void;

	/**
	 * The active tab.
	 */
	active: Readable<T>;

	/**
	 * Action for the tabs root element.
	 */
	useTabs: Action<HTMLElement, TabsParams<T>>;

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
	triggerAttrs: Readable<(params: TabsTriggerParams<T> | T) => Record<string, string>>;

	/**
	 * HTML attributes for the content element.
	 */
	contentAttrs: Readable<(params: TabsContentParams<T> | T) => Record<string, string>>;
}
