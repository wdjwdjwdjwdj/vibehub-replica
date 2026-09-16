import { chromium } from 'playwright';
import { writeFile } from 'node:fs/promises';
import { gitCourseData } from '../src/courseData.js';

const slugs = [
  '01-page-structure',
  '02-visual-direction',
  '03-hero-cta',
  '04-content-structure',
  '05-evidence-pricing-faq',
  '06-layout-surface',
  '07-form-and-interaction',
  '08-responsive',
  '09-delivery-and-agent',
];

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
const courses = [];

for (const slug of slugs) {
  await page.goto(`https://vibe-hub.org/en/courses/product-website/${slug}`, { waitUntil: 'domcontentloaded' });
  const course = await page.evaluate(() => {
    const article = document.querySelector('.course-article-inner');
    const intro = article?.querySelector('.course-chapter-intro');
    const sections = [...(article?.querySelectorAll('.course-lesson-section') || [])].map((section) => {
      const title = section.querySelector('h2')?.textContent?.trim() || '';
      const blocks = [...section.children].flatMap((child) => {
        if (child.tagName === 'P') return [child.textContent.trim()];
        if (child.tagName === 'UL') return [[...child.querySelectorAll(':scope > li')].map((item) => `• ${item.textContent.trim()}`).join('\n')];
        return [];
      }).filter(Boolean);
      const visuals = [...section.querySelectorAll(':scope > figure')].map((figure) => {
        const caption = figure.querySelector('figcaption');
        const parts = caption ? [...caption.children].map((item) => item.textContent.trim()).filter(Boolean) : [];
        return {
          kind: figure.dataset.visualKind || 'compare',
          title: parts[0] || '',
          description: parts[1] || '',
        };
      });
      return { title, body: blocks.join('\n\n'), visuals };
    });
    return {
      id: location.pathname.split('/').pop(),
      title: article?.querySelector('h1')?.textContent?.trim() || '',
      summary: intro?.textContent?.trim() || '',
      sections,
    };
  });
  if (!course.title || course.sections.length < 4) throw new Error(`Incomplete course scrape: ${slug}`);
  courses.push(course);
}

await browser.close();

const output = `export const courseData = ${JSON.stringify(courses, null, 2)};\n\nexport const courseById = Object.fromEntries(courseData.map((course) => [course.id, course]));\n\nexport const gitCourseData = ${JSON.stringify(gitCourseData, null, 2)};\n`;
await writeFile(new URL('../src/courseData.js', import.meta.url), output, 'utf8');
console.log(`scraped product course: ${courses.length} chapters, ${courses.reduce((sum, course) => sum + course.sections.length, 0)} sections`);
