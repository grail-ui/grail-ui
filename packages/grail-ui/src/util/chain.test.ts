import { vi } from 'vitest';
import { chain } from './chain';

describe('`chain`', () => {
	it('calls all functions in the correct order', () => {
		const order: number[] = [];
		chain(
			() => order.push(1),
			() => order.push(2),
			() => order.push(3)
		)();
		expect(order).toEqual([1, 2, 3]);
	});

	it('calls all functions with the same arguments', () => {
		const callbacks = [vi.fn(), vi.fn(), vi.fn()];

		const params = { id: new Date() };
		chain(...callbacks)(params);
		callbacks.forEach((cb) => {
			expect(cb).toHaveBeenCalledTimes(1);
			expect(cb).toHaveBeenCalledWith(params);
		});
	});

	it('calls all functions with inferring type arguments', () => {
		const order: number[] = [];
		const text: string[] = [];
		chain<[ch: string, num: number]>(
			(ch) => text.push(ch),
			(ch, num) => order.push(num)
		)('a', 1);
		expect(order).toEqual([1]);
		expect(text).toEqual(['a']);
	});

	it('does not call if not function', () => {
		const order: number[] = [];
		chain(
			() => order.push(1),
			undefined,
			() => order.push(3)
		)();
		expect(order).toEqual([1, 3]);
	});
});
