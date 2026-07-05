import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-line mt-24">
      <div className="mx-auto max-w-6xl px-5 py-14 grid gap-10 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <Logo size={34} className="text-ink" />
            <p className="font-serif text-2xl tracking-[0.1em]">PRAXIS</p>
          </div>
          <p className="mt-3 text-sm text-muted max-w-xs">
            Performance-driven Indian activewear for runners. Designed in
            Ahmedabad, built for people who actually move.
          </p>
        </div>

        <nav className="grid grid-cols-2 gap-2 text-sm">
          <Link href="/shop" className="text-muted hover:text-ink py-1">Shop</Link>
          <Link href="/our-story" className="text-muted hover:text-ink py-1">Our Story</Link>
          <Link href="/events" className="text-muted hover:text-ink py-1">Events</Link>
          <Link href="/testimonials" className="text-muted hover:text-ink py-1">Testimonials</Link>
          <Link href="/account" className="text-muted hover:text-ink py-1">My Account</Link>
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
        <div className="mx-auto max-w-6xl px-5 py-5 flex items-center justify-between text-xs text-muted">
          <p>© {new Date().getFullYear()} Praxis. Made in Ahmedabad.</p>
          <Link href="/admin" className="hover:text-ink">Admin</Link>
        </div>
      </div>
    </footer>
  );
}
