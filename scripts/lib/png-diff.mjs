/**
 * 纯 Node 的 PNG 读取 / 写入 / 逐像素对比工具（不依赖第三方图像库）。
 * 供 scripts/diff-png.mjs 与 scripts/compare-html-page.mjs 共用。
 */
import fs from 'node:fs';
import zlib from 'node:zlib';

const CHANNELS = { 0: 1, 2: 3, 3: 1, 4: 2, 6: 4 };

function readChunks(buf) {
  let off = 8; // PNG signature
  const chunks = [];
  while (off < buf.length) {
    const len = buf.readUInt32BE(off);
    const type = buf.toString('ascii', off + 4, off + 8);
    chunks.push({ type, data: buf.subarray(off + 8, off + 8 + len) });
    off += 12 + len;
  }
  return chunks;
}

export function readPng(file) {
  const buf = fs.readFileSync(file);
  const chunks = readChunks(buf);
  const ihdr = chunks.find((c) => c.type === 'IHDR');
  if (!ihdr) throw new Error(`${file}: missing IHDR`);
  const width = ihdr.data.readUInt32BE(0);
  const height = ihdr.data.readUInt32BE(4);
  const bitDepth = ihdr.data[8];
  const colorType = ihdr.data[9];
  const channels = CHANNELS[colorType];
  if (!channels) throw new Error(`${file}: unsupported colorType ${colorType}`);
  if (bitDepth !== 8) throw new Error(`${file}: unsupported bitDepth ${bitDepth}`);
  if (ihdr.data[12] !== 0) throw new Error(`${file}: interlaced PNG not supported`);

  const idat = Buffer.concat(chunks.filter((c) => c.type === 'IDAT').map((c) => c.data));
  const raw = zlib.inflateSync(idat);
  const stride = width * channels;
  const out = Buffer.alloc(stride * height);
  let prev = Buffer.alloc(stride);
  for (let y = 0; y < height; y += 1) {
    const filter = raw[y * (stride + 1)];
    const line = raw.subarray(y * (stride + 1) + 1, y * (stride + 1) + 1 + stride);
    const cur = out.subarray(y * stride, (y + 1) * stride);
    for (let x = 0; x < stride; x += 1) {
      const a = x >= channels ? cur[x - channels] : 0;
      const b = prev[x];
      const c = x >= channels ? prev[x - channels] : 0;
      const v = line[x];
      let recon;
      switch (filter) {
        case 0: recon = v; break;
        case 1: recon = v + a; break;
        case 2: recon = v + b; break;
        case 3: recon = v + ((a + b) >> 1); break;
        case 4: {
          const p = a + b - c;
          const pa = Math.abs(p - a);
          const pb = Math.abs(p - b);
          const pc = Math.abs(p - c);
          recon = v + (pa <= pb && pa <= pc ? a : pb <= pc ? b : c);
          break;
        }
        default: throw new Error(`${file}: unknown filter ${filter}`);
      }
      cur[x] = recon & 0xff;
    }
    prev = cur;
  }
  return { width, height, channels, data: out };
}

const CRC_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n += 1) {
    let c = n;
    for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c >>> 0;
  }
  return table;
})();

function chunk(type, data) {
  const head = Buffer.alloc(8);
  head.writeUInt32BE(data.length, 0);
  head.write(type, 4, 'ascii');
  const body = Buffer.concat([head, data]);
  let crc = 0xffffffff;
  for (const byte of body) crc = CRC_TABLE[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  const tail = Buffer.alloc(4);
  tail.writeUInt32BE((crc ^ 0xffffffff) >>> 0, 0);
  return Buffer.concat([body, tail]);
}

export function writePng(file, img) {
  const { width, height, channels, data } = img;
  const stride = width * channels;
  const raw = Buffer.alloc((stride + 1) * height);
  for (let y = 0; y < height; y += 1) {
    raw[y * (stride + 1)] = 0;
    data.copy(raw, y * (stride + 1) + 1, y * stride, (y + 1) * stride);
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = channels === 4 ? 6 : channels === 3 ? 2 : 0;
  const png = Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', zlib.deflateSync(raw)),
    chunk('IEND', Buffer.alloc(0)),
  ]);
  fs.writeFileSync(file, png);
}

/**
 * 逐像素对比两张已解码 PNG。
 * @param {{width:number,height:number,channels:number,data:Buffer}} a
 * @param {{width:number,height:number,channels:number,data:Buffer}} b
 * @param {number} threshold 单通道差大于该值即计为差异像素
 * @returns {{width:number,height:number,sizeMatch:boolean,diffPixels:number,totalPixels:number,mismatchRatio:number,bands:number[]}}
 */
export function diffPng(a, b, threshold = 12) {
  const width = Math.min(a.width, b.width);
  const height = Math.min(a.height, b.height);
  const ch = Math.min(a.channels, b.channels);
  const bandCount = 16;
  const bandCounts = new Array(bandCount).fill(0);
  const bandTotals = new Array(bandCount).fill(0);
  let diffPixels = 0;

  for (let y = 0; y < height; y += 1) {
    const band = Math.min(bandCount - 1, Math.floor((y / height) * bandCount));
    for (let x = 0; x < width; x += 1) {
      const ia = (y * a.width + x) * a.channels;
      const ib = (y * b.width + x) * b.channels;
      let delta = 0;
      for (let c = 0; c < ch; c += 1) delta = Math.max(delta, Math.abs(a.data[ia + c] - b.data[ib + c]));
      bandTotals[band] += 1;
      if (delta > threshold) {
        diffPixels += 1;
        bandCounts[band] += 1;
      }
    }
  }
  const totalPixels = width * height;
  return {
    width,
    height,
    sizeMatch: a.width === b.width && a.height === b.height,
    diffPixels,
    totalPixels,
    mismatchRatio: totalPixels ? (diffPixels / totalPixels) * 100 : 0,
    bands: bandCounts.map((count, i) => ({
      band: i + 1,
      y0: Math.round((i * height) / bandCount),
      y1: Math.round(((i + 1) * height) / bandCount),
      ratio: bandTotals[i] ? (count / bandTotals[i]) * 100 : 0,
    })),
  };
}

/** 生成叠加差异图：差异像素标红，其余以本地灰度显示。 */
export function writeDiffImage(file, a, b, threshold = 12) {
  const width = Math.min(a.width, b.width);
  const height = Math.min(a.height, b.height);
  const ch = Math.min(a.channels, b.channels);
  const img = { width, height, channels: 4, data: Buffer.alloc(width * height * 4) };
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const ia = (y * a.width + x) * a.channels;
      const ib = (y * b.width + x) * b.channels;
      let delta = 0;
      for (let c = 0; c < ch; c += 1) delta = Math.max(delta, Math.abs(a.data[ia + c] - b.data[ib + c]));
      const o = (y * width + x) * 4;
      if (delta > threshold) {
        img.data[o] = 255; img.data[o + 1] = 40; img.data[o + 2] = 40; img.data[o + 3] = 210;
      } else {
        const v = b.data[ib] ?? 255;
        img.data[o] = v; img.data[o + 1] = v; img.data[o + 2] = v; img.data[o + 3] = 45;
      }
    }
  }
  writePng(file, img);
}
