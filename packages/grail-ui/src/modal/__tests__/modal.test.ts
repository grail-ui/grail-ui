import { vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import ModalTest from './ModalTest.svelte';
import { createModal } from '../modal';

describe('Modal', () => {
	const user = userEvent.setup();

	async function triggerOpen() {
		await user.click(screen.getByTestId('trigger'));
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
			isDismissible: true,
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

			const api = createModal({ portal: null, open: true });
			await render(ModalTest, { api });

			await userEvent.keyboard('{escape}');
			expect(screen.queryByTestId('modal')).not.toBeVisible();
			expect(spy.mock.lastCall?.[0].defaultPrevented).toBe(true);
		});

		it('should not close if desired', async () => {
			const api = createModal({ portal: null, open: true, isKeyboardDismissible: false });
			await render(ModalTest, { api });

			await userEvent.keyboard('{escape}');
			expect(screen.queryByTestId('modal')).toBeVisible();
		});
	});
});
