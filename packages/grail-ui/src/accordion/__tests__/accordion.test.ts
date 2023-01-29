/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { AccordionItemParams, AccordionConfig, AccordionType } from '../accordion.types';
import { describe, beforeEach, expect, it, vi } from 'vitest';
import { render, within } from '@testing-library/svelte';
import { axe } from 'jest-axe';
import userEvent from '@testing-library/user-event';
import Accordion from './Accordion.svelte';

const defaultProps = {
	items: [{ value: 'item-1' }, { value: 'item-2' }, { value: 'item-3' }],
	type: 'single' as AccordionType,
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

		[item, trigger, content].forEach((element) => {
			expect(element).toHaveAttribute('data-state', isExpanded ? 'open' : 'closed');
		});
		expect(trigger).toHaveAttribute('aria-expanded', `${isExpanded}`);
		expect(content.getAttribute('inert')).toEqual(isExpanded ? null : 'true');
	});
};

const expectDisabled = (root: HTMLElement, expected: boolean[]) => {
	const items = within(root).getAllByRole('listitem');
	items.forEach((item, index) => {
		const isDisabled = expected[index];
		const { trigger, content } = getElements(item);

		if (isDisabled) {
			expect(trigger).toBeDisabled();
		}

		[item, trigger, content].forEach((element) => {
			if (isDisabled) {
				expect(element).toHaveAttribute('data-disabled');
			} else {
				expect(element).not.toHaveAttribute('data-disabled');
			}
		});
	});
};

describe('Accordion', () => {
	const setup = (
		props: Partial<AccordionConfig<string>> & {
			items?: AccordionItemParams<string>[];
		} = defaultProps
	) => {
		const utils = render(Accordion, { props: { ...defaultProps, ...props } });

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

	it('should render correctly open and closed items', () => {
		const { root } = setup({ value: ['item-2'] });
		expectOpen(root, [false, true, false]);
	});

	it('should render correctly disabled accordion', () => {
		const { root } = setup({ disabled: true });
		expectDisabled(root, [true, true, true]);
	});

	it('should render correctly disabled items', () => {
		const { root } = setup({ items: [{ value: 'item-1', disabled: true }, { value: 'item-2' }] });
		expectDisabled(root, [true, false]);
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
		let triggers: HTMLElement[];
		let container: HTMLElement;
		let root: HTMLElement;
		const onValueChangeSpy = vi.fn();

		describe('when clicking a trigger', () => {
			beforeEach(async () => {
				({ container, root, triggers } = setup({ onValueChange: onValueChangeSpy }));
				await userEvent.click(triggers[0]);
			});

			it('should toggle the respective accordion item', () => {
				expectOpen(root, [true, false, false]);
			});

			it('should have no accessibility violations', async () => {
				expect(await axe(container)).toHaveNoViolations();
			});

			it('should call onValueChange', () => {
				expect(onValueChangeSpy).toHaveBeenLastCalledWith('item-1');
			});

			it('should handle subsequent trigger click properly', async () => {
				await userEvent.click(triggers[1]);
				expect(onValueChangeSpy).toHaveBeenLastCalledWith('item-2');
				expectOpen(root, [false, true, false]);
			});
		});
	});

	describe('multiple', () => {
		let triggers: HTMLElement[];
		let container: HTMLElement;
		let root: HTMLElement;
		const onValueChangeSpy = vi.fn();

		describe('when clicking a trigger', () => {
			beforeEach(async () => {
				({ container, root, triggers } = setup({
					type: 'multiple',
					onValueChange: onValueChangeSpy,
				}));
				await userEvent.click(triggers[0]);
			});

			it('should toggle the respective accordion item', () => {
				expectOpen(root, [true, false, false]);
			});

			it('should have no accessibility violations', async () => {
				expect(await axe(container)).toHaveNoViolations();
			});

			it('should call onValueChange', () => {
				expect(onValueChangeSpy).toHaveBeenLastCalledWith(['item-1']);
			});

			it('should handle subsequent trigger click properly', async () => {
				await userEvent.click(triggers[1]);
				expect(onValueChangeSpy).toHaveBeenLastCalledWith(['item-1', 'item-2']);
				expectOpen(root, [true, true, false]);
			});
		});
	});
});
