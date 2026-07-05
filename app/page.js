"use client";

import Link from "next/link";
import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import InstagramStrip from "@/components/InstagramStrip";
import GenderSlider from "@/components/GenderSlider";
import RunnerJourney from "@/components/RunnerJourney";
import { useProducts } from "@/lib/store";

export default function HomePage() {
  const products = useProducts();
  const [gender, setGender] = useState("Men");
  const featured = products
    .filter((p) => p.gender === gender)
    .sort((a, b) => new Date(b.added) - new Date(a.added))
    .slice(0, 4);

  return (
    <>
      {/* Hero — typographic, line art */}
      <section className="relative h-[88vh] min-h-[540px] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <svg
          viewBox="0 0 1920 1080"
          className="absolute inset-0 w-full h-full opacity-[0.13]"
          preserveAspectRatio="xMidYMax slice"
          fill="none"
          stroke="var(--ink)"
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          <path d="M -40 880 L 1960 880" />
          <path d="M 100 880 q 380 -420 760 -420 q 420 0 960 420" strokeWidth="2" />
          <path d="M 340 880 L 340 690 M 620 880 L 620 560 M 960 880 L 960 480 M 1300 880 L 1300 560 M 1580 880 L 1580 690" strokeWidth="2" />
          <circle cx="1560" cy="240" r="90" strokeWidth="2" />
        </svg>

        <div className="relative fade-up">
          <p className="eyebrow mb-5">Praxis — Indian activewear for runners</p>
          <h1 className="hero-title font-serif text-5xl md:text-7xl leading-tight">
            Built to Move.
          </h1>
          <p className="mt-5 text-sm md:text-base text-muted max-w-md mx-auto">
            Designed by someone who runs. Built for people who actually move.
            Tested every morning on Ahmedabad roads.
          </p>
          <div className="mt-9 flex items-center justify-center gap-4">
            <Link href="/shop" className="btn-primary">
              Shop Now
            </Link>
            <Link href="/our-story" className="btn-outline">
              Our Story
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted text-xs tracking-[0.2em] uppercase animate-bounce">
          Scroll
        </div>
      </section>

      {/* Scroll journey — runner across landscapes */}
      <RunnerJourney />

      {/* Featured products with Men/Women slider */}
      <section className="mx-auto max-w-6xl px-5 mt-4 md:mt-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="eyebrow mb-2">The gear</p>
            <h2 className="font-serif text-3xl md:text-4xl">New this season</h2>
          </div>
          <GenderSlider value={gender} onChange={setGender} />
        </div>
        <div key={gender} className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 fade-up">
          {featured.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/shop" className="btn-outline">
            View all products
          </Link>
        </div>
      </section>

      {/* Brand statement */}
      <section className="mx-auto max-w-6xl px-5 mt-24 md:mt-32 grid md:grid-cols-2 gap-10 items-center">
        <div className="clay overflow-hidden aspect-[6/7] flex items-center justify-center p-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/site/brand.svg"
            alt="Line drawing of a runner crossing a bridge"
            className="artwork w-full h-full object-contain"
          />
        </div>
        <div className="max-w-md">
          <p className="eyebrow mb-4">Why Praxis</p>
          <p className="font-serif text-2xl md:text-3xl leading-snug">
            I trained as a fashion designer, spent two years at Athlos learning
            how activewear is really made, and came home to Ahmedabad to build
            the running gear I couldn't find here.
          </p>
          <Link
            href="/our-story"
            className="inline-block mt-6 text-sm text-muted hover:text-ink underline underline-offset-4"
          >
            Read our story
          </Link>
        </div>
      </section>

      {/* Instagram strip */}
      <div className="mt-24 md:mt-32">
        <InstagramStrip />
      </div>
    </>
  );
}
