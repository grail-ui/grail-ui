import type { Action } from 'svelte/action';
import type { Readable } from 'svelte/store';

export interface TabsConfig {
	/**
	 * Initial value (controls active state of tabs).
	 */
	defaultValue?: string;

	/**
	 * Event handler called when the active state of the tabs changes.
	 */
	onValueChange?: (value: string) => void;

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

export type TabsParams = Pick<TabsConfig, 'activationMode'>;

export interface TabsTriggerParams {
	/**
	 * A unique identifier that associates the trigger with a content.
	 */
	value: string;

	/**
	 * Prevents the user from interacting with the tab.
	 *
	 * @defaultValue `false`
	 */
	disabled?: boolean;
}

export interface TabsContentParams {
	/**
	 * A unique identifier that associates the trigger with a content.
	 */
	value: string;
}

export interface TabsReturn {
	/**
	 * Activates tab.
	 */
	activate: (value: string) => void;

	/**
	 * The active tab.
	 */
	active: Readable<string>;

	/**
	 * Action for the tabs root element.
	 */
	useTabs: Action<HTMLElement, TabsParams>;

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
	triggerAttrs: Readable<(params: TabsTriggerParams | string) => Record<string, string>>;

	/**
	 * HTML attributes for the content element.
	 */
	contentAttrs: Readable<(params: TabsContentParams | string) => Record<string, string>>;
}
