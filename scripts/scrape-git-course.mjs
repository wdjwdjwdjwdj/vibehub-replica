import { writeFile } from 'node:fs/promises';
import { chromium } from 'playwright';

const slugs = [
  '01-working-tree-and-commit',
  '02-diff-and-gitignore',
  '03-branch-and-head',
  '04-merge-and-conflicts',
  '05-remote-and-collaboration',
  '06-restore-and-stash',
];

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
const locales = {};

for (const locale of ['en', 'zh']) {
  locales[locale] = {};
  for (const slug of slugs) {
    const prefix = locale === 'en' ? '/en' : '';
    const response = await page.goto(`https://vibe-hub.org${prefix}/courses/git-workflow/${slug}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    if (!response?.ok()) throw new Error(`${locale}/${slug}: ${response?.status() || 'no response'}`);
    const data = await page.evaluate(() => {
      const text = (node) => node?.innerText?.trim() || '';
      const blocks = (section) => [...section.children].map((node) => {
        if (node.matches('h2, h3, h4')) return { type: 'heading', text: text(node) };
        if (node.matches('p')) return { type: 'paragraph', text: text(node) };
        if (node.matches('ul, ol')) return { type: 'list', items: [...node.querySelectorAll(':scope > li')].map(text).filter(Boolean) };
        const value = text(node);
        return value ? { type: 'note', text: value } : null;
      }).filter(Boolean);
      return {
        title: text(document.querySelector('main .course-chapter-hero h1, main h1')),
        summary: text(document.querySelector('.course-chapter-intro')),
        sections: [...document.querySelectorAll('main .course-lesson-section')].map((section) => ({
          id: section.id,
          title: text(section.querySelector(':scope > h2')),
          blocks: blocks(section),
        })),
      };
    });
    locales[locale][slug] = data;
    console.log(`${locale}: ${slug}`);
  }
}

await browser.close();
await writeFile(new URL('../src/gitCourseData.js', import.meta.url), `export const gitCourseChapters = ${JSON.stringify(locales)};\n`, 'utf8');
console.log('wrote src/gitCourseData.js');
