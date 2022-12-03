import { test, expect } from '@playwright/experimental-ct-svelte';
import TooltipTest from './TooltipTest.svelte';

test('should work', async ({ mount, page }) => {
	const component = await mount(TooltipTest);

	const button = component.locator('button[data-testid="trigger"]');
	await expect(button).toBeDefined();

	await button.hover();
	const tooltip = await page.locator('div[data-testid="tooltip"]');
	await expect(tooltip).toHaveCount(1);
});
