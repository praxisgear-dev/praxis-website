import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-line mt-24">
      <div className="mx-auto max-w-6xl px-5 py-14 grid gap-10 md:grid-cols-3">
        <div>
          <p className="font-serif text-2xl">PRAXIS</p>
          <p className="mt-3 text-sm text-muted max-w-xs">
            Performance-driven Indian activewear for runners. Designed in
            Ahmedabad, built for people who actually move.
          </p>
        </div>

        <nav className="grid grid-cols-2 gap-2 text-sm">
          <Link href="/shop" className="text-muted hover:text-ink py-1">Shop</Link>
          <Link href="/our-story" className="text-muted hover:text-ink py-1">Our Story</Link>
          <Link href="/size-guide" className="text-muted hover:text-ink py-1">Size Guide</Link>
          <Link href="/shipping-returns" className="text-muted hover:text-ink py-1">Shipping &amp; Returns</Link>
        </nav>

        <div className="text-sm">
          <p className="eyebrow mb-3">Talk to us</p>
          <a
            href="https://wa.me/919999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-muted hover:text-ink py-1"
          >
            WhatsApp
          </a>
          <a
            href="https://instagram.com/praxis.gear"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-muted hover:text-ink py-1"
          >
            Instagram
          </a>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-6xl px-5 py-5 text-xs text-muted">
          © {new Date().getFullYear()} Praxis. Made in Ahmedabad.
        </p>
      </div>
    </footer>
  );
}
