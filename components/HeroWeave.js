"use client";

import { useEffect, useRef } from "react";

/* Continuous minimalist loop, no figures:
   1. loose threads drift in
   2. warp + weft interlace into woven fabric
   3. the fabric expands
   4. a garment silhouette is cut from it (tee → shorts → jacket, cycling)
   5. it relaxes back to threads and repeats
   Strokes use the current ink color; works in light, dark and art mode. */

const GARMENTS = ["tee", "shorts", "jacket"];

// Silhouette paths in a 0..1 normalized box, drawn centered.
function garmentPath(kind, cx, cy, s) {
  const P = (x, y) => [cx + (x - 0.5) * s, cy + (y - 0.5) * s];
  const M = (pts) => {
    const d = pts.map((p, i) => `${i ? "L" : "M"} ${P(p[0], p[1]).join(" ")}`);
    return d.join(" ") + " Z";
  };
  if (kind === "tee") {
    return M([
      [0.32, 0.16], [0.42, 0.1], [0.58, 0.1], [0.68, 0.16],
      [0.86, 0.28], [0.76, 0.42], [0.68, 0.36], [0.68, 0.9],
      [0.32, 0.9], [0.32, 0.36], [0.24, 0.42], [0.14, 0.28],
    ]);
  }
  if (kind === "shorts") {
    return M([
      [0.2, 0.24], [0.8, 0.24], [0.86, 0.86], [0.56, 0.9],
      [0.5, 0.42], [0.44, 0.9], [0.14, 0.86],
    ]);
  }
  // jacket
  return M([
    [0.32, 0.14], [0.42, 0.08], [0.5, 0.14], [0.58, 0.08], [0.68, 0.14],
    [0.88, 0.26], [0.78, 0.42], [0.7, 0.36], [0.7, 0.92],
    [0.3, 0.92], [0.3, 0.36], [0.22, 0.42], [0.12, 0.26],
  ]);
}

export default function HeroWeave() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let w = 0, h = 0, dpr = 1;
    const start = performance.now();
    const LOOP = 13000; // ms

    function ink() {
      return getComputedStyle(document.documentElement)
        .getPropertyValue("--ink")
        .trim() || "#111";
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    const N = 16; // threads each direction
    const ease = (t) => t * t * (3 - 2 * t);
    const clamp01 = (x) => Math.max(0, Math.min(1, x));
    const seg = (p, a, b) => clamp01((p - a) / (b - a));

    function frame(now) {
      const elapsed = now - start;
      const loopIndex = Math.floor(elapsed / LOOP);
      const p = (elapsed % LOOP) / LOOP; // 0..1
      const kind = GARMENTS[loopIndex % GARMENTS.length];

      ctx.clearRect(0, 0, w, h);
      const color = ink();
      ctx.strokeStyle = color;
      ctx.lineCap = "round";

      const cx = w / 2;
      const cy = h / 2;
      const panel = Math.min(w, h) * 0.42;

      // phase progress
      const pWarp = ease(seg(p, 0.05, 0.28));
      const pWeft = ease(seg(p, 0.24, 0.5));
      const pExpand = ease(seg(p, 0.5, 0.66));
      const pGarment = ease(seg(p, 0.64, 0.82));
      const pRelax = ease(seg(p, 0.86, 1));

      const scale = 1 + pExpand * 0.5 - pRelax * 0.5;
      const size = panel * 2 * scale;
      const left = cx - size / 2;
      const top = cy - size / 2;
      const step = size / (N - 1);

      // fabric opacity fades as garment forms / relaxes
      const fabricAlpha = (0.25 + 0.35 * (pWeft)) * (1 - pRelax) * (1 - pGarment * 0.55);

      // warp (vertical threads)
      for (let i = 0; i < N; i++) {
        const t = clamp01(pWarp * N - i * 0.5);
        if (t <= 0) continue;
        const x = left + i * step;
        const wob = Math.sin(elapsed / 900 + i * 0.6) * 6 * (1 - pExpand);
        ctx.globalAlpha = fabricAlpha * t;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x + wob, top);
        ctx.lineTo(x - wob, top + size * t);
        ctx.stroke();
      }
      // weft (horizontal threads)
      for (let j = 0; j < N; j++) {
        const t = clamp01(pWeft * N - j * 0.5);
        if (t <= 0) continue;
        const y = top + j * step;
        const wob = Math.sin(elapsed / 900 + j * 0.6) * 6 * (1 - pExpand);
        ctx.globalAlpha = fabricAlpha * t;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(left, y + wob);
        ctx.lineTo(left + size * t, y - wob);
        ctx.stroke();
      }

      // garment silhouette drawn from the fabric
      if (pGarment > 0) {
        const gSize = size * 0.92;
        const d = new Path2D(garmentPath(kind, cx, cy, gSize));
        ctx.globalAlpha = clamp01(pGarment) * (1 - pRelax);
        ctx.lineWidth = 2;
        // dash reveal
        ctx.save();
        ctx.setLineDash([2000, 2000]);
        ctx.lineDashOffset = 2000 * (1 - pGarment);
        ctx.stroke(d);
        ctx.restore();

        // faint fill weave inside garment
        ctx.save();
        ctx.clip(d);
        ctx.globalAlpha = 0.14 * pGarment * (1 - pRelax);
        for (let i = 0; i < N; i += 2) {
          const x = left + i * step;
          ctx.beginPath();
          ctx.moveTo(x, top);
          ctx.lineTo(x, top + size);
          ctx.stroke();
        }
        ctx.restore();
      }

      ctx.globalAlpha = 1;
      if (!reduce) raf = requestAnimationFrame(frame);
    }

    raf = requestAnimationFrame(frame);
    if (reduce) {
      // draw a single static woven frame
      cancelAnimationFrame(raf);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-70"
      aria-hidden="true"
    />
  );
}
