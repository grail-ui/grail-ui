import { test, expect } from '@playwright/experimental-ct-svelte';
import ScriptTagTest from './ScriptTagTest.svelte';

test.describe('Script Tag', () => {
	test('should load', async ({ mount, page }) => {
		const scriptUrl = '/existing.js';
		await page.route(`**${scriptUrl}`, (route) => route.fulfill({}));

		await mount(ScriptTagTest, { props: { scriptUrl } });

		const button = await page.getByRole('button', { name: 'Load' });
		const resultEl = await page.locator('div[data-testid="result"]');

		await expect(resultEl).toContainText('');

		await button.click();
		await expect(resultEl).toContainText('loaded');

		const scriptEl = page.locator(`script[src="${scriptUrl}"]`);
		await expect(scriptEl).toHaveAttribute('data-loaded', 'true');
	});

	test('handle wrong url', async ({ mount, page }) => {
		const scriptUrl = '/404.js';

		await mount(ScriptTagTest, { props: { scriptUrl } });

		const button = await page.getByRole('button', { name: 'Load' });
		const resultEl = await page.locator('div[data-testid="result"]');

		await expect(resultEl).toContainText('');

		await button.click();
		await expect(resultEl).toContainText('error');

		const scriptEl = page.locator(`script[src="${scriptUrl}"]`);
		await expect(scriptEl).toHaveAttribute('data-loaded', 'false');
	});
});
