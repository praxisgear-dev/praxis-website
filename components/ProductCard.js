import Link from "next/link";
import { formatPrice, productImage } from "@/lib/products";

export default function ProductCard({ product }) {
  const discounted =
    product.discount > 0
      ? Math.round(product.price * (1 - product.discount / 100))
      : null;
  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div
        className="clay-sm wave-on-hover relative overflow-hidden aspect-[4/5] p-5"
        style={{
          background: `color-mix(in srgb, ${product.colors[0].hex} 12%, var(--surface))`,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.images?.[0] || productImage(product.slug, "front")}
          alt={`${product.name} — ${product.gender}'s running ${product.type.toLowerCase()}, line illustration`}
          className="artwork w-full h-full object-contain transition-opacity duration-300 group-hover:opacity-0"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.images?.[1] || productImage(product.slug, "movement")}
          alt=""
          aria-hidden="true"
          className="artwork absolute inset-5 w-[calc(100%-2.5rem)] h-[calc(100%-2.5rem)] object-contain opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
        {product.isNew && (
          <span className="absolute top-4 left-4 text-[10px] tracking-widecaps uppercase border border-ink text-ink rounded-full px-2.5 py-1">
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
