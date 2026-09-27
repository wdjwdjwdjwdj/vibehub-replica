import { expect, test } from '@playwright/test';

const base = process.env.VIBEHUB_BASE_URL || 'http://127.0.0.1:5174';

test('VibeHub P1 frontend shell and practice interaction', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  await page.addInitScript(() => {
    localStorage.setItem('vibehub-source-survey-shown-v1', '1');
    Math.random = () => 0;
  });

  await page.goto(`${base}/en`);
  await expect(page).toHaveTitle('起站 | Vibe Coding Terms');
  await expect(page.getByRole('heading', { name: 'Frontend Terms for Vibe Coding' })).toBeVisible();
  await expect(page.locator('iframe')).toHaveCount(0);

  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page.getByRole('dialog', { name: 'Sync your learning progress.' })).toBeVisible();
  await page.getByRole('button', { name: 'Close account dialog' }).click();

  await page.goto(`${base}/en/practice`);
  await expect(page.locator('#practice-question-title')).toBeVisible();
  await page.locator('.practice-options button').first().click();
  await expect(page.locator('.practice-judgment-error, .practice-judgment-success')).toBeVisible();
  expect(errors, errors.join('\n')).toEqual([]);
});

test('VibeHub practice remains usable on a narrow viewport', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.addInitScript(() => localStorage.setItem('vibehub-source-survey-shown-v1', '1'));
  await page.goto(`${base}/en/practice`);
  await expect(page.locator('#practice-question-title')).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
});
