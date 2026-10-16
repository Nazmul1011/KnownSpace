// Turns generated sources in art/raw into web images + a manifest.
//   node art/build.mjs
// Studio-object shots (catalog visual.kind === 'object') get their backdrop levelled to pure white and are
// cropped to the subject, so they can sit on the canvas with mix-blend-mode: multiply and read as cut-outs.
// Writes public/art/<id>-s.webp (canvas) and <id>-l.webp (detail view), plus src/domain/knowledge/data/art.generated.json.
import sharp from 'sharp';
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync, statSync } from 'node:fs';

const RAW = 'art/raw';
const OUT = 'public/art';
mkdirSync(OUT, { recursive: true });

// every image referenced by the catalog and the expansion files
const sources = ['src/domain/knowledge/data/catalog.ts', ...readdirSync('src/domain/knowledge/data/more').filter((f) => f.endsWith('.ts')).map((f) => `src/domain/knowledge/data/more/${f}`)];
const seenImages = new Set();
const entries = [];
for (const f of sources) {
  for (const m of readFileSync(f, 'utf8').matchAll(/kind: '(object|photo)', image: '([^']+)'/g)) {
    if (seenImages.has(m[2])) continue;
    seenImages.add(m[2]);
    entries.push({ id: m[2], kind: m[1], image: m[2] });
  }
}
const FORCE = process.argv.includes('--force');

// real photographs sourced from open-licence libraries: never cut out, always shown as photos, always credited
const credits = {};
if (existsSync('art/credits.tsv')) {
  for (const line of readFileSync('art/credits.tsv', 'utf8').split('\n').slice(1)) {
    const [id, title, creator, license, licenseUrl, page, provider] = line.split('\t');
    if (id) credits[id] = { title, creator, license, licenseUrl, page, provider };
  }
}

// interface art processed like studio objects (cut out on transparency)
for (const m of ['medal-curious', 'medal-explorer', 'medal-scholar', 'medal-polymath', 'intro-sphinx', 'intro-dove-coin', 'intro-orange', 'intro-beads', 'intro-cuttlefish']) {
  seenImages.add(m);
  entries.push({ id: m, kind: 'object', image: m });
}

// incremental: keep manifest rows whose outputs are newer than their raw source
let manifest = {};
try {
  manifest = JSON.parse(readFileSync('src/domain/knowledge/data/art.generated.json', 'utf8'));
} catch {
  manifest = {};
}
const fresh = (img) => {
  const raw = `${RAW}/${img}.png`;
  const outs = [`${OUT}/${img}-s.webp`, `${OUT}/${img}-l.webp`];
  if (FORCE || !manifest[img] || !manifest[img].glow || !outs.every(existsSync)) return false;
  if (!!credits[img] !== !!manifest[img].real) return false;
  return outs.every((o) => statSync(o).mtimeMs >= statSync(raw).mtimeMs);
};
let built = 0;
let missing = [];

async function levelObject(file) {
  const { data, info } = await sharp(file).flatten({ background: '#ffffff' }).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const W = info.width;
  const H = info.height;
  // Backdrop model: the seamless sweep is never perfectly flat (vignette, falloff), so estimate it per pixel with a
  // Coons patch built from robust (median-filtered) border profiles, then divide it out.
  const px = (x, y, c) => data[(y * W + x) * 3 + c];
  const band = 6;
  const profile = (len, at) => {
    const raw = [];
    for (let t = 0; t < len; t++) {
      const v = [0, 0, 0];
      for (let k = 0; k < band; k++) for (let c = 0; c < 3; c++) v[c] += at(t, k, c);
      raw.push(v.map((x) => x / band));
    }
    // median over a wide window so objects touching an edge don't drag the estimate down
    const win = Math.round(len * 0.08);
    const out = [];
    for (let t = 0; t < len; t++) {
      const v = [0, 1, 2].map((c) => {
        const arr = [];
        for (let k = Math.max(0, t - win); k <= Math.min(len - 1, t + win); k += 2) arr.push(raw[k][c]);
        arr.sort((a, b) => a - b);
        return arr[Math.floor(arr.length * 0.7)];
      });
      out.push(v);
    }
    return out;
  };
  const T = profile(W, (x, k, c) => px(x, k, c));
  const B = profile(W, (x, k, c) => px(x, H - 1 - k, c));
  const L = profile(H, (y, k, c) => px(k, y, c));
  const R = profile(H, (y, k, c) => px(W - 1 - k, y, c));
  const out = Buffer.alloc(W * H * 3);
  for (let y = 0; y < H; y++) {
    const v = y / (H - 1);
    for (let x = 0; x < W; x++) {
      const u = x / (W - 1);
      const i = y * W + x;
      let lo = 255;
      for (let c = 0; c < 3; c++) {
        const bg =
          (1 - v) * T[x][c] + v * B[x][c] + (1 - u) * L[y][c] + u * R[y][c] -
          ((1 - u) * (1 - v) * T[0][c] + u * (1 - v) * T[W - 1][c] + (1 - u) * v * B[0][c] + u * v * B[W - 1][c]);
        const val = Math.min(255, Math.round((data[i * 3 + c] * 255) / Math.max(1, bg)));
        out[i * 3 + c] = val;
        lo = Math.min(lo, val);
      }
      if (lo >= 238) {
        const t = Math.min(1, (lo - 238) / 10);
        for (let c = 0; c < 3; c++) out[i * 3 + c] = Math.round(out[i * 3 + c] + (255 - out[i * 3 + c]) * t);
      }
    }
  }
  const med = [T[0][0], T[0][1], T[0][2]];
  let minX = W, minY = H, maxX = 0, maxY = 0;
  for (let i = 0; i < W * H; i++) {
    const lo = Math.min(out[i * 3], out[i * 3 + 1], out[i * 3 + 2]);
    if (lo < 228) {
      const x = i % W;
      const y = (i / W) | 0;
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
  // square-ish crop around the subject with breathing room
  const bw = maxX - minX;
  const bh = maxY - minY;
  const pad = Math.round(Math.max(bw, bh) * 0.1);
  let left = Math.max(0, minX - pad);
  let top = Math.max(0, minY - pad);
  let right = Math.min(W, maxX + pad);
  let bottom = Math.min(H, maxY + pad);
  // colour-to-alpha against white: the subject keeps its look over any light surface, shadows turn translucent
  const rgba = Buffer.alloc(W * H * 4);
  for (let i = 0; i < W * H; i++) {
    const r = out[i * 3], g = out[i * 3 + 1], b = out[i * 3 + 2];
    const a = Math.max(255 - r, 255 - g, 255 - b) / 255;
    if (a < 0.006) {
      rgba[i * 4 + 3] = 0;
      continue;
    }
    rgba[i * 4] = Math.round(255 - (255 - r) / a);
    rgba[i * 4 + 1] = Math.round(255 - (255 - g) / a);
    rgba[i * 4 + 2] = Math.round(255 - (255 - b) / a);
    rgba[i * 4 + 3] = Math.round(a * 255);
  }
  // feather the outer 4% so nothing can ever show a hard box edge
  const fx = Math.max(8, Math.round(W * 0.04));
  for (let y = 0; y < H; y++)
    for (let x = 0; x < W; x++) {
      const d = Math.min(x - left, right - 1 - x, y - top, bottom - 1 - y);
      if (d < fx && d >= 0) {
        const k = (y * W + x) * 4 + 3;
        rgba[k] = Math.round(rgba[k] * Math.max(0, d / fx));
      }
    }
  const img = sharp(rgba, { raw: { width: W, height: H, channels: 4 } }).extract({
    left,
    top,
    width: right - left,
    height: bottom - top,
  });
  return { img, width: right - left, height: bottom - top, bg: med };
}

for (const e of entries) {
  const file = `${RAW}/${e.image}.png`;
  if (!existsSync(file)) {
    missing.push(e.image);
    continue;
  }
  if (fresh(e.image)) continue;
  built++;
  let pipeline;
  let width;
  let height;
  if (e.kind === 'object' && !credits[e.image]) {
    const r = await levelObject(file);
    pipeline = r.img;
    width = r.width;
    height = r.height;
  } else {
    pipeline = sharp(file);
    const m = await pipeline.metadata();
    width = m.width;
    height = m.height;
  }
  const buf = await pipeline.png().toBuffer();
  const small = Math.min(560, width);
  const large = Math.min(1200, width);
  await sharp(buf).resize({ width: small }).webp({ quality: 80, alphaQuality: 90 }).toFile(`${OUT}/${e.image}-s.webp`);
  await sharp(buf).resize({ width: large }).webp({ quality: 84, alphaQuality: 90 }).toFile(`${OUT}/${e.image}-l.webp`);
  // average colour for placeholders, from a tiny thumbnail
  const { data } = await sharp(buf).flatten({ background: '#ffffff' }).resize(1, 1, { fit: 'cover' }).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const tone = '#' + [...data.slice(0, 3)].map((v) => v.toString(16).padStart(2, '0')).join('');
  // glow = average of the brightest ~8% of pixels: the light in the picture, used to tint fades on dark images
  const small2 = await sharp(buf).flatten({ background: '#ffffff' }).resize(64, 64, { fit: 'cover' }).removeAlpha().raw().toBuffer();
  const px = [];
  for (let i = 0; i < small2.length; i += 3) px.push([small2[i], small2[i + 1], small2[i + 2]]);
  px.sort((a, b) => 0.2126 * b[0] + 0.7152 * b[1] + 0.0722 * b[2] - (0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2]));
  const top = px.slice(0, Math.max(1, Math.round(px.length * 0.08)));
  const glow = '#' + [0, 1, 2].map((c) => Math.round(top.reduce((s, p) => s + p[c], 0) / top.length).toString(16).padStart(2, '0')).join('');
  const lum = (0.2126 * data[0] + 0.7152 * data[1] + 0.0722 * data[2]) / 255;
  manifest[e.image] = { w: width, h: height, aspect: +(width / height).toFixed(4), tone, glow, dark: lum < 0.42, ...(credits[e.image] ? { real: true, credit: credits[e.image] } : {}) };
  process.stdout.write('.');
}

// drop rows for images no longer referenced
for (const k of Object.keys(manifest)) if (!seenImages.has(k)) delete manifest[k];
writeFileSync('src/domain/knowledge/data/art.generated.json', JSON.stringify(manifest, null, 1) + '\n');
console.log(`\n${built} built, ${Object.keys(manifest).length} images in manifest → ${OUT}`);
if (missing.length) console.log(`missing raw source (not yet generated): ${missing.join(', ')}`);
