import { expect, test } from '@playwright/test';

const base = process.env.VIBEHUB_BASE_URL || 'http://127.0.0.1:5174';

test('account, favorites, and practice use the local backend', async ({ page }) => {
  const email = `e2e-${Date.now()}@example.com`;
  await page.addInitScript(() => localStorage.setItem('vibehub-source-survey-shown-v1', '1'));
  await page.goto(base);

  await page.getByRole('button', { name: '登录' }).click();
  await page.getByRole('button', { name: '还没有账号？注册' }).click();
  await page.getByLabel('昵称').fill('Backend E2E');
  await page.getByLabel('邮箱').fill(email);
  await page.getByLabel('密码').fill('backend-e2e-password');
  await page.getByRole('button', { name: '注册并登录' }).click();
  await expect(page.getByRole('button', { name: 'Backend E2E' })).toBeVisible();

  // Exercise the real sign-out/sign-in path as well as registration.
  await page.getByRole('button', { name: 'Backend E2E' }).click();
  await page.getByRole('button', { name: '退出登录' }).click();
  await page.getByRole('button', { name: '登录' }).click();
  await page.getByLabel('邮箱').fill(email);
  await page.getByLabel('密码').fill('backend-e2e-password');
  await page.getByRole('button', { name: '登录', exact: true }).last().click();
  await expect(page.getByRole('button', { name: 'Backend E2E' })).toBeVisible();

  const favoriteCard = page.locator('.term-card').first();
  const favoriteTermId = await favoriteCard.getAttribute('data-id');
  const favoriteRequest = page.waitForRequest((request) => request.url().endsWith('/api/favorites') && request.method() === 'PUT');
  const favoriteResponse = page.waitForResponse((response) => response.url().endsWith('/api/favorites') && response.request().method() === 'PUT');
  await favoriteCard.getByRole('button').click();
  const favoritePayload = JSON.parse((await favoriteRequest).postData());
  expect((await favoriteResponse).status()).toBe(200);
  expect(favoritePayload.termIds).toHaveLength(1);

  // Clear the anonymous/local copy. A reload must restore the same favorite
  // from the authenticated server session rather than from localStorage.
  await page.evaluate(() => localStorage.removeItem('vibehub:favorites'));
  await page.reload();
  await expect(page.locator(`.term-card[data-id="${favoriteTermId}"]`).getByRole('button')).toHaveAttribute('aria-pressed', 'true');

  await page.goto(`${base}/practice`);
  await expect(page.locator('#practice-question-title')).toBeVisible();
  const practiceRequest = page.waitForRequest((request) => request.url().endsWith('/api/practice/record') && request.method() === 'POST');
  const practiceResponse = page.waitForResponse((response) => response.url().endsWith('/api/practice/record') && response.request().method() === 'POST');
  await page.locator('.practice-options button').first().click();
  const practicePayload = JSON.parse((await practiceRequest).postData());
  expect((await practiceResponse).status()).toBe(200);
  expect(practicePayload.termId).toBeTruthy();
  expect(typeof practicePayload.correct).toBe('boolean');

  // The authenticated session must also expose the recorded attempt after a
  // fresh page load, with the local recent-question cache removed.
  await page.evaluate(() => localStorage.removeItem('vibehub.practice.recent.v1'));
  const recentResponse = page.waitForResponse((response) => response.url().endsWith('/api/practice/recent') && response.request().method() === 'GET');
  await page.reload();
  const recentPayload = await (await recentResponse).json();
  expect(recentPayload.ok).toBe(true);
  expect(recentPayload.data.some((record) => record.termId === practicePayload.termId)).toBe(true);
});
