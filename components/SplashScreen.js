"use client";

import { useEffect, useState } from "react";

export default function SplashScreen() {
  const [state, setState] = useState("unknown"); // unknown | show | leaving | gone

  useEffect(() => {
    let shown = false;
    try {
      shown = sessionStorage.getItem("praxis-splash") === "1";
    } catch (e) {}
    if (shown) {
      setState("gone");
      return;
    }
    setState("show");
    try {
      sessionStorage.setItem("praxis-splash", "1");
    } catch (e) {}
    const t1 = setTimeout(() => setState("leaving"), 1500);
    const t2 = setTimeout(() => setState("gone"), 2050);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (state === "gone" || state === "unknown") return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center gap-8 bg-paper ${
        state === "leaving" ? "splash-leaving" : ""
      }`}
    >
      <svg
        viewBox="0 0 120 60"
        className="w-20"
        fill="none"
        stroke="var(--ink)"
        strokeWidth="2.5"
        strokeLinecap="round"
      >
        <path className="draw" style={{ "--dash": 300 }} d="M 6 50 L 40 50 Q 60 50 60 34 Q 60 20 44 20 L 20 20 M 70 50 L 114 10 M 88 10 L 114 10 L 114 36" />
      </svg>
      <p className="splash-word font-serif text-2xl tracking-[0.28em]">PRAXIS</p>
      <div className="loader-ring" />
    </div>
  );
}
