/* Minimalist SVG rendition of the Praxis mark —
   two interlocking arcs forming a circle with a central S-curve. */
export default function Logo({ size = 34, className = "", drawn = false }) {
  const d = drawn ? "draw" : "";
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="7"
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
    >
      {/* left arc — opens top-right */}
      <path
        className={d}
        style={drawn ? { "--dash": 220 } : undefined}
        d="M 55 8 A 42 42 0 1 0 76 81"
      />
      {/* right arc — opens bottom-left */}
      <path
        className={d}
        style={drawn ? { "--dash": 220, animationDelay: "0.25s" } : undefined}
        d="M 45 92 A 42 42 0 1 0 24 19"
      />
      {/* central S-curve */}
      <path
        className={d}
        style={drawn ? { "--dash": 120, animationDelay: "0.5s" } : undefined}
        d="M 62 14 Q 38 38 50 50 Q 62 62 38 86"
      />
    </svg>
  );
}
