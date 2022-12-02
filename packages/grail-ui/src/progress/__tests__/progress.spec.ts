import { test, expect } from '@playwright/experimental-ct-svelte';
import ProgressTest from './ProgressTest.svelte';

test.describe('Progress', () => {
	test('should work', async ({ mount, page }) => {
		await mount(ProgressTest);

		const progressEl = page.locator('[data-testid="progress"]');
		await expect(progressEl).toHaveAttribute('role', 'progressbar');
		await expect(progressEl).toHaveAttribute('aria-valuemin', '0');
		await expect(progressEl).toHaveAttribute('aria-valuemax', '100');
		await expect(progressEl).toHaveAttribute('aria-valuenow', '30');
		await expect(progressEl).toHaveAttribute('aria-valuetext', '30%');
	});
});
