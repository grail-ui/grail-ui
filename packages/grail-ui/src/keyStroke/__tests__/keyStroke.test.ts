import type { KeyStrokeConfig } from '../keyStroke.types';
import { vi } from 'vitest';
import { fireEvent } from '@testing-library/svelte';
import { createKeyStroke, useKeyStroke } from '../keyStroke';

let removeEvent: (() => void) | undefined;

const setupKeyStroke = (options: Omit<KeyStrokeConfig, 'handler'>) => {
	const spy = vi.fn();
	removeEvent = createKeyStroke({ ...options, handler: spy });

	return { removeEvent, spy };
};

const fireKeyEvent = async (
	options: string | Record<string, unknown>,
	target: HTMLElement | Document = document
) => {
	await fireEvent.keyDown(target, typeof options === 'string' ? { key: options } : options);
};

describe('Key Stroke', () => {
	beforeEach(() => {
		vi.restoreAllMocks();
	});

	afterEach(() => {
		removeEvent?.();
		removeEvent = undefined;
	});

	it('should work for single key', async () => {
		const { spy } = setupKeyStroke({ key: 'a' });

		await fireKeyEvent('b');
		expect(spy).not.toHaveBeenCalled();

		await fireKeyEvent('a');
		expect(spy).toHaveBeenCalledTimes(1);
	});

	it('should work for any key', async () => {
		const { spy } = setupKeyStroke({ key: true });

		await fireKeyEvent('a');
		expect(spy).toHaveBeenCalledTimes(1);

		await fireKeyEvent('b');
		expect(spy).toHaveBeenCalledTimes(2);
	});

	it('should ignore uppercase in key', async () => {
		const { spy } = setupKeyStroke({ key: 'a' });
		expect(spy).not.toHaveBeenCalled();

		await fireKeyEvent('A');
		expect(spy).toHaveBeenCalledTimes(1);
	});

	it('should work for multiple keys', async () => {
		const { spy } = setupKeyStroke({ key: ['a', 'b'] });

		await fireKeyEvent('a');
		expect(spy).toHaveBeenCalledTimes(1);

		await fireKeyEvent('b');
		expect(spy).toHaveBeenCalledTimes(2);
	});

	it('should accept event target', async () => {
		const target = document.createElement('div');
		const { spy } = setupKeyStroke({ key: 'a', target });

		await fireKeyEvent('a');
		expect(spy).toHaveBeenCalledTimes(0);

		await fireKeyEvent('a', target);
		expect(spy).toHaveBeenCalledTimes(1);
	});

	it('should accept passive parameter', async () => {
		const spyAddEvent = vi.spyOn(document, 'addEventListener');

		setupKeyStroke({ key: 'a', passive: true });

		expect(spyAddEvent).toHaveBeenCalledWith('keydown', expect.any(Function), { passive: true });
	});

	it.each([[true], [false]])('should accept preventDefault parameter: %s', async (expected) => {
		const { spy } = setupKeyStroke({ key: 'a', preventDefault: expected });

		await fireKeyEvent('a');
		expect(spy.mock.lastCall?.[0].defaultPrevented).toBe(expected);
	});

	it('should work for key up and key press events', async () => {
		const keyEvents = ['keyPress', 'keyUp'];

		for (const event of keyEvents) {
			const eventName = event.toLowerCase() as 'keypress' | 'keyup';
			const { spy } = setupKeyStroke({ key: 'a', eventName });

			await fireEvent[event as 'keyPress' | 'keyUp'](document, { key: 'a' });
			expect(spy).toHaveBeenCalledTimes(1);
		}
	});

	describe('action', () => {
		const useSpy = vi.fn();

		it('should work', async () => {
			const target = document.createElement('div');
			useKeyStroke(target, { key: 'a', handler: useSpy });

			await fireKeyEvent('a', target);
			expect(useSpy).toHaveBeenCalledTimes(1);
		});

		it('should remove listener on destroy', async () => {
			const target = document.createElement('div');
			const { destroy } = useKeyStroke(target, { key: 'a', handler: useSpy });

			destroy?.();
			await fireKeyEvent('a', target);
			expect(useSpy).not.toHaveBeenCalled();
		});
	});

	describe('with modifier buttons', () => {
		type ModifierOptions = 'ctrlKey' | 'shiftKey' | 'altKey' | 'metaKey';
		const modifierKeys: ModifierOptions[] = ['altKey', 'shiftKey', 'ctrlKey', 'metaKey'];
		type FireParams = {
			key: string;
			altKey?: boolean;
			shiftKey?: boolean;
			ctrlKey?: boolean;
			metaKey?: boolean;
		};

		it('should not work without modifier parameter', async () => {
			const { spy } = setupKeyStroke({ key: 'a' });
			for (const modifier of modifierKeys) {
				const params: FireParams = { key: 'a' };
				params[modifier] = true;

				await fireKeyEvent(params);
				expect(spy).toHaveBeenCalledTimes(0);
			}

			await fireKeyEvent({ key: 'a' });
			expect(spy).toHaveBeenCalledTimes(1);
		});

		it('should work for single modifier key', async () => {
			for (const modifier of modifierKeys) {
				const { spy } = setupKeyStroke({ key: `${modifier.slice(0, -3)}+a` });
				const params: FireParams = { key: 'a' };

				await fireKeyEvent(params);
				expect(spy).toHaveBeenCalledTimes(0);

				params[modifier] = true;
				await fireKeyEvent(params);
				expect(spy).toHaveBeenCalledTimes(1);
			}
		});

		it('should work for multiple modifier keys', async () => {
			const { spy } = setupKeyStroke({ key: 'alt+shift+a' });

			await fireKeyEvent({ key: 'a' });
			expect(spy).toHaveBeenCalledTimes(0);

			await fireKeyEvent({ key: 'a', altKey: true, shiftKey: true, ctrlKey: true });
			expect(spy).toHaveBeenCalledTimes(0);

			await fireKeyEvent({ key: 'a', altKey: true, shiftKey: true });
			expect(spy).toHaveBeenCalledTimes(1);
		});

		it('should work for plus key', async () => {
			for (const modifier of modifierKeys) {
				const { spy } = setupKeyStroke({ key: `${modifier.slice(0, -3)}++` });
				const params: FireParams = { key: '+' };

				await fireKeyEvent(params);
				expect(spy).toHaveBeenCalledTimes(0);

				params[modifier] = true;
				await fireKeyEvent(params);
				expect(spy).toHaveBeenCalledTimes(1);
			}
		});

		it('should ignore case in modifiers', async () => {
			const { spy } = setupKeyStroke({ key: 'Ctrl+a' });
			expect(spy).toHaveBeenCalledTimes(0);

			await fireKeyEvent({ key: 'a', ctrlKey: true });
			expect(spy).toHaveBeenCalledTimes(1);
		});

		it('should handle whitespace', async () => {
			const { spy } = setupKeyStroke({ key: 'Ctrl + A + Shift' });
			expect(spy).toHaveBeenCalledTimes(0);

			await fireKeyEvent({ key: 'a', ctrlKey: true, shiftKey: true });
			expect(spy).toHaveBeenCalledTimes(1);
		});
	});
});
