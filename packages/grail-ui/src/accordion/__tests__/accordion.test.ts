/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { AccordionConfig } from '../accordion.types';
import { describe, beforeEach, expect, it, vi } from 'vitest';
import { render, within } from '@testing-library/svelte';
import { axe } from 'jest-axe';
import userEvent from '@testing-library/user-event';
import AccordionTest from './AccordionTest.svelte';

const defaultProps = {
	items: ['item-1', 'item-2', 'item-3'],
	multiple: false,
};

const getElements = (item: HTMLElement) => {
	const utils = within(item);
	const trigger = utils.getByTestId('trigger');
	const content = utils.getByTestId('content');

	return { trigger, content };
};

const expectOpen = (root: HTMLElement, expected: boolean[]) => {
	const items = within(root).getAllByRole('listitem');
	items.forEach((item, index) => {
		const isExpanded = expected[index];
		const { trigger, content } = getElements(item);
		expect(trigger).toHaveAttribute('aria-expanded', `${isExpanded}`);
		expect(content.getAttribute('inert')).toEqual(isExpanded ? null : 'true');
	});
};

const expectDisabled = (root: HTMLElement, expected: boolean[]) => {
	const items = within(root).getAllByRole('listitem');
	items.forEach((item, index) => {
		const isDisabled = expected[index];
		const { trigger } = getElements(item);

		if (isDisabled) {
			expect(trigger).toBeDisabled();
		}
	});
};

describe('Accordion', () => {
	const setup = (
		props: Partial<AccordionConfig<string>> & {
			items?: string[];
		} = defaultProps
	) => {
		const utils = render(AccordionTest, { props: { ...defaultProps, ...props } });

		const root = utils.getByRole('list');
		const items = utils.getAllByRole('listitem');
		const triggers = utils.getAllByTestId('trigger');
		const contents = utils.getAllByTestId('content');

		return {
			root,
			items,
			triggers,
			contents,
			...utils,
		};
	};

	it('should have no accessibility violations in default state', async () => {
		const { container } = setup();

		expect(await axe(container)).toHaveNoViolations();
	});

	it('should render the appropriate attributes based on selection', () => {
		const { triggers, contents } = setup();

		contents.forEach((content, index) => {
			const trigger = triggers[index];

			expect(content).toHaveAttribute('role', 'region');
			expect(trigger.getAttribute('aria-controls')).toEqual(content.id);
			expect(content.getAttribute('aria-labelledby')).toEqual(trigger.id);
		});
	});

	it('should render correctly disabled accordion', () => {
		const { root } = setup({ disabled: true });

		expectDisabled(root, [true, true, true]);
	});

	it('should render correctly single disabled item', () => {
		const { root } = setup({ disabled: 'item-1' });

		expectDisabled(root, [true, false, false]);
	});

	it('should render correctly multiple disabled items', () => {
		const { root } = setup({ disabled: ['item-1', 'item-2'] });

		expectDisabled(root, [true, true, false]);
	});

	describe('keyboard navigation', () => {
		let triggers: HTMLElement[];

		beforeEach(() => {
			({ triggers } = setup());
			triggers[0].focus();
		});

		it('should move focus to the next trigger', async () => {
			await userEvent.keyboard('{arrowdown}');

			expect(triggers[1]).toHaveFocus();
		});

		it('should move focus to the previous trigger', async () => {
			await userEvent.keyboard('{arrowup}');

			expect(triggers[2]).toHaveFocus();
		});

		it('should move focus to the first trigger', async () => {
			await userEvent.keyboard('{home}');

			expect(triggers[0]).toHaveFocus();
		});

		it('should move focus to the last trigger', async () => {
			await userEvent.keyboard('{end}');

			expect(triggers[2]).toHaveFocus();
		});
	});

	describe('single', () => {
		const onValueChangeSpy = vi.fn();

		afterEach(() => {
			vi.clearAllMocks();
		});

		it('should render correctly open and closed items', () => {
			const { root } = setup({ value: 'item-1' });

			expectOpen(root, [true, false, false]);
		});

		it('should have no accessibility violations', async () => {
			const { container } = setup({ value: 'item-1' });

			expect(await axe(container)).toHaveNoViolations();
		});

		it('should call onValueChange', async () => {
			const { triggers } = setup({ onValueChange: onValueChangeSpy });
			await userEvent.click(triggers[0]);

			expect(onValueChangeSpy).toHaveBeenLastCalledWith('item-1');
		});

		it('should handle subsequent trigger click properly', async () => {
			const { triggers } = setup({ onValueChange: onValueChangeSpy });
			await userEvent.click(triggers[0]);
			await userEvent.click(triggers[1]);

			expect(onValueChangeSpy).toHaveBeenLastCalledWith('item-2');
		});
	});

	describe('multiple', () => {
		const onValueChangeSpy = vi.fn();

		afterEach(() => {
			vi.clearAllMocks();
		});

		it('should render correctly open and closed items', () => {
			const { root } = setup({ multiple: true, value: ['item-1', 'item-2'] });

			expectOpen(root, [true, true, false]);
		});

		it('should have no accessibility violations', async () => {
			const { container } = setup({ multiple: true, value: ['item-1', 'item-2'] });

			expect(await axe(container)).toHaveNoViolations();
		});

		it('should call onValueChange', async () => {
			const { triggers } = setup({ multiple: true, onValueChange: onValueChangeSpy });
			await userEvent.click(triggers[0]);

			expect(onValueChangeSpy).toHaveBeenLastCalledWith(['item-1']);
		});

		it('should handle subsequent trigger click properly', async () => {
			const { triggers } = setup({ multiple: true, onValueChange: onValueChangeSpy });
			await userEvent.click(triggers[0]);
			await userEvent.click(triggers[1]);

			expect(onValueChangeSpy).toHaveBeenLastCalledWith(['item-1', 'item-2']);
		});
	});
});
