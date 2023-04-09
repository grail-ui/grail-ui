import type { ModalConfig, ModalReturn } from './modal.types';
import { derived, get, readable, writable } from 'svelte/store';
import { tick } from 'svelte';
import { uniqueId } from '../util/id.js';
import { createFocusTrap } from '../focusTrap/focusTrap.js';
import { usePortal } from '../portal/portal.js';
import { ESCAPE } from '../util/keyboard.js';
import { useClickOutside } from '../clickOutside/clickOutside.js';
import { writableEffect } from '../util/store.js';
import { addEventListener } from '../eventListener/eventListener.js';

const modalState: Record<string, Pick<ModalReturn, 'open' | 'triggerAttrs'>> = {};

export const createModal = ({
	id = uniqueId('modal'),
	open = true,
	portal = 'body',
	onOpenChange,
	dismissible = false,
	keyboardDismissible = true,
	onInteractOutside,
	initialFocus,
}: ModalConfig = {}): ModalReturn => {
	const titleId = `${id}-title`;

	const open$ = writableEffect(open, onOpenChange);
	const dismissible$ = writable(dismissible);
	const keyboardDismissible$ = writable(keyboardDismissible);

	const modalAttrs = readable({
		id,
		role: 'dialog',
		tabindex: '-1',
		'aria-modal': 'true',
		'aria-labelledby': titleId,
	});

	const useModal = (node: HTMLElement) => {
		const contentEl = node.id === id ? node : (node.querySelector(`#${id}`) as HTMLElement);

		const removeEvent = addEventListener(contentEl, `keydown`, (e: KeyboardEvent) => {
			if (e.key === ESCAPE && get(keyboardDismissible$)) {
				e.preventDefault();
				open$.set(false);
			}
		});

		const portalAction = portal ? usePortal(node, { target: portal }) : undefined;

		const clickOutsideAction = useClickOutside(contentEl, {
			enabled: derived([open$, dismissible$], ([$open, $dismissible]) => $open && $dismissible),
			handler: (e: PointerEvent) => {
				onInteractOutside?.(e);
				if (!e.defaultPrevented) {
					open$.set(false);
				}
			},
		});

		const { activate, deactivate, useFocusTrap } = createFocusTrap({
			immediate: false,
			escapeDeactivates: false,
			fallbackFocus: contentEl,
			...(initialFocus ? { initialFocus } : null),
		});
		const focusTrapAction = useFocusTrap(contentEl);

		const unsubscribe = open$.subscribe(async (value) => {
			if (value) {
				// Delay activating trap, for DOM structure to settle
				await tick();
				setTimeout(async () => activate(), 50);
			} else {
				deactivate();
			}
		});

		return {
			destroy() {
				delete modalState[id];
				focusTrapAction?.destroy?.();
				portalAction?.destroy?.();
				clickOutsideAction?.destroy?.();
				removeEvent();
				unsubscribe();
			},
		};
	};

	const titleAttrs = readable({
		id: titleId,
	});

	const triggerAttrs = derived(open$, (open) => ({
		'aria-haspopup': 'dialog',
		'aria-controls': id,
		'aria-expanded': `${open}`,
	}));

	modalState[id] = { open: open$, triggerAttrs };

	return {
		useModal,
		modalAttrs,
		titleAttrs,
		triggerAttrs,
		open: open$,
		dismissible: dismissible$,
		keyboardDismissible: keyboardDismissible$,
	};
};

export function getModalTrigger(id: string) {
	return modalState[id];
}
