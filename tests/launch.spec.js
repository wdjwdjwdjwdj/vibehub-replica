import { expect, test } from '@playwright/test';

const base = process.env.QIZHAN_BASE_URL || 'http://127.0.0.1:5173';

test.beforeEach(async ({ page }) => {
  await page.goto(base);
  await page.evaluate(() => localStorage.clear());
  await page.reload();
});

test('首发核心路径支持学习、完成与本地收藏', async ({ page }) => {
  await expect(page.getByRole('heading', { name: /看懂 AI 建站的.*关键一步/ })).toBeVisible();
  await expect(page.getByRole('link', { name: /HTML/ })).toBeVisible();
  await expect(page.getByRole('button', { name: '登录' })).toHaveCount(0);

  await page.getByRole('button', { name: '收藏 HTML' }).click();
  await page.getByRole('link', { name: '我的收藏' }).click();
  await expect(page.getByRole('link', { name: /HTML/ })).toBeVisible();

  await page.getByRole('link', { name: /HTML/ }).click();
  await page.getByRole('button', { name: /<h1>/ }).click();
  await expect(page.getByText('答对了，这一节已完成。')).toBeVisible();
  await page.reload();
  await expect(page.getByText('下一节')).toBeVisible();
  await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem('qizhan:completed') || '[]'))).toContain('html');
});

test('移动端首页没有横向溢出且练习可以重试', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${base}/practice`);
  await expect(page.getByRole('heading', { name: '小练习' })).toBeVisible();
  await page.getByRole('button', { name: /<div>/ }).click();
  await expect(page.getByText('这次还差一步。').or(page.getByText('再想一想'))).toBeVisible();
  await page.getByRole('button', { name: '重新选择' }).click();
  await page.getByRole('button', { name: /<h1>/ }).click();
  await expect(page.getByText('回答正确')).toBeVisible();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  expect(overflow).toBe(false);
});
