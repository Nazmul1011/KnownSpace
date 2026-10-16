// Pixel-compares two capture folders; exits 1 if any screen differs.
// usage: node tests/visual/compare.mjs qa-shots/visual/before qa-shots/visual/after
import sharp from 'sharp';
import { readdirSync } from 'node:fs';
const [a, b] = process.argv.slice(2);
let failed = 0;
for (const f of readdirSync(a).filter((x) => x.endsWith('.png')).sort()) {
  const [x, y] = await Promise.all([a, b].map((d) => sharp(`${d}/${f}`).raw().toBuffer({ resolveWithObject: true })));
  let n = 0;
  for (let i = 0; i < x.data.length; i += x.info.channels) {
    if (Math.abs(x.data[i] - y.data[i]) + Math.abs(x.data[i + 1] - y.data[i + 1]) + Math.abs(x.data[i + 2] - y.data[i + 2]) > 30) n++;
  }
  console.log(f.padEnd(24), (n / (x.info.width * x.info.height) * 100).toFixed(3) + '% px differ');
  if (n) failed++;
}
console.log(failed ? `${failed} screen(s) changed` : 'all screens identical');
if (failed) process.exitCode = 1;
