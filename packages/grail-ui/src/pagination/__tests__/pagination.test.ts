import type { PaginationConfig } from '../pagination.types';
import { vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import { axe } from 'jest-axe';
import { tick } from 'svelte';
import PaginationTest from './PaginationTest.svelte';

function getButtons(): HTMLButtonElement[] {
	return screen.getAllByRole('button');
}

function expectPages(expectation: string[]): void {
	const pages = getButtons().map((el: HTMLButtonElement) => {
		let text = el.textContent?.trim() || '';
		if (el.classList.contains('active') && el.getAttribute('aria-current') === 'page') {
			text = '+' + text;
		}
		if (el.disabled && el.classList.contains('disabled')) {
			text = '-' + text;
		}
		return text;
	});

	expect(pages).toEqual(expectation);
}

function expectStartEnd(expectation: string): void {
	expect(screen.getByTestId('show').innerHTML).toEqual(expectation);
}

async function updatePage(component: any, value: number) {
	component.updatePage(value);
	await tick();
}

describe('Pagination', () => {
	function setup(options: Partial<PaginationConfig> | undefined = undefined) {
		return render(PaginationTest, { options });
	}

	it('should render the pages correctly', async () => {
		setup();
		expectPages(['previous', '1', '+2', '3', '4', 'next']);
		expectStartEnd('11-20 of 33');

		const nav = screen.getByRole('navigation');
		expect(nav).toHaveAttribute('aria-label', 'Pagination Navigation');
		expect(await axe(nav)).toHaveNoViolations();

		const buttons = getButtons();
		expect(buttons[0]).toHaveAccessibleName('Goto Page 1');
		expect(buttons[1]).toHaveAccessibleName('Goto Page 1');
		expect(buttons[2]).toHaveAccessibleName('Goto Page 2');
		expect(buttons[3]).toHaveAccessibleName('Goto Page 3');
		expect(buttons[4]).toHaveAccessibleName('Goto Page 4');
		expect(buttons[5]).toHaveAccessibleName('Goto Page 3');
	});

	it('should call `onPageChange` only when page changes', () => {
		const spy = vi.fn();
		setup({ onPageChange: spy });

		const buttons = getButtons();
		buttons[2].click();
		expect(spy).not.toHaveBeenCalled();

		expect(spy).not.toHaveBeenCalledWith(4);
		buttons[4].click();
		expect(spy).toHaveBeenCalledWith(4);

		expect(spy).not.toHaveBeenCalledWith(1);
		buttons[1].click();
		expect(spy).toHaveBeenCalledWith(1);
	});

	it('should move to the requested page when clicking on `Previous` and `Next`', () => {
		const spy = vi.fn();
		setup({ onPageChange: spy });

		const buttons = getButtons();

		expect(spy).not.toHaveBeenCalled();
		buttons[0].click();
		expect(spy).toHaveBeenCalledWith(1);

		buttons[5].click();
		expect(spy).toHaveBeenCalledWith(3);
	});

	it('should handle edges correctly', async () => {
		const { component } = setup();
		const buttons = getButtons();

		await updatePage(component, 1);
		expectPages(['-previous', '+1', '2', '3', '4', 'next']);
		expectStartEnd('1-10 of 33');
		expect(buttons[0]).not.toHaveAttribute('aria-label');
		expect(buttons[5]).toHaveAccessibleName('Goto Page 2');

		await updatePage(component, 4);
		expectPages(['previous', '1', '2', '3', '+4', '-next']);
		expectStartEnd('31-33 of 33');
		expect(buttons[0]).toHaveAccessibleName('Goto Page 3');
		expect(buttons[5]).not.toHaveAttribute('aria-label');
	});

	it('should hide previous & next', async () => {
		const { component } = setup({ hidePrevButton: true, hideNextButton: true });

		await updatePage(component, 1);
		expectPages(['+1', '2', '3', '4']);

		await updatePage(component, 4);
		expectPages(['1', '2', '3', '+4']);
	});

	it('should show first & last', async () => {
		const { component } = setup({ hideFirstButton: false, hideLastButton: false });

		await updatePage(component, 1);
		expectPages(['-first', '-previous', '+1', '2', '3', '4', 'next', 'last']);

		await updatePage(component, 4);
		expectPages(['first', 'previous', '1', '2', '3', '+4', '-next', '-last']);
	});

	it('has no ellipses when pages <= 7', () => {
		setup({ total: 70 });
		expectPages(['previous', '1', '+2', '3', '4', '5', '6', '7', 'next']);
	});

	it('has an end ellipsis by default when pages >= 8', () => {
		setup({ total: 80 });
		expectPages(['previous', '1', '+2', '3', '4', '5', '-ellipsis-end', '8', 'next']);
	});

	it('has a start ellipsis when page >= 5', () => {
		setup({ total: 80, page: 5 });
		expectPages(['previous', '1', '-ellipsis-start', '4', '+5', '6', '7', '8', 'next']);
	});

	it('has start & end ellipsis when pages >= 9', () => {
		setup({ total: 90, page: 5 });
		expectPages(['previous', '1', '-ellipsis-start', '4', '+5', '6', '-ellipsis-end', '9', 'next']);
	});

	it('can have a reduced `siblingCount`', () => {
		setup({ total: 70, page: 4, siblingCount: 0 });
		expectPages(['previous', '1', '-ellipsis-start', '+4', '-ellipsis-end', '7', 'next']);
	});

	it('can have an increased `siblingCount`', () => {
		setup({ total: 110, page: 6, siblingCount: 2 });
		expectPages([
			'previous',
			'1',
			'-ellipsis-start',
			'4',
			'5',
			'+6',
			'7',
			'8',
			'-ellipsis-end',
			'11',
			'next',
		]);
	});

	it('can have an increased `boundaryCount`', () => {
		setup({ total: 110, page: 6, boundaryCount: 2 });
		expectPages([
			'previous',
			'1',
			'2',
			'-ellipsis-start',
			'5',
			'+6',
			'7',
			'-ellipsis-end',
			'10',
			'11',
			'next',
		]);
	});

	it('should support zero `boundaryCount` & `siblingCount`', () => {
		setup({ total: 110, page: 6, boundaryCount: 0, siblingCount: 0 });
		expectPages(['previous', '-ellipsis-start', '+6', '-ellipsis-end', 'next']);
	});

	it('should support zero `boundaryCount` & reduced `siblingCount`', () => {
		setup({ total: 110, page: 6, boundaryCount: 0, siblingCount: 1 });
		expectPages(['previous', '-ellipsis-start', '5', '+6', '7', '-ellipsis-end', 'next']);
	});
});
