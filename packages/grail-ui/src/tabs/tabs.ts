import type { Action } from 'svelte/action';
import type { TabsConfig, TabsReturn, TabItemState } from './tabs.types';
import { derived, get, readable, writable } from 'svelte/store';
import { uniqueId } from '../util/id';
import { listKeyManager } from '../keyManager/listKeyManager';
import { addEventListener } from '../eventListener/eventListener';
import { chain } from '../util/chain';
import { ENTER, SPACE } from '../util/keyboard';
import { toReadable, writableEffect } from '../util/store';

const TABS_ATTRIBUTES = {
	root: 'data-tabs-root',
	list: 'data-tabs-list',
	trigger: 'data-tabs-trigger',
	content: 'data-tabs-content',
};

const getState = (active?: boolean): TabItemState => (active ? 'active' : 'inactive');
const getTriggerId = (baseId: string, value: string) => `${baseId}-trigger-${value}`;
const getContentId = (baseId: string, value: string) => `${baseId}-content-${value}`;

const getTriggers = (node: HTMLElement): HTMLElement[] =>
	Array.from(node.querySelectorAll<HTMLElement>(`[${TABS_ATTRIBUTES.trigger}]`));

export function createTabs<T extends string = string>(config?: TabsConfig<T>): TabsReturn<T> {
	const { orientation, value, activationMode, disabled, onValueChange } = {
		orientation: 'horizontal',
		activationMode: 'automatic',
		disabled: false,
		...config,
	};

	const disabled$ = writable(disabled);
	const baseId = uniqueId('tabs');
	const active$ = writableEffect(value, onValueChange);

	const activate = (value: T) => {
		active$.set(value);
	};

	const useTabs: Action<HTMLElement> = (node) => {
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
			if (trigger && !trigger.dataset.disabled && trigger.dataset.tabsTrigger) {
				activate(trigger.dataset.tabsTrigger as T);
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
			if (activationMode === 'automatic') {
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
			destroy() {
				keyManager.destroy();
				removeEvents();
			},
		};
	};

	const derivedState = function (
		fn: (data: { key: T; disabled: boolean; state: TabItemState }) => Record<string, string>
	) {
		return derived([active$, disabled$], () => {
			return function (key: T) {
				const _disabled = get(disabled$);
				const disabled = Array.isArray(_disabled)
					? _disabled.includes(key)
					: typeof _disabled === 'boolean'
					? _disabled
					: _disabled === key;
				const state = getState(get(active$) === key);

				return fn({ key, disabled, state });
			};
		});
	};

	const rootAttrs = readable({
		[TABS_ATTRIBUTES.root]: '',
	});

	const listAttrs = readable({
		[TABS_ATTRIBUTES.list]: '',
		'aria-orientation': orientation as string,
		role: 'tablist',
	});

	const triggerAttrs = derivedState(({ key, disabled, state }) => ({
		[TABS_ATTRIBUTES.trigger]: key,
		role: 'tab',
		id: getTriggerId(baseId, key),
		'aria-controls': getContentId(baseId, key),
		'aria-selected': `${state === 'active'}`,
		tabindex: state === 'active' ? '0' : '-1',
		...(disabled ? { disabled: 'true', 'data-disabled': 'true' } : {}),
	}));

	const contentAttrs = derivedState(({ key, state }) => ({
		[TABS_ATTRIBUTES.content]: key,
		'data-orientation': orientation as string,
		role: 'tabpanel',
		id: getContentId(baseId, key),
		'aria-labelledby': getTriggerId(baseId, key),
		tabindex: '0',
		...(state === 'inactive' ? { hidden: 'true' } : {}),
	}));

	return {
		active: toReadable(active$),
		disabled: disabled$,
		activate,
		useTabs,
		rootAttrs,
		listAttrs,
		triggerAttrs,
		contentAttrs,
	};
}
