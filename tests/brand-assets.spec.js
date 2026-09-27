import { expect, test } from '@playwright/test';

const base = process.env.VIBEHUB_BASE_URL || 'http://127.0.0.1:5174';

test('brand mark is used by the header, favicon demos, and accessibility demo without asset failures', async ({ page }) => {
  const assetFailures = [];
  page.on('response', (response) => {
    if (new URL(response.url()).pathname.startsWith('/assets/') && response.status() >= 400) assetFailures.push(`${response.status()} ${response.url()}`);
  });

  for (const path of ['/en/favicon', '/en/app-icon', '/en/logo', '/en/accessibility']) {
    await page.goto(`${base}${path}`, { waitUntil: 'networkidle' });
    await expect(page.locator('img[src="/assets/brand-mark.svg"]').first()).toBeVisible();
  }

  expect(assetFailures).toEqual([]);
});
