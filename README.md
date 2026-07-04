# Praxis — Website

Performance-driven Indian activewear for runners. Built with Next.js 14 + Tailwind CSS, deployed on Vercel.

## Pages

- `/` — Homepage (hero slider, featured products, brand statement, campaign, Instagram strip)
- `/shop` — Product listing with Gender / Type / Color filters, newest first, hover swaps to movement shot
- `/products/[slug]` — Product pages (gallery slider, size + color selectors, size-guide popup, brief-format description, size chart, fabric tech, reviews)
- `/our-story` — About page
- `/size-guide` — Dedicated size chart
- `/shipping-returns` — Policies

## Design system

Per the brand brief: white `#FFFFFF` / near-black `#1A1A1A` / navy accent `#1C2B4A` / grey `#6B6B6B` / dividers `#F2F2F2`. Playfair Display for headlines, DM Sans for everything else. Dark mode included (class-based, respects system preference, toggle in header).

## Placeholder assets

All images in `public/products/` and `public/site/` are generated SVG placeholders (`scripts/gen-images.mjs`). Replace them with real photography using the **same filenames** — no code changes needed. Product shots expected per product: `front`, `back`, `movement`, `detail`.

Update the WhatsApp number (`919999999999`) and Instagram handle across components before launch.

## Develop

```bash
npm install
npm run dev
```

## Deploy

Pushes to `main` auto-deploy via the linked Vercel project.

## Later (per brief)

Payment gateway (Razorpay), live Instagram feed, GA4 + Meta Pixel, email capture popup, reviews (Judge.me equivalent), blog/journal.
