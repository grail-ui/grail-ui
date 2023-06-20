import { vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { tick } from 'svelte';
import { createModal } from '../modal';
import ModalTest from './ModalTest.svelte';

describe('Modal', () => {
	const user = userEvent.setup();

	async function advanceOpenDelay<T = unknown>(fn: () => T) {
		vi.useFakeTimers();
		const result = fn();
		await tick();
		vi.runAllTimers();
		vi.useRealTimers();

		return result;
	}

	async function triggerOpen() {
		await advanceOpenDelay(() => {
			screen.getByTestId('trigger').click();
		});
	}

	it('should show/hide & have no accessibility violations', async () => {
		const api = createModal({ portal: null, open: false });
		const { container } = render(ModalTest, { api });

		const button = screen.getByTestId('trigger');
		expect(button).toBeInTheDocument();
		expect(screen.queryByTestId('modal')).not.toBeVisible();
		expect(await axe(container)).toHaveNoViolations();

		await user.click(button);
		const modal = screen.getByTestId('modal');
		expect(modal).toBeVisible();
		expect(modal).toHaveTextContent('Title');
		expect(modal.getAttribute('aria-labelledby')).toEqual(modal.querySelector('h3')?.id);
		expect(button.getAttribute('aria-controls')).toEqual(modal.id);

		expect(await axe(container)).toHaveNoViolations();
	});

	it('should handle clicks outside', async () => {
		const onInteractOutside = vi.fn();
		const api = createModal({
			portal: null,
			open: false,
			dismissible: true,
			onInteractOutside,
		});
		render(ModalTest, { api });

		// Do not call if closed
		await user.click(document.body);
		expect(onInteractOutside).not.toHaveBeenCalled();

		await triggerOpen();
		expect(onInteractOutside).not.toHaveBeenCalled();

		await user.click(document.body);
		expect(onInteractOutside).toHaveBeenCalledTimes(1);
	});

	it('should prevent closing on clicks outside', async () => {
		const onInteractOutside = vi.fn().mockReturnValue(false);
		const api = createModal({
			portal: null,
			open: true,
			dismissible: true,
			onInteractOutside,
		});
		render(ModalTest, { api });

		await user.click(document.body);
		expect(screen.queryByTestId('modal')).toBeVisible();
	});

	it('should handle custom initial focus', async () => {
		const api = createModal({ portal: null, open: false, initialFocus: '[data-testid=focus]' });
		render(ModalTest, { api });

		expect(document.activeElement).not.toBe(screen.queryByTestId('focus'));
		await triggerOpen();
		expect(document.activeElement).toBe(screen.queryByTestId('focus'));
	});

	describe(`ESCAPE`, () => {
		it('should close and `preventDefault`', async () => {
			const spy = vi.fn();
			document.addEventListener('keydown', spy);

			advanceOpenDelay(async () => {
				const api = createModal({ portal: null, open: true });
				await render(ModalTest, { api });
			});

			await userEvent.keyboard('{escape}');
			expect(screen.queryByTestId('modal')).not.toBeVisible();
			expect(spy.mock.lastCall?.[0].defaultPrevented).toBe(true);
		});

		it('should not close if desired', async () => {
			advanceOpenDelay(async () => {
				const api = createModal({ portal: null, open: true, keyboardDismissible: false });
				await render(ModalTest, { api });
			});

			await userEvent.keyboard('{escape}');
			expect(screen.queryByTestId('modal')).toBeVisible();
		});
	});

	it('should update dismissible', async () => {
		const api = createModal({ open: true, dismissible: true });
		render(ModalTest, { api });

		expect(screen.queryByTestId('modal')).toBeVisible();

		api.dismissible.set(false);
		await user.click(document.body);
		expect(screen.queryByTestId('modal')).toBeVisible();

		api.dismissible.set(true);
		await user.click(document.body);
		expect(screen.queryByTestId('modal')).not.toBeVisible();
	});

	it('should update keyboard dismissible', async () => {
		const api = await advanceOpenDelay(async () => {
			const api = createModal({ open: true, keyboardDismissible: true });
			render(ModalTest, { api });
			return api;
		});

		expect(screen.queryByTestId('modal')).toBeVisible();

		api.keyboardDismissible.set(false);
		await userEvent.keyboard('{escape}');
		expect(screen.queryByTestId('modal')).toBeVisible();

		api.keyboardDismissible.set(true);
		await userEvent.keyboard('{escape}');
		expect(screen.queryByTestId('modal')).not.toBeVisible();
	});
});
