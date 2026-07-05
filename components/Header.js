"use client";

import Link from "next/link";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import ArtToggle from "./ArtToggle";
import CartDrawer from "./CartDrawer";
import Logo from "./Logo";
import { useCart } from "./CartContext";

const nav = [
  { href: "/shop", label: "Shop" },
  { href: "/events", label: "Events" },
  { href: "/our-story", label: "Our Story" },
  { href: "/testimonials", label: "Testimonials" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const cart = useCart();

  return (
    <>
      <header className="glass sticky top-0 z-40 border-b border-line">
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
            className="flex items-center gap-2.5"
            aria-label="Praxis home"
          >
            <Logo size={30} className="text-ink" />
            <span className="font-serif text-xl tracking-[0.14em] hidden sm:inline">
              PRAXIS
            </span>
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
            <ArtToggle />
            <ThemeToggle />
            <Link
              href="/account"
              aria-label="Your account"
              className="p-1.5 text-muted hover:text-ink transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="8" r="4" />
                <path d="M 4 21 q 8 -7 16 0" />
              </svg>
            </Link>
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
              href="/account"
              className="text-sm text-muted"
              onClick={() => setMenuOpen(false)}
            >
              My Account
            </Link>
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
