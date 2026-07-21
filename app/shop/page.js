"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import GenderSlider from "@/components/GenderSlider";
import Slider from "@/components/Slider";
import { formatPrice, cardImages, allColors } from "@/lib/products";
import { useProducts, effectivePrice } from "@/lib/store";

const types = ["All", "Shorts", "Tees", "Jackets"];

export default function ShopPage() {
  const products = useProducts();
  const [gender, setGender] = useState("Men");
  const [type, setType] = useState("All");

  const filtered = useMemo(() => {
    return products
      .filter((p) => p.gender === gender)
      .filter((p) => (type === "All" ? true : p.type === type))
      .sort((a, b) => new Date(b.added) - new Date(a.added));
  }, [products, gender, type]);

  return (
    <div className="pt-10 md:pt-14">
      <div className="mx-auto max-w-6xl px-5 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl">The Catalogue</h1>
          <p className="text-sm text-muted mt-2">
            One piece at a time. Newest first.
          </p>
        </div>
        <GenderSlider value={gender} onChange={setGender} />
      </div>

      <div className="mx-auto max-w-6xl px-5 mt-6 flex gap-3 flex-wrap">
        {types.map((t) => (
          <button
            key={t}
            onClick={() => setType(t)}
            className={`text-sm transition-colors ${
              type === t
                ? "text-ink underline underline-offset-4"
                : "text-muted hover:text-ink"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-muted mt-16 text-center">
          Nothing matches those filters yet.
        </p>
      ) : (
        <div key={gender + type + "cat"} className="mt-8 fade-up">
          <Slider className="h-[72vh] min-h-[520px]">
            {filtered.map((p, i) => (
              <CatalogueSlide
                key={p.slug}
                product={p}
                index={i}
                total={filtered.length}
              />
            ))}
          </Slider>
        </div>
      )}
    </div>
  );
}

function CatalogueSlide({ product, index, total }) {
  const eff = effectivePrice(product);
  const { primary, secondary, real } = cardImages(product);
  const imgClass = real
    ? "w-full h-full object-cover"
    : "artwork w-full h-full object-contain p-8";
  return (
    <div className="h-full mx-auto max-w-6xl px-5 grid md:grid-cols-2 gap-8 items-center">
      <div
        className={`clay ${real ? "photo-zoom" : "wave-on-hover"} relative h-[38vh] md:h-[56vh] group overflow-hidden`}
        style={{
          background: `color-mix(in srgb, ${product.colors[0].hex} 14%, var(--surface))`,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={primary}
          alt={product.name}
          className={`${imgClass} absolute inset-0 transition-opacity duration-300 group-hover:opacity-0`}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={secondary}
          alt=""
          aria-hidden="true"
          className={`${imgClass} absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
        />
        <span className="absolute top-5 left-6 z-10 font-serif text-lg text-muted mix-blend-difference">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>

      <div className="text-center md:text-left pb-16 md:pb-0">
        <p className="eyebrow">
          {product.gender} · {product.type}
        </p>
        <h2 className="font-serif text-4xl md:text-5xl mt-3">{product.name}</h2>
        <p className="mt-3 text-sm text-muted max-w-sm mx-auto md:mx-0">
          {product.headline}
        </p>
        <div className="mt-5 flex items-center justify-center md:justify-start gap-3">
          <span className="text-xl">{formatPrice(eff)}</span>
          {product.discount > 0 && (
            <>
              <span className="text-sm text-muted line-through">
                {formatPrice(product.price)}
              </span>
              <span className="text-xs uppercase tracking-widecaps border border-ink rounded-full px-2 py-0.5">
                −{product.discount}%
              </span>
            </>
          )}
        </div>
        <div className="mt-4 flex gap-1.5 justify-center md:justify-start">
          {product.colors.map((c) => (
            <span
              key={c.name}
              title={c.name}
              className="w-4 h-4 rounded-full border border-line"
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>
        <div className="mt-8">
          <Link href={`/products/${product.slug}`} className="btn-primary">
            Choose this one
          </Link>
        </div>
        {product.inventory !== undefined && product.inventory <= 5 && (
          <p className="text-xs text-muted mt-4">
            {product.inventory === 0
              ? "Out of stock"
              : `Only ${product.inventory} left`}
          </p>
        )}
      </div>
    </div>
  );
}
