import { readable } from 'svelte/store';
import { addEventListener } from '../eventListener/eventListener';

export default readable<PointerEvent | undefined>(undefined, (set): (() => void) => {
	function clicked(event: PointerEvent | undefined) {
		set(event);

		// New subscriptions will not trigger immediately
		set(undefined);
	}

	return addEventListener(document, 'pointerdown', clicked, { passive: true, capture: true });
});
