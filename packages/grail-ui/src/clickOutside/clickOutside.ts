import type { ClickOutsideConfig } from './clickOutside.types';
import { get } from 'svelte/store';
import { isFunction } from '../util/is';
import documentClickStore from './documentClickStore';

export const useClickOutside = (node: HTMLElement, config: ClickOutsideConfig = {}) => {
	let options = { enabled: true, ...config };

	function isEnabled(): boolean {
		return typeof options.enabled === 'boolean' ? options.enabled : get(options.enabled);
	}

	const unsubscribe = documentClickStore.subscribe((e) => {
		if (!isEnabled() || !e || e.target === node) {
			return;
		}

		const composedPath = e.composedPath();

		if (composedPath.includes(node)) return;

		if (options.ignore) {
			if (isFunction(options.ignore)) {
				if (options.ignore(e)) return;
			} else if (Array.isArray(options.ignore)) {
				if (
					options.ignore.length > 0 &&
					options.ignore.some((ignoreEl) => {
						return ignoreEl && (e.target === ignoreEl || composedPath.includes(ignoreEl));
					})
				)
					return;
			}
		}

		options.handler?.(e);
	});

	return {
		update(params: Partial<ClickOutsideConfig>) {
			options = { ...options, ...params };
		},
		destroy() {
			unsubscribe();
		},
	};
};
