import type {
	ResizeObserverConfig,
	ResizeObserverReturn,
	ResizeObserverUseConfig,
} from './resizeObserver.types';
import { isClient } from '../util/is.js';
import { toReadable, writableEffect } from '../util/store.js';

export const createResizeObserver = (config: ResizeObserverConfig = {}): ResizeObserverReturn => {
	const isSupported = isClient && 'ResizeObserver' in window;

	const { handler, ...observerOptions } = config;
	const entries = writableEffect<Record<string, ResizeObserverEntry>>({}, handler);

	let uid = 0;
	const useResizeObserver = (node: HTMLElement, _config: ResizeObserverUseConfig = {}) => {
		if (!isSupported) return;

		const localId = `${uid++}`;
		const { handler: _handler, ..._observerOptions } = _config;
		const observer = new ResizeObserver(([entry]) => {
			entries.update((_entries) => ({ ..._entries, [localId]: entry }));
			_handler?.(entry);
		});
		observer.observe(node, { ...observerOptions, ..._observerOptions });

		return {
			destroy() {
				observer.disconnect();
			},
		};
	};

	return {
		isSupported,
		entries: toReadable(entries),
		useResizeObserver,
	};
};
