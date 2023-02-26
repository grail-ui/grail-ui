import type { ToggleGroupConfig } from '../toggle-group.types';
import { describe, beforeEach, expect, it, vi } from 'vitest';
import { render } from '@testing-library/svelte';
import { configureAxe } from 'jest-axe';
import userEvent from '@testing-library/user-event';
import ToggleGroupTest from './ToggleGroupTest.svelte';

const axe = configureAxe({
	rules: {
		region: { enabled: false },
	},
});

const expectPressed = (items: HTMLElement[], expected: boolean[], multiple = false) => {
	items.forEach((item, index) => {
		const isPressed = expected[index];

		expect(item).toHaveAttribute('tabindex', isPressed ? '0' : '-1');

		if (multiple) {
			expect(item).toHaveAttribute('aria-pressed', `${isPressed}`);
		} else {
			expect(item).toHaveAttribute('role', 'radio');
			expect(item).toHaveAttribute('aria-checked', `${isPressed}`);
		}
	});
};

const expectDisabled = (items: HTMLElement[], expected: boolean[]) => {
	items.forEach((item, index) => {
		const isDisabled = expected[index];

		if (isDisabled) {
			expect(item).toBeDisabled();
			expect(item).toHaveAttribute('data-disabled');
		}
	});
};

describe('ToggleGroup', () => {
	const setup = ({
		items = ['item-1', 'item-2', 'item-3'],
		multiple = false,
		...rest
	}: Partial<ToggleGroupConfig<string>> & {
		items?: string[];
	} = {}) => {
		const utils = render(ToggleGroupTest, {
			props: { items, multiple, ...rest },
		});

		const root = utils.getByRole('group');
		const _items = multiple ? utils.getAllByRole('button') : utils.getAllByRole('radio');

		return {
			root,
			items: _items,
			...utils,
		};
	};

	it('should have no accessibility violations in default state', async () => {
		const { container } = setup();

		expect(await axe(container)).toHaveNoViolations();
	});

	it('should render correctly disabled toggle group', () => {
		const { items } = setup({ disabled: true });

		expectDisabled(items, [true, true, true]);
	});

	it('should render correctly single toggle item', () => {
		const { items } = setup({ disabled: 'item-1' });

		expectDisabled(items, [true, false, false]);
	});

	it('should render correctly multiple disabled items', () => {
		const { items } = setup({ disabled: ['item-1', 'item-2'] });

		expectDisabled(items, [true, true, false]);
	});

	describe('keyboard navigation', () => {
		describe('horizontal', () => {
			let items: HTMLElement[];

			beforeEach(() => {
				({ items } = setup());
				items[0].focus();
			});

			it('should move focus to the next item', async () => {
				await userEvent.keyboard('{arrowright}');
				expect(items[1]).toHaveFocus();
			});

			it('should move focus to the previous item', async () => {
				await userEvent.keyboard('{arrowleft}');
				expect(items[2]).toHaveFocus();
			});

			it('should move focus to the first item', async () => {
				await userEvent.keyboard('{home}');
				expect(items[0]).toHaveFocus();
			});

			it('should move focus to the last item', async () => {
				await userEvent.keyboard('{end}');
				expect(items[2]).toHaveFocus();
			});
		});

		describe('vertical', () => {
			let items: HTMLElement[];

			beforeEach(() => {
				({ items } = setup({ orientation: 'vertical' }));
				items[0].focus();
			});

			it('should move focus to the next item', async () => {
				await userEvent.keyboard('{arrowdown}');
				expect(items[1]).toHaveFocus();
			});

			it('should move focus to the previous item', async () => {
				await userEvent.keyboard('{arrowup}');
				expect(items[2]).toHaveFocus();
			});

			it('should move focus to the first item', async () => {
				await userEvent.keyboard('{home}');
				expect(items[0]).toHaveFocus();
			});

			it('should move focus to the last item', async () => {
				await userEvent.keyboard('{end}');
				expect(items[2]).toHaveFocus();
			});
		});
	});

	describe('single', () => {
		const onValueChangeSpy = vi.fn();

		afterEach(() => {
			vi.clearAllMocks();
		});

		it('should render correctly pressed and unpressed items', () => {
			const { items } = setup({ value: 'item-1' });

			expectPressed(items, [true, false, false]);
		});

		it('should have no accessibility violations', async () => {
			const { container } = setup({ value: 'item-1' });

			expect(await axe(container)).toHaveNoViolations();
		});

		it('should call onValueChange', async () => {
			const { items } = setup({ onValueChange: onValueChangeSpy });
			await userEvent.click(items[0]);

			expect(onValueChangeSpy).toHaveBeenLastCalledWith('item-1');
		});

		it('should handle subsequent item click properly', async () => {
			const { items } = setup({ onValueChange: onValueChangeSpy });
			await userEvent.click(items[0]);
			await userEvent.click(items[1]);

			expect(onValueChangeSpy).toHaveBeenLastCalledWith('item-2');
		});
	});

	describe('multiple', () => {
		const onValueChangeSpy = vi.fn();

		afterEach(() => {
			vi.clearAllMocks();
		});

		it('should render correctly open and closed items', () => {
			const { items } = setup({ multiple: true, value: ['item-1', 'item-2'] });

			expectPressed(items, [true, true, false], true);
		});

		it('should have no accessibility violations', async () => {
			const { container } = setup({ multiple: true, value: ['item-1', 'item-2'] });

			expect(await axe(container)).toHaveNoViolations();
		});

		it('should call onValueChange', async () => {
			const { items } = setup({ multiple: true, onValueChange: onValueChangeSpy });
			await userEvent.click(items[0]);

			expect(onValueChangeSpy).toHaveBeenLastCalledWith(['item-1']);
		});

		it('should handle subsequent item click properly', async () => {
			const { items } = setup({ multiple: true, onValueChange: onValueChangeSpy });
			await userEvent.click(items[0]);
			await userEvent.click(items[1]);

			expect(onValueChangeSpy).toHaveBeenLastCalledWith(['item-1', 'item-2']);
		});
	});
});
