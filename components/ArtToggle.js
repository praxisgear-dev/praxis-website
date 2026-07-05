"use client";

import { useEffect, useState } from "react";

export default function ArtToggle() {
  const [on, setOn] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setOn(document.documentElement.classList.contains("art"));
  }, []);

  function toggle() {
    const next = !on;
    setOn(next);
    document.documentElement.classList.toggle("art", next);
    try {
      localStorage.setItem("praxis-art", next ? "on" : "off");
    } catch (e) {}
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle art mode"
      aria-pressed={on}
      className="flex items-center gap-2 group"
      title="Art mode"
    >
      <span
        className="relative w-11 h-6 rounded-full transition-all duration-500"
        style={
          mounted && on
            ? {
                background:
                  "linear-gradient(110deg, var(--glow-3), var(--glow-1) 55%, var(--glow-2))",
                boxShadow:
                  "0 0 16px -2px color-mix(in srgb, var(--glow-1) 70%, transparent)",
              }
            : { background: "var(--line)" }
        }
      >
        <span
          className="absolute top-0.5 w-5 h-5 rounded-full transition-all duration-500"
          style={{
            left: mounted && on ? "calc(100% - 1.375rem)" : "0.125rem",
            background: mounted && on ? "#0a0a0a" : "var(--paper)",
            boxShadow: "0 1px 4px rgba(0,0,0,0.25)",
          }}
        />
      </span>
      <span className="hidden lg:inline text-[10px] tracking-[0.18em] uppercase text-muted group-hover:text-ink transition-colors">
        Art Mode
      </span>
    </button>
  );
}
