import type { Action } from 'svelte/action';
import type { HoverCardConfig, HoverCardReturn } from './hoverCard.types';
import { derived, readable, writable } from 'svelte/store';
import { usePortal } from '../portal/portal.js';
import { addEventListener } from '../eventListener/eventListener.js';
import { getPlacement, arrowAttrs } from '../floating/placement.js';
import { createTimeout } from '../timeout/timeout.js';
import { chain } from '../util/chain.js';
import { uniqueId } from '../util/id.js';
import { ESCAPE } from '../util/keyboard.js';
import { writableEffect } from '../util/store.js';
import { noop } from '../util/noop.js';

export const createHoverCard = ({
	positioning = {},
	open = false,
	openDelay = 700,
	closeDelay = 300,
	portal = 'body',
	onOpenChange,
}: HoverCardConfig = {}): HoverCardReturn => {
	const open$ = writableEffect(open, onOpenChange);

	let cleanup = noop;

	function init(triggerElement: HTMLElement, overlayElement: HTMLElement) {
		cleanup();
		cleanup = getPlacement(triggerElement, overlayElement, positioning);
	}

	const {
		start: startShowTimer,
		stop: stopShowTimer,
		delay: delayShowTimer,
	} = createTimeout(() => open$.set(true), 0, { immediate: false });

	const { start: startHideTimer, stop: stopHideTimer } = createTimeout(
		() => open$.set(false),
		closeDelay,
		{
			immediate: false,
		}
	);

	const overlayElement$ = writable<HTMLElement | null>(null);

	const useHoverCardTrigger: Action<HTMLElement, void> = (element) => {
		const removeEvents = chain(
			addEventListener(element, 'focus', () => show()),
			addEventListener(element, 'blur', hide),
			addEventListener(element, 'pointerenter', (event: PointerEvent) => {
				if (event.pointerType === 'touch') return;
				show();
			}),
			addEventListener(element, 'pointerleave', (event: PointerEvent) => {
				if (event.pointerType === 'touch') return;
				hide();
			}),
			addEventListener(element, 'touchstart', (event: TouchEvent) => event.preventDefault())
		);

		const unsubscribe = derived([open$, overlayElement$], (values) => values).subscribe(
			([$open, $overlayElement]) => {
				if ($open && $overlayElement) {
					init(element, $overlayElement);
				} else {
					cleanup();
				}
			}
		);

		return {
			destroy() {
				cleanup();
				removeEvents();
				unsubscribe();
				hide();
			},
		};
	};

	const useHoverCard: Action<HTMLElement, void> = (element) => {
		const portalAction = portal ? usePortal(element, { target: portal }) : undefined;
		overlayElement$.set(element);

		const removeEvents = chain(
			addEventListener(element, 'pointerenter', () => show()),
			addEventListener(element, 'pointerleave', hide),
			addEventListener(document, 'keydown', (e: KeyboardEvent) => {
				if (!e.defaultPrevented && e.key === ESCAPE) {
					e.preventDefault();
					hide();
				}
			})
		);

		return {
			destroy() {
				removeEvents();
				portalAction?.destroy?.();
				overlayElement$.set(null);
			},
		};
	};

	const show = (delay = openDelay) => {
		stopHideTimer();
		delayShowTimer.set(delay);
		startShowTimer();
	};
	const hide = () => {
		stopShowTimer();
		startHideTimer();
	};

	return {
		useHoverCardTrigger,
		useHoverCard,
		arrowAttrs: arrowAttrs(),
		open: open$,
		show,
		hide,
	};
};
