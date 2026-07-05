"use client";

import { useEffect, useRef } from "react";

/* Line-art landscape scenes. Strokes use currentColor so art mode can tint. */
const sw = 2.5;
const G = ({ children }) => (
  <svg
    viewBox="0 0 1200 600"
    preserveAspectRatio="xMidYMax slice"
    className="scene-svg absolute inset-0 w-full h-full"
    fill="none"
    stroke="currentColor"
    strokeWidth={sw}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {children}
  </svg>
);

const pine = (x, y, s) =>
  `M ${x} ${y} L ${x - 34 * s} ${y + 70 * s} L ${x + 34 * s} ${y + 70 * s} Z
   M ${x} ${y + 34 * s} L ${x - 46 * s} ${y + 120 * s} L ${x + 46 * s} ${y + 120 * s} Z
   M ${x} ${y + 120 * s} L ${x} ${y + 150 * s}`;

const scenes = [
  {
    key: "forest",
    label: "Forests",
    art: (
      <G>
        <path d={pine(180, 240, 1.4)} />
        <path d={pine(360, 300, 1)} />
        <path d={pine(520, 200, 1.7)} />
        <path d={pine(760, 290, 1.1)} />
        <path d={pine(950, 230, 1.5)} />
        <path d={pine(1100, 320, 0.9)} />
        <path d="M 0 520 L 1200 520" />
        <path d="M 60 560 l 60 0 M 300 555 l 40 0 M 900 560 l 70 0" opacity="0.5" strokeWidth="2" />
      </G>
    ),
  },
  {
    key: "grassland",
    label: "Grasslands",
    art: (
      <G>
        <path d="M 0 520 L 1200 520" />
        <circle cx="980" cy="160" r="70" strokeWidth="2" />
        {[80, 180, 300, 430, 560, 700, 830, 960, 1100].map((x, i) => (
          <path
            key={i}
            d={`M ${x} 520 q -8 -34 -18 -44 M ${x} 520 q 2 -40 12 -52 M ${x} 520 q 14 -28 26 -34`}
            strokeWidth="2"
          />
        ))}
        <path d="M 100 300 q 40 -18 80 0 M 220 260 q 40 -18 80 0" strokeWidth="2" opacity="0.5" />
      </G>
    ),
  },
  {
    key: "mountains",
    label: "Mountains",
    art: (
      <G>
        <path d="M 0 520 L 240 220 L 420 420 L 600 140 L 800 430 L 980 260 L 1200 520" />
        <path d="M 560 200 L 600 140 L 650 215 L 620 190 L 595 218 L 575 195 Z" strokeWidth="2" />
        <path d="M 205 265 L 240 220 L 280 270" strokeWidth="2" />
        <path d="M 0 520 L 1200 520" />
        <circle cx="140" cy="140" r="46" strokeWidth="2" opacity="0.7" />
      </G>
    ),
  },
  {
    key: "desert",
    label: "Deserts",
    art: (
      <G>
        <path d="M 0 500 q 200 -80 400 0 q 220 -90 440 0 q 180 -60 360 0" />
        <path d="M 0 520 L 1200 520" opacity="0.4" />
        <path d="M 880 470 L 880 360 M 880 400 q -36 -6 -36 -48 M 880 415 q 40 -8 40 -55" />
        <circle cx="220" cy="150" r="64" strokeWidth="2" />
        <path d="M 480 545 l 60 0 M 700 550 l 44 0" strokeWidth="2" opacity="0.5" />
      </G>
    ),
  },
  {
    key: "rain",
    label: "Rain",
    art: (
      <G>
        <path d="M 260 200 q -60 0 -60 -46 q 0 -46 52 -46 q 10 -40 62 -40 q 52 0 62 40 q 52 2 52 48 q 0 44 -58 44 Z" />
        <path d="M 780 170 q -54 0 -54 -42 q 0 -42 48 -42 q 8 -36 56 -36 q 48 0 56 36 q 48 2 48 44 q 0 40 -52 40 Z" />
        {[220, 270, 320, 370, 740, 790, 840, 890, 540, 590, 1020].map((x, i) => (
          <path key={i} d={`M ${x} ${230 + (i % 3) * 40} l -16 44`} strokeWidth="2" />
        ))}
        <path d="M 0 520 L 1200 520" />
        <path d="M 380 545 q 30 -12 60 0 M 820 550 q 26 -10 52 0" strokeWidth="2" opacity="0.5" />
      </G>
    ),
  },
  {
    key: "city",
    label: "Cities",
    art: (
      <G>
        <path d="M 80 520 L 80 300 L 200 300 L 200 520 M 240 520 L 240 200 L 380 200 L 380 520 M 420 520 L 420 340 L 520 340 L 520 520 M 700 520 L 700 240 L 830 240 L 830 520 M 870 520 L 870 160 L 990 160 L 990 520 M 1030 520 L 1030 350 L 1140 350 L 1140 520" />
        <path d="M 110 340 l 24 0 M 110 390 l 24 0 M 150 340 l 24 0 M 270 240 l 24 0 M 270 290 l 24 0 M 330 240 l 24 0 M 900 200 l 24 0 M 900 250 l 24 0 M 950 200 l 24 0 M 730 280 l 24 0 M 780 280 l 24 0" strokeWidth="2" opacity="0.6" />
        <path d="M 0 520 L 1200 520" />
      </G>
    ),
  },
];

/* Product shown in each environment, in scene order:
   forest, grassland, mountains, desert, rain, city */
const sceneProducts = [
  { img: "/products/mens-long-run-tee-front.svg", name: "Long Run Tee" },
  { img: "/products/mens-tempo-shorts-front.svg", name: "Tempo Shorts" },
  { img: "/products/womens-trail-jacket-front.svg", name: "Trail Jacket" },
  { img: "/products/womens-split-shorts-front.svg", name: "Split Shorts" },
  { img: "/products/mens-shield-jacket-front.svg", name: "Shield Jacket" },
  { img: "/products/womens-pace-shorts-front.svg", name: "Pace Shorts" },
];

export default function RunnerJourney() {
  const containerRef = useRef(null);
  const labelRef = useRef(null);
  const sceneRefs = useRef([]);

  useEffect(() => {
    let raf = 0;
    function update() {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const p = Math.min(1, Math.max(0, -rect.top / total));

      const n = scenes.length;
      const seg = 1 / n;
      let active = Math.min(n - 1, Math.floor(p / seg));
      scenes.forEach((_, i) => {
        const center = (i + 0.5) * seg;
        const o = Math.max(0, 1 - Math.abs(p - center) / (seg * 0.72));
        const node = sceneRefs.current[i];
        if (node) node.style.opacity = o.toFixed(3);
      });

      if (labelRef.current) {
        labelRef.current.textContent = scenes[active].label;
      }
    }
    function onScroll() {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    }
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      aria-label="Praxis gear across forests, grasslands, mountains, deserts, rain and cities"
      style={{ height: `${scenes.length * 90 + 60}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute top-14 md:top-20 left-0 right-0 text-center px-6 z-10">
          <p className="eyebrow mb-2">Wherever you run</p>
          <h2 className="font-serif text-3xl md:text-5xl">
            Built for{" "}
            <span ref={labelRef} className="italic">
              Forests
            </span>
            .
          </h2>
        </div>

        {scenes.map((s, i) => (
          <div
            key={s.key}
            ref={(node) => (sceneRefs.current[i] = node)}
            className={`scene-${s.key} absolute inset-0 transition-opacity duration-150`}
            style={{ opacity: i === 0 ? 1 : 0 }}
          >
            {s.art}
            {/* the product, centre stage in this environment */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pt-16">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={sceneProducts[i].img}
                alt={`${sceneProducts[i].name} line illustration in ${s.label.toLowerCase()}`}
                className="artwork w-44 md:w-64 h-auto"
              />
              <p className="eyebrow mt-2">{sceneProducts[i].name}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
