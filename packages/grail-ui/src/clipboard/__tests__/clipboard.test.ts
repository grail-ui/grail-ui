import { vi } from 'vitest';
import { get } from 'svelte/store';
import { createClipboard } from '../clipboard';

vi.stubGlobal('navigator', {
	clipboard: {
		writeText: vi.fn(),
	},
});

describe('clipboard', () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	it('allows to copy text', async () => {
		const { isSupported, copy, text, copied } = createClipboard();
		expect(isSupported).toBe(true);
		expect(navigator.clipboard.writeText).not.toHaveBeenCalled();
		expect(get(text)).toEqual('');
		expect(get(copied)).toBe(false);

		await copy('my text');

		expect(navigator.clipboard.writeText).toHaveBeenCalledWith('my text');
		expect(get(text)).toEqual('my text');
		expect(get(copied)).toBe(true);

		vi.advanceTimersByTime(1500);
		expect(get(copied)).toBe(false);
	});

	it('allows to copy text from HTML element', async () => {
		const { copy, text } = createClipboard();
		const div = (document.createElement('div').innerText = 'element content');

		await copy(div);
		expect(navigator.clipboard.writeText).toHaveBeenCalledWith('element content');
		expect(get(text)).toEqual('element content');
	});
});
