import type { LayoutServerLoadEvent } from './$types';

export function load(event: LayoutServerLoadEvent) {
	return event.locals;
}
