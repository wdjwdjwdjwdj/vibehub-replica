/**
 * 从原站 /en/html 抓取的问卷弹层标记中提取 7 个渠道的真实品牌 SVG，
 * 生成 src/surveyBrandMarks.jsx（避免手工转录超长 path）。
 * 用法：node scripts/build-survey-marks.mjs
 */
import fs from 'node:fs';

const src = fs.readFileSync('replication-evidence/round-2026-09-20/html/orig-survey.html', 'utf8');
const labels = [...src.matchAll(/<span class="source-survey-option-mark" aria-hidden="true">([\s\S]*?)<\/span>\s*<span>([^<]*)<\/span>/g)];
if (labels.length !== 7) throw new Error(`expected 7 marks, got ${labels.length}`);

const toJsx = (svg) =>
  svg
    .replace(/\s+/g, ' ')
    .replace(/<svg ([^>]*?)>/g, (m, attrs) => `<svg ${attrs.trim()} aria-hidden="true">`)
    .replace(/<path([^>]*?)><\/path>/g, '<path$1 />')
    .replace(/<circle([^>]*?)><\/circle>/g, '<circle$1 />')
    .replace(/<rect([^>]*?)><\/rect>/g, '<rect$1 />')
    .trim();

const lines = [];
lines.push('/**');
lines.push(' * 原站「One quick question」问卷弹层的渠道品牌标识（真实品牌 SVG path）。');
lines.push(' *');
lines.push(' * 自动生成：node scripts/build-survey-marks.mjs');
lines.push(' * 数据来源：https://vibe-hub.org/en/html 的 section.source-survey（证据文件');
lines.push(' * replication-evidence/round-2026-09-20/html/orig-survey.html）。');
lines.push(' * 请勿手工改动 path；原站更新后重新抓取并生成。');
lines.push(' */');
lines.push('');
lines.push('export const surveyBrandMarks = {');
for (const [, svg, label] of labels) {
  const key = label.trim().includes(' ') ? `'${label.trim()}'` : label.trim();
  lines.push(`  ${key}: ${toJsx(svg)},`);
}
lines.push('};');
lines.push('');
lines.push('export const surveyOptionOrder = [');
for (const [, , label] of labels) lines.push(`  ${JSON.stringify(label.trim())},`);
lines.push('];');
fs.writeFileSync('src/surveyBrandMarks.jsx', lines.join('\n') + '\n');
console.log('wrote src/surveyBrandMarks.jsx', labels.map((m) => m[2]).join(' | '));
