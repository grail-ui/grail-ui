import type { KeyStrokeConfig } from './keyStroke.types';
import type { ActionReturn } from 'svelte/action';
import { addEventListener } from '../eventListener/eventListener';
import { isClient } from '../util/is';
import { tryOnDestroy } from '../util/lifecycle';
import { noop } from '../util/noop';

const ALIAS: Record<string, string> = { plus: '+' };

export const createKeyStroke = (params: KeyStrokeConfig): VoidFunction => {
	if (!isClient) return noop;

	const {
		key,
		handler,
		target = document,
		eventName = 'keydown',
		passive = false,
		preventDefault = false,
		autoStop = true,
	} = params;

	const matches = (key: string, event: KeyboardEvent) => {
		const matchEvent = key
			.replace(/\s/g, '') // Remove whitespace
			.replace(/\+{2}/g, '+plus')
			.split('+')
			.map((value) => ALIAS[value] ?? value)
			.reduce((current, keyCode) => {
				keyCode = keyCode.toLocaleLowerCase();
				if (keyCode === 'alt' || keyCode === 'shift' || keyCode === 'ctrl' || keyCode === 'meta') {
					current[`${keyCode}Key`] = true;
				} else {
					current['key'] = keyCode;
				}

				return current;
			}, {} as { key: string; altKey?: boolean; shiftKey?: boolean; ctrlKey?: boolean; metaKey?: boolean });

		return (
			event.key.toLocaleUpperCase() === matchEvent.key.toLocaleUpperCase() &&
			event.altKey === !!matchEvent.altKey &&
			event.shiftKey === !!matchEvent.shiftKey &&
			event.ctrlKey === !!matchEvent.ctrlKey &&
			event.metaKey === !!matchEvent.metaKey
		);
	};

	const keyPredicate = (keyFilter: KeyStrokeConfig['key'], event: KeyboardEvent): boolean => {
		if (keyFilter === true) return true;
		if (typeof keyFilter === 'function') return keyFilter(event);

		return ([] as string[]).concat(keyFilter).some((key) => matches(key, event));
	};

	const listener = (e: KeyboardEvent) => {
		if (keyPredicate(key, e)) {
			if (preventDefault) e.preventDefault();
			handler(e);
		}
	};

	const stop = addEventListener(target, eventName, listener, { passive });

	if (autoStop) {
		tryOnDestroy(stop);
	}

	return stop;
};

export const useKeyStroke = (
	node: HTMLElement,
	parameters: Omit<KeyStrokeConfig, 'target'>
): ActionReturn<KeyStrokeConfig> => {
	const removeEvent = createKeyStroke({ ...parameters, target: node });

	return {
		destroy() {
			removeEvent();
		},
	};
};
