import type { ActiveElement } from './activeElement.types';
import { get, readable } from 'svelte/store';
import { addEventListener } from '../eventListener/eventListener';
import { noop } from '../util/noop';
import { isClient } from '../util/is';

export const activeElement = readable<HTMLElement | null>(null, (set) => {
	if (!isClient) return noop;

	const setActiveElement = () => {
		if (
			get(activeElement) === document.activeElement ||
			!(document.activeElement instanceof HTMLElement)
		)
			return;
		set(document.activeElement);
	};

	setActiveElement();

	return addEventListener(window, ['focus', 'blur'], setActiveElement, {
		passive: true,
		capture: true,
	});
}) satisfies ActiveElement;
