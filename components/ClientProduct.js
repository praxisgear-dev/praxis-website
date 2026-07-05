"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ProductDetail from "./ProductDetail";
import { useProducts } from "@/lib/store";

export default function ClientProduct({ slug }) {
  const all = useProducts();
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);

  const product = all.find((p) => p.slug === slug);

  if (!ready) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="loader-ring" />
      </div>
    );
  }
  if (!product) {
    return (
      <div className="mx-auto max-w-2xl px-5 pt-24 text-center">
        <h1 className="font-serif text-4xl">Wrong turn.</h1>
        <p className="text-sm text-muted mt-4">This product doesn't exist.</p>
        <Link href="/shop" className="btn-outline mt-8">
          Back to shop
        </Link>
      </div>
    );
  }
  return <ProductDetail product={product} />;
}
