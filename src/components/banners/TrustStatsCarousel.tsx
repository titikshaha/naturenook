"use client";

/**
 * TrustStatsCarousel — Carousel 4
 * Layout: FULL-WIDTH STATS COLUMNS — 4 large numbers side by side.
 * Deep slate background. Numbers are the hero, not text.
 * Slide changes the stat group shown.
 * Background: diagonal stripe texture + bottom accent bar.
 */

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const slides = [
  {
    label: "By the Numbers",
    cta: { label: "Browse Catalogue", href: "/catalogue" },
    accent: "#34d399",
    stats: [
      { value: "150+", unit: "", label: "Herbal powders", sub: "Ayurvedic, cosmetic & nutraceutical grade" },
      { value: "200+", unit: "", label: "Brand Partners", sub: "Pharmaceutical & FMCG brands served" },
      { value: "99.8", unit: "%", label: "Batch Pass Rate", sub: "Consistent quality across all SKUs" },
      { value: "8+", unit: "", label: "Years Expertise", sub: "Decades of botanical knowledge" },
    ],
  },
  {
    label: "Certified Quality",
    cta: { label: "Wholesale Inquiry", href: "/vendor" },
    accent: "#60a5fa",
    stats: [
      { value: "GMP", unit: "", label: "Certified Facility", sub: "WHO-GMP compliant manufacturing" },
      { value: "COA", unit: "", label: "Every Batch", sub: "Full certificate of analysis, no exceptions" },
      { value: "FSSAI", unit: "", label: "Compliant", sub: "Food safety standards met & exceeded" },
      { value: "ISO", unit: "", label: "Logistics", sub: "Cold-chain capable supply infrastructure" },
    ],
  },
  {
    label: "Our Reach",
    cta: { label: "Get in Touch", href: "#" },
    accent: "#f9a825",
    stats: [
      { value: "12", unit: "+", label: "Indian States", sub: "Direct farmer sourcing network" },
      { value: "Pan", unit: "", label: "India Delivery", sub: "Reliable logistics across all regions" },
      { value: "48", unit: "h", label: "Sample Dispatch", sub: "Fast turnaround for trial requests" },
      { value: "1", unit: "kg", label: "Min. Order", sub: "Accessible to small & large buyers" },
    ],
  },
];

/** Diagonal stripe texture */
function DiagonalStripes({ accent }: { accent: string }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 800 380"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {/* Diagonal stripes - top left zone */}
      {Array.from({ length: 14 }).map((_, i) => (
        <line
          key={`d${i}`}
          x1={-40 + i * 30} y1="0"
          x2={-40 + i * 30 - 120} y2="380"
          stroke={accent}
          strokeWidth="12"
          opacity="0.025"
        />
      ))}
      {/* Bottom accent bar */}
      <rect x="0" y="370" width="800" height="10" fill={accent} opacity="0.15" />
      {/* Corner decoration — top right */}
      <circle cx="760" cy="40" r="60" stroke={accent} strokeWidth="0.8" fill="none" opacity="0.1" />
      <circle cx="760" cy="40" r="40" stroke={accent} strokeWidth="0.5" fill="none" opacity="0.08" />
      {/* Small squares - bottom left */}
      {[[30, 340], [50, 320], [70, 340], [30, 320]].map(([x, y], i) => (
        <rect key={i} x={x} y={y} width="8" height="8" fill={accent} opacity="0.1" transform={`rotate(45 ${x + 4} ${y + 4})`} />
      ))}
    </svg>
  );
}

export function TrustStatsCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((i: number) => {
    setCurrent(i);
    setPaused(true);
    setTimeout(() => setPaused(false), 8000);
  }, []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setCurrent((p) => (p + 1) % slides.length), 7000);
    return () => clearInterval(t);
  }, [paused]);

  const slide = slides[current];

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ background: "oklch(0.16 0.03 220)" }}
    >
      <DiagonalStripes accent={slide.accent} />

      {/* ── Slides ── */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((s, idx) => (
          <div key={idx} className="min-w-full">
            <div className="relative container mx-auto px-5 md:px-10 py-10 md:py-14 flex flex-col gap-8 md:gap-10">

              {/* Slide label + CTA row */}
              <div className="flex items-center justify-between">
                <span
                  className="text-[10px] font-bold uppercase tracking-[0.25em] px-3 py-1 rounded-full"
                  style={{ color: s.accent, background: `${s.accent}18`, border: `1px solid ${s.accent}30` }}
                >
                  {s.label}
                </span>
                <Link href={s.cta.href} className="hidden md:block">
                  <Button
                    variant="ghost"
                    className="text-white/50 hover:text-white text-xs font-medium gap-1.5 h-8 px-3"
                  >
                    {s.cta.label} <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
              </div>

              {/* Stats grid — 4 columns on desktop, 2x2 on mobile */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-y md:divide-y-0"
                style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                {s.stats.map((stat, i) => (
                  <div
                    key={i}
                    className="flex flex-col gap-2 px-5 md:px-8 py-6 md:py-8 border-white/6 first:border-l-0 md:first:pl-0"
                    style={{ borderColor: "rgba(255,255,255,0.06)" }}
                  >
                    {/* Big value */}
                    <div className="flex items-end gap-0.5">
                      <span
                        className="font-bold leading-none"
                        style={{
                          color: s.accent,
                          fontSize: "clamp(2rem, 6vw, 3.5rem)",
                          lineHeight: 1,
                        }}
                      >
                        {stat.value}
                      </span>
                      {stat.unit && (
                        <span
                          className="font-bold pb-1 ml-0.5"
                          style={{ color: s.accent, fontSize: "clamp(1rem, 2.5vw, 1.5rem)" }}
                        >
                          {stat.unit}
                        </span>
                      )}
                    </div>
                    {/* Label */}
                    <p className="text-white font-semibold text-sm md:text-base">{stat.label}</p>
                    {/* Sub-text */}
                    <p className="text-white/40 text-xs leading-relaxed hidden md:block">{stat.sub}</p>
                  </div>
                ))}
              </div>

              {/* Mobile CTA */}
              <div className="md:hidden text-center">
                <Link href={s.cta.href}>
                  <Button
                    className="rounded-full px-8 h-10 font-semibold text-sm"
                    style={{ background: s.accent, color: "#0a1a0a" }}
                  >
                    {s.cta.label} <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* ── Radio dots ── */}
      <div className="relative flex justify-center gap-2 pb-5 pt-1">
        {slides.map((s, i) => (
          <button
            key={i}
            id={`trust-slide-${i}`}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => goTo(i)}
            className={`h-2 rounded-full transition-all duration-300 ${i === current ? "w-7" : "w-2"}`}
            style={{ background: i === current ? slide.accent : `${slide.accent}35` }}
          />
        ))}
      </div>
    </section>
  );
}
