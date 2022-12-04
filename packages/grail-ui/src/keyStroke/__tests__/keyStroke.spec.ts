import { test, expect } from '@playwright/experimental-ct-svelte';
import KeyStrokeTest from './KeyStrokeTest.svelte';

test.describe('Key Stroke', () => {
	test('should work', async ({ mount, page }) => {
		await mount(KeyStrokeTest);

		const keyPressedDiv = await page.locator('div[data-testid="key"]');

		await expect(keyPressedDiv).toContainText('Not pressed yet');

		await page.dispatchEvent('div[data-testid="key"]', 'keydown', { key: 'a' });

		await expect(keyPressedDiv).toContainText('Key pressed');
	});
});
