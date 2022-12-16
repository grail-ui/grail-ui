import type { Action } from 'svelte/action';
import type {
	TabsConfig,
	TabsReturn,
	TabsTriggerParams,
	TabsContentParams,
	TabsParams,
} from './tabs.types';
import { derived, get, readable, writable, type Writable } from 'svelte/store';
import { uniqueId } from '../util/id';
import { listKeyManager } from '../keyManager/listKeyManager';
import { addEventListener } from '../eventListener/eventListener';
import { chain } from '../util/chain';
import { ENTER, SPACE } from '../util/keyboard';
import { writableEffect } from '../util/store';

const TABS_ATTRIBUTES = {
	root: 'data-tabs-root',
	list: 'data-tabs-list',
	trigger: 'data-tabs-trigger',
	content: 'data-tabs-content',
};

const getState = (active?: boolean) => (active ? 'active' : 'inactive');
const getTriggerId = (baseId: string, value: string) => `${baseId}-trigger-${value}`;
const getContentId = (baseId: string, value: string) => `${baseId}-content-${value}`;

const getTriggers = (node: HTMLElement): HTMLElement[] =>
	Array.from(node.querySelectorAll<HTMLElement>(`[${TABS_ATTRIBUTES.trigger}]`));

export function createTabs<T extends string>(initConfig?: TabsConfig<T>): TabsReturn<T> {
	const defaultConfig: TabsConfig = {
		orientation: 'horizontal',
		activationMode: 'automatic',
	};

	const { orientation, defaultValue, onValueChange, ...rest } = {
		...defaultConfig,
		...initConfig,
	} as Required<TabsConfig<T>>;
	const config$: Writable<TabsParams<T>> = writable(rest);
	const active$ = writableEffect<T>(defaultValue, onValueChange);

	const baseId = uniqueId('tabs');

	const activate = (value: T) => {
		active$.set(value);
	};

	const useTabs: Action<HTMLElement, TabsParams<T>> = (node, initParams) => {
		config$.update((config) => ({ ...config, ...initParams }));

		const items = writable<HTMLElement[]>(getTriggers(node));
		const keyManager = listKeyManager({
			items,
			homeAndEnd: true,
			wrap: true,
			horizontal: orientation === 'horizontal' ? 'ltr' : undefined,
			vertical: orientation === 'vertical',
			skipPredicate: (item) => 'disabled' in item.dataset,
			onActivate: (item) => item.focus(),
		});

		function getTrigger(event: Event, collection = getTriggers(node)): HTMLElement | undefined {
			const node = event.target as HTMLElement & { dataset: { value: string } };
			return node.hasAttribute(TABS_ATTRIBUTES.trigger)
				? collection.find((item) => item === node)
				: undefined;
		}

		function activateTrigger(trigger: HTMLElement | undefined) {
			if (trigger && !trigger.dataset.disabled && trigger.dataset.value) {
				activate(trigger.dataset.value as T);
			}
		}

		const handleKeyDown = (event: KeyboardEvent) => {
			const triggerCollection = getTriggers(node);
			const trigger = getTrigger(event, triggerCollection);
			if (!trigger) return;

			if ([SPACE, ENTER].includes(event.key)) {
				event.preventDefault();
				activateTrigger(trigger);
				return;
			}

			items.set(triggerCollection);
			keyManager.setActiveItem(triggerCollection.indexOf(trigger));
			keyManager.currentActiveItem?.focus();
			keyManager.onKeydown(event);
		};

		const handleFocusIn = (event: FocusEvent) => {
			if (get(config$).activationMode === 'automatic') {
				activateTrigger(getTrigger(event));
			}
		};

		const handleClick = (event: MouseEvent) => {
			activateTrigger(getTrigger(event));
		};

		const removeEvents = chain(
			addEventListener(node, 'keydown', handleKeyDown),
			addEventListener(node, 'focusin', handleFocusIn),
			addEventListener(node, 'click', handleClick)
		);

		return {
			update(newParams) {
				config$.update((config) => ({ ...config, ...newParams }));
			},
			destroy() {
				keyManager.destroy();
				removeEvents();
			},
		};
	};

	const rootAttrs = readable({
		[TABS_ATTRIBUTES.root]: '',
		'data-orientation': orientation,
	});

	const listAttrs = readable({
		[TABS_ATTRIBUTES.list]: '',
		'aria-orientation': orientation,
		'data-orientation': orientation,
		role: 'tablist',
	});

	const triggerAttrs = derived(active$, () => {
		return function (initParams: TabsTriggerParams<T> | T) {
			if (typeof initParams === 'string') {
				initParams = { value: initParams as T };
			}
			const { value, disabled } = { disabled: false, ...initParams };

			if (!get(active$)) {
				active$.set(value);
			}

			const state = getState(get(active$) === value);

			return {
				[TABS_ATTRIBUTES.trigger]: '',
				'data-orientation': orientation,
				'data-state': state,
				'data-value': value,
				role: 'tab',
				id: getTriggerId(baseId, value),
				'aria-controls': getContentId(baseId, value),
				'aria-selected': `${state === 'active'}`,
				tabindex: state === 'active' ? '0' : '-1',
				...(disabled ? { 'data-disabled': '', disabled: 'true' } : {}),
			};
		};
	});

	const contentAttrs = derived(active$, () => {
		return function (initParams: TabsContentParams<T> | T) {
			if (typeof initParams === 'string') {
				initParams = { value: initParams as T };
			}
			const { value } = initParams;
			const state = getState(get(active$) === value);

			return {
				[TABS_ATTRIBUTES.content]: value,
				'data-orientation': orientation,
				'data-state': state,
				'data-value': value,
				role: 'tabpanel',
				id: getContentId(baseId, value),
				'aria-labelledby': getTriggerId(baseId, value),
				tabindex: '0',
				...(state === 'inactive' ? { hidden: 'true' } : {}),
			};
		};
	});

	return {
		active: { subscribe: active$.subscribe },
		activate,
		useTabs,
		rootAttrs,
		listAttrs,
		triggerAttrs,
		contentAttrs,
	};
}
