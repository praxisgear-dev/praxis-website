import Link from "next/link";
import { formatPrice, productImage } from "@/lib/products";

export default function ProductCard({ product }) {
  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="relative overflow-hidden bg-surface aspect-[4/5]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={productImage(product.slug, "front")}
          alt={`${product.name} — ${product.gender}'s running ${product.type.toLowerCase()}`}
          className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={productImage(product.slug, "movement")}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
        {product.isNew && (
          <span className="absolute top-3 left-3 text-[10px] tracking-widecaps uppercase bg-paper text-ink px-2 py-1">
            New
          </span>
        )}
      </div>
      <div className="mt-3 flex items-start justify-between gap-2">
        <div>
          <p className="text-sm">{product.name}</p>
          <p className="text-xs text-muted mt-0.5">
            {product.gender} · {product.type}
          </p>
        </div>
        <p className="text-sm">{formatPrice(product.price)}</p>
      </div>
      <div className="mt-2 flex gap-1.5">
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
