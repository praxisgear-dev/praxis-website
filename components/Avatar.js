/* Line-art portrait avatars for testimonials — six variants.
   Swap for real customer photos as they come in (same circular slot). */
const variants = [
  // short crop + headband
  `<circle cx="50" cy="54" r="26"/><path d="M 24 48 q 26 -14 52 0"/><path d="M 26 40 q 24 -18 48 0"/>`,
  // ponytail
  `<circle cx="48" cy="54" r="25"/><path d="M 30 36 q 18 -14 38 -2 q 12 8 8 22"/><path d="M 72 42 q 14 6 10 30 q -3 14 -12 18"/>`,
  // glasses + curls
  `<circle cx="50" cy="56" r="25"/><path d="M 27 42 q 8 -16 23 -16 q 16 0 23 16" stroke-dasharray="4 5"/><circle cx="40" cy="56" r="7"/><circle cx="60" cy="56" r="7"/><path d="M 47 56 l 6 0"/>`,
  // bun
  `<circle cx="50" cy="56" r="25"/><circle cx="50" cy="24" r="8"/><path d="M 27 46 q 23 -14 46 0"/>`,
  // cap
  `<circle cx="50" cy="58" r="24"/><path d="M 26 46 q 24 -12 48 0 L 82 42 q -30 -16 -58 -2 Z"/>`,
  // long hair
  `<circle cx="50" cy="54" r="24"/><path d="M 28 44 q -4 26 2 38 M 72 44 q 4 26 -2 38"/><path d="M 28 44 q 22 -16 44 0"/>`,
];

export default function Avatar({ variant = 0, size = 56, className = "" }) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      dangerouslySetInnerHTML={{
        __html:
          `<circle cx="50" cy="50" r="47" stroke-width="2.5"/>` +
          variants[variant % variants.length] +
          `<path d="M 26 92 q 24 -18 48 0" />`,
      }}
    />
  );
}
