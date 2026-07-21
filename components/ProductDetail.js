"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Slider from "./Slider";
import SizeChart from "./SizeChart";
import GenderSlider from "./GenderSlider";
import { useCart } from "./CartContext";
import { formatPrice, galleryItems } from "@/lib/products";
import { useProducts, effectivePrice } from "@/lib/store";

const sizes = ["S", "M", "L", "XL", "XXL"];

export default function ProductDetail({ product: staticProduct }) {
  const cart = useCart();
  const router = useRouter();
  const all = useProducts();
  const product =
    all.find((p) => p.slug === staticProduct.slug) || staticProduct;
  const eff = effectivePrice(product);
  const soldOut = product.inventory === 0;

  const [size, setSize] = useState(null);
  const [color, setColor] = useState(product.colors[0].name);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [error, setError] = useState(false);

  function switchGender(g) {
    if (g === product.gender) return;
    const match =
      all.find((p) => p.gender === g && p.type === product.type) ||
      all.find((p) => p.gender === g);
    if (match) router.push(`/products/${match.slug}`);
  }

  function addToCart() {
    if (!size) {
      setError(true);
      return;
    }
    setError(false);
    cart.add({ ...product, price: eff }, size, color);
  }

  const activeHex =
    product.colors.find((c) => c.name === color)?.hex || product.colors[0].hex;

  return (
    <div
      className="pt-8 md:pt-14 transition-colors duration-500"
      style={{
        background: `linear-gradient(180deg, color-mix(in srgb, ${activeHex} 18%, var(--paper)) 0%, var(--paper) 70%)`,
      }}
    >
      <div className="mx-auto max-w-6xl px-5">
      <div className="grid md:grid-cols-2 gap-10">
        {/* Gallery slider — video first (if any), then photos or line art */}
        <Slider
          className="clay aspect-[4/5] overflow-hidden transition-colors duration-500"
          style={{
            background: `color-mix(in srgb, ${activeHex} 22%, var(--surface))`,
          }}
        >
          {galleryItems(product).map((item, i) =>
            item.type === "video" ? (
              <video
                key={i}
                src={item.src}
                poster={item.poster}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            ) : item.type === "photo" ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={i}
                src={item.src}
                alt={`${product.name} — view ${i + 1}`}
                className="w-full h-full object-cover"
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={i}
                src={item.src}
                alt={`${product.name} — view ${i + 1}`}
                className="artwork wave-on-hover w-full h-full object-contain p-6"
              />
            )
          )}
        </Slider>

        {/* Buy panel */}
        <div className="md:sticky md:top-24 self-start">
          <div className="mb-6">
            <GenderSlider value={product.gender} onChange={switchGender} />
          </div>
          <p className="eyebrow">
            {product.gender} · {product.type}
          </p>
          <h1 className="font-serif text-3xl md:text-4xl mt-2">
            {product.name}
          </h1>
          <p className="text-lg mt-3 flex items-center gap-3">
            {formatPrice(eff)}
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
          </p>

          <p className="mt-6 text-sm leading-relaxed text-muted">
            {product.feeling}
          </p>

          {/* Color selector */}
          <div className="mt-8">
            <p className="eyebrow mb-3">Color — {color}</p>
            <div className="flex gap-2">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setColor(c.name)}
                  aria-label={c.name}
                  className={`w-8 h-8 rounded-full border-2 transition-colors ${
                    color === c.name ? "border-ink" : "border-line"
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </div>

          {/* Size selector */}
          <div className="mt-6">
            <div className="flex items-baseline justify-between mb-3">
              <p className="eyebrow">Size</p>
              <button
                onClick={() => setShowSizeGuide(true)}
                className="text-xs text-muted underline underline-offset-2"
              >
                Size Guide
              </button>
            </div>
            <div className="flex gap-2 flex-wrap">
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setSize(s);
                    setError(false);
                  }}
                  className={`w-12 h-12 text-sm border transition-colors ${
                    size === s
                      ? "border-ink bg-ink text-paper"
                      : "border-line text-muted hover:border-ink hover:text-ink"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            {error && (
              <p className="text-xs mt-2 text-red-500">Please select a size.</p>
            )}
          </div>

          <button
            onClick={addToCart}
            disabled={soldOut}
            className="btn-primary w-full mt-8 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {soldOut ? "Out of Stock" : "Add to Cart"}
          </button>
          {product.inventory > 0 && product.inventory <= 5 && (
            <p className="text-xs text-muted mt-2 text-center">
              Only {product.inventory} left
            </p>
          )}
          <p className="text-xs text-muted mt-3">
            Free shipping above ₹1,499 · 7-day returns · Size exchange within
            14 days
          </p>

          {/* Description — brief format */}
          <div className="mt-10 border-t border-line pt-8">
            <h2 className="font-serif text-xl">{product.headline}</h2>
            <div className="mt-5 text-sm text-muted space-y-1.5">
              <p className="eyebrow !text-ink mb-2">The Details</p>
              <p>Fabric: {product.details.fabric}</p>
              <p>Construction: {product.details.construction}</p>
              <p>Features: {product.details.features}</p>
              <p>Weight: {product.details.weight}</p>
              <p>Fit: {product.details.fit}</p>
            </div>
            <div className="mt-5 text-sm text-muted">
              <p className="eyebrow !text-ink mb-2">Designed For</p>
              <p>{product.designedFor}</p>
            </div>
            <div className="mt-5 text-sm text-muted">
              <p className="eyebrow !text-ink mb-2">Care</p>
              <p>{product.care}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Below the fold */}
      <div className="mt-20 grid md:grid-cols-2 gap-12">
        <section>
          <h2 className="font-serif text-2xl mb-6">Size guide</h2>
          <SizeChart />
        </section>
        <section>
          <h2 className="font-serif text-2xl mb-6">Fabric technology</h2>
          <p className="text-sm text-muted leading-relaxed max-w-md">
            {product.fabricTech}
          </p>
          <h2 className="font-serif text-2xl mb-4 mt-12">Reviews</h2>
          <p className="text-sm text-muted max-w-md">
            No reviews yet — we're collecting them from our first customers.
            Bought this? Tell us how it ran on{" "}
            <a
              href="https://wa.me/919999999999"
              className="underline underline-offset-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
            .
          </p>
        </section>
      </div>

      {/* Size guide popup */}
      {showSizeGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-5">
          <button
            aria-label="Close size guide"
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowSizeGuide(false)}
          />
          <div className="glass relative max-w-lg w-full rounded-3xl p-6 md:p-8 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl">Size Guide</h2>
              <button
                onClick={() => setShowSizeGuide(false)}
                aria-label="Close"
                className="text-muted hover:text-ink text-xl leading-none"
              >
                ×
              </button>
            </div>
            <SizeChart />
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
