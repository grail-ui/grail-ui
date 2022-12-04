import { test, expect } from '@playwright/experimental-ct-svelte';
import NumberInputSpec from './NumberInputSpec.svelte';

const inputSelector = 'input[data-testid="input"]';
const incSelector = 'button[data-testid="increment"]';
const decSelector = 'button[data-testid="decrement"]';
const bindValueSelector = 'input[data-testid="value"]';
const stepSelector = 'input[data-testid="step"]';

test.describe('Number input', () => {
	test.describe('when typing into the input', () => {
		test('should work', async ({ mount, page }) => {
			await mount(NumberInputSpec);
			const input = page.locator(inputSelector);

			await page.type(inputSelector, '12');
			await page.keyboard.press('Backspace');
			await page.keyboard.press('Backspace');

			await expect(input).toHaveValue('');
		});

		test('should clamp value when blurred', async ({ mount, page }) => {
			await mount(NumberInputSpec);
			const input = page.locator(inputSelector);

			await page.focus(inputSelector);
			await page.type(inputSelector, '200');
			await input.dispatchEvent('focusout');
			await expect(input).toHaveValue('100');
		});

		test('should not clamp value when input is empty', async ({ mount, page }) => {
			await mount(NumberInputSpec);
			const input = page.locator(inputSelector);

			await page.focus(inputSelector);
			await page.type(inputSelector, '5');
			await page.keyboard.press('Backspace');
			await input.dispatchEvent('focusout');
			await expect(input).toHaveValue('');
		});
	});

	test.describe('when using keyboard arrow in the input', () => {
		test('should increment the value', async ({ mount, page }) => {
			await mount(NumberInputSpec);
			const input = page.locator(inputSelector);

			await page.type(inputSelector, '5');
			await page.keyboard.press('ArrowUp');
			await expect(input).toHaveValue('6');
		});

		test('should decrement the value', async ({ mount, page }) => {
			await mount(NumberInputSpec);
			const input = page.locator(inputSelector);

			await page.type(inputSelector, '5');
			await page.keyboard.press('ArrowDown');
			await page.keyboard.press('ArrowDown');
			await expect(input).toHaveValue('3');
		});

		test('should show min/max for home/end keys', async ({ mount, page }) => {
			await mount(NumberInputSpec);
			const input = page.locator(inputSelector);

			await page.type(inputSelector, '5');
			await page.keyboard.press('Home');
			await expect(input).toHaveValue('-100');
			await page.keyboard.press('End');
			await expect(input).toHaveValue('100');
		});

		test('should change 10 steps on shift arrow', async ({ mount, page }) => {
			await mount(NumberInputSpec);
			const input = page.locator(inputSelector);

			await page.type(inputSelector, '0');
			await page.keyboard.press('ArrowUp');
			await expect(input).toHaveValue('1');
			await page.keyboard.press('Shift+ArrowUp');
			await expect(input).toHaveValue('11');
			await page.keyboard.press('Shift+ArrowDown');
			await expect(input).toHaveValue('1');
			await page.keyboard.press('ArrowDown');
			await expect(input).toHaveValue('0');
		});

		test('should change for 0.1 steps', async ({ mount, page }) => {
			await mount(NumberInputSpec);
			const input = page.locator(inputSelector);

			await page.locator(stepSelector).fill('0.10');
			await page.type(inputSelector, '0.50');

			await page.keyboard.press('ArrowUp');
			await expect(input).toHaveValue('0.6');

			await page.keyboard.press('ArrowDown');
			await expect(input).toHaveValue('0.5');
		});
	});

	test.describe('when using the spinner', () => {
		const tick = (n: number) => 400 + 60 * (n - 1);

		test('should spin value on increment long press', async ({ mount, page }) => {
			await mount(NumberInputSpec);
			const input = page.locator(inputSelector);
			const inc_btn = page.locator(incSelector);

			await inc_btn.dispatchEvent('pointerdown');
			await page.waitForTimeout(tick(10));
			await inc_btn.dispatchEvent('pointerup');

			await expect(input).toHaveValue('10');
		});

		test('should spin value on decrement long press', async ({ mount, page }) => {
			await mount(NumberInputSpec);
			const input = page.locator(inputSelector);
			const dec_btn = page.locator(decSelector);

			await page.type(inputSelector, '20');
			await dec_btn.dispatchEvent('pointerdown');
			await page.waitForTimeout(tick(10));
			await dec_btn.dispatchEvent('pointerup');

			await expect(input).toHaveValue('10');
		});
	});

	test('should increment/decrement correctly when input changes from bind value', async ({
		mount,
		page,
	}) => {
		await mount(NumberInputSpec);
		const input = page.locator(inputSelector);
		const inc_btn = page.locator(incSelector);
		const dec_btn = page.locator(decSelector);

		await expect(input).toHaveValue('');
		await page.type(bindValueSelector, '4');
		await expect(input).toHaveValue('4');
		await inc_btn.click();
		await expect(input).toHaveValue('5');
		await dec_btn.click();
		await expect(input).toHaveValue('4');
	});
});
