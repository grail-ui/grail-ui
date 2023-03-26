import type { ComponentProps } from 'svelte';
import { vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import PopoverTest from './PopoverTest.svelte';

class ResizeObserver {
	observe = vi.fn();
	unobserve = vi.fn();
	disconnect = vi.fn();
}
vi.stubGlobal('ResizeObserver', ResizeObserver);

describe('Popover', () => {
	const user = userEvent.setup();

	function setup(componentOptions?: ComponentProps<PopoverTest>) {
		const { container, component } = render(PopoverTest, componentOptions);
		const button = screen.getByTestId('trigger');

		function getOverlayElements() {
			return {
				closeButton: screen.getByTestId('close'),
				arrow: screen.getByTestId('arrow'),
				input: screen.getByTestId('input'),
			};
		}
		return {
			container,
			button,
			async expectNoViolations() {
				expect(await axe(screen.getByTestId('container'))).toHaveNoViolations();
			},
			getOverlay() {
				return screen.queryByTestId('overlay');
			},
			getOverlayElements,
			async open() {
				await user.click(button);
				return screen.getByTestId('overlay');
			},
			async close() {
				await user.click(button);
			},
			component,
		};
	}

	it('should show/hide & have no accessibility violations', async () => {
		const { open, close, getOverlay, expectNoViolations } = setup();

		expect(getOverlay()).not.toBeInTheDocument();
		await expectNoViolations();

		const popover = await open();
		expect(popover).toBeVisible();
		expect(popover).toHaveTextContent('Popover');
		await expectNoViolations();

		await close();
		expect(getOverlay()).not.toBeInTheDocument();
	});

	it('should toggle `aria-expanded` attribute based on state', async () => {
		const { open, close, button } = setup();

		expect(button).toHaveAttribute('aria-expanded', 'false');

		await open();
		expect(button).toHaveAttribute('aria-expanded', 'true');

		await close();
		expect(button).toHaveAttribute('aria-expanded', 'false');
	});

	it('should call `onOpenChange`', async () => {
		const spy = vi.fn();
		const { open, close } = setup({ onOpenChange: spy });

		expect(spy).not.toHaveBeenCalled();

		await open();
		expect(spy).toHaveBeenCalledTimes(1);
		expect(spy).toHaveBeenLastCalledWith(true);

		await close();
		expect(spy).toHaveBeenLastCalledWith(false);
	});

	it('should support arrow element', async () => {
		const { getOverlayElements } = setup({ isOpen: true, hasArrow: true });

		const { arrow } = getOverlayElements();
		expect(arrow).toHaveAttribute('data-arrow');
	});

	it('should support close button', async () => {
		const { button, getOverlayElements, getOverlay } = setup({ isOpen: true });

		const { closeButton } = getOverlayElements();
		await user.click(closeButton);
		expect(getOverlay()).not.toBeInTheDocument();
		expect(button).toHaveFocus();
	});

	it('should support close button and descendants', async () => {
		const { button, getOverlayElements, getOverlay } = setup({ isOpen: true });

		const { closeButton } = getOverlayElements();
		await user.click(closeButton.querySelector('span') as HTMLElement);
		expect(getOverlay()).not.toBeInTheDocument();
		expect(button).toHaveFocus();
	});

	it('should close on `Escape`', async () => {
		const { button, getOverlayElements, getOverlay, open } = setup();

		await open();
		const { input } = getOverlayElements();
		input.focus();
		expect(input).toHaveFocus();
		await user.keyboard('{escape}');
		expect(getOverlay()).not.toBeInTheDocument();
		expect(button).toHaveFocus();
	});

	it('should close on click outside', async () => {
		const { button, getOverlay } = setup({ isOpen: true });

		await user.click(document.body);
		expect(getOverlay()).not.toBeInTheDocument();
		expect(button).not.toHaveFocus();
	});

	it('should toggle even if click is inside trigger', async () => {
		const { button } = setup();
		const span = document.createElement('span');
		button.append(span);

		expect(button).toHaveAttribute('aria-expanded', 'false');

		await user.click(span);
		expect(button).toHaveAttribute('aria-expanded', 'true');

		await user.click(span);
		expect(button).toHaveAttribute('aria-expanded', 'false');
	});

	describe('portal', () => {
		it('should use `body` by default', async () => {
			const { open } = setup();

			const overlay = await open();
			expect(overlay.parentElement).toBe(document.body);
			expect(screen.getByTestId('container')).not.toContainElement(overlay);
		});

		it('could use custom element', async () => {
			const myPortal = document.createElement('div');
			const { container, open } = setup({ portal: myPortal });
			container.appendChild(myPortal);

			const overlay = await open();
			expect(overlay.parentElement).toBe(myPortal);
			expect(screen.getByTestId('container')).not.toContainElement(overlay);
		});

		it('could use custom selector', async () => {
			const myPortal = document.createElement('div');
			myPortal.setAttribute('id', 'my-portal-id');
			const { container, open } = setup({ portal: '#my-portal-id' });
			container.appendChild(myPortal);

			const overlay = await open();
			expect(overlay.parentElement).toBe(myPortal);
			expect(screen.getByTestId('container')).not.toContainElement(overlay);
		});
	});
});
