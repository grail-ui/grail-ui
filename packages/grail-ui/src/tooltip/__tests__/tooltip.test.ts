import { vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/svelte';
import { axe } from 'jest-axe';
import userEvent from '@testing-library/user-event';
import { tick, type ComponentProps } from 'svelte';
import { advanceTimersAndTick, hover, unhover } from './helpers';
import TooltipTest from './TooltipTest.svelte';

class ResizeObserver {
	observe = vi.fn();
	unobserve = vi.fn();
	disconnect = vi.fn();
}
vi.stubGlobal('ResizeObserver', ResizeObserver);

describe('tooltip', () => {
	function setup(componentOptions?: ComponentProps<TooltipTest>) {
		const { container, component } = render(TooltipTest, componentOptions);
		const button = screen.getByTestId('trigger');

		return {
			container,
			button,
			async expectNoViolations() {
				vi.useRealTimers();
				expect(await axe(screen.getByTestId('container'))).toHaveNoViolations();
				vi.useFakeTimers();
			},
			getArrow() {
				return screen.getByTestId('arrow');
			},
			getTooltip() {
				return screen.queryByTestId('tooltip');
			},
			async open() {
				await hover(button);
				return screen.getByTestId('tooltip');
			},
			async close(ms = 0) {
				unhover(button);
				await advanceTimersAndTick(ms);
			},
			component,
		};
	}

	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it('should show/hide & have no accessibility violations', async () => {
		const { open, close, getTooltip, expectNoViolations } = setup();

		expect(getTooltip()).not.toBeInTheDocument();
		await expectNoViolations();

		const tooltip = await open();
		expect(tooltip).toBeVisible();
		expect(tooltip).toHaveTextContent('My tooltip');
		await expectNoViolations();

		await close(500);
		expect(getTooltip()).not.toBeInTheDocument();
	});

	it('should be interactive', async () => {
		const { open, close } = setup();

		const tooltip = await open();

		await close(500 - 1);
		expect(tooltip).toBeInTheDocument();

		hover(tooltip);
		await advanceTimersAndTick(1);
		expect(tooltip).toBeInTheDocument();

		await advanceTimersAndTick(1500);
		expect(tooltip).toBeInTheDocument();
	});

	describe('portal', () => {
		it('should use `body` by default', async () => {
			const { open } = setup();

			const tooltip = await open();
			expect(tooltip.parentElement).toBe(document.body);
			expect(screen.getByTestId('container')).not.toContainElement(tooltip);
		});

		it('could use custom element', async () => {
			const myPortal = document.createElement('div');
			const { container, open } = setup({ portal: myPortal });
			container.appendChild(myPortal);

			const tooltip = await open();
			expect(tooltip.parentElement).toBe(myPortal);
			expect(screen.getByTestId('container')).not.toContainElement(tooltip);
		});

		it('could use custom selector', async () => {
			const myPortal = document.createElement('div');
			myPortal.setAttribute('id', 'my-portal-id');
			const { container, open } = setup({ portal: '#my-portal-id' });
			container.appendChild(myPortal);

			const tooltip = await open();
			expect(tooltip.parentElement).toBe(myPortal);
			expect(screen.getByTestId('container')).not.toContainElement(tooltip);
		});
	});

	it('should toggle `aria-describedby` attribute based on state', async () => {
		const { open, close, button } = setup();

		expect(button).not.toHaveAttribute('aria-describedby');

		const tooltip = await open();
		expect(button).toHaveAttribute('aria-describedby', tooltip.id);

		await close(500);
		expect(button).not.toHaveAttribute('aria-describedby');
	});

	it('should call `onOpenChange`', async () => {
		const spy = vi.fn();
		const { open, close } = setup({ onOpenChange: spy });

		expect(spy).not.toHaveBeenCalled();

		await open();
		expect(spy).toHaveBeenCalledTimes(1);
		expect(spy).toHaveBeenLastCalledWith(true);

		await close(500);
		expect(spy).toHaveBeenLastCalledWith(false);
	});

	it('should support arrow element', async () => {
		const { getArrow } = setup({ isOpen: true, hasArrow: true });

		const arrow = getArrow();
		expect(arrow).toHaveAttribute('data-arrow');
	});

	describe('delay', () => {
		it('open', async () => {
			const { getTooltip, button } = setup({ openDelay: 200 });

			hover(button);
			await advanceTimersAndTick(100);
			expect(getTooltip()).not.toBeInTheDocument();

			await advanceTimersAndTick(100);
			expect(getTooltip()).toBeInTheDocument();
		});

		it('must be ignored if element is focused', async () => {
			const { getTooltip, button } = setup({ openDelay: 200 });

			fireEvent(button, new FocusEvent('focus'));
			await advanceTimersAndTick(0);
			expect(getTooltip()).toBeInTheDocument();
		});

		it('cancel if hides in the meantime', async () => {
			const { getTooltip, button } = setup({ openDelay: 200 });

			hover(button);
			await advanceTimersAndTick(100);
			expect(getTooltip()).not.toBeInTheDocument();

			unhover(button);
			await advanceTimersAndTick(100);
			expect(getTooltip()).not.toBeInTheDocument();
		});

		it('cancel if trigger is destroyed', async () => {
			const spy = vi.fn();
			const { getTooltip, button, component } = setup({ openDelay: 200, onOpenChange: spy });

			hover(button);
			await advanceTimersAndTick(100);
			expect(getTooltip()).not.toBeInTheDocument();

			spy.mockClear();
			expect(spy).not.toHaveBeenCalled();
			component.$set({ triggerExists: false });
			await tick();

			await advanceTimersAndTick(100);
			expect(getTooltip()).not.toBeInTheDocument();
			expect(spy).not.toHaveBeenCalled();
		});

		it('close', async () => {
			const { open, close, getTooltip } = setup({ closeDelay: 50 });

			await open();
			expect(getTooltip()).toBeInTheDocument();

			await close(50);
			expect(getTooltip()).not.toBeInTheDocument();
		});
	});

	it('should close on `Escape`', async () => {
		const { open, getTooltip } = setup();
		await open();
		expect(getTooltip()).toBeInTheDocument();

		const user = userEvent.setup({ advanceTimers: advanceTimersAndTick });
		await user.keyboard('{escape}');
		expect(getTooltip()).not.toBeInTheDocument();
	});
});
