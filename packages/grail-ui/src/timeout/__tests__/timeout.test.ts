import { vi } from 'vitest';
import { get } from 'svelte/store';
import { createTimeout } from '../timeout';

export function promiseTimeout(
	ms: number,
	throwOnTimeout = false,
	reason = 'Timeout'
): Promise<void> {
	return new Promise((resolve, reject) => {
		if (throwOnTimeout) setTimeout(() => reject(reason), ms);
		else setTimeout(resolve, ms);
	});
}

describe('timeout', () => {
	beforeAll(() => {
		vi.useFakeTimers();
	});

	afterAll(() => {
		vi.useRealTimers();
	});

	it('should call immediately', async () => {
		const spy = vi.fn();
		createTimeout(spy, 100);

		expect(spy).not.toHaveBeenCalled();

		vi.advanceTimersByTime(100);
		expect(spy).toHaveBeenCalledTimes(1);
	});

	it('should call manually after specified delay', async () => {
		const spy = vi.fn();
		const { start, isPending } = createTimeout(spy, 100, { immediate: false });

		expect(get(isPending)).toBe(false);

		start();
		expect(spy).not.toHaveBeenCalled();
		expect(get(isPending)).toBe(true);

		vi.advanceTimersByTime(100);
		expect(spy).toHaveBeenCalledTimes(1);
		expect(get(isPending)).toBe(false);
	});

	it('works with zero delay', async () => {
		const spy = vi.fn();
		const { start, isPending } = createTimeout(spy, 0, { immediate: false });

		expect(get(isPending)).toBe(false);
		expect(spy).not.toHaveBeenCalled();

		start();
		expect(spy).toHaveBeenCalled();
		expect(get(isPending)).toBe(false);
	});

	it('should not call if stopped', async () => {
		const spy = vi.fn();
		const { start, stop, isPending } = createTimeout(spy, 100, { immediate: false });

		start();
		expect(spy).not.toHaveBeenCalled();
		expect(get(isPending)).toBe(true);

		stop();
		expect(get(isPending)).toBe(false);

		vi.advanceTimersByTime(100);
		expect(spy).not.toHaveBeenCalled();
	});

	it('should restart if pending', async () => {
		const spy = vi.fn();
		const { start, isPending } = createTimeout(spy, 100, { immediate: false });

		start();
		expect(spy).not.toHaveBeenCalled();
		expect(get(isPending)).toBe(true);

		vi.advanceTimersByTime(50);
		expect(spy).not.toHaveBeenCalled();
		expect(get(isPending)).toBe(true);

		start(); // Restart
		vi.advanceTimersByTime(100 - 1);
		expect(spy).not.toHaveBeenCalled();
		expect(get(isPending)).toBe(true);

		vi.advanceTimersByTime(1);
		expect(spy).toHaveBeenCalledTimes(1);
		expect(get(isPending)).toBe(false);
	});

	it('supports reactive delay', async () => {
		const spy = vi.fn();
		const { start, isPending, delay } = createTimeout(spy, 100, { immediate: false });

		start();
		delay.set(200);

		start(); // Restart
		vi.advanceTimersByTime(200 - 1);
		expect(spy).not.toHaveBeenCalled();
		expect(get(isPending)).toBe(true);

		vi.advanceTimersByTime(1);
		expect(spy).toHaveBeenCalledTimes(1);
		expect(get(isPending)).toBe(false);
	});
});
