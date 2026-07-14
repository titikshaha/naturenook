"use client";

/**
 * AyurvedicBenefitsCarousel — Carousel 3
 * Layout: WHITE BACKGROUND · ALL GREEN TEXT · items listed in a grid below heading.
 * No hero image. Each slide shows a category + 3 benefit cards arranged horizontally.
 * Background: very subtle circle pattern (green on white).
 */

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const slides = [
  {
    category: "Immunity & Vitality",
    headline: "Herbs that shield and strengthen",
    sub: "Thousands of years of traditional use, validated by modern research.",
    benefits: [
      {
        icon: (
          <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8" aria-hidden="true">
            <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="1.2" opacity="0.25" />
            <path d="M20 6 C20 6 10 13 10 20 C10 27 15 34 20 34 C25 34 30 27 30 20 C30 13 20 6 20 6 Z" fill="currentColor" opacity="0.35" />
            <path d="M20 6 L20 34" stroke="currentColor" strokeWidth="1" opacity="0.3" />
          </svg>
        ),
        title: "Ashwagandha",
        detail: "Reduces cortisol, boosts stamina and immune response",
        potency: "5% Withanolides",
      },
      {
        icon: (
          <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8" aria-hidden="true">
            <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="1.2" opacity="0.25" />
            <path d="M20 8 C16 12 8 14 8 20 C8 28 14 34 20 34 C26 34 32 28 32 20 C32 14 24 12 20 8 Z" fill="currentColor" opacity="0.3" />
            <circle cx="20" cy="20" r="4" fill="currentColor" opacity="0.5" />
          </svg>
        ),
        title: "Tulsi",
        detail: "Antimicrobial, adaptogenic, and respiratory support",
        potency: "2% Ursolic Acid",
      },
      {
        icon: (
          <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8" aria-hidden="true">
            <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="1.2" opacity="0.25" />
            {[0,60,120,180,240,300].map((deg, i) => {
              const rad = (deg * Math.PI) / 180;
              return <ellipse key={i} cx={20 + Math.cos(rad)*10} cy={20 + Math.sin(rad)*10} rx="5" ry="3" transform={`rotate(${deg}, ${20 + Math.cos(rad)*10}, ${20 + Math.sin(rad)*10})`} fill="currentColor" opacity="0.3" />;
            })}
          </svg>
        ),
        title: "Amla",
        detail: "Highest natural source of Vitamin C, antioxidant-rich",
        potency: "40% Tannins",
      },
    ],
    cta: { label: "Explore Immunity Herbs", href: "/catalogue?category=ayurvedic" },
  },
  {
    category: "Skin & Beauty",
    headline: "Nature's secret to radiant skin",
    sub: "Cosmetic-grade botanical extracts with zero harmful chemicals.",
    benefits: [
      {
        icon: (
          <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8" aria-hidden="true">
            <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="1.2" opacity="0.25" />
            <path d="M12 28 C12 20 16 12 20 10 C24 12 28 20 28 28" stroke="currentColor" strokeWidth="1.5" opacity="0.45" strokeLinecap="round" />
            <path d="M20 10 L20 28" stroke="currentColor" strokeWidth="1" opacity="0.25" />
          </svg>
        ),
        title: "Neem",
        detail: "Anti-acne, anti-fungal, purifies and clarifies skin",
        potency: "2.5% Azadirachtin",
      },
      {
        icon: (
          <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8" aria-hidden="true">
            <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="1.2" opacity="0.25" />
            <rect x="14" y="8" width="12" height="24" rx="6" fill="currentColor" opacity="0.3" />
            <path d="M14 20 H26" stroke="currentColor" strokeWidth="1" opacity="0.3" />
          </svg>
        ),
        title: "Aloe Vera",
        detail: "Deep hydration, wound healing, and brightening",
        potency: "40% Polysaccharides",
      },
      {
        icon: (
          <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8" aria-hidden="true">
            <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="1.2" opacity="0.25" />
            {[0,45,90,135,180,225,270,315].map((deg, i) => {
              const rad = (deg * Math.PI) / 180;
              return <line key={i} x1={20 + Math.cos(rad)*6} y1={20 + Math.sin(rad)*6} x2={20 + Math.cos(rad)*14} y2={20 + Math.sin(rad)*14} stroke="currentColor" strokeWidth="1.5" opacity="0.4" />;
            })}
            <circle cx="20" cy="20" r="4" fill="currentColor" opacity="0.45" />
          </svg>
        ),
        title: "Turmeric",
        detail: "Anti-inflammatory, anti-aging, natural glow booster",
        potency: "95% Curcuminoids",
      },
    ],
    cta: { label: "Explore Cosmetic Herbs", href: "/catalogue?category=cosmetic" },
  },
  {
    category: "Digestive Wellness",
    headline: "Balance begins in the gut",
    sub: "Traditional Ayurvedic herbs that gently restore digestive harmony.",
    benefits: [
      {
        icon: (
          <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8" aria-hidden="true">
            <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="1.2" opacity="0.25" />
            <path d="M14 14 Q14 8 20 8 Q26 8 26 14 Q26 20 20 20 Q14 20 14 26 Q14 32 20 32 Q26 32 26 26" stroke="currentColor" strokeWidth="1.8" opacity="0.45" fill="none" strokeLinecap="round" />
          </svg>
        ),
        title: "Triphala",
        detail: "Three-fruit blend for gentle cleanse and gut balance",
        potency: "20% Tannins",
      },
      {
        icon: (
          <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8" aria-hidden="true">
            <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="1.2" opacity="0.25" />
            <path d="M10 20 C10 13 15 8 20 8 C25 8 30 13 30 20 C30 27 25 32 20 32 C15 32 10 27 10 20 Z" fill="currentColor" opacity="0.2" />
            <path d="M12 15 C16 12 24 12 28 15" stroke="currentColor" strokeWidth="1" opacity="0.35" fill="none" />
            <path d="M12 25 C16 28 24 28 28 25" stroke="currentColor" strokeWidth="1" opacity="0.35" fill="none" />
          </svg>
        ),
        title: "Ginger",
        detail: "Relieves bloating, nausea, and stimulates digestion",
        potency: "5% Gingerols",
      },
      {
        icon: (
          <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8" aria-hidden="true">
            <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="1.2" opacity="0.25" />
            <path d="M20 10 L23 17 L31 17 L25 22 L27 30 L20 25 L13 30 L15 22 L9 17 L17 17 Z" fill="currentColor" opacity="0.35" />
          </svg>
        ),
        title: "Fennel",
        detail: "Antispasmodic, relieves cramps and supports healthy flora",
        potency: "2% Essential Oils",
      },
    ],
    cta: { label: "Explore Digestive Herbs", href: "/catalogue?category=nutraceutical" },
  },
];

/** Subtle circular pattern — green on white */
function CirclePattern() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 360" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {/* Large faint rings */}
      <circle cx="700" cy="180" r="220" stroke="var(--color-primary, #2d6a4f)" strokeWidth="0.6" fill="none" opacity="0.06" />
      <circle cx="700" cy="180" r="160" stroke="var(--color-primary, #2d6a4f)" strokeWidth="0.4" fill="none" opacity="0.05" />
      <circle cx="700" cy="180" r="100" stroke="var(--color-primary, #2d6a4f)" strokeWidth="0.4" fill="none" opacity="0.04" />
      <circle cx="100" cy="360" r="180" stroke="var(--color-primary, #2d6a4f)" strokeWidth="0.6" fill="none" opacity="0.05" />
      <circle cx="100" cy="360" r="120" stroke="var(--color-primary, #2d6a4f)" strokeWidth="0.4" fill="none" opacity="0.04" />
      {/* Dot accents */}
      {[[680, 40], [720, 60], [740, 30], [60, 40], [40, 70]].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="2.5" fill="var(--color-primary, #2d6a4f)" opacity="0.12" />
      ))}
    </svg>
  );
}

export function AyurvedicBenefitsCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((i: number) => {
    setCurrent(i);
    setPaused(true);
    setTimeout(() => setPaused(false), 8000);
  }, []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setCurrent((p) => (p + 1) % slides.length), 6500);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <section className="relative w-full overflow-hidden bg-background">
      <CirclePattern />

      {/* ── Slides ── */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((s, idx) => (
          <div key={idx} className="min-w-full">
            <div className="relative container mx-auto px-5 md:px-10 py-12 md:py-16 flex flex-col gap-8 md:gap-10">

              {/* Top: heading block — all in primary green */}
              <div className="text-center space-y-3">
                <span className="inline-block text-[10px] font-bold uppercase tracking-[0.25em] text-primary border border-primary/30 px-3 py-1 rounded-full">
                  {s.category}
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary leading-tight">
                  {s.headline}
                </h2>
                <p className="text-primary/60 text-sm md:text-base max-w-xl mx-auto">{s.sub}</p>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-4 max-w-xs mx-auto">
                <div className="flex-1 h-px bg-primary/20" />
                <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                <div className="flex-1 h-px bg-primary/20" />
              </div>

              {/* Benefits grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                {s.benefits.map((b) => (
                  <div
                    key={b.title}
                    className="flex flex-col gap-3 p-5 md:p-6 rounded-xl border border-primary/12 bg-primary/4 hover:border-primary/25 hover:bg-primary/8 transition-all"
                  >
                    {/* Icon in green */}
                    <div className="text-primary">{b.icon}</div>
                    <div>
                      <h3 className="font-bold text-primary text-base md:text-lg">{b.title}</h3>
                      <p className="text-primary/60 text-sm mt-1 leading-relaxed">{b.detail}</p>
                    </div>
                    <span className="text-[10px] font-bold tracking-widest text-primary/50 uppercase border-t border-primary/10 pt-2">
                      {b.potency}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="text-center">
                <Link href={s.cta.href}>
                  <Button
                    variant="outline"
                    className="rounded-full px-8 h-11 font-semibold border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground transition-all"
                  >
                    {s.cta.label} <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* ── Radio dots — green on white ── */}
      <div className="relative flex justify-center gap-2 pb-6 pt-1">
        {slides.map((_, i) => (
          <button
            key={i}
            id={`benefits-slide-${i}`}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => goTo(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? "w-7 bg-primary" : "w-2 bg-primary/25 hover:bg-primary/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
