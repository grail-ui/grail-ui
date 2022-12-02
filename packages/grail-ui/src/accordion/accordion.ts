import type { Action } from 'svelte/action';
import type {
	AccordionConfig,
	AccordionReturn,
	AccordionParams,
	AccordionItemState,
	AccordionItemParams,
	AccordionMultipleConfig,
	AccordionSingleConfig,
} from './accordion.types';
import { derived, get, writable, type Writable } from 'svelte/store';
import { uniqueId } from '../util/id';
import { listKeyManager } from '../keyManager/listKeyManager';
import { selectionModel } from '../collections/selectionModel';
import { chain } from '../util/chain';
import { addEventListener } from '../eventListener/eventListener';
import { ENTER, SPACE } from '../util/keyboard';

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

export function createAccordion(initConfig?: AccordionConfig): AccordionReturn {
	const defaultConfig: AccordionConfig = {
		disabled: false,
		type: 'single',
	};

	const { type, defaultValue, onValueChange, ...rest } = { ...defaultConfig, ...initConfig };
	const config$: Writable<AccordionParams> = writable(rest);
	const baseId = uniqueId('accordion');
	const initiallyExpandedValues =
		defaultValue !== undefined ? (Array.isArray(defaultValue) ? defaultValue : [defaultValue]) : [];
	const { changed, toggle, select, deselect, clear } = selectionModel({
		multiple: type === 'multiple',
		initiallySelectedValues: initiallyExpandedValues,
	});

	const expanded$ = derived(changed, ($changed) => $changed.selection, new Set<string>());

	function toggleTrigger(trigger: HTMLElement | undefined) {
		if (trigger && !trigger.dataset.disabled && trigger.dataset.value) {
			toggle(trigger.dataset.value);
		}
	}

	let rootNode: HTMLElement | undefined;

	const useAccordion: Action<HTMLElement, AccordionParams> = (node, initParams) => {
		rootNode = node;
		config$.update((config) => ({ ...config, ...initParams }));

		const items = writable<HTMLElement[]>([]);
		const keyManager = listKeyManager({
			items,
			homeAndEnd: true,
			wrap: true,
			skipPredicate: (item) => 'disabled' in item.dataset,
			onActivate: (item) => item.focus(),
		});

		function getTrigger(event: Event, collection = getTriggers(node)): HTMLElement | undefined {
			const node = event.target as HTMLElement & { dataset: { value: string } };
			return node.hasAttribute(ACCORDION_ATTRIBUTES.trigger)
				? collection.find((item) => item === node)
				: undefined;
		}

		const handleKeyDown = (event: KeyboardEvent) => {
			const triggerCollection = getTriggers(node);
			const trigger = getTrigger(event, triggerCollection);
			if (!trigger) return;

			if ([SPACE, ENTER].includes(event.key)) {
				event.preventDefault();
				toggleTrigger(trigger);
				return;
			}

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
			const values = [...expanded];

			if (type === 'multiple') {
				(onValueChange as AccordionMultipleConfig['onValueChange'])?.(values);
			} else {
				(onValueChange as AccordionSingleConfig['onValueChange'])?.(values[0]);
			}
		});

		return {
			update(newParams: AccordionParams) {
				config$.update((config) => ({ ...config, ...newParams }));
			},
			destroy() {
				rootNode = undefined;
				keyManager.destroy();
				removeEvents();
				unsubscribe();
			},
		};
	};

	const derivedState = function (
		fn: (data: {
			value: string;
			disabled: boolean;
			state: AccordionItemState;
		}) => Record<string, string>
	) {
		return derived([expanded$, config$], () => {
			return function (params: AccordionItemParams | string) {
				const value = typeof params === 'string' ? params : params.value;
				const disabled = !!(
					get(config$).disabled || (typeof params === 'string' ? false : params.disabled)
				);
				const state = getState(get(expanded$).has(value));

				return fn({ value, disabled, state });
			};
		});
	};

	const itemAttrs = derivedState(({ value, disabled, state }) => {
		return {
			[ACCORDION_ATTRIBUTES.item]: value,
			'data-state': state,
			'data-value': value,
			...(disabled ? { 'data-disabled': '', disabled: 'true' } : {}),
		};
	});

	const triggerAttrs = derivedState(({ value, disabled, state }) => {
		return {
			[ACCORDION_ATTRIBUTES.trigger]: value,
			'data-state': state,
			'data-value': value,
			id: getTriggerId(baseId, value),
			'aria-controls': getContentId(baseId, value),
			'aria-expanded': `${state === 'open'}`,
			...(disabled ? { 'data-disabled': '', disabled: 'true' } : {}),
		};
	});

	const contentAttrs = derivedState(({ value, disabled, state }) => {
		return {
			[ACCORDION_ATTRIBUTES.content]: value,
			'data-state': state,
			'data-value': value,
			role: 'region',
			id: getContentId(baseId, value),
			'aria-labelledby': getTriggerId(baseId, value),
			...(disabled ? { 'data-disabled': '' } : {}),
			...(state === 'closed' ? { inert: 'true' } : {}),
		};
	});

	const expand = (...values: string[]) => {
		select(...values);
	};

	const collapse = (...values: string[]) => {
		deselect(...values);
	};

	const expandAll = () => {
		if (rootNode) {
			getTriggers(rootNode).forEach(toggleTrigger);
		}
	};

	const collapseAll = () => {
		clear();
	};

	return {
		expanded: expanded$,
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
