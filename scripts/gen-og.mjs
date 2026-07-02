/* Generate the 1200x630 social card -> public/og.png.
   Quiet editorial: paper, ink, one blue accent. Newsreader for the name,
   Space Mono for labels, matching the site.
   Run: node scripts/gen-og.mjs  (fonts live in scripts/fonts/). */
import { writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { Resvg } from '@resvg/resvg-js';

const here = dirname(fileURLToPath(import.meta.url));
// fontFiles, not fontBuffers: fontBuffers silently fails to register in
// resvg-js 2.6.2, leaving every run of text in the built-in fallback sans.
const fontFiles = [
  resolve(here, 'fonts/SpaceMono-Regular.ttf'),
  resolve(here, 'fonts/SpaceMono-Bold.ttf'),
  resolve(here, 'fonts/Newsreader-SemiBold.ttf'),
];
// resvg skips missing font files silently, which would ship a wrong-face card
for (const f of fontFiles) {
  if (!existsSync(f)) throw new Error(`missing font: ${f}`);
}

// ponytail: palette duplicated from src/styles/tokens.css by hand — this script
// runs outside the site build; update both when the palette changes.
const C = {
  paper: '#faf8f4',
  ink: '#1a1c1f',
  ink2: '#43474e',
  ink3: '#5c6067',
  line: '#cfc9bb',
  blueInk: '#1a4f9e',
};

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${C.paper}"/>

  <!-- frame -->
  <rect x="36" y="36" width="1128" height="558" fill="none" stroke="${C.line}" stroke-width="1.5" rx="10"/>

  <text x="90" y="130" font-family="Space Mono" font-size="24" letter-spacing="6" fill="${C.ink3}">MACHINE LEARNING ENGINEER</text>

  <text x="86" y="300" font-family="Newsreader" font-weight="600" font-size="118" letter-spacing="-2" fill="${C.ink}">Soham Shinde</text>
  <text x="90" y="378" font-family="Newsreader" font-weight="600" font-size="40" fill="${C.ink2}">I teach robots to see. Mostly they do.</text>
  <text x="90" y="440" font-family="Space Mono" font-size="24" letter-spacing="1" fill="${C.blueInk}">machine learning · computer vision · robotics</text>

  <line x1="88" y1="520" x2="1112" y2="520" stroke="${C.line}" stroke-width="1"/>
  <text x="90" y="563" font-family="Space Mono" font-size="22" fill="${C.ink3}">Clutterbot · Bengaluru</text>
  <text x="1112" y="563" font-family="Space Mono" font-weight="700" font-size="22" fill="${C.blueInk}" text-anchor="end">sohamshinde.com</text>
</svg>`;

const resvg = new Resvg(svg, {
  fitTo: { mode: 'width', value: 1200 },
  font: { fontFiles, defaultFontFamily: 'Space Mono', loadSystemFonts: false },
});
const png = resvg.render().asPng();
writeFileSync(resolve(here, '../public/og.png'), png);
console.log('wrote public/og.png', png.length, 'bytes');
