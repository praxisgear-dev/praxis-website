import Link from "next/link";
import { formatPrice, cardImages } from "@/lib/products";

export default function ProductCard({ product }) {
  const discounted =
    product.discount > 0
      ? Math.round(product.price * (1 - product.discount / 100))
      : null;
  const { primary, secondary, real } = cardImages(product);
  const imgClass = real
    ? "w-full h-full object-cover"
    : "artwork w-full h-full object-contain";
  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div
        className={`clay-sm ${real ? "photo-zoom" : "wave-on-hover"} relative overflow-hidden aspect-[4/5]`}
        style={{
          background: `color-mix(in srgb, ${product.colors[0].hex} 12%, var(--surface))`,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={primary}
          alt={`${product.name} — ${product.gender}'s running ${product.type.toLowerCase()}`}
          className={`${imgClass} absolute inset-0 ${real ? "" : "p-5"} transition-opacity duration-300 group-hover:opacity-0`}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={secondary}
          alt=""
          aria-hidden="true"
          className={`${imgClass} absolute inset-0 ${real ? "" : "p-5"} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
        />
        {product.isNew && (
          <span className="absolute top-4 left-4 z-10 text-[10px] tracking-widecaps uppercase glass rounded-full px-2.5 py-1">
            New
          </span>
        )}
      </div>
      <div className="mt-3 flex items-start justify-between gap-2 px-1">
        <div>
          <p className="text-sm">{product.name}</p>
          <p className="text-xs text-muted mt-0.5">
            {product.gender} · {product.type}
          </p>
        </div>
        <p className="text-sm text-right">
          {discounted ? (
            <>
              {formatPrice(discounted)}
              <span className="block text-xs text-muted line-through">
                {formatPrice(product.price)}
              </span>
            </>
          ) : (
            formatPrice(product.price)
          )}
        </p>
      </div>
      <div className="mt-2 flex gap-1.5 px-1">
        {product.colors.map((c) => (
          <span
            key={c.name}
            title={c.name}
            className="w-3 h-3 rounded-full border border-line"
            style={{ backgroundColor: c.hex }}
          />
        ))}
      </div>
    </Link>
  );
}
