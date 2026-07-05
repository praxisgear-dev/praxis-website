"use client";

const options = ["Men", "Women"];

export default function GenderSlider({ value, onChange }) {
  const index = options.indexOf(value);
  return (
    <div className="clay-sm relative inline-flex p-1 rounded-full select-none">
      <span
        className="absolute top-1 bottom-1 rounded-full bg-ink transition-all duration-300 ease-out"
        style={{
          width: `calc(50% - 0.25rem)`,
          left: index === 0 ? "0.25rem" : "calc(50% )",
        }}
      />
      {options.map((o) => (
        <button
          key={o}
          onClick={() => onChange(o)}
          className={`relative z-10 px-6 md:px-8 py-2 text-xs tracking-[0.14em] uppercase transition-colors duration-300 ${
            value === o ? "text-paper" : "text-muted hover:text-ink"
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}
