import { get, writable } from 'svelte/store';
import { coerceNumber, derivedNumber } from './number';

describe('coerceNumber', () => {
	it('should coerce string with integer', () => {
		expect(coerceNumber('1')).toBe(1);
		expect(coerceNumber('1', 111)).toBe(1);
	});

	it('should coerce string with decimal', () => {
		expect(coerceNumber('123.456')).toBe(123.456);
		expect(coerceNumber('123.456', 111)).toBe(123.456);
	});

	it('should coerce string with negative decimal', () => {
		expect(coerceNumber('-123.456')).toBe(-123.456);
		expect(coerceNumber('-123.456', 111)).toBe(-123.456);
	});

	it('should coerce number', () => {
		expect(coerceNumber(1)).toBe(1);
		expect(coerceNumber(1, 111)).toBe(1);
	});

	it('should coerce decimal', () => {
		expect(coerceNumber(123.456)).toBe(123.456);
		expect(coerceNumber(123.456, 111)).toBe(123.456);
	});

	it('should coerce negative decimal', () => {
		expect(coerceNumber(-123.456)).toBe(-123.456);
		expect(coerceNumber(-123.456, 111)).toBe(-123.456);
	});

	it('should coerce non meaningful values to `undefined`', () => {
		expect(coerceNumber(undefined)).toBe(undefined);
		expect(coerceNumber(null)).toBe(undefined);
		expect(coerceNumber(true)).toBe(undefined);
		expect(coerceNumber(false)).toBe(undefined);
		expect(coerceNumber('')).toBe(undefined);
		expect(coerceNumber('pink')).toBe(undefined);
		expect(coerceNumber('123pink')).toBe(undefined);
		expect(coerceNumber({})).toBe(undefined);
		expect(coerceNumber([])).toBe(undefined);
	});

	it('should coerce non meaningful values to default', () => {
		expect(coerceNumber(undefined, 111)).toBe(111);
		expect(coerceNumber(null, 111)).toBe(111);
		expect(coerceNumber(true, 111)).toBe(111);
		expect(coerceNumber(false, 111)).toBe(111);
		expect(coerceNumber('', 111)).toBe(111);
		expect(coerceNumber('pink', 111)).toBe(111);
		expect(coerceNumber('123pink', 111)).toBe(111);
		expect(coerceNumber({}, 111)).toBe(111);
		expect(coerceNumber([], 111)).toBe(111);
	});
});

describe('derivedNumber', () => {
	const original = writable();

	it('should coerce to number', () => {
		const num = derivedNumber(original);
		expect(get(num)).toBe(undefined);

		original.set(123);
		expect(get(num)).toBe(123);

		original.set('-123.456');
		expect(get(num)).toBe(-123.456);

		original.set(null);
		expect(get(num)).toBe(undefined);
	});

	it('should coerce to number or fallback value', () => {
		const num = derivedNumber(original, 0);
		expect(get(num)).toBe(0);

		original.set(123);
		expect(get(num)).toBe(123);

		original.set('-123.456');
		expect(get(num)).toBe(-123.456);

		original.set(null);
		expect(get(num)).toBe(0);
	});
});
