"use client";

import { useCart } from "./CartContext";
import { formatPrice } from "@/lib/products";
import { recordOrder } from "@/lib/store";

export default function CartDrawer() {
  const cart = useCart();
  if (!cart.open) return null;

  const waText = encodeURIComponent(
    "Hi Praxis! I'd like to order:\n" +
      cart.items
        .map((i) => `• ${i.name} — ${i.color}, ${i.size} × ${i.qty}`)
        .join("\n") +
      `\nTotal: ${formatPrice(cart.total)}`
  );

  return (
    <div className="fixed inset-0 z-50">
      <button
        aria-label="Close cart"
        className="absolute inset-0 bg-black/40"
        onClick={() => cart.setOpen(false)}
      />
      <aside className="glass absolute right-0 top-0 h-full w-full max-w-sm flex flex-col">
        <div className="flex items-center justify-between px-5 h-16 border-b border-line">
          <p className="eyebrow">Your Cart</p>
          <button
            onClick={() => cart.setOpen(false)}
            aria-label="Close"
            className="text-muted hover:text-ink text-xl leading-none"
          >
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {cart.items.length === 0 ? (
            <p className="text-sm text-muted mt-8 text-center">
              Your cart is empty.
            </p>
          ) : (
            cart.items.map((i) => (
              <div
                key={i.key}
                className="flex items-start justify-between gap-3 py-4 border-b border-line"
              >
                <div>
                  <p className="text-sm">{i.name}</p>
                  <p className="text-xs text-muted mt-1">
                    {i.color} · {i.size} · Qty {i.qty}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm">{formatPrice(i.price * i.qty)}</p>
                  <button
                    onClick={() => cart.remove(i.key)}
                    className="text-xs text-muted underline mt-1"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.items.length > 0 && (
          <div className="px-5 py-5 border-t border-line">
            <div className="flex justify-between text-sm mb-4">
              <span className="text-muted">Subtotal</span>
              <span>{formatPrice(cart.total)}</span>
            </div>
            <a
              href={`https://wa.me/919999999999?text=${waText}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => recordOrder(cart.items, cart.total)}
              className="btn-primary w-full text-center"
            >
              Order via WhatsApp
            </a>
            <p className="text-xs text-muted mt-3 text-center">
              Online checkout coming soon. Free shipping above ₹1,499.
            </p>
          </div>
        )}
      </aside>
    </div>
  );
}
