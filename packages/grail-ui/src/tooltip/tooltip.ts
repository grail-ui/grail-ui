import type { Action } from 'svelte/action';
import type { TooltipConfig, TooltipReturn } from './tooltip.types';
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

export const createTooltip = ({
	positioning = {},
	open = false,
	openDelay = 1000,
	closeDelay = 500,
	portal = 'body',
	onOpenChange,
}: TooltipConfig = {}): TooltipReturn => {
	const id = uniqueId('tooltip');

	const open$ = writableEffect(open, onOpenChange);

	let cleanup = noop;

	const triggerAttrs = derived(open$, (open) => (open ? { 'aria-describedby': id } : {}));
	const tooltipAttrs = readable({ id: id, role: 'tooltip' });

	function init(triggerElement: HTMLElement, tooltipElement: HTMLElement) {
		cleanup();
		cleanup = getPlacement(triggerElement, tooltipElement, positioning);
	}

	const {
		start: startShowTimer,
		stop: stopShowTimer,
		delay: delayShowTimer,
	} = createTimeout(() => open$.set(true), 0, { immediate: false });

	const {
		start: startHideTimer,
		stop: stopHideTimer,
		delay: delayHideTimer,
	} = createTimeout(() => open$.set(false), closeDelay, {
		immediate: false,
	});

	const tooltipElement$ = writable<HTMLElement | null>(null);

	const useTooltipTrigger: Action<HTMLElement, void> = (element) => {
		const removeEvents = chain(
			addEventListener(element, 'focus', () => show()),
			addEventListener(element, 'blur', hide),
			addEventListener(element, 'pointerenter', () => show(openDelay)),
			addEventListener(element, 'pointerleave', () => hide(closeDelay)),
			addEventListener(element, 'click', hide)
		);

		const unsubscribe = derived([open$, tooltipElement$], (values) => values).subscribe(
			([$open, $tooltipElement]) => {
				if ($open && $tooltipElement) {
					init(element, $tooltipElement);
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

	const useTooltip: Action<HTMLElement, void> = (element) => {
		const portalAction = portal ? usePortal(element, { target: portal }) : undefined;
		tooltipElement$.set(element);

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
				tooltipElement$.set(null);
			},
		};
	};

	const show = (delay = 0) => {
		stopHideTimer();
		delayShowTimer.set(delay);
		startShowTimer();
	};
	const hide = (delay = 0) => {
		stopShowTimer();
		delayHideTimer.set(delay);
		startHideTimer();
	};
	const toggle = () => open$.update((value) => !value);

	return {
		useTooltipTrigger,
		triggerAttrs,
		useTooltip,
		tooltipAttrs,
		arrowAttrs: arrowAttrs(),
		open: open$,
		show,
		hide,
		toggle,
	};
};
