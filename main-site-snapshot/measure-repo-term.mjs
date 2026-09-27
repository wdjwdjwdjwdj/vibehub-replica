// 仓库复刻站内容体量测量（与主站词条 182 字节/条对比）
import { readFileSync } from 'node:fs';

const dir = new URL('../src/', import.meta.url);
const files = [
  'termDetails.js', 'termAnatomy.js', 'quickCheckFeedback.js', 'practiceData.js',
  'sourceStructuredDetails.js', 'sourceFocusedDetails.js', 'sourceExtendedDetails.js',
  'extraDetailData.js', 'termBasics.js', 'termExtras.js', 'catalogData.js', 'courseData.js',
];
let total = 0;
for (const f of files) {
  try {
    const size = readFileSync(new URL(f, dir), 'utf8').length;
    total += size;
    console.log(f.padEnd(32), Math.round(size / 1024) + 'KB');
  } catch { console.log(f.padEnd(32), 'missing'); }
}
console.log('内容数据文件合计:', Math.round(total / 1024) + 'KB');

// termDetails.js：词条数与平均体量
const s = readFileSync(new URL('termDetails.js', dir), 'utf8');
const ids = [...s.matchAll(/'([a-z][a-z0-9-]{1,40})':\s*\{/g)].map(m => m[1]);
const uniq = [...new Set(ids)];
console.log('\ntermDetails 唯一词条 id 数(粗测):', uniq.length, '样例:', uniq.slice(0, 12).join(','));
if (uniq.length) {
  const avg = Math.round(s.length / uniq.length);
  console.log('平均每词条字符量:', avg, '→ 约为主站词条(182 字节)的', Math.round(avg / 182), '倍');
}
const at = s.indexOf("'http'");
if (at >= 0) {
  console.log('--- http 词条开头片段（定性对比）---');
  console.log(s.slice(at, at + 650).replace(/\s+/g, ' '));
}
