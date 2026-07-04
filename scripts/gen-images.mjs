// Generates muted placeholder SVGs for products, hero, campaign, story, and IG strip.
// Swap these for real photography before launch — same filenames.
import { mkdirSync, writeFileSync } from "fs";
import { join } from "path";

const root = new URL("..", import.meta.url).pathname;
const pub = join(root, "public");
mkdirSync(join(pub, "products"), { recursive: true });
mkdirSync(join(pub, "site"), { recursive: true });

const productsData = [
  ["mens-tempo-shorts", "Tempo Shorts", "#1c2b4a"],
  ["mens-stride-tee", "Stride Tee", "#4a5568"],
  ["womens-pace-shorts", "Pace Shorts", "#4a5568"],
  ["womens-motion-tee", "Motion Tee", "#1c2b4a"],
  ["mens-interval-shorts", "Interval Shorts", "#232323"],
  ["womens-split-shorts", "Split Shorts", "#3a3d42"],
  ["mens-long-run-tee", "Long Run Tee", "#4a5568"],
  ["womens-recovery-tee", "Recovery Tee", "#cdc3b2"],
];
const shots = ["front", "back", "movement", "detail"];

function mix(hex, other, t) {
  const a = hex.match(/\w\w/g).map((x) => parseInt(x, 16));
  const b = other.match(/\w\w/g).map((x) => parseInt(x, 16));
  return (
    "#" +
    a
      .map((v, i) =>
        Math.round(v + (b[i] - v) * t)
          .toString(16)
          .padStart(2, "0")
      )
      .join("")
  );
}

function productSvg(name, shot, hex, w = 900, h = 1125) {
  const bg = mix(hex, "#f5f4f1", 0.86);
  const tone = mix(hex, "#f5f4f1", 0.55);
  const deep = mix(hex, "#1a1a1a", 0.15);
  const cx = w / 2;
  const motifs = {
    front: `<rect x="${cx - 170}" y="300" width="340" height="470" rx="8" fill="${tone}"/>
      <rect x="${cx - 170}" y="300" width="340" height="90" fill="${deep}" opacity="0.25"/>`,
    back: `<rect x="${cx - 170}" y="300" width="340" height="470" rx="8" fill="${tone}"/>
      <line x1="${cx}" y1="330" x2="${cx}" y2="740" stroke="${deep}" stroke-width="2" opacity="0.35"/>`,
    movement: `<path d="M 100 ${h - 260} Q ${cx} ${h - 620} ${w - 100} ${h - 330}" stroke="${deep}" stroke-width="3" fill="none" opacity="0.5"/>
      <circle cx="${cx + 120}" cy="${h - 470}" r="90" fill="${tone}"/>
      <path d="M 140 ${h - 200} Q ${cx} ${h - 480} ${w - 140} ${h - 260}" stroke="${tone}" stroke-width="2" fill="none"/>`,
    detail: `<circle cx="${cx}" cy="${h / 2 - 40}" r="180" fill="${tone}"/>
      <circle cx="${cx}" cy="${h / 2 - 40}" r="110" fill="${bg}"/>
      <circle cx="${cx}" cy="${h / 2 - 40}" r="109" fill="none" stroke="${deep}" stroke-width="1.5" opacity="0.4"/>`,
  };
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}">
  <rect width="${w}" height="${h}" fill="${bg}"/>
  ${motifs[shot]}
  <text x="${cx}" y="${h - 96}" text-anchor="middle" font-family="Georgia, serif" font-size="34" fill="${deep}" opacity="0.75">${name}</text>
  <text x="${cx}" y="${h - 56}" text-anchor="middle" font-family="system-ui, sans-serif" font-size="17" letter-spacing="4" fill="${deep}" opacity="0.45">${shot.toUpperCase()} — PLACEHOLDER</text>
</svg>`;
}

for (const [slug, name, hex] of productsData) {
  for (const shot of shots) {
    writeFileSync(
      join(pub, "products", `${slug}-${shot}.svg`),
      productSvg(name, shot, hex)
    );
  }
}

function wideSvg(label, sub, hex, w = 1920, h = 1080) {
  const bg = mix(hex, "#eceae6", 0.78);
  const tone = mix(hex, "#eceae6", 0.45);
  const deep = mix(hex, "#141414", 0.1);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}">
  <rect width="${w}" height="${h}" fill="${bg}"/>
  <path d="M -50 ${h * 0.78} Q ${w * 0.3} ${h * 0.42} ${w * 0.62} ${h * 0.66} T ${w + 50} ${h * 0.5}" stroke="${deep}" stroke-width="4" fill="none" opacity="0.4"/>
  <path d="M -50 ${h * 0.88} Q ${w * 0.35} ${h * 0.56} ${w * 0.7} ${h * 0.76} T ${w + 50} ${h * 0.62}" stroke="${tone}" stroke-width="3" fill="none"/>
  <circle cx="${w * 0.68}" cy="${h * 0.4}" r="${h * 0.16}" fill="${tone}" opacity="0.8"/>
  <text x="${w / 2}" y="${h - 90}" text-anchor="middle" font-family="Georgia, serif" font-size="44" fill="${deep}" opacity="0.7">${label}</text>
  <text x="${w / 2}" y="${h - 44}" text-anchor="middle" font-family="system-ui, sans-serif" font-size="20" letter-spacing="6" fill="${deep}" opacity="0.4">${sub}</text>
</svg>`;
}

writeFileSync(join(pub, "site", "hero-1.svg"), wideSvg("Morning miles, Ellis Bridge", "HERO PLACEHOLDER — REPLACE WITH RUNNING PHOTOGRAPH", "#1c2b4a"));
writeFileSync(join(pub, "site", "hero-2.svg"), wideSvg("Track session, dusk", "HERO PLACEHOLDER — REPLACE WITH RUNNING PHOTOGRAPH", "#3a3d42"));
writeFileSync(join(pub, "site", "hero-3.svg"), wideSvg("The long way home", "HERO PLACEHOLDER — REPLACE WITH RUNNING PHOTOGRAPH", "#4a5568"));
writeFileSync(join(pub, "site", "campaign.svg"), wideSvg("Built in Ahmedabad", "CAMPAIGN PLACEHOLDER", "#1c2b4a"));
writeFileSync(join(pub, "site", "story.svg"), wideSvg("The founder, mid-stride", "ABOUT PLACEHOLDER", "#4a5568", 1200, 1400));
writeFileSync(join(pub, "site", "brand.svg"), wideSvg("Why Praxis exists", "BRAND PLACEHOLDER", "#cdc3b2", 1200, 1400));

for (let i = 1; i <= 6; i++) {
  const hexes = ["#1c2b4a", "#4a5568", "#3a3d42", "#cdc3b2", "#1c2b4a", "#4a5568"];
  writeFileSync(join(pub, "site", `ig-${i}.svg`), wideSvg(`@praxis.gear`, `INSTAGRAM POST ${i}`, hexes[i - 1], 800, 800));
}

console.log("done");
