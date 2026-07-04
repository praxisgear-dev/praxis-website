import Link from "next/link";
import Slider from "@/components/Slider";
import ProductCard from "@/components/ProductCard";
import InstagramStrip from "@/components/InstagramStrip";
import { products } from "@/lib/products";

const heroSlides = [
  {
    img: "/site/hero-1.svg",
    title: "Built to Move.",
    sub: "Running gear made for Indian roads, tracks and weather.",
  },
  {
    img: "/site/hero-2.svg",
    title: "Practice. Action. Doing.",
    sub: "That's what Praxis means. That's all it means.",
  },
  {
    img: "/site/hero-3.svg",
    title: "Designed by someone who runs.",
    sub: "Every seam tested on Ahmedabad mornings.",
  },
];

export default function HomePage() {
  const featured = products.filter((p) => p.isNew).slice(0, 3);
  const secondRow = products.filter((p) => !p.isNew).slice(0, 3);

  return (
    <>
      {/* Section 1 — Hero slider */}
      <section className="h-[88vh] min-h-[520px]">
        <Slider autoplayMs={6000} className="h-full">
          {heroSlides.map((s) => (
            <div key={s.title} className="relative h-full w-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={s.img}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/25" />
              <div className="relative h-full flex flex-col items-center justify-center text-center px-6 fade-up">
                <h1 className="font-serif text-4xl md:text-6xl text-white">
                  {s.title}
                </h1>
                <p className="mt-4 text-white/85 text-sm md:text-base max-w-md">
                  {s.sub}
                </p>
                <Link
                  href="/shop"
                  className="btn-primary mt-8 !bg-white !text-[#1a1a1a]"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* Section 2 — Featured products */}
      <section className="mx-auto max-w-6xl px-5 mt-20 md:mt-28">
        <div className="flex items-baseline justify-between mb-8">
          <h2 className="font-serif text-2xl md:text-3xl">New this season</h2>
          <Link href="/shop" className="text-sm text-muted hover:text-ink">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {featured.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      {/* Section 3 — Brand statement */}
      <section className="mx-auto max-w-6xl px-5 mt-24 md:mt-32 grid md:grid-cols-2 gap-10 items-center">
        <div className="aspect-[6/7] bg-surface overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/site/brand.svg"
            alt="Praxis — designed in Ahmedabad"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-md">
          <p className="eyebrow mb-4">Why Praxis</p>
          <p className="font-serif text-2xl md:text-3xl leading-snug">
            I trained as a fashion designer, spent two years at Athlos
            learning how activewear is really made, and came home to
            Ahmedabad to build the running gear I couldn't find here.
          </p>
          <Link
            href="/our-story"
            className="inline-block mt-6 text-sm text-muted hover:text-ink underline underline-offset-4"
          >
            Read our story
          </Link>
        </div>
      </section>

      {/* Section 4 — Campaign image + second product row */}
      <section className="mt-24 md:mt-32">
        <div className="relative h-[52vh] min-h-[360px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/site/campaign.svg"
            alt="Praxis campaign — built in Ahmedabad"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative h-full flex items-end">
            <div className="mx-auto max-w-6xl px-5 pb-10 w-full">
              <h2 className="font-serif text-3xl md:text-4xl text-white">
                Made for the miles you actually run.
              </h2>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-6xl px-5 mt-12">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {secondRow.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Section 5 — Instagram strip */}
      <div className="mt-24 md:mt-32">
        <InstagramStrip />
      </div>
    </>
  );
}
