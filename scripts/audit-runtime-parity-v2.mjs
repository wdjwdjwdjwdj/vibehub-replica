import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const sourceBase = process.env.VH_SOURCE || 'https://vibe-hub.org';
const localBase = process.env.VH_LOCAL || 'http://127.0.0.1:5173';
const outDir = process.env.VH_RUNTIME_OUT || path.resolve('replication-evidence/vibehub-independent-runtime/runtime-parity');
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function snapshot(page) {
  return page.evaluate(() => {
    const visible = (selector) => [...document.querySelectorAll(selector)].some((node) => { const style = getComputedStyle(node); const rect = node.getBoundingClientRect(); return style.display !== 'none' && style.visibility !== 'hidden' && rect.width > 0 && rect.height > 0; });
    const first = (selector) => document.querySelector(selector);
    const rectHeight = (selector) => first(selector)?.getBoundingClientRect().height ?? null;
    const className = (selector) => first(selector)?.className || '';
    const storage = Object.fromEntries(Object.keys(localStorage).filter((key) => key.startsWith('vibehub') || key.startsWith('vh-') || key.startsWith('vibe-')).map((key) => [key, localStorage.getItem(key)]));
    const sourceApiStep = first('.fj-now')?.textContent?.match(/(\d+)\s*\/\s*6/)?.[1];
    const localApiStep = first('.flow-detail-now strong')?.textContent?.match(/(\d+)\s*\/\s*6/)?.[1];
    const nextButton = [...document.querySelectorAll('.fj-nav, .flow-detail-footer button')].find((button) => /next/i.test(button.textContent || ''));
    const previousButton = [...document.querySelectorAll('.fj-nav, .flow-detail-footer button')].find((button) => /previous/i.test(button.textContent || ''));
    return {
      url: `${location.pathname}${location.search}${location.hash}`,
      title: document.title,
      lang: document.documentElement.lang,
      scrollY: Math.round(window.scrollY),
      scrollHeight: document.documentElement.scrollHeight,
      surveyVisible: visible('.source-survey, .survey-panel'),
      practiceOptions: document.querySelectorAll('.lesson-practice-option, .quiz-options button').length,
      practiceFeedbackVisible: visible('.lesson-practice-feedback, .lesson-practice-result, .quiz-result, .practice-feedback, .source-practice-feedback'),
      practiceFeedbackCorrect: visible('.lesson-practice-feedback.is-correct, .quiz-result.success'),
      practiceHeight: rectHeight('.lesson-practice, .quick-check'),
      extrasHeight: rectHeight('.lesson-extras'),
      mainHeight: rectHeight('main'),
      buttonScenes: document.querySelectorAll('.scenes .scene-item, .source-button-scene-collection .scene-item').length,
      buttonSceneClasses: [...document.querySelectorAll('.scenes .scene-item, .source-button-scene-collection .scene-item')].map((node) => node.className || ''),
      sceneFeedbackVisible: visible('.source-scene-feedback'),
      apiStep: Number(sourceApiStep || localApiStep || 0) || null,
      apiScene: first('.fj-scene')?.getAttribute('data-step') || null,
      apiStateClasses: [className('.fj-scene'), className('.fj-api-card'), className('.fj-backend-panel'), className('.fj-db-panel'), className('.flow-api-mini'), className('.flow-backend-mini'), className('.flow-db-mini')].filter(Boolean),
      apiPreviousDisabled: Boolean(previousButton?.disabled),
      apiNextDisabled: Boolean(nextButton?.disabled),
      storage,
    };
  });
}

async function openPage(browser, base, route) {
  const context = await browser.newContext({ viewport: { width: 1280, height: 720 }, locale: 'en-US' });
  await context.addInitScript(() => localStorage.clear());
  const page = await context.newPage();
  const diagnostics = { consoleErrors: [], pageErrors: [], failedResponses: [] };
  page.on('console', (message) => { if (message.type() === 'error') diagnostics.consoleErrors.push(message.text()); });
  page.on('pageerror', (error) => diagnostics.pageErrors.push(error.message));
  page.on('response', (response) => { if (response.status() >= 400) diagnostics.failedResponses.push(`${response.status()} ${response.url()}`); });
  await page.goto(`${base}${route}`, { waitUntil: 'networkidle', timeout: 60000 });
  await sleep(500);
  return { context, page, diagnostics };
}

async function runHtmlCase(browser, base) {
  const { context, page, diagnostics } = await openPage(browser, base, '/en/html');
  const initial = await snapshot(page);
  const close = page.locator('.source-survey-close:not([disabled]), .survey-close:not([disabled])').first();
  await page.waitForFunction(() => [...document.querySelectorAll('.source-survey-close, .survey-close')].some((node) => !node.disabled && getComputedStyle(node).display !== 'none'), null, { timeout: 10000 }).catch(() => {});
  if (await close.count() && await close.isVisible().catch(() => false)) {
    await close.click({ timeout: 10000 }).catch(() => {});
    await sleep(150);
    if (await close.isVisible().catch(() => false)) await close.click({ timeout: 10000 }).catch(() => {});
  }
  await sleep(200);
  const afterClose = await snapshot(page);
  await page.locator('.lesson-practice-option').nth(1).click();
  await sleep(300);
  const afterAnswer = await snapshot(page);
  await page.mouse.wheel(0, 800);
  await sleep(300);
  const afterScroll = await snapshot(page);
  await context.close();
  return { initial, afterClose, afterAnswer, afterScroll, diagnostics };
}

async function runButtonCase(browser, base) {
  const { context, page, diagnostics } = await openPage(browser, base, '/en/button');
  const initial = await snapshot(page);
  const deleteButton = page.locator('.scenes .scene-item, .source-button-scene-collection .scene-item').filter({ hasText: 'Delete confirmation' }).getByRole('button', { name: 'Delete', exact: true });
  if (await deleteButton.count()) await deleteButton.click();
  await sleep(250);
  const afterDelete = await snapshot(page);
  await context.close();
  return { initial, afterDelete, diagnostics };
}

async function runApiCase(browser, base) {
  const { context, page, diagnostics } = await openPage(browser, base, '/en/api');
  const initial = await snapshot(page);
  const next = page.locator('button.fj-nav, .flow-detail-footer button').filter({ hasText: 'Next' }).first();
  for (let index = 0; index < 5; index += 1) await next.click();
  await sleep(250);
  const final = await snapshot(page);
  await context.close();
  return { initial, final, diagnostics };
}

function comparable(report) {
  return {
    html: {
      surveyVisible: report.html.initial.surveyVisible,
      practiceOptions: report.html.initial.practiceOptions,
      answerChanged: report.html.afterAnswer.practiceFeedbackVisible && report.html.afterAnswer.practiceFeedbackCorrect,
      surveyClosed: !report.html.afterClose.surveyVisible && Boolean(report.html.afterClose.storage['vibehub-source-survey-shown-v1']),
      feedbackExpandsDocumentFlow: report.html.afterAnswer.extrasHeight > report.html.afterClose.extrasHeight && report.html.afterAnswer.mainHeight > report.html.afterClose.mainHeight,
      scrolled: report.html.afterScroll.scrollY > 400,
    },
    button: {
      initialScenes: report.button.initial.buttonScenes,
      deleteHasNoStateSideEffect: !report.button.afterDelete.sceneFeedbackVisible && JSON.stringify(report.button.initial.buttonSceneClasses) === JSON.stringify(report.button.afterDelete.buttonSceneClasses),
    },
    api: {
      initialStep: report.api.initial.apiStep,
      finalStep: report.api.final.apiStep,
      initialPreviousDisabled: report.api.initial.apiPreviousDisabled,
      finalNextDisabled: report.api.final.apiNextDisabled,
    },
  };
}

const browser = await chromium.launch({ headless: true });
const sourceHtml = await runHtmlCase(browser, sourceBase);
const localHtml = await runHtmlCase(browser, localBase);
const sourceButton = await runButtonCase(browser, sourceBase);
const localButton = await runButtonCase(browser, localBase);
const sourceApi = await runApiCase(browser, sourceBase);
const localApi = await runApiCase(browser, localBase);
await browser.close();
const report = { schemaVersion: 2, kind: 'vibehub-runtime-parity', generatedAt: new Date().toISOString(), sourceBase, localBase, cases: { html: { source: sourceHtml, local: localHtml }, button: { source: sourceButton, local: localButton }, api: { source: sourceApi, local: localApi } } };
const cleanDiagnostics = (item) => ({ ...item, diagnostics: { ...item.diagnostics, consoleErrors: item.diagnostics.consoleErrors.filter((message) => !/Failed to load resource/i.test(message)) } });
report.diagnosticsPassed = [sourceHtml, localHtml, sourceButton, localButton, sourceApi, localApi].map(cleanDiagnostics).every((item) => item.diagnostics.consoleErrors.length === 0 && item.diagnostics.pageErrors.length === 0 && item.diagnostics.failedResponses.length === 0);
report.comparable = { source: comparable({ html: sourceHtml, button: sourceButton, api: sourceApi }), local: comparable({ html: localHtml, button: localButton, api: localApi }) };
report.runtimeParityPassed = JSON.stringify(report.comparable.source) === JSON.stringify(report.comparable.local) && report.diagnosticsPassed;
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'RUNTIME-PARITY.json'), `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify({ out: path.join(outDir, 'RUNTIME-PARITY.json'), runtimeParityPassed: report.runtimeParityPassed, diagnosticsPassed: report.diagnosticsPassed }, null, 2));
if (!report.runtimeParityPassed) process.exitCode = 2;
