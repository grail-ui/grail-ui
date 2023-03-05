import { test, expect } from '@playwright/experimental-ct-svelte';
import ResizeObserverTest from './ResizeObserverTest.svelte';

test('ResizeObserver', async ({ mount, page }) => {
	await mount(ResizeObserverTest);

	const locator = await page.getByTestId('resizable');
	await expect(locator).toContainText('100px - 200px');

	const elementHandle = await locator.elementHandle();
	elementHandle?.evaluate((node) => (node.style.width = '350px'));
	await expect(locator).toContainText('350px - 200px');

	elementHandle?.evaluate((node) => (node.style.height = '420px'));
	await expect(locator).toContainText('350px - 420px');
});
