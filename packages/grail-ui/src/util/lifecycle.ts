import { onDestroy } from 'svelte';

/**
 * Call `onDestroy` if inside a component, otherwise do nothing
 */
export function tryOnDestroy(fn: () => void) {
	try {
		onDestroy(fn);
	} catch {
		// Do nothing
	}
}
