"use client";

/**
 * HeroBannerCarousel — Carousel 1
 * Split layout: text left · image placeholder right
 * Matches the screenshot reference (sage-green, botanical feel)
 * Slides auto-advance every 6 s; clicking a dot resets the timer.
 */

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, LeafyGreen } from "lucide-react";

const slides = [
  {
    pill: "100% Botanical · Standardized Quality",
    headlineTop: "Organic Herbal",
    headlineAccent: "Excellence",
    headlineBottom: "From Nature",
    body: "Nature Nook manufactures and distributes 150+ premium herbal powders for Ayurvedic medicines, cosmetics, and nutraceuticals — straight from Indore.",
    cta1: { label: "Browse Catalogue", href: "/catalogue" },
    cta2: { label: "Wholesale Inquiry", href: "/vendor" },
    imageSrc: "/hero-desktop.png",
    imageMobile: "/hero-mobile.png",
    imageAlt: "Herbal powders hero",
  },
  {
    pill: "Most Popular · 5% Withanolides",
    headlineTop: "The Ancient Power",
    headlineAccent: "of Ashwagandha",
    headlineBottom: "Standardized",
    body: "Sourced from premium Indian roots, our Ashwagandha powder delivers consistent adaptogenic benefits. Batch-tested COA available.",
    cta1: { label: "View powder", href: "powdercmrw0c3yk00102kpfxavvnrji" },
    cta2: { label: "Request Sample", href: "/vendor" },
    imageSrc: "/hero-ashwagandha.png",
    imageMobile: "/hero-ashwagandha-m.png",
    imageAlt: "Ashwagandha powder",
  },
  {
    pill: "B2B · D2C · Wholesale",
    headlineTop: "Partner with",
    headlineAccent: "Nature Nook",
    headlineBottom: "for Growth",
    body: "Join 200+ brands sourcing premium herbal powders. Competitive bulk pricing, GMP certified facility, and COA on every order.",
    cta1: { label: "Get Wholesale Pricing", href: "/vendor" },
    cta2: { label: "Browse 150+ SKUs", href: "/catalogue" },
    imageSrc: "/hero-b2b.png",
    imageMobile: "/hero-b2b-m.png",
    imageAlt: "Wholesale partnership",
  },
];

const trustPills = ["GMP Certified", "Lab Tested", "150+ SKUs", "PAN India Delivery"];

/** Decorative SVG leaf cluster rendered at a given position / opacity */
function LeafDecor({
  className,
  size = 200,
  opacity = 0.07,
}: {
  className?: string;
  size?: number;
  opacity?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      className={`absolute pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      {/* Large leaf */}
      <path
        d="M100 10 C60 10 10 50 10 100 C10 150 60 190 100 190 C100 190 190 150 190 100 C190 50 140 10 100 10 Z"
        fill="currentColor"
        opacity={opacity}
      />
      {/* Vein */}
      <path
        d="M100 10 C100 10 100 100 100 190"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity={opacity * 1.2}
      />
      {/* Side veins */}
      <path d="M100 60 C80 70 40 75 20 90" stroke="currentColor" strokeWidth="1" opacity={opacity} />
      <path d="M100 60 C120 70 160 75 180 90" stroke="currentColor" strokeWidth="1" opacity={opacity} />
      <path d="M100 100 C75 108 45 110 20 120" stroke="currentColor" strokeWidth="1" opacity={opacity} />
      <path d="M100 100 C125 108 155 110 180 120" stroke="currentColor" strokeWidth="1" opacity={opacity} />
      {/* Small floating leaf top-left */}
      <path
        d="M30 30 C20 20 5 25 5 35 C5 45 20 50 30 30 Z"
        fill="currentColor"
        opacity={opacity * 0.8}
      />
      {/* Small floating leaf bottom-right */}
      <path
        d="M170 170 C180 160 195 165 195 175 C195 185 180 190 170 170 Z"
        fill="currentColor"
        opacity={opacity * 0.8}
      />
    </svg>
  );
}

export function HeroBannerCarousel() {
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
    <section className="relative w-full overflow-hidden bg-secondary/30 text-foreground">
      {/* ── Decorative background graphics ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden text-primary">
        {/* Large leaf top-right */}
        <LeafDecor className="top-[-60px] right-[-40px] rotate-[-30deg]" size={320} opacity={0.06} />
        {/* Small leaf bottom-left */}
        <LeafDecor className="bottom-[-80px] left-[-60px] rotate-[140deg]" size={260} opacity={0.05} />
        {/* Radial glow center-right */}
        <div className="absolute right-[20%] top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-primary/8 blur-3xl" />
        {/* Dot grid overlay */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" aria-hidden="true">
          <defs>
            <pattern id="dots-hero" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots-hero)" />
        </svg>
      </div>

      {/* ── Slides track ── */}
      <div className="relative">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((slide, idx) => (
            <div key={idx} className="min-w-full">
              {/* ── DESKTOP layout ── */}
              <div className="hidden md:flex container mx-auto px-6 lg:px-10 py-12 lg:py-16 items-center gap-12 lg:gap-20 min-h-[420px]">
                {/* Left: text */}
                <div className="flex-1 space-y-5">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-semibold text-primary">
                    <LeafyGreen className="h-3.5 w-3.5" />
                    {slide.pill}
                  </span>
                  <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-tight">
                    {slide.headlineTop}{" "}
                    <span className="text-primary">{slide.headlineAccent}</span>{" "}
                    {slide.headlineBottom}
                  </h1>
                  <p className="text-muted-foreground text-base lg:text-lg leading-relaxed max-w-lg">
                    {slide.body}
                  </p>
                  <div className="flex gap-3 pt-1">
                    <Link href={slide.cta1.href}>
                      <Button className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-7 h-11 font-semibold shadow-md hover:shadow-lg transition-all">
                        {slide.cta1.label} <ArrowRight className="ml-1.5 h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href={slide.cta2.href}>
                      <Button variant="outline" className="rounded-full px-7 h-11 font-semibold border-primary/30 hover:bg-primary/5">
                        {slide.cta2.label}
                      </Button>
                    </Link>
                  </div>
                  <div className="flex flex-wrap gap-3 pt-1">
                    {trustPills.map((t) => (
                      <span key={t} className="text-xs bg-background border border-border rounded-full px-3 py-1 text-muted-foreground">
                        ✓ {t}
                      </span>
                    ))}
                  </div>
                </div>
                {/* Right: image */}
                <div className="flex-1 flex items-center justify-center">
                  <img
                    src={slide.imageSrc}
                    alt={slide.imageAlt}
                    className="w-full max-w-md h-auto max-h-[380px] object-contain drop-shadow-lg"
                  />
                </div>
              </div>

              {/* ── MOBILE layout ── */}
              <div className="md:hidden flex flex-col items-center text-center px-5 py-8 gap-5">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-semibold text-primary">
                  <LeafyGreen className="h-3.5 w-3.5" />
                  {slide.pill}
                </span>
                <h1 className="text-3xl font-bold tracking-tight leading-tight">
                  {slide.headlineTop}{" "}
                  <span className="text-primary">{slide.headlineAccent}</span>{" "}
                  {slide.headlineBottom}
                </h1>
                <img
                  src={slide.imageMobile}
                  alt={slide.imageAlt}
                  className="w-full max-w-[260px] h-auto object-contain drop-shadow-md"
                />
                <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">{slide.body}</p>
                <div className="flex flex-col gap-2.5 w-full max-w-xs">
                  <Link href={slide.cta1.href}>
                    <Button className="w-full rounded-full bg-primary text-primary-foreground font-semibold shadow-md">
                      {slide.cta1.label} <ArrowRight className="ml-1.5 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href={slide.cta2.href}>
                    <Button variant="outline" className="w-full rounded-full border-primary/30">
                      {slide.cta2.label}
                    </Button>
                  </Link>
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                  {trustPills.map((t) => (
                    <span key={t} className="text-xs bg-background border border-border rounded-full px-2.5 py-0.5 text-muted-foreground">
                      ✓ {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Radio dot navigation ── */}
      <div className="relative flex justify-center gap-2 pb-5 pt-2">
        {slides.map((_, i) => (
          <button
            key={i}
            id={`hero-slide-${i}`}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => goTo(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current
                ? "w-7 bg-primary"
                : "w-2 bg-primary/30 hover:bg-primary/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
