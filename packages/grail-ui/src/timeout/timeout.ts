import type { CreateTimeoutFn, TimeoutConfig, TimeoutReturn } from './timeout.types';
import { get, writable } from 'svelte/store';
import { isClient } from '../util/is';
import { toReadable } from '../util/store';
import { tryOnDestroy } from '../util/lifecycle';

export const createTimeout: typeof CreateTimeoutFn = (
	cb,
	ms,
	{ immediate = true, autoStop = true }: TimeoutConfig = {}
): TimeoutReturn => {
	const isPending = writable(false);
	const delay = writable(ms);

	let timer: ReturnType<typeof setTimeout> | undefined = undefined;

	function clear() {
		if (timer) {
			clearTimeout(timer);
			timer = undefined;
		}
	}

	function stop() {
		isPending.set(false);
		clear();
	}

	function start(...args: unknown[]) {
		clear();

		const $delay = get(delay);
		if ($delay > 0) {
			isPending.set(true);
			timer = setTimeout(() => {
				isPending.set(false);
				timer = undefined;

				cb(...args);
			}, $delay);
		} else {
			cb(...args);
		}
	}

	if (immediate) {
		isPending.set(true);
		if (isClient) start();
	}

	if (autoStop) {
		tryOnDestroy(stop);
	}

	return {
		isPending: toReadable<boolean>(isPending),
		start,
		stop,
		delay,
	};
};
