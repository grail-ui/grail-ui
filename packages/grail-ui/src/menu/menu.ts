import type { Action } from 'svelte/action';
import type { MenuConfig, MenuReturn } from './menu.types';
import { tick } from 'svelte';
import { derived, get, readable, writable } from 'svelte/store';
import { addEventListener } from '../eventListener/eventListener.js';
import { usePortal } from '../portal/portal.js';
import { getPlacement } from '../floating/placement.js';
import { useClickOutside } from '../clickOutside/clickOutside.js';
import { listKeyManager } from '../keyManager/listKeyManager.js';
import { chain } from '../util/chain.js';
import { uniqueId } from '../util/id.js';
import { DOWN_ARROW, ENTER, ESCAPE, SPACE, TAB, UP_ARROW } from '../util/keyboard.js';
import { noop } from '../util/noop.js';
import { writableEffect } from '../util/store.js';

const getMenuItems = (parent: HTMLElement) =>
	Array.from(parent.querySelectorAll<HTMLElement>('[role=menuitem]'));

export const createMenu = <T extends string>({
	positioning = {},
	open = false,
	portal = null,
	onOpenChange,
	ariaLabel = 'Menu',
	onSelect,
}: MenuConfig<T> = {}): MenuReturn<T> => {
	const id = uniqueId('menu');
	const getTrigger = () => document.getElementById(id) as HTMLElement | null;

	const open$ = writableEffect(open, async (isOpen) => {
		if (isOpen) {
			await tick();
			get(overlayElement$)?.focus();
		}
		onOpenChange?.(isOpen);
	});

	let cleanup = noop;

	const triggerAttrs = derived(open$, (open) => ({
		id,
		'aria-haspopup': 'true',
		'aria-expanded': `${open}`,
	}));
	const menuAttrs = readable({ role: 'menu', 'aria-label': ariaLabel, tabindex: '-1' });
	const separatorAttrs = readable({
		role: 'separator',
		'aria-orientation': 'horizontal',
		tabindex: '-1',
	});

	const items = writable<HTMLElement[]>([]);
	const skipPredicate = (item: HTMLElement) => 'disabled' in item.dataset;
	const keyManager = listKeyManager({
		items,
		typeahead: true,
		homeAndEnd: true,
		wrap: false,
		vertical: true,
		skipPredicate,
		tabOut: () => hide(),
		onActivate: (item) => item.focus(),
	});

	const itemAttrs = derived(keyManager.activeItem, ($activeItem) => {
		return function (attrs: T | { id: T; label: string }) {
			const { id: _id, label } = typeof attrs === 'string' ? { id: attrs, label: attrs } : attrs;
			const itemId = `${id}_item_${_id}`;

			return {
				role: 'menuitem',
				id: itemId,
				tabindex: $activeItem?.id === itemId ? '0' : '-1',
				'data-item-id': _id,
				'data-label': label,
			};
		};
	});

	async function setupPlacement(triggerElement: HTMLElement, overlayElement: HTMLElement) {
		cleanup();
		cleanup = getPlacement(triggerElement, overlayElement, {
			placement: 'bottom',
			...positioning,
		});
	}

	const overlayElement$ = writable<HTMLElement | null>(null);

	const useTrigger: Action<HTMLElement, void> = (element) => {
		async function openMenuWithArrow(e: KeyboardEvent) {
			e.preventDefault();
			open$.set(true);
			await tick();
			e.key === DOWN_ARROW ? keyManager.setFirstItemActive() : keyManager.setLastItemActive();
		}

		const handleKeyDown = async (e: KeyboardEvent) => {
			switch (e.key) {
				case SPACE:
				case ENTER:
					e.preventDefault();
					toggle();
					break;

				case ESCAPE:
					e.preventDefault();
					hide(false);
					break;

				case TAB:
					hide(false);
					break;

				case DOWN_ARROW:
				case UP_ARROW:
					openMenuWithArrow(e);
					break;
			}
		};

		const removeEvents = chain(
			addEventListener(element, 'click', toggle),
			addEventListener(element, 'keydown', handleKeyDown)
		);

		const unsubscribe = derived([open$, overlayElement$], (values) => values).subscribe(
			([$open, $overlayElement]) => {
				if ($open && $overlayElement) {
					setupPlacement(element, $overlayElement);

					items.set(getMenuItems($overlayElement));
				} else {
					keyManager.setActiveItem(-1);
					cleanup();
				}
			}
		);

		return {
			destroy() {
				keyManager.destroy();
				cleanup();
				removeEvents();
				unsubscribe();
				hide();
			},
		};
	};

	function handleSelectFromEvent(event: PointerEvent | KeyboardEvent) {
		if (!onSelect) return;

		const { target } = event;
		const menuItem = target instanceof Element && target.closest('[role=menuitem]');
		if (menuItem instanceof HTMLElement) {
			event.preventDefault();
			if (!skipPredicate(menuItem)) {
				const shouldClose = onSelect(menuItem.getAttribute('data-item-id') as T);
				if (shouldClose !== false) {
					hide(true);
				}
			}
		}
	}

	const useMenu: Action<HTMLElement, void> = (element) => {
		const portalAction = portal ? usePortal(element, { target: portal }) : undefined;
		overlayElement$.set(element);

		const clickOutsideAction = useClickOutside(element, {
			enabled: open$,
			handler: (e: PointerEvent) => {
				if (!e.defaultPrevented && !(e.target as Element).closest(`#${id}`)) {
					hide();
				}
			},
		});

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === ESCAPE) {
				hide(true);
				return;
			} else if (event.key === ENTER) {
				handleSelectFromEvent(event);
			}

			keyManager.onKeydown(event);
		};

		const handleClick = (event: PointerEvent) => {
			handleSelectFromEvent(event);
		};

		const removeEvents = chain(
			addEventListener(element, 'keydown', handleKeyDown),
			addEventListener(element, 'click', handleClick),
			addEventListener(element, 'pointerover', (e) => {
				const target = e.target;
				if (target instanceof Element && target.getAttribute('role') === 'menuitem') {
					keyManager.setActiveItem(e.target as HTMLElement);
				}
			})
		);

		return {
			destroy() {
				removeEvents();
				clickOutsideAction?.destroy?.();
				portalAction?.destroy?.();
				overlayElement$.set(null);
			},
		};
	};

	const hide = (returnFocus = false) => {
		open$.set(false);
		if (returnFocus) {
			getTrigger()?.focus();
		}
	};
	const toggle = () => {
		open$.update((value) => !value);
	};

	return {
		useTrigger,
		triggerAttrs,
		useMenu,
		menuAttrs,
		itemAttrs,
		separatorAttrs,
		open: open$,
	};
};
