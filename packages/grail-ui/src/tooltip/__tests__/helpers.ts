import { vi } from 'vitest';
import { tick } from 'svelte';
import { fireEvent } from '@testing-library/svelte';

export async function advanceTimersAndTick(time: number) {
	vi.advanceTimersByTime(time);
	await tick();
}

export function hover(el: HTMLElement) {
	fireEvent(el, new Event('pointerenter'));
}

export function unhover(el: HTMLElement) {
	fireEvent(el, new Event('pointerleave'));
}
