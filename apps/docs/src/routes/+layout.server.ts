import type { LayoutServerLoadEvent } from './$types';

export const prerender = true;

export function load(event: LayoutServerLoadEvent) {
	return event.locals;
}
