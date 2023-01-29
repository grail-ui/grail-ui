import type { TabsConfig, TabsTriggerParams } from '../tabs.types';
import { tick } from 'svelte';
import { describe, beforeEach, expect, it, vi } from 'vitest';
import { render, screen, within } from '@testing-library/svelte';
import { configureAxe } from 'jest-axe';
import userEvent from '@testing-library/user-event';
import TabsTest from './TabsTest.svelte';

const axe = configureAxe({
	rules: {
		region: { enabled: false },
	},
});

const defaultProps: Partial<TabsConfig> & { items?: TabsTriggerParams<string>[] } = {
	orientation: 'horizontal',
	activationMode: 'automatic',
	items: [{ value: 'tab-1' }, { value: 'tab-2' }, { value: 'tab-3' }],
};

const expectActive = (root: HTMLElement, expected: boolean[]) => {
	const triggers = within(root).getAllByRole('tab');
	const contents = within(root).getAllByRole('tabpanel', { hidden: true });
	triggers.forEach((trigger, index) => {
		const content = contents[index];
		const isActive = expected[index];

		expect(trigger.getAttribute('aria-controls')).toEqual(content.id);
		expect(trigger.getAttribute('tabindex')).toEqual(isActive ? '0' : '-1');
		expect(trigger.getAttribute('aria-selected')).toEqual(`${isActive}`);
		expect(content).toHaveAttribute('role', 'tabpanel');
		expect(content.getAttribute('aria-labelledby')).toEqual(trigger.id);
		expect(content.getAttribute('hidden')).toEqual(isActive ? null : 'true');
	});
};

describe('Tabs', () => {
	const setup = (
		props: Partial<TabsConfig> & { items?: TabsTriggerParams<string>[] } = defaultProps
	) => {
		const utils = render(TabsTest, { props: { ...defaultProps, ...props } });

		const root = utils.container.firstElementChild as HTMLElement;
		const triggers = screen.getAllByRole('tab');
		const contents = screen.getAllByRole('tabpanel', { hidden: true });
		const content = screen.getByRole('tabpanel');

		return {
			root,
			triggers,
			contents,
			content,
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
			const isActive = index === 0;
			expect(trigger.getAttribute('aria-controls')).toEqual(content.id);
			expect(trigger.getAttribute('tabindex')).toEqual(isActive ? '0' : '-1');
			expect(trigger.getAttribute('aria-selected')).toEqual(`${isActive}`);
			expect(content).toHaveAttribute('role', 'tabpanel');
			expect(content.getAttribute('aria-labelledby')).toEqual(trigger.id);
			expect(content.getAttribute('hidden')).toEqual(isActive ? null : 'true');
		});
	});

	it('should render correctly active tab', () => {
		const { root } = setup();
		expectActive(root, [true, false, false]);
	});

	it('should render active tab based on tab value', () => {
		const { root } = setup({ value: 'tab-2' });
		expectActive(root, [false, true, false]);
	});

	it('should render correctly disabled triggers', () => {
		const { triggers } = setup({ items: [{ value: 'tab-1', disabled: true }, { value: 'tab-2' }] });

		triggers.forEach((trigger, index) => {
			const isDisabled = index === 0;

			if (isDisabled) {
				expect(trigger).toHaveAttribute('data-disabled');
				expect(trigger).toBeDisabled();
			}
		});
	});

	describe('keyboard navigation', () => {
		describe('horizontal', () => {
			let triggers: HTMLElement[];

			beforeEach(() => {
				({ triggers } = setup());
				triggers[0].focus();
			});

			it('should move focus to the next trigger', async () => {
				await userEvent.keyboard('{arrowright}');
				expect(triggers[1]).toHaveFocus();
			});

			it('should move focus to the previous trigger', async () => {
				await userEvent.keyboard('{arrowleft}');
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

		describe('vertical', () => {
			let triggers: HTMLElement[];

			beforeEach(() => {
				({ triggers } = setup({ orientation: 'vertical' }));
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
	});

	describe('activation mode', () => {
		let triggers: HTMLElement[];
		let container: HTMLElement;
		let root: HTMLElement;
		const onValueChangeSpy = vi.fn();

		describe('automatic', () => {
			describe('when focusing a trigger', () => {
				beforeEach(() => {
					({ container, root, triggers } = setup({ onValueChange: onValueChangeSpy }));
					triggers[1].focus();
				});

				it('should activate the respective tab', () => {
					expectActive(root, [false, true, false]);
				});

				it('should have no accessibility violations', async () => {
					expect(await axe(container)).toHaveNoViolations();
				});

				it('should call onValueChange', () => {
					expect(onValueChangeSpy).toHaveBeenLastCalledWith('tab-2');
				});

				it('should handle subsequent trigger click properly', async () => {
					triggers[0].focus();
					await tick();
					expect(onValueChangeSpy).toHaveBeenLastCalledWith('tab-1');
					expectActive(root, [true, false, false]);
				});
			});
		});

		describe('manual', () => {
			describe('when clicking a trigger', () => {
				beforeEach(async () => {
					({ container, root, triggers } = setup({ onValueChange: onValueChangeSpy }));
					await userEvent.click(triggers[1]);
				});

				it('should activate the respective tab', () => {
					expectActive(root, [false, true, false]);
				});

				it('should have no accessibility violations', async () => {
					expect(await axe(container)).toHaveNoViolations();
				});

				it('should call onValueChange', () => {
					expect(onValueChangeSpy).toHaveBeenLastCalledWith('tab-2');
				});

				it('should handle subsequent trigger click properly', async () => {
					await userEvent.click(triggers[0]);
					expect(onValueChangeSpy).toHaveBeenLastCalledWith('tab-1');
					expectActive(root, [true, false, false]);
				});
			});
		});
	});
});
