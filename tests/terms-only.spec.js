import { expect, test } from '@playwright/test';

const base = process.env.VIBEHUB_BASE_URL || 'http://127.0.0.1:5174';

test('terms path searches, saves locally, and never calls the legacy API', async ({ page }) => {
  const apiRequests = [];
  page.on('request', (request) => {
    if (new URL(request.url()).pathname.startsWith('/api/')) apiRequests.push(request.url());
  });

  await page.goto(`${base}/en`, { waitUntil: 'networkidle' });
  await expect(page.getByRole('link', { name: 'Terms', exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Practice', exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Courses', exact: true })).toHaveCount(0);
  await expect(page.locator('.site-footer a[href^="http"]')).toHaveCount(0);

  const allCardCount = await page.locator('.term-card').count();
  await page.getByRole('textbox', { name: 'Search terms and components' }).fill('button');
  await expect(page.locator('.term-card[data-id="button"]')).toBeVisible();
  expect(await page.locator('.term-card').count()).toBeLessThan(allCardCount);

  const card = page.locator('.term-card[data-id="button"]');
  const termId = await card.getAttribute('data-id');
  await card.getByRole('button').click();
  await page.reload({ waitUntil: 'networkidle' });
  await expect(page.locator(`.term-card[data-id="${termId}"]`).getByRole('button')).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: /Saved/ }).click();
  await expect(page.getByRole('heading', { name: 'Saved terms' })).toBeVisible();
  await expect(page.locator(`.term-card[data-id="${termId}"]`)).toBeVisible();
  expect(apiRequests).toEqual([]);
});

test('practice is part of the term path; unrelated experiences remain hidden', async ({ page }) => {
  await page.goto(`${base}/en/button`);
  await page.getByRole('link', { name: 'Practice this term' }).click();
  await expect(page).toHaveURL(/\/en\/practice\?term=button/);
  await expect(page.locator('#practice-question-title')).toBeVisible();

  for (const path of ['/anti-ai-flavor', '/vibehub-skill', '/changelog', '/courses/product-website']) {
    await page.goto(`${base}${path}`);
    await expect(page.getByRole('heading', { name: '这个页面不在术语图鉴里。' })).toBeVisible();
  }
});

test('saved terms update in an already-open favorites tab', async ({ page }) => {
  const favoritesPage = await page.context().newPage();
  await favoritesPage.goto(`${base}/en/favorites`, { waitUntil: 'networkidle' });
  await expect(favoritesPage.getByRole('heading', { name: 'Saved terms', exact: true })).toBeVisible();

  await page.goto(`${base}/en/topics/backend`, { waitUntil: 'networkidle' });
  const card = page.locator('.term-card').first();
  const termId = await card.getAttribute('data-id');
  await card.getByRole('button').click();

  await expect(favoritesPage.locator(`.term-card[data-id="${termId}"]`)).toBeVisible();
  await favoritesPage.close();
});

test('terms pages remain usable at 390px', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const path of ['/en', '/en/topics/frontend', '/en/button', '/en/practice']) {
    await page.goto(`${base}${path}`);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  }
});
