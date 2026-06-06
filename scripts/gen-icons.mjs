/* Render PWA / apple-touch icons from public/favicon.svg.
   Run: node scripts/gen-icons.mjs */
import { readFileSync, writeFileSync } from 'node:fs';
import { Resvg } from '@resvg/resvg-js';

const svg = readFileSync(new URL('../public/favicon.svg', import.meta.url), 'utf8');

const out = [
  ['apple-touch-icon.png', 180],
  ['icon-192.png', 192],
  ['icon-512.png', 512],
];

for (const [name, size] of out) {
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: size },
    background: '#f2ecde', // opaque paper so iOS doesn't fill rounded corners with black
  });
  const png = resvg.render().asPng();
  writeFileSync(new URL(`../public/${name}`, import.meta.url), png);
  console.log('wrote public/' + name, png.length, 'bytes');
}
