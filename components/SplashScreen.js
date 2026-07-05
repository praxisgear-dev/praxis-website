"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";

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
      <Logo size={72} drawn className="text-ink" />
      <p className="splash-word font-serif text-2xl tracking-[0.28em]">PRAXIS</p>
      <div className="loader-ring" />
    </div>
  );
}
