// Contact sheet of cut-out objects composited on the canvas colour, to spot backdrop edges.
import sharp from 'sharp';
import { readFileSync } from 'node:fs';
const cat = readFileSync('src/domain/knowledge/data/catalog.ts', 'utf8');
const ids = [...cat.matchAll(/kind: 'object', image: '([^']+)'/g)].map((m) => m[1]);
const cell = 300, cols = 6, rows = Math.ceil(ids.length / cols);
const comps = [];
for (let k = 0; k < ids.length; k++) {
  const buf = await sharp(`public/art/${ids[k]}-s.webp`).resize(cell - 20, cell - 20, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
  comps.push({ input: buf, left: (k % cols) * cell + 10, top: Math.floor(k / cols) * cell + 10 });
}
await sharp({ create: { width: cols * cell, height: rows * cell, channels: 3, background: '#ecebe6' } }).composite(comps).png().toFile('qa-shots/contact.png');
console.log(ids.length, 'objects');
