/* Generate the 1200x630 social card -> public/og.png.
   Field-notes telemetry style in Space Mono, matching the site palette.
   Run: node scripts/gen-og.mjs  (fonts in scripts/fonts/, fetched from Google Fonts). */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { Resvg } from '@resvg/resvg-js';

const here = dirname(fileURLToPath(import.meta.url));
const reg = readFileSync(resolve(here, 'fonts/SpaceMono-Regular.ttf'));
const bold = readFileSync(resolve(here, 'fonts/SpaceMono-Bold.ttf'));

const C = {
  paper: '#f2ecde',
  ink: '#15171b',
  ink2: '#3a3f47',
  ink3: '#4a5159',
  line: '#c0b08f',
  blue: '#1772d0',
  blueInk: '#134e96',
  rust: '#c2552e',
  rustDeep: '#9e3f1f',
  good: '#3f7d3a',
};

// faint blueprint grid
let grid = '';
for (let x = 80; x < 1200; x += 40) grid += `<line x1="${x}" y1="36" x2="${x}" y2="594" />`;
for (let y = 76; y < 594; y += 40) grid += `<line x1="36" y1="${y}" x2="1164" y2="${y}" />`;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${C.paper}"/>
  <g stroke="${C.blue}" stroke-width="1" opacity="0.07">${grid}</g>

  <!-- contour lines bottom -->
  <g fill="none" stroke="${C.blue}" stroke-width="1.5" opacity="0.16">
    <path d="M-20 470 C 240 420, 470 540, 700 480 S 1080 410, 1240 500"/>
    <path d="M-20 540 C 260 490, 520 600, 760 545 S 1120 470, 1240 560"/>
  </g>
  <g fill="${C.rust}" opacity="0.7"><circle cx="700" cy="480" r="3.5"/><circle cx="760" cy="545" r="3.5"/></g>

  <!-- frame -->
  <rect x="36" y="36" width="1128" height="558" fill="none" stroke="${C.line}" stroke-width="1.5" rx="10"/>
  <g stroke="${C.blue}" stroke-width="2.5" fill="none">
    <path d="M56 36 V56 M36 56 H56" opacity="0"/>
    <path d="M64 50 h22 M64 50 v22"/><path d="M1136 580 h-22 M1136 580 v-22"/>
  </g>

  <!-- aperture mark -->
  <g transform="translate(92,104)">
    <circle r="22" fill="none" stroke="${C.blue}" stroke-width="3"/>
    <circle r="7" fill="${C.rust}"/>
    <g stroke="${C.ink}" stroke-width="2.5" stroke-linecap="round">
      <path d="M0 -30 V-24 M0 24 V30 M-30 0 H-24 M24 0 H30"/>
    </g>
  </g>

  <text x="138" y="112" font-family="Space Mono" font-size="22" letter-spacing="4" fill="${C.ink3}">FIELD LOG</text>
  <text x="1112" y="112" font-family="Space Mono" font-size="22" letter-spacing="2" fill="${C.blueInk}" text-anchor="end">12.97°N 77.59°E</text>

  <text x="88" y="300" font-family="Space Mono" font-weight="700" font-size="92" letter-spacing="-2" fill="${C.ink}">Soham Shinde</text>
  <text x="90" y="372" font-family="Space Mono" font-size="34" fill="${C.ink2}">I teach robots to see. Mostly they do.</text>
  <text x="90" y="426" font-family="Space Mono" font-size="24" letter-spacing="1" fill="${C.blueInk}">machine learning · computer vision · robotics</text>

  <line x1="88" y1="520" x2="1112" y2="520" stroke="${C.line}" stroke-width="1"/>
  <circle cx="98" cy="556" r="6" fill="${C.good}"/>
  <text x="116" y="563" font-family="Space Mono" font-size="22" fill="${C.ink3}">ML Engineer · Clutterbot</text>
  <text x="1112" y="563" font-family="Space Mono" font-weight="700" font-size="22" fill="${C.rustDeep}" text-anchor="end">sohamshinde.com</text>
</svg>`;

const resvg = new Resvg(svg, {
  fitTo: { mode: 'width', value: 1200 },
  font: { fontBuffers: [reg, bold], defaultFontFamily: 'Space Mono', loadSystemFonts: false },
});
const png = resvg.render().asPng();
writeFileSync(resolve(here, '../public/og.png'), png);
console.log('wrote public/og.png', png.length, 'bytes');
