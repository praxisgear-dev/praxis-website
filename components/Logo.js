/* Minimalist rendition of the Praxis mark — a circle formed by two
   interlocking crescents, pinched through the centre by an S-curve. */
export default function Logo({ size = 34, className = "", drawn = false }) {
  const d = drawn ? "draw" : "";
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="8"
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
    >
      {/* left crescent — sweeps from top gap around to bottom-right */}
      <path
        className={d}
        style={drawn ? { "--dash": 240 } : undefined}
        d="M 57 7 A 43 43 0 1 0 80 78"
      />
      {/* right crescent — sweeps from bottom gap around to top-left */}
      <path
        className={d}
        style={drawn ? { "--dash": 240, animationDelay: "0.3s" } : undefined}
        d="M 43 93 A 43 43 0 1 0 20 22"
      />
      {/* central S — connects the two tips through the middle */}
      <path
        className={d}
        style={drawn ? { "--dash": 140, animationDelay: "0.6s" } : undefined}
        d="M 57 7 Q 28 32 50 50 Q 72 68 43 93"
      />
    </svg>
  );
}
