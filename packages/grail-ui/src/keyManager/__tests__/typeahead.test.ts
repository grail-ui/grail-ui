import { vi } from 'vitest';
import typeaheadStore from '../typeahead';

describe('typeahead', () => {
	beforeAll(() => {
		vi.useFakeTimers();
	});

	afterAll(() => {
		vi.useRealTimers();
	});

	it('debounce letters & emit them concatenated', async () => {
		const spy = vi.fn();
		const typeahead = typeaheadStore();
		const unsubscribe = typeahead.subscribe(spy);

		spy.mockClear();
		typeahead.add('a');
		vi.advanceTimersByTime(100);
		expect(spy).not.toHaveBeenCalled();

		typeahead.add('b');
		expect(spy).not.toHaveBeenCalled();

		vi.advanceTimersByTime(100);
		expect(spy).not.toHaveBeenCalled();

		vi.advanceTimersByTime(100);
		expect(spy).toHaveBeenCalledWith('ab');

		unsubscribe();
	});

	it('is able to reset', async () => {
		const spy = vi.fn();
		const typeahead = typeaheadStore();
		const unsubscribe = typeahead.subscribe(spy);

		spy.mockClear();
		typeahead.add('a');
		typeahead.add('b');
		expect(spy).not.toHaveBeenCalled();

		typeahead.reset();

		vi.advanceTimersByTime(200);
		expect(spy).not.toHaveBeenCalledWith('ab');

		unsubscribe();
	});
});
