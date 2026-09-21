import { writeFile } from 'node:fs/promises';
import { catalogData } from '../src/catalogData.js';
import { extraItemsByTopic } from '../src/termExtras.js';

const catalogIds = Object.values(catalogData).flatMap((sections) => sections.flatMap((section) => section.items.map((item) => item.length === 4 ? item[0] : item[2] || item[0])));
const extraIds = Object.values(extraItemsByTopic).flatMap((items) => items.map((item) => item[0]));
const ids = [...new Set([...catalogIds, ...extraIds])];
const results = [];
const batchSize = 10;

for (let index = 0; index < ids.length; index += batchSize) {
  const batch = ids.slice(index, index + batchSize);
  const fetched = await Promise.all(batch.map(async (termId) => {
    const response = await fetch(`https://vibe-hub.org/catalog/details/${termId}.json`);
    if (!response.ok) throw new Error(`${termId}: ${response.status}`);
    const json = await response.json();
    const practice = json.entry?.lessonPractice;
    if (!practice?.en?.title || !practice?.en?.options?.length || !practice.options?.length) return null;
    return { termId, zh: { title: practice.title, options: practice.options }, en: practice.en };
  }));
  results.push(...fetched.filter(Boolean));
}

await writeFile(new URL('../src/practiceData.js', import.meta.url), `export const practiceData = ${JSON.stringify(results, null, 2)};\n`, 'utf8');
const quickCheckAnswers = Object.fromEntries(results.map(({ termId, en }) => [termId, en.options.findIndex((option) => option.correct)]));
const quickCheckFeedback = Object.fromEntries(results.map(({ termId, zh, en }) => [termId, { zh: zh.options.map((option) => option.feedback), en: en.options.map((option) => option.feedback) }]));
await writeFile(new URL('../src/quickCheckAnswers.js', import.meta.url), `export const quickCheckAnswers = ${JSON.stringify(quickCheckAnswers, null, 2)};\n`, 'utf8');
await writeFile(new URL('../src/quickCheckFeedback.js', import.meta.url), `export const quickCheckFeedback = ${JSON.stringify(quickCheckFeedback, null, 2)};\n`, 'utf8');
console.log(`scraped practice bank: ${results.length} bilingual questions`);
