import { onDestroy, onMount } from 'svelte';
import { get_current_component } from 'svelte/internal';

/**
 * Call onMount() if it's inside a component lifecycle, if not, just call the function
 *
 * @param fn
 * @param sync if set to false, it will run in the nextTick() of Vue
 */
export function tryOnMount(fn: () => unknown) {
	let insideComponent = false;
	try {
		if (get_current_component()) {
			insideComponent = true;
		}
	} catch {
		/* empty */
	}

	if (insideComponent) {
		onMount(fn);
	} else {
		fn();
	}
}

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
