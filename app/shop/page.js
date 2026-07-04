"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { products, allColors } from "@/lib/products";

const genders = ["All", "Men", "Women"];
const types = ["All", "Shorts", "Tees"];

export default function ShopPage() {
  const [gender, setGender] = useState("All");
  const [type, setType] = useState("All");
  const [color, setColor] = useState("All");

  const filtered = useMemo(() => {
    return products
      .filter((p) => (gender === "All" ? true : p.gender === gender))
      .filter((p) => (type === "All" ? true : p.type === type))
      .filter((p) =>
        color === "All" ? true : p.colors.some((c) => c.name === color)
      )
      .sort((a, b) => new Date(b.added) - new Date(a.added));
  }, [gender, type, color]);

  return (
    <div className="mx-auto max-w-6xl px-5 pt-10 md:pt-16">
      <h1 className="font-serif text-3xl md:text-4xl">Shop</h1>
      <p className="text-sm text-muted mt-2">
        Running shorts and tees. Newest first.
      </p>

      <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4 pb-6 border-b border-line">
        <FilterGroup label="Gender" options={genders} value={gender} onChange={setGender} />
        <FilterGroup label="Type" options={types} value={type} onChange={setType} />
        <FilterGroup
          label="Color"
          options={["All", ...allColors.map((c) => c.name)]}
          value={color}
          onChange={setColor}
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-muted mt-16 text-center">
          Nothing matches those filters yet.
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mt-10">
          {filtered.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}

function FilterGroup({ label, options, value, onChange }) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <span className="eyebrow">{label}</span>
      {options.map((o) => (
        <button
          key={o}
          onClick={() => onChange(o)}
          className={`text-sm transition-colors ${
            value === o ? "text-ink underline underline-offset-4" : "text-muted hover:text-ink"
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}
