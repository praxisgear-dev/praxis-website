"use client";

import Link from "next/link";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import CartDrawer from "./CartDrawer";
import { useCart } from "./CartContext";

const nav = [
  { href: "/shop", label: "Shop" },
  { href: "/our-story", label: "Our Story" },
  { href: "/size-guide", label: "Size Guide" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const cart = useCart();

  return (
    <>
      <header className="sticky top-0 z-40 bg-paper/95 backdrop-blur border-b border-line">
        <div className="mx-auto max-w-6xl px-5 h-16 flex items-center justify-between">
          <button
            className="md:hidden p-2 -ml-2"
            aria-label="Open menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="block w-5 h-px bg-ink mb-1.5" />
            <span className="block w-5 h-px bg-ink mb-1.5" />
            <span className="block w-5 h-px bg-ink" />
          </button>

          <Link
            href="/"
            className="font-serif text-2xl tracking-wide"
            aria-label="Praxis home"
          >
            PRAXIS
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="text-sm text-muted hover:text-ink transition-colors"
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => cart.setOpen(true)}
              className="relative text-sm text-muted hover:text-ink transition-colors"
              aria-label="Open cart"
            >
              Cart
              {cart.count > 0 && (
                <span className="absolute -top-2 -right-3 text-[10px] bg-accent text-paper rounded-full w-4 h-4 flex items-center justify-center">
                  {cart.count}
                </span>
              )}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="md:hidden border-t border-line bg-paper px-5 py-4 flex flex-col gap-4">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="text-sm"
                onClick={() => setMenuOpen(false)}
              >
                {n.label}
              </Link>
            ))}
            <Link
              href="/shipping-returns"
              className="text-sm text-muted"
              onClick={() => setMenuOpen(false)}
            >
              Shipping &amp; Returns
            </Link>
          </nav>
        )}
      </header>
      <CartDrawer />
    </>
  );
}
