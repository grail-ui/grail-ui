import { test, expect } from '@playwright/experimental-ct-svelte';
import ClickOutsideSpec from './ClickOutsideSpec.svelte';

test.use({ viewport: { width: 500, height: 500 } });

test('should work', async ({ mount, page }) => {
  await mount(ClickOutsideSpec);

  const counter = page.getByTestId('counter');
  await expect(counter).toHaveText('0');

  const outsideEl = page.getByTestId('outside');
  await outsideEl.click();
  await expect(counter).toHaveText('1');

  const insideEl = page.getByTestId('inside');
  await insideEl.click();
  await expect(counter).toHaveText('1');
});
