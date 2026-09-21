#!/usr/bin/env node
/**
 * 逐像素对比两张 PNG 截图，输出 mismatchRatio 与差异位置分布。
 * 复用 scripts/lib/png-diff.mjs，不依赖任何第三方图像库。
 *
 * 用法：
 *   node scripts/diff-png.mjs <a.png> <b.png> [--out diff.png] [--threshold 12]
 *
 * 判定：某像素任一通道差 > threshold 即计为差异像素；
 *      mismatchRatio = 差异像素 / 重叠区域总像素（尺寸不一致时按重叠区域计，并单独报告）。
 * 退出码：mismatchRatio ≤1% 返回 0，否则返回 1。
 */
import path from 'node:path';
import { readPng, diffPng, writeDiffImage } from './lib/png-diff.mjs';

const args = process.argv.slice(2);
if (args.length < 2) {
  console.error('用法: node scripts/diff-png.mjs <a.png> <b.png> [--out diff.png] [--threshold 12]');
  process.exit(2);
}

const fileA = path.resolve(args[0]);
const fileB = path.resolve(args[1]);
const flag = (name, dflt) => {
  const i = args.indexOf(name);
  return i === -1 ? dflt : args[i + 1];
};
const outPath = flag('--out', '');
const THRESHOLD = Number(flag('--threshold', '12'));

const a = readPng(fileA);
const b = readPng(fileB);
const r = diffPng(a, b, THRESHOLD);

console.log(`A=${fileA}`);
console.log(`B=${fileB}`);
console.log(`size: ${a.width}x${a.height} vs ${b.width}x${b.height} -> overlap ${r.width}x${r.height}${r.sizeMatch ? '' : ' (尺寸不同，按重叠区域计)'}`);
console.log(`threshold: >${THRESHOLD}`);
console.log(`diffPixels: ${r.diffPixels} / ${r.totalPixels}  mismatchRatio: ${r.mismatchRatio.toFixed(3)}%`);
console.log('band diff (top -> bottom):');
for (const band of r.bands) {
  if (!band.ratio && band.band > 1) continue;
  const bar = '#'.repeat(Math.min(40, Math.round(band.ratio / 2)));
  console.log(`  band ${String(band.band).padStart(2, '0')} y=${String(band.y0).padStart(5)}-${String(band.y1).padStart(5)}  ${band.ratio.toFixed(3).padStart(7)}%  ${bar}`);
}
if (outPath) {
  writeDiffImage(outPath, a, b, THRESHOLD);
  console.log(`diff image: ${outPath}`);
}
const pass = r.mismatchRatio <= 1;
console.log(`RESULT: ${pass ? 'PASS' : 'FAIL'} (门槛 ≤1%)`);
process.exit(pass ? 0 : 1);
