/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Type } from './toast.types';
import { loop } from 'svelte/internal';
import { readable } from 'svelte/store';

export const defaultTimeouts: Record<Type, number> = {
	info: 5000,
	error: 5000,
	success: 2000,
	loading: Infinity,
	custom: 5000,
};

export function getToastDuration(duration: number | undefined, type: Type) {
	return duration ?? defaultTimeouts[type];
}

export const runIfFn = <T>(
	v: T | undefined,
	...a: T extends (...a: any[]) => void ? Parameters<T> : never
): T extends (...a: any[]) => void ? NonNullable<ReturnType<T>> : NonNullable<T> => {
	const res = typeof v === 'function' ? v(...a) : v;
	return res ?? undefined;
};

export const msTime$ = readable(Date.now(), (set) => {
	const task = loop(() => {
		set(Date.now());
		return true;
	});

	return task.abort;
});
