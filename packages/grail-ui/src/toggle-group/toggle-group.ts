import type { Action } from 'svelte/action';
import type { ToggleGroupConfig, ToggleGroupReturn, ToggleItemState } from './toggle-group.types';
import { derived, get, readable, writable } from 'svelte/store';
import { listKeyManager } from '../keyManager/listKeyManager.js';
import { selectionModel } from '../collections/selectionModel.js';
import { chain } from '../util/chain.js';
import { addEventListener } from '../eventListener/eventListener.js';
import { ENTER, SPACE } from '../util/keyboard.js';

const TOGGLE_GROUP_ATTRIBUTES = {
	root: 'data-toggle-group-root',
	item: 'data-toggle-group-item',
};

const getState = (pressed?: boolean): ToggleItemState => (pressed ? 'on' : 'off');

const getItems = (node: HTMLElement): HTMLElement[] =>
	Array.from(node.querySelectorAll<HTMLElement>(`[${TOGGLE_GROUP_ATTRIBUTES.item}]`));

const getItem = (event: Event): HTMLElement | undefined => {
	const path = event.composedPath();
	const node = path.find((element) =>
		(element as HTMLElement).hasAttribute(TOGGLE_GROUP_ATTRIBUTES.item)
	);
	return node as HTMLElement;
};

export function createToggleGroup<T extends string = string>(
	config?: ToggleGroupConfig<T>
): ToggleGroupReturn<T> {
	const { orientation, multiple, value, disabled, onValueChange } = {
		orientation: 'horizontal',
		disabled: false,
		multiple: false,
		...config,
	};

	const disabled$ = writable(disabled);
	const initiallyPressedKeys = value !== undefined ? (Array.isArray(value) ? value : [value]) : [];
	const { changed, toggle, select, deselect } = selectionModel<Partial<T>>({
		multiple: multiple as boolean,
		initiallySelectedValues: initiallyPressedKeys,
	});

	const pressed$ = derived(changed, ($changed) => $changed.selection, new Set<Partial<T>>());

	function toggleItem(item: HTMLElement | undefined) {
		if (item && !item.dataset.disabled && item.dataset.toggleGroupItem) {
			toggle(item.dataset.toggleGroupItem as T);
		}
	}

	const useToggleGroup: Action<HTMLElement> = (node) => {
		const items = writable<HTMLElement[]>([]);
		const keyManager = listKeyManager({
			items,
			homeAndEnd: true,
			wrap: true,
			horizontal: orientation === 'horizontal' ? 'ltr' : undefined,
			vertical: orientation === 'vertical',
			skipPredicate: (item) => 'disabled' in item.dataset,
			onActivate: (item) => item.focus(),
		});

		const handleKeyDown = (event: KeyboardEvent) => {
			const itemCollection = getItems(node);
			const item = getItem(event);

			if (!item) return;

			if ([SPACE, ENTER].includes(event.key)) {
				event.preventDefault();
				toggleItem(item);
				return;
			}

			items.set(itemCollection);
			keyManager.setActiveItem(itemCollection.indexOf(item));
			keyManager.onKeydown(event);
		};

		const handleClick = (event: MouseEvent) => {
			toggleItem(getItem(event));
		};

		const removeEvents = chain(
			addEventListener(node, 'keydown', handleKeyDown),
			addEventListener(node, 'click', handleClick)
		);

		const unsubscribe = pressed$.subscribe((pressed) => {
			const keys = [...pressed];
			onValueChange?.(multiple ? keys : keys[0]);
		});

		return {
			destroy() {
				keyManager.destroy();
				removeEvents();
				unsubscribe();
			},
		};
	};

	const derivedState = function (
		fn: (data: { key: T; disabled: boolean; state: ToggleItemState }) => Record<string, string>
	) {
		return derived([pressed$, disabled$], () => {
			return function (key: T) {
				const _disabled = get(disabled$);
				const disabled = Array.isArray(_disabled)
					? _disabled.includes(key)
					: typeof _disabled === 'boolean'
					? _disabled
					: _disabled === key;
				const state = getState(get(pressed$).has(key));

				return fn({ key, disabled, state });
			};
		});
	};

	const rootAttrs = readable({
		[TOGGLE_GROUP_ATTRIBUTES.root]: '',
		role: 'group',
	});

	const itemAttrs = derivedState(({ key, disabled, state }) => ({
		[TOGGLE_GROUP_ATTRIBUTES.item]: key,
		type: 'button',
		// TODO: if none is on, make the first one focusable instead
		tabindex: state === 'on' ? '0' : '-1',
		...(multiple
			? { 'aria-pressed': `${state === 'on'}` }
			: {
					role: 'radio',
					'aria-checked': `${state === 'on'}`,
			  }),
		...(disabled ? { disabled: 'true', 'data-disabled': '' } : {}),
	}));

	const press = (...keys: Partial<T>[]) => {
		select(...keys);
	};

	const unpress = (...keys: Partial<T>[]) => {
		deselect(...keys);
	};

	return {
		pressed: pressed$,
		disabled: disabled$,
		toggle,
		press,
		unpress,
		useToggleGroup,
		rootAttrs,
		itemAttrs,
	};
}
