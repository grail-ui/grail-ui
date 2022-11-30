import { test, expect } from '@playwright/experimental-ct-svelte';
import PaginationTest from './PaginationTest.svelte';

test.describe('Pagination', () => {
  test('should work', async ({ mount }) => {
    const component = await mount(PaginationTest, { props: { options: { total: 172, page: 1 } } });

    const buttons = component.locator('nav button');
    await expect(buttons.nth(0)).toBeDisabled();
    await expect(buttons.nth(0)).toContainText('previous');

    await expect(buttons.nth(1)).toBeEnabled();
    await expect(buttons.nth(1)).toContainText('1');
    await expect(buttons.nth(1)).toHaveClass(/active/);
  });
});
