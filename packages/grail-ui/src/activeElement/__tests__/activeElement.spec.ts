import { test, expect } from '@playwright/experimental-ct-svelte';
import ActiveElementTest from './ActiveElementTest.svelte';

test.describe('ActiveElement', () => {
	test('should work', async ({ mount, page }) => {
		await mount(ActiveElementTest);

		const activeEl = page.getByTestId('activeKey');
		await expect(activeEl).toHaveText('null');

		const input1 = page.getByPlaceholder('input 1');
		await input1.focus();
		await expect(activeEl).toHaveText('1');

		const input2 = page.getByPlaceholder('input 2');
		await input2.focus();
		await expect(activeEl).toHaveText('2');
	});
});
