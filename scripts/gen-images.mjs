// Generates minimalist LINE-ART SVGs (transparent bg, dark strokes).
// Dark mode inverts them via CSS (img.artwork). Same filenames as before.
import { mkdirSync, writeFileSync } from "fs";
import { join } from "path";

const root = new URL("..", import.meta.url).pathname;
const pub = join(root, "public");
mkdirSync(join(pub, "products"), { recursive: true });
mkdirSync(join(pub, "site"), { recursive: true });

const S = "#141414"; // stroke
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
    <path d="M 96 -40 L 120 -36" />
    <path d="M 84 30 L 122 38" stroke-dasharray="5 7"/>
    <path d="M -84 30 L -122 38" stroke-dasharray="5 7"/>
  </g>`;
}
function teeArt(cx, cy, s = 1) {
  return `<g transform="translate(${cx},${cy}) scale(${s})">
    <path d="M -60 -150 q 60 26 120 0 L 145 -95 L 110 -40 L 85 -62 L 85 150 L -85 150 L -85 -62 L -110 -40 L -145 -95 Z"/>
    <path d="M -34 -148 q 34 34 68 0"/>
    <path d="M -85 120 L 85 120" stroke-dasharray="6 8"/>
    <path d="M 85 -62 L 85 -40" />
    <path d="M -85 -62 L -85 -40" />
  </g>`;
}

/* ---------------- runner (line figure) ---------------- */
function runnerArt(cx, cy, s = 1, pose = "a") {
  const legs =
    pose === "a"
      ? `<path d="M 0 34 L 34 66 L 30 108"/><path d="M 0 34 L -30 62 L -58 54"/>`
      : `<path d="M 0 34 L 12 78 L 44 92"/><path d="M 0 34 L -34 58 L -40 100"/>`;
  const arms =
    pose === "a"
      ? `<path d="M 2 -18 L 38 2 L 66 -14"/><path d="M 2 -18 L -32 -4 L -50 22"/>`
      : `<path d="M 2 -18 L 34 -6 L 54 18"/><path d="M 2 -18 L -34 0 L -62 -12"/>`;
  return `<g transform="translate(${cx},${cy}) scale(${s})">
    <circle cx="14" cy="-56" r="17"/>
    <path d="M 8 -38 Q -2 -8 0 34"/>
    ${arms}${legs}
  </g>`;
}

/* ---------------- product shots ---------------- */
function productShot(kind, shot, w = 900, h = 1125) {
  const cx = w / 2, cy = h / 2 - 40;
  const garment = kind === "Shorts" ? shortsArt : teeArt;
  let inner = "";
  if (shot === "front") {
    inner = `${garment(cx, cy, 1.9)}
      <path d="M 140 ${h - 170} L ${w - 140} ${h - 170}" stroke-width="2" opacity="0.35"/>`;
  } else if (shot === "back") {
    inner = `<g transform="scale(-1,1) translate(${-w},0)">${garment(cx, cy, 1.9)}</g>
      <circle cx="${cx}" cy="${cy - (kind === "Shorts" ? 40 : 60)}" r="10" stroke-width="2"/>`;
  } else if (shot === "movement") {
    inner = `${runnerArt(cx - 30, cy, 2.4)}
      <path d="M 110 ${cy + 270} L ${w - 110} ${cy + 270}" opacity="0.5"/>
      <path d="M ${cx - 290} ${cy - 60} l -70 0 M ${cx - 270} ${cy - 10} l -110 0 M ${cx - 280} ${cy + 40} l -80 0" stroke-width="2" opacity="0.55"/>`;
  } else {
    inner = `<circle cx="${cx}" cy="${cy}" r="230"/>
      ${kind === "Shorts"
        ? `<path d="M ${cx - 130} ${cy + 40} L ${cx + 130} ${cy - 60}" stroke-dasharray="8 10"/><path d="M ${cx - 130} ${cy + 90} L ${cx + 130} ${cy - 10}" stroke-dasharray="8 10"/>`
        : `<path d="M ${cx - 120} ${cy - 40} q 60 60 240 20" stroke-dasharray="8 10"/><path d="M ${cx - 120} ${cy + 20} q 60 60 240 20" stroke-dasharray="8 10"/>`}
      <path d="M ${cx + 150} ${cy + 178} l 34 34" stroke-width="4"/>`;
  }
  return wrap(w, h, inner);
}

const productsData = [
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

/* ---------------- site art ---------------- */
// Brand statement: runner + city bridge line art (portrait)
writeFileSync(
  join(pub, "site", "brand.svg"),
  wrap(1200, 1400, `
    ${runnerArt(560, 700, 3.2)}
    <path d="M 80 1010 L 1120 1010"/>
    <path d="M 120 1010 q 220 -260 440 -260 q 260 0 520 260" stroke-width="2" opacity="0.5"/>
    <path d="M 260 1010 L 260 880 M 420 1010 L 420 800 M 600 1010 L 600 760 M 780 1010 L 780 800 M 940 1010 L 940 880" stroke-width="2" opacity="0.5"/>
    <circle cx="950" cy="330" r="70" stroke-width="2"/>
  `)
);
// Story: portrait runner at sunrise
writeFileSync(
  join(pub, "site", "story.svg"),
  wrap(1200, 1400, `
    ${runnerArt(600, 760, 3.4, "b")}
    <path d="M 100 1080 L 1100 1080"/>
    <circle cx="600" cy="300" r="120" stroke-width="2"/>
    <path d="M 430 300 l -90 0 M 770 300 l 90 0 M 600 130 l 0 -70 M 480 180 l -50 -50 M 720 180 l 50 -50" stroke-width="2"/>
  `)
);
// Instagram tiles: sport line icons
const igIcons = [
  // shoe
  `<path d="M 160 480 q 40 -110 120 -120 q 60 40 130 40 q 40 30 130 46 q 110 12 100 66 l -6 30 q -240 30 -474 0 Z"/><path d="M 300 372 l 26 30 M 350 386 l 26 28 M 400 396 l 24 26" stroke-width="2.5"/>`,
  // stopwatch
  `<circle cx="400" cy="430" r="170"/><path d="M 400 330 L 400 430 L 480 470"/><path d="M 360 240 L 440 240 M 400 240 L 400 262" stroke-width="4"/>`,
  // medal
  `<circle cx="400" cy="480" r="120"/><path d="M 400 430 l 22 44 48 6 -36 34 9 48 -43 -24 -43 24 9 -48 -36 -34 48 -6 Z" stroke-width="2.5"/><path d="M 330 380 L 260 200 L 360 200 L 400 300 L 440 200 L 540 200 L 470 380"/>`,
  // bottle
  `<path d="M 350 260 L 450 260 L 450 320 Q 490 360 490 420 L 490 600 Q 490 640 450 640 L 350 640 Q 310 640 310 600 L 310 420 Q 310 360 350 320 Z"/><path d="M 340 470 L 460 470 M 340 520 L 460 520" stroke-width="2.5"/>`,
  // heartbeat
  `<path d="M 160 420 L 300 420 L 340 340 L 400 520 L 450 380 L 480 420 L 640 420"/><circle cx="400" cy="430" r="230" stroke-width="2" opacity="0.5"/>`,
  // mountain + flag
  `<path d="M 140 580 L 340 280 L 440 420 L 520 300 L 660 580 Z"/><path d="M 340 280 L 340 200 L 410 225 L 340 250" stroke-width="2.5"/>`,
];
igIcons.forEach((icon, i) => {
  writeFileSync(join(pub, "site", `ig-${i + 1}.svg`), wrap(800, 800, icon));
});
// Heroes kept for potential reuse
writeFileSync(join(pub, "site", "hero-1.svg"), wrap(1920, 1080, `${runnerArt(960, 620, 3)}<path d="M 200 880 L 1720 880"/>`));
writeFileSync(join(pub, "site", "hero-2.svg"), wrap(1920, 1080, `${runnerArt(900, 620, 3, "b")}<path d="M 200 880 L 1720 880" stroke-dasharray="14 18"/>`));
writeFileSync(join(pub, "site", "hero-3.svg"), wrap(1920, 1080, `${runnerArt(1020, 620, 3)}<path d="M 200 880 L 1720 880"/><circle cx="1500" cy="280" r="90" stroke-width="2"/>`));
writeFileSync(join(pub, "site", "campaign.svg"), wrap(1920, 1080, `${runnerArt(960, 600, 3.2, "b")}<path d="M 100 880 L 1820 880"/><path d="M 300 880 L 300 700 L 420 700 L 420 880 M 520 880 L 520 640 L 660 640 L 660 880 M 1300 880 L 1300 660 L 1430 660 L 1430 880 M 1530 880 L 1530 730 L 1640 730 L 1640 880" stroke-width="2" opacity="0.5"/>`));

console.log("line art generated");
