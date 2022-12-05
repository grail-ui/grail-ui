import type { ComponentProps } from 'svelte';
import { vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import MenuTest from './MenuTest.svelte';

class ResizeObserver {
	observe = vi.fn();
	unobserve = vi.fn();
	disconnect = vi.fn();
}
vi.stubGlobal('ResizeObserver', ResizeObserver);

describe('Menu', () => {
	const user = userEvent.setup();

	function setup(componentOptions?: ComponentProps<MenuTest>) {
		const { container, component } = render(MenuTest, componentOptions);
		const trigger = screen.getByTestId('trigger');

		function getMenuItems() {
			return screen.getAllByRole('menuitem');
		}
		return {
			component,
			container,
			trigger,
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			async expectNoViolations(options?: any) {
				expect(await axe(screen.getByTestId('container'), options)).toHaveNoViolations();
			},
			getMenu() {
				return screen.queryByTestId('menu');
			},
			getMenuItems,
			async open() {
				await user.click(trigger);
				return screen.getByTestId('menu');
			},
			async close() {
				await user.click(trigger);
			},
		};
	}

	it('should show/hide & have no accessibility violations', async () => {
		const { open, close, trigger, getMenu, expectNoViolations } = setup();

		expect(getMenu()).not.toBeInTheDocument();
		expect(trigger).toHaveAttribute('aria-haspopup', 'true');
		expect(trigger).toHaveAttribute('aria-expanded', 'false');
		await expectNoViolations();

		const menu = await open();
		expect(menu).toBeVisible();
		expect(menu).toHaveAttribute('role', 'menu');
		expect(menu).toHaveAccessibleName('Menu');
		expect(trigger).toHaveAttribute('aria-expanded', 'true');
		await expectNoViolations({
			rules: {
				// Role `separator` is causing problem
				'aria-required-children': { enabled: false },
			},
		});

		await close();
		expect(getMenu()).not.toBeInTheDocument();
		expect(trigger).toHaveAttribute('aria-haspopup', 'true');
		expect(trigger).toHaveAttribute('aria-expanded', 'false');
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

	it('should toggle pressing `Enter` or `Space` on trigger', async () => {
		const { trigger, getMenu } = setup();

		trigger.focus();
		await userEvent.keyboard('{enter}');
		const menuEl = getMenu();
		expect(menuEl).toBeInTheDocument();
		expect(menuEl).toHaveFocus();

		trigger.focus();
		await userEvent.keyboard('{ }');
		expect(menuEl).not.toBeInTheDocument();
		expect(trigger).toHaveFocus();
	});

	it('should open pressing `ArrowDown` on trigger', async () => {
		const { trigger, getMenu, getMenuItems } = setup();

		trigger.focus();
		await userEvent.keyboard('{arrowdown}');
		expect(getMenu()).toBeInTheDocument();
		expect(getMenuItems().at(0)).toHaveFocus();
	});

	it('should open pressing `ArrowUp` on trigger', async () => {
		const { trigger, getMenu, getMenuItems } = setup();

		trigger.focus();
		await userEvent.keyboard('{arrowup}');
		expect(getMenu()).toBeInTheDocument();
		expect(getMenuItems().at(-1)).toHaveFocus();
	});

	it('should close pressing `Tab` on trigger', async () => {
		const { trigger, getMenu } = setup();

		trigger.focus();
		await userEvent.keyboard('{tab}');
		expect(getMenu()).not.toBeInTheDocument();
		expect(trigger).not.toHaveFocus();
	});

	it('should close pressing `Escape` on trigger', async () => {
		const { trigger, getMenu } = setup({ isOpen: true });

		trigger.focus();
		await userEvent.keyboard('{escape}');
		expect(getMenu()).not.toBeInTheDocument();
		expect(trigger).toHaveFocus();
	});

	it('should close pressing `Escape` inside menu', async () => {
		const { trigger, getMenu, getMenuItems } = setup({ isOpen: true });

		const item = getMenuItems()[0];
		item.focus();
		expect(item).toHaveFocus();

		await userEvent.keyboard('{escape}');
		expect(getMenu()).not.toBeInTheDocument();
		expect(trigger).toHaveFocus();
	});

	it('should close pressing `Tab` inside menu', async () => {
		const { trigger, getMenu, getMenuItems } = setup({ isOpen: true });

		const item = getMenuItems()[0];
		item.focus();
		expect(item).toHaveFocus();

		await userEvent.keyboard('{tab}');
		expect(getMenu()).not.toBeInTheDocument();
		expect(trigger).not.toHaveFocus();
	});

	it('should close on click outside', async () => {
		const { trigger, getMenu } = setup({ isOpen: true });

		await user.click(document.body);
		expect(getMenu()).not.toBeInTheDocument();
		expect(trigger).not.toHaveFocus();
	});

	it('should navigate the options using keyboard', async () => {
		const { open, getMenuItems } = setup();
		const getTabIndexes = () => getMenuItems().map((e) => e.getAttribute('tabindex'));

		await open();

		await userEvent.keyboard('{arrowdown}');
		expect(getMenuItems().at(0)).toHaveFocus();
		expect(getTabIndexes()).toEqual(['0', '-1', '-1', '-1']);

		await userEvent.keyboard('{arrowdown}');
		expect(getMenuItems().at(1)).toHaveFocus();
		expect(getTabIndexes()).toEqual(['-1', '0', '-1', '-1']);

		await userEvent.keyboard('{end}');
		expect(getMenuItems().at(3)).toHaveFocus();
		expect(getTabIndexes()).toEqual(['-1', '-1', '-1', '0']);

		await userEvent.keyboard('{home}');
		expect(getMenuItems().at(0)).toHaveFocus();
		expect(getTabIndexes()).toEqual(['0', '-1', '-1', '-1']);
	});
});
