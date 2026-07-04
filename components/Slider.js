"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Minimal scroll-snap slider with dot navigation and optional autoplay.
 * children: array of slides (each rendered full-width).
 */
export default function Slider({ children, autoplayMs = 0, className = "" }) {
  const trackRef = useRef(null);
  const [index, setIndex] = useState(0);
  const count = Array.isArray(children) ? children.length : 1;

  function goTo(i) {
    const track = trackRef.current;
    if (!track) return;
    const clamped = ((i % count) + count) % count;
    track.scrollTo({ left: clamped * track.clientWidth, behavior: "smooth" });
  }

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    function onScroll() {
      setIndex(Math.round(track.scrollLeft / track.clientWidth));
    }
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!autoplayMs || count < 2) return;
    const id = setInterval(() => goTo(index + 1), autoplayMs);
    return () => clearInterval(id);
  }, [index, autoplayMs, count]);

  return (
    <div className={`relative ${className}`}>
      <div ref={trackRef} className="slider-track h-full w-full">
        {(Array.isArray(children) ? children : [children]).map((child, i) => (
          <div key={i} className="slider-slide w-full h-full">
            {child}
          </div>
        ))}
      </div>

      {count > 1 && (
        <>
          <button
            aria-label="Previous slide"
            onClick={() => goTo(index - 1)}
            className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center rounded-full bg-paper/70 text-ink backdrop-blur hover:bg-paper transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            aria-label="Next slide"
            onClick={() => goTo(index + 1)}
            className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center rounded-full bg-paper/70 text-ink backdrop-blur hover:bg-paper transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {Array.from({ length: count }).map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => goTo(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-6 bg-paper" : "w-1.5 bg-paper/50"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
