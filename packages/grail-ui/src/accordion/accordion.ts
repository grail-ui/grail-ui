import type { Action } from 'svelte/action';
import type { AccordionConfig, AccordionReturn, AccordionItemState } from './accordion.types';
import { derived, get, writable } from 'svelte/store';
import { uniqueId } from '../util/id.js';
import { listKeyManager } from '../keyManager/listKeyManager.js';
import { selectionModel } from '../collections/selectionModel.js';
import { chain } from '../util/chain.js';
import { addEventListener } from '../eventListener/eventListener.js';
import { ENTER, SPACE } from '../util/keyboard.js';

const ACCORDION_ATTRIBUTES = {
	item: 'data-accordion-item',
	trigger: 'data-accordion-trigger',
	content: 'data-accordion-content',
};

const getState = (open?: boolean): AccordionItemState => (open ? 'open' : 'closed');
const getTriggerId = (baseId: string, value: string) => `${baseId}-trigger-${value}`;
const getContentId = (baseId: string, value: string) => `${baseId}-content-${value}`;

const getTriggers = (node: HTMLElement): HTMLElement[] =>
	Array.from(node.querySelectorAll<HTMLElement>(`[${ACCORDION_ATTRIBUTES.item}]`))
		.flatMap((item) =>
			Array.from(item.querySelectorAll<HTMLElement>(`[${ACCORDION_ATTRIBUTES.trigger}]`))
		)
		.filter(Boolean);

export function createAccordion<T extends string = string>(
	config?: AccordionConfig<T>
): AccordionReturn<T> {
	const { multiple, value, onValueChange, disabled } = {
		disabled: false,
		multiple: false,
		...config,
	};

	const disabled$ = writable(disabled);
	const baseId = uniqueId('accordion');
	const initiallyExpandedKeys = value !== undefined ? (Array.isArray(value) ? value : [value]) : [];
	const { changed, toggle, select, deselect, clear } = selectionModel<Partial<T>>({
		multiple: multiple as boolean,
		initiallySelectedValues: initiallyExpandedKeys,
	});

	const expanded$ = derived(changed, ($changed) => $changed.selection, new Set<Partial<T>>());

	function toggleTrigger(trigger: HTMLElement | undefined) {
		if (trigger && !trigger.dataset.disabled && trigger.dataset.accordionTrigger) {
			toggle(trigger.dataset.accordionTrigger as T);
		}
	}

	let rootNode: HTMLElement | undefined;

	const useAccordion: Action<HTMLElement, void> = (node) => {
		rootNode = node;

		const items = writable<HTMLElement[]>([]);
		const keyManager = listKeyManager({
			items,
			homeAndEnd: true,
			wrap: true,
			skipPredicate: (item) => 'disabled' in item.dataset,
			onActivate: (item) => item.focus(),
		});

		function getTrigger(event: Event) {
			const path = event.composedPath();
			const node = path.find(
				(el) => el instanceof HTMLElement && el.hasAttribute(ACCORDION_ATTRIBUTES.trigger)
			);
			return node as HTMLElement | undefined;
		}

		const handleKeyDown = (event: KeyboardEvent) => {
			const trigger = getTrigger(event);
			if (!trigger) return;

			if ([SPACE, ENTER].includes(event.key)) {
				event.preventDefault();
				toggleTrigger(trigger);
				return;
			}

			const triggerCollection = getTriggers(node);
			items.set(triggerCollection);
			keyManager.setActiveItem(triggerCollection.indexOf(trigger));
			keyManager.onKeydown(event);
		};

		const handleClick = (event: MouseEvent) => {
			toggleTrigger(getTrigger(event));
		};

		const removeEvents = chain(
			addEventListener(node, 'keydown', handleKeyDown),
			addEventListener(node, 'click', handleClick)
		);

		const unsubscribe = expanded$.subscribe((expanded) => {
			const keys = [...expanded];
			onValueChange?.(multiple ? keys : keys[0]);
		});

		return {
			destroy() {
				rootNode = undefined;
				keyManager.destroy();
				removeEvents();
				unsubscribe();
			},
		};
	};

	const derivedState = function (
		fn: (data: { key: T; disabled: boolean; state: AccordionItemState }) => Record<string, string>
	) {
		return derived([expanded$, disabled$], () => {
			return function (key: T) {
				const _disabled = get(disabled$);
				const disabled = Array.isArray(_disabled)
					? _disabled.includes(key)
					: typeof _disabled === 'boolean'
					? _disabled
					: _disabled === key;
				const state = getState(get(expanded$).has(key));

				return fn({ key, disabled, state });
			};
		});
	};

	const itemAttrs = derivedState(({ key }) => ({
		[ACCORDION_ATTRIBUTES.item]: key,
	}));

	const triggerAttrs = derivedState(({ key, disabled, state }) => ({
		[ACCORDION_ATTRIBUTES.trigger]: key,
		id: getTriggerId(baseId, key),
		'aria-controls': getContentId(baseId, key),
		'aria-expanded': `${state === 'open'}`,
		...(disabled ? { disabled: 'true', 'data-disabled': 'true' } : {}),
	}));

	const contentAttrs = derivedState(({ key, state }) => ({
		[ACCORDION_ATTRIBUTES.content]: key,
		role: 'region',
		id: getContentId(baseId, key),
		'aria-labelledby': getTriggerId(baseId, key),
		...(state === 'closed' ? { inert: 'true' } : {}),
	}));

	const expand = (...keys: Partial<T>[]) => {
		select(...keys);
	};

	const collapse = (...keys: Partial<T>[]) => {
		deselect(...keys);
	};

	const expandAll = () => {
		if (rootNode) {
			const keys = getTriggers(rootNode).map((trigger) => trigger.dataset.accordionTrigger as T);
			select(...keys);
		}
	};

	const collapseAll = () => {
		clear();
	};

	return {
		expanded: expanded$,
		disabled: disabled$,
		toggle,
		expand,
		collapse,
		expandAll,
		collapseAll,
		useAccordion,
		itemAttrs,
		triggerAttrs,
		contentAttrs,
	};
}
