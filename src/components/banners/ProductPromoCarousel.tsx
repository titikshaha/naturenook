"use client";

/**
 * ProductPromoCarousel — Carousel 2
 * Layout: FULL CENTERED TYPOGRAPHIC — no image, editorial/magazine style.
 * Dark forest-green background, product name as a massive headline,
 * features listed as inline pill tags below.
 * Background: abstract cross-hatch + circle geometry SVG.
 */

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const slides = [
  {
    tag: "Best Seller",
    name: "Ashwagandha",
    suffix: "powder",
    scientific: "Withania somnifera",
    potency: "5% Withanolides",
    tags: ["Adaptogen", "Stress Relief", "Vitality", "Ayurvedic Grade"],
    href: "/product/1",
  },
  {
    tag: "New Launch",
    name: "Gymnema",
    suffix: "Sylvestre",
    scientific: "Gymnema sylvestre",
    potency: "25% Gymnemic Acid",
    tags: ["Sugar Metabolism", "Appetite Control", "Nutraceutical", "Standardized"],
    href: "/product/3",
  },
  {
    tag: "Top Rated",
    name: "Brahmi",
    suffix: "powder",
    scientific: "Bacopa monnieri",
    potency: "20% Bacosides",
    tags: ["Memory & Focus", "Neuroprotective", "Nootropic", "Ayurvedic"],
    href: "/product/5",
  },
  {
    tag: "Trending",
    name: "Moringa",
    suffix: "Leaf powder",
    scientific: "Moringa oleifera",
    potency: "5% Isothiocyanates",
    tags: ["Antioxidant", "Vitamin Rich", "Superfood", "Supplement Grade"],
    href: "/product/6",
  },
];

function GeometricDecor() {
  return (
    <svg
      viewBox="0 0 800 400"
      fill="none"
      className="absolute inset-0 w-full h-full pointer-events-none"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {/* Large circle top-left */}
      <circle cx="-40" cy="80" r="180" stroke="#d4a017" strokeWidth="0.6" opacity="0.1" />
      <circle cx="-40" cy="80" r="130" stroke="#d4a017" strokeWidth="0.4" opacity="0.07" />
      {/* Large circle bottom-right */}
      <circle cx="840" cy="340" r="200" stroke="#d4a017" strokeWidth="0.6" opacity="0.1" />
      {/* Cross-hatch grid — top-right quadrant */}
      {Array.from({ length: 10 }).map((_, i) => (
        <line
          key={`h${i}`}
          x1="440" y1={i * 44}
          x2="800" y2={i * 44}
          stroke="#d4a017" strokeWidth="0.4" opacity="0.05"
        />
      ))}
      {Array.from({ length: 10 }).map((_, i) => (
        <line
          key={`v${i}`}
          x1={440 + i * 40} y1="0"
          x2={440 + i * 40} y2="400"
          stroke="#d4a017" strokeWidth="0.4" opacity="0.05"
        />
      ))}
      {/* Diagonal slash accents */}
      <line x1="600" y1="0" x2="480" y2="400" stroke="#d4a017" strokeWidth="0.6" opacity="0.07" />
      <line x1="650" y1="0" x2="530" y2="400" stroke="#d4a017" strokeWidth="0.4" opacity="0.05" />
      {/* Small decorative dots */}
      {[
        [120, 320], [160, 340], [200, 310], [240, 350],
        [680, 60], [720, 40], [760, 70],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="2" fill="#d4a017" opacity="0.15" />
      ))}
    </svg>
  );
}

export function ProductPromoCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((i: number) => {
    setCurrent(i);
    setPaused(true);
    setTimeout(() => setPaused(false), 8000);
  }, []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setCurrent((p) => (p + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ background: "oklch(0.14 0.04 145)" }}
    >
      <GeometricDecor />

      {/* ── Slides ── */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((s, idx) => (
          <div key={idx} className="min-w-full">
            <div className="relative flex flex-col items-center justify-center text-center px-6 py-14 md:py-20 min-h-[380px] md:min-h-[420px] gap-5 md:gap-6">

              {/* Tag */}
              <span
                className="inline-block text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full border"
                style={{ color: "#d4a017", borderColor: "#d4a017", background: "oklch(0.7 0.15 80 / 0.08)" }}
              >
                {s.tag}
              </span>

              {/* Giant product name */}
              <div className="space-y-1 md:space-y-2">
                <h2
                  className="font-bold leading-none tracking-tight text-white"
                  style={{ fontSize: "clamp(2.8rem, 9vw, 7rem)", lineHeight: 1 }}
                >
                  {s.name}
                </h2>
                <p
                  className="font-light tracking-[0.3em] uppercase text-white/40"
                  style={{ fontSize: "clamp(0.85rem, 2.5vw, 1.4rem)" }}
                >
                  {s.suffix}
                </p>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-4 w-full max-w-sm">
                <div className="flex-1 h-px bg-white/10" />
                <span className="text-xs text-white/30 italic">{s.scientific}</span>
                <div className="flex-1 h-px bg-white/10" />
              </div>

              {/* Potency */}
              <div
                className="text-sm md:text-base font-bold tracking-widest uppercase px-5 py-2 rounded-lg"
                style={{ background: "oklch(0.7 0.15 80 / 0.12)", color: "#d4a017", border: "1px solid oklch(0.7 0.15 80 / 0.2)" }}
              >
                Standardized · {s.potency}
              </div>

              {/* Feature tags */}
              <div className="flex flex-wrap justify-center gap-2">
                {s.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 rounded-full text-white/60 border border-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <Link href={s.href}>
                <Button
                  className="rounded-full px-8 h-11 font-bold mt-1 shadow-lg hover:opacity-90 transition-all"
                  style={{ background: "#d4a017", color: "#0f1a0f" }}
                >
                  Enquire Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* ── Radio dots ── */}
      <div className="relative flex justify-center gap-2 pb-5 pt-1">
        {slides.map((_, i) => (
          <button
            key={i}
            id={`promo-slide-${i}`}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => goTo(i)}
            className={`h-2 rounded-full transition-all duration-300 ${i === current ? "w-7" : "w-2"}`}
            style={{ background: i === current ? "#d4a017" : "rgba(212,160,23,0.3)" }}
          />
        ))}
      </div>
    </section>
  );
}
