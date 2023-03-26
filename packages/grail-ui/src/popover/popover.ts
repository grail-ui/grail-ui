import type { Action } from 'svelte/action';
import type { PopoverConfig, PopoverReturn } from './popover.types';
import { derived, readable, writable } from 'svelte/store';
import { usePortal } from '../portal/portal.js';
import { addEventListener } from '../eventListener/eventListener.js';
import { getPlacement, arrowAttrs } from '../floating/placement.js';
import { createFocusTrap } from '../focusTrap/focusTrap.js';
import { useClickOutside } from '../clickOutside/clickOutside.js';
import { chain } from '../util/chain.js';
import { uniqueId } from '../util/id.js';
import { ESCAPE } from '../util/keyboard.js';
import { noop } from '../util/noop.js';
import { writableEffect } from '../util/store.js';

export const createPopover = ({
	positioning = {},
	open = false,
	portal = 'body',
	onOpenChange,
}: PopoverConfig = {}): PopoverReturn => {
	const id = uniqueId('popover');

	const open$ = writableEffect(open, onOpenChange);

	const referenceEl = writable<HTMLElement | undefined>(undefined);

	let cleanup = noop;

	const triggerAttrs = derived(open$, (open) => ({
		'aria-haspopup': 'dialog',
		'aria-expanded': `${open}`,
		'aria-controls': id,
	}));
	const popoverAttrs = readable({ id: id, role: 'dialog', tabindex: '-1' });
	const closeId = `${id}-close`;
	const closeButtonAttrs = readable({ id: closeId });

	function setupPlacement(triggerElement: HTMLElement, overlayElement: HTMLElement) {
		cleanup();
		cleanup = getPlacement(triggerElement, overlayElement, positioning);
	}

	const overlayElement$ = writable<HTMLElement | null>(null);

	const usePopoverTrigger: Action<HTMLElement, void> = (element) => {
		const removeEvents = chain(addEventListener(element, 'click', toggle));

		const unsubscribe = derived(
			[open$, overlayElement$, referenceEl],
			(values) => values
		).subscribe(([$open, $overlayElement, $referenceEl]) => {
			if ($open && $overlayElement) {
				setupPlacement($referenceEl || element, $overlayElement);
			} else {
				cleanup();
			}
		});

		return {
			destroy() {
				cleanup();
				removeEvents();
				unsubscribe();
				hide();
			},
		};
	};

	const usePopover: Action<HTMLElement, void> = (element) => {
		const portalAction = portal ? usePortal(element, { target: portal }) : undefined;
		overlayElement$.set(element);

		const { activate, deactivate, useFocusTrap } = createFocusTrap({
			immediate: false,
			escapeDeactivates: false,
			allowOutsideClick: true,
			returnFocusOnDeactivate: false,
			fallbackFocus: element,
		});
		const focusTrapAction = useFocusTrap(element);

		const clickOutsideAction = useClickOutside(element, {
			enabled: open$,
			handler: (e: PointerEvent) => {
				if (e.defaultPrevented) return;

				const target = e.target as Element;
				const trigger =
					target.getAttribute('aria-controls') === element.id
						? target
						: document.querySelector(`[aria-controls="${element.id}"]`);
				if (!trigger?.contains(e.target as Element)) {
					hide();
				}
			},
		});

		const unsubscribeOpen = open$.subscribe(($open) => ($open ? activate() : deactivate()));

		const removeEvents = chain(
			addEventListener(element, `keydown`, (e: KeyboardEvent) => {
				if (!e.defaultPrevented && e.key === ESCAPE) {
					hide(true);
				}
			}),
			addEventListener(element, 'click', async (e: MouseEvent) => {
				if (e.defaultPrevented || !(e.target instanceof Element)) return;
				if (e.target.id === closeId || element.querySelector(`#${closeId}`)?.contains(e.target)) {
					hide(true);
				}
			})
		);

		return {
			destroy() {
				removeEvents();
				unsubscribeOpen();
				focusTrapAction?.destroy?.();
				clickOutsideAction?.destroy?.();
				portalAction?.destroy?.();
				overlayElement$.set(null);
			},
		};
	};

	const hide = (returnFocus = false) => {
		open$.set(false);
		if (returnFocus) {
			(document.querySelector(`[aria-controls="${id}"]`) as HTMLElement | null)?.focus();
		}
	};
	const toggle = () => {
		open$.update((value) => !value);
	};

	return {
		usePopoverTrigger,
		triggerAttrs,
		usePopover,
		popoverAttrs,
		closeButtonAttrs,
		arrowAttrs: arrowAttrs(),
		open: open$,
		referenceEl,
	};
};
