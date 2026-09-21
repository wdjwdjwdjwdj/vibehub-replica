import { expect, test } from '@playwright/test';

const base = 'http://127.0.0.1:5173';

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

  const favoriteRequest = page.waitForRequest((request) => request.url().endsWith('/api/favorites') && request.method() === 'PUT');
  await page.locator('.term-card').first().getByRole('button').click();
  const favoritePayload = JSON.parse((await favoriteRequest).postData());
  expect(favoritePayload.termIds).toHaveLength(1);

  await page.goto(`${base}/practice`);
  await expect(page.locator('#practice-question-title')).toBeVisible();
  const practiceRequest = page.waitForRequest((request) => request.url().endsWith('/api/practice/record') && request.method() === 'POST');
  await page.locator('.practice-options button').first().click();
  const practicePayload = JSON.parse((await practiceRequest).postData());
  expect(practicePayload.termId).toBeTruthy();
  expect(typeof practicePayload.correct).toBe('boolean');
});
