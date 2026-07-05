// Generates minimalist LINE-ART SVGs (transparent bg, dark strokes).
// Dark mode inverts them via CSS (img.artwork). Same filenames as before.
import { mkdirSync, writeFileSync } from "fs";
import { join } from "path";

const root = new URL("..", import.meta.url).pathname;
const pub = join(root, "public");
mkdirSync(join(pub, "products"), { recursive: true });
mkdirSync(join(pub, "site"), { recursive: true });

const S = "#141414";
const SW = 3;

const wrap = (w, h, inner) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" fill="none" stroke="${S}" stroke-width="${SW}" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`;

/* ---------------- garments ---------------- */
function shortsArt(cx, cy, s = 1) {
  return `<g transform="translate(${cx},${cy}) scale(${s})">
    <path d="M -110 -120 L 110 -120 L 130 90 L 40 100 L 0 -20 L -40 100 L -130 90 Z"/>
    <path d="M -110 -95 L 110 -95"/>
    <path d="M -18 -95 q 8 26 18 30 q 10 -4 18 -30" stroke-dasharray="6 7"/>
    <path d="M -14 -78 q 14 18 28 0"/>
    <path d="M 96 -40 L 120 -36"/>
    <path d="M 84 30 L 122 38" stroke-dasharray="5 7"/>
    <path d="M -84 30 L -122 38" stroke-dasharray="5 7"/>
  </g>`;
}
function teeArt(cx, cy, s = 1) {
  return `<g transform="translate(${cx},${cy}) scale(${s})">
    <path d="M -60 -150 q 60 26 120 0 L 145 -95 L 110 -40 L 85 -62 L 85 150 L -85 150 L -85 -62 L -110 -40 L -145 -95 Z"/>
    <path d="M -34 -148 q 34 34 68 0"/>
    <path d="M -85 120 L 85 120" stroke-dasharray="6 8"/>
    <path d="M 85 -62 L 85 -40"/>
    <path d="M -85 -62 L -85 -40"/>
  </g>`;
}
function jacketArt(cx, cy, s = 1) {
  return `<g transform="translate(${cx},${cy}) scale(${s})">
    <path d="M -55 -155 L -20 -168 Q 0 -160 20 -168 L 55 -155 L 148 -90 L 112 -30 L 88 -52 L 88 150 L -88 150 L -88 -52 L -112 -30 L -148 -90 Z"/>
    <path d="M -55 -155 Q -30 -120 0 -118 Q 30 -120 55 -155"/>
    <path d="M -20 -168 L -30 -128 M 20 -168 L 30 -128"/>
    <path d="M 0 -118 L 0 150" stroke-dasharray="7 8"/>
    <path d="M -58 40 l 26 0 M 32 40 l 26 0"/>
    <path d="M -88 120 L 88 120" stroke-dasharray="6 8"/>
    <path d="M 88 -52 L 88 -28 M -88 -52 L -88 -28"/>
  </g>`;
}
const garmentFor = (kind) =>
  kind === "Shorts" ? shortsArt : kind === "Jackets" ? jacketArt : teeArt;

/* ------------- product shots (no figures) ------------- */
function productShot(kind, shot, w = 900, h = 1125) {
  const cx = w / 2, cy = h / 2 - 40;
  const garment = garmentFor(kind);
  let inner = "";
  if (shot === "front") {
    inner = `${garment(cx, cy, 1.9)}
      <path d="M 140 ${h - 170} L ${w - 140} ${h - 170}" stroke-width="2" opacity="0.35"/>`;
  } else if (shot === "back") {
    inner = `<g transform="scale(-1,1) translate(${-w},0)">${garment(cx, cy, 1.9)}</g>
      <circle cx="${cx}" cy="${cy - (kind === "Shorts" ? 40 : 60)}" r="10" stroke-width="2"/>`;
  } else if (shot === "movement") {
    // garment in the wind — motion lines, no figure
    inner = `<g transform="rotate(-7 ${cx} ${cy})">${garment(cx + 20, cy, 1.6)}</g>
      <path d="M ${cx - 340} ${cy - 120} q 60 -16 120 0 M ${cx - 380} ${cy - 40} q 80 -20 160 0 M ${cx - 350} ${cy + 50} q 60 -14 110 0" stroke-width="2.5" opacity="0.6"/>
      <path d="M 120 ${h - 180} L ${w - 120} ${h - 180}" stroke-width="2" opacity="0.4"/>
      <path d="M ${w - 320} ${h - 180} L ${w - 240} ${h - 300} L ${w - 160} ${h - 180}" stroke-width="2" opacity="0.4"/>`;
  } else {
    inner = `<circle cx="${cx}" cy="${cy}" r="230"/>
      ${kind === "Shorts"
        ? `<path d="M ${cx - 130} ${cy + 40} L ${cx + 130} ${cy - 60}" stroke-dasharray="8 10"/><path d="M ${cx - 130} ${cy + 90} L ${cx + 130} ${cy - 10}" stroke-dasharray="8 10"/>`
        : kind === "Jackets"
        ? `<path d="M ${cx} ${cy - 150} L ${cx} ${cy + 150}" stroke-dasharray="8 10"/><path d="M ${cx - 26} ${cy - 60} l 52 0 M ${cx - 26} ${cy + 20} l 52 0" stroke-width="2.5"/>`
        : `<path d="M ${cx - 120} ${cy - 40} q 60 60 240 20" stroke-dasharray="8 10"/><path d="M ${cx - 120} ${cy + 20} q 60 60 240 20" stroke-dasharray="8 10"/>`}
      <path d="M ${cx + 150} ${cy + 178} l 34 34" stroke-width="4"/>`;
  }
  return wrap(w, h, inner);
}

const productsData = [
  ["mens-shield-jacket", "Jackets"],
  ["womens-trail-jacket", "Jackets"],
  ["mens-tempo-shorts", "Shorts"],
  ["mens-stride-tee", "Tees"],
  ["womens-pace-shorts", "Shorts"],
  ["womens-motion-tee", "Tees"],
  ["mens-interval-shorts", "Shorts"],
  ["womens-split-shorts", "Shorts"],
  ["mens-long-run-tee", "Tees"],
  ["womens-recovery-tee", "Tees"],
];
for (const [slug, kind] of productsData) {
  for (const shot of ["front", "back", "movement", "detail"]) {
    writeFileSync(join(pub, "products", `${slug}-${shot}.svg`), productShot(kind, shot));
  }
}

/* ---------------- site art (no figures) ---------------- */
writeFileSync(
  join(pub, "site", "brand.svg"),
  wrap(1200, 1400, `
    ${teeArt(600, 620, 2.2)}
    <path d="M 80 1060 L 1120 1060"/>
    <path d="M 140 1060 q 220 -240 460 -240 q 260 0 460 240" stroke-width="2" opacity="0.5"/>
    <path d="M 300 1060 L 300 930 M 480 1060 L 480 860 M 660 1060 L 660 830 M 840 1060 L 840 880" stroke-width="2" opacity="0.5"/>
    <circle cx="960" cy="260" r="70" stroke-width="2"/>
  `)
);
writeFileSync(
  join(pub, "site", "story.svg"),
  wrap(1200, 1400, `
    ${shortsArt(600, 680, 2.1)}
    <path d="M 100 1080 L 1100 1080"/>
    <circle cx="600" cy="260" r="110" stroke-width="2"/>
    <path d="M 448 260 l -80 0 M 752 260 l 80 0 M 600 108 l 0 -64 M 494 154 l -46 -46 M 706 154 l 46 -46" stroke-width="2"/>
  `)
);

const igIcons = [
  `<path d="M 160 480 q 40 -110 120 -120 q 60 40 130 40 q 40 30 130 46 q 110 12 100 66 l -6 30 q -240 30 -474 0 Z"/><path d="M 300 372 l 26 30 M 350 386 l 26 28 M 400 396 l 24 26" stroke-width="2.5"/>`,
  `<circle cx="400" cy="430" r="170"/><path d="M 400 330 L 400 430 L 480 470"/><path d="M 360 240 L 440 240 M 400 240 L 400 262" stroke-width="4"/>`,
  `<circle cx="400" cy="480" r="120"/><path d="M 400 430 l 22 44 48 6 -36 34 9 48 -43 -24 -43 24 9 -48 -36 -34 48 -6 Z" stroke-width="2.5"/><path d="M 330 380 L 260 200 L 360 200 L 400 300 L 440 200 L 540 200 L 470 380"/>`,
  `<path d="M 350 260 L 450 260 L 450 320 Q 490 360 490 420 L 490 600 Q 490 640 450 640 L 350 640 Q 310 640 310 600 L 310 420 Q 310 360 350 320 Z"/><path d="M 340 470 L 460 470 M 340 520 L 460 520" stroke-width="2.5"/>`,
  `<path d="M 160 420 L 300 420 L 340 340 L 400 520 L 450 380 L 480 420 L 640 420"/><circle cx="400" cy="430" r="230" stroke-width="2" opacity="0.5"/>`,
  `<path d="M 140 580 L 340 280 L 440 420 L 520 300 L 660 580 Z"/><path d="M 340 280 L 340 200 L 410 225 L 340 250" stroke-width="2.5"/>`,
];
igIcons.forEach((icon, i) => {
  writeFileSync(join(pub, "site", `ig-${i + 1}.svg`), wrap(800, 800, icon));
});

console.log("line art generated");
