import { derived, type Readable } from 'svelte/store';

export function derivedNumber<T>(
	store: Readable<T>,
	fallbackValue?: number | undefined
): Readable<number | undefined> {
	return derived<Readable<T>, number | undefined>(store, (storeValue) =>
		coerceNumber(storeValue, fallbackValue)
	);
}

export function coerceNumber(value: unknown): number | undefined;
export function coerceNumber<T>(value: unknown, fallback: T): number | T;
export function coerceNumber(value: unknown, fallbackValue?: number) {
	return isNumber(value) ? Number(value) : fallbackValue;
}

function isNumber(value: unknown): boolean {
	return !isNaN(parseFloat(value as string)) && !isNaN(Number(value));
}
