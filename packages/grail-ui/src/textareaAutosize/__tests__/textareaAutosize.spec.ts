import { test, expect } from '@playwright/experimental-ct-svelte';
import TextareaAutosizeTest from './TextareaAutosizeTest.svelte';

test('TextareaAutosize', async ({ mount, page }) => {
	await mount(TextareaAutosizeTest);

	const locator = page.getByRole('textbox');
	let height: string;

	height = await locator.evaluate((el) => window.getComputedStyle(el).getPropertyValue('height'));
	expect(parseInt(height)).toBe(16);

	await locator.type('test \ntest');

	height = await locator.evaluate((el) => window.getComputedStyle(el).getPropertyValue('height'));
	expect(parseInt(height)).toBeGreaterThan(16);
});
