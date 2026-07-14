"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, LeafyGreen } from "lucide-react";

const trustPills = ["GMP Certified", "Lab Tested", "150+ SKUs", "PAN India Delivery"];

// ─── SVG Decor Components ──────────────────────────────────────────────────

function LeafDecor({ className, size = 200, opacity = 0.07 }: { className?: string; size?: number; opacity?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" className={`absolute pointer-events-none select-none ${className}`} aria-hidden="true">
      <path d="M100 10 C60 10 10 50 10 100 C10 150 60 190 100 190 C100 190 190 150 190 100 C190 50 140 10 100 10 Z" fill="currentColor" opacity={opacity} />
      <path d="M100 10 C100 10 100 100 100 190" stroke="currentColor" strokeWidth="1.5" opacity={opacity * 1.2} />
      <path d="M100 60 C80 70 40 75 20 90" stroke="currentColor" strokeWidth="1" opacity={opacity} />
      <path d="M100 60 C120 70 160 75 180 90" stroke="currentColor" strokeWidth="1" opacity={opacity} />
      <path d="M100 100 C75 108 45 110 20 120" stroke="currentColor" strokeWidth="1" opacity={opacity} />
      <path d="M100 100 C125 108 155 110 180 120" stroke="currentColor" strokeWidth="1" opacity={opacity} />
      <path d="M30 30 C20 20 5 25 5 35 C5 45 20 50 30 30 Z" fill="currentColor" opacity={opacity * 0.8} />
      <path d="M170 170 C180 160 195 165 195 175 C195 185 180 190 170 170 Z" fill="currentColor" opacity={opacity * 0.8} />
    </svg>
  );
}

function GeometricDecor({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 800 400" fill="none" className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <circle cx="-40" cy="80" r="180" stroke={color} strokeWidth="0.6" opacity="0.1" />
      <circle cx="-40" cy="80" r="130" stroke={color} strokeWidth="0.4" opacity="0.07" />
      <circle cx="840" cy="340" r="200" stroke={color} strokeWidth="0.6" opacity="0.1" />
      {Array.from({ length: 10 }).map((_, i) => (
        <line key={`h${i}`} x1="440" y1={i * 44} x2="800" y2={i * 44} stroke={color} strokeWidth="0.4" opacity="0.05" />
      ))}
      {Array.from({ length: 10 }).map((_, i) => (
        <line key={`v${i}`} x1={440 + i * 40} y1="0" x2={440 + i * 40} y2="400" stroke={color} strokeWidth="0.4" opacity="0.05" />
      ))}
      <line x1="600" y1="0" x2="480" y2="400" stroke={color} strokeWidth="0.6" opacity="0.07" />
      <line x1="650" y1="0" x2="530" y2="400" stroke={color} strokeWidth="0.4" opacity="0.05" />
      {[[120, 320], [160, 340], [200, 310], [240, 350], [680, 60], [720, 40], [760, 70]].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="2" fill={color} opacity="0.15" />
      ))}
    </svg>
  );
}

function CirclePattern() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 360" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <circle cx="700" cy="180" r="220" stroke="var(--color-primary, #2d6a4f)" strokeWidth="0.6" fill="none" opacity="0.06" />
      <circle cx="700" cy="180" r="160" stroke="var(--color-primary, #2d6a4f)" strokeWidth="0.4" fill="none" opacity="0.05" />
      <circle cx="700" cy="180" r="100" stroke="var(--color-primary, #2d6a4f)" strokeWidth="0.4" fill="none" opacity="0.04" />
      <circle cx="100" cy="360" r="180" stroke="var(--color-primary, #2d6a4f)" strokeWidth="0.6" fill="none" opacity="0.05" />
      <circle cx="100" cy="360" r="120" stroke="var(--color-primary, #2d6a4f)" strokeWidth="0.4" fill="none" opacity="0.04" />
      {[[680, 40], [720, 60], [740, 30], [60, 40], [40, 70]].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="2.5" fill="var(--color-primary, #2d6a4f)" opacity="0.12" />
      ))}
    </svg>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────

export function MixedHeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const totalSlides = 3;

  const goTo = useCallback((i: number) => {
    setCurrent(i);
    setPaused(true);
    setTimeout(() => setPaused(false), 8000);
  }, []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setCurrent((p) => (p + 1) % totalSlides), 7000);
    return () => clearInterval(t);
  }, [paused, totalSlides]);

  return (
    <section className="relative w-full overflow-hidden bg-background">
      
      {/* ── Slide Track ── */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {/* ================================================================= */}
        {/* SLIDE 1: Hero Split Layout (Sage Green)                           */}
        {/* ================================================================= */}
        <div className="min-w-full relative bg-secondary/30 text-foreground overflow-hidden">
          {/* Background graphics */}
          <div className="absolute inset-0 pointer-events-none text-primary">
            <LeafDecor className="top-[-60px] right-[-40px] rotate-[-30deg]" size={320} opacity={0.06} />
            <LeafDecor className="bottom-[-80px] left-[-60px] rotate-[140deg]" size={260} opacity={0.05} />
            <div className="absolute right-[20%] top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-primary/8 blur-3xl" />
            <svg className="absolute inset-0 w-full h-full opacity-[0.03]" aria-hidden="true">
              <defs><pattern id="dots-1" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.5" fill="currentColor" /></pattern></defs>
              <rect width="100%" height="100%" fill="url(#dots-1)" />
            </svg>
          </div>

          {/* Desktop */}
          <div className="hidden md:flex container mx-auto px-6 lg:px-10 py-12 lg:py-16 items-center gap-12 lg:gap-20 min-h-[420px] lg:min-h-[500px] relative z-10">
            <div className="flex-1 space-y-5">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-semibold text-primary">
                <LeafyGreen className="h-3.5 w-3.5" /> 100% Botanical · Standardized Quality
              </span>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-tight">
                Pure Herbal <span className="text-primary">Excellence</span> From Nature
              </h1>
              <p className="text-muted-foreground text-base lg:text-lg leading-relaxed max-w-lg">
                Nature Nook manufactures and distributes 150+ premium herbal extracts for Ayurvedic medicines, cosmetics, and nutraceuticals — straight from Indore.
              </p>
              <div className="flex gap-3 pt-1">
                <Link href="/catalogue"><Button className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-7 h-11 font-semibold shadow-md transition-all">Browse Catalogue <ArrowRight className="ml-1.5 h-4 w-4" /></Button></Link>
                <Link href="/vendor"><Button variant="outline" className="rounded-full px-7 h-11 font-semibold border-primary/30 hover:bg-primary/5">Wholesale Inquiry</Button></Link>
              </div>
              <div className="flex flex-wrap gap-3 pt-1">
                {trustPills.map((t) => <span key={t} className="text-xs bg-background/50 border border-border rounded-full px-3 py-1 text-muted-foreground">✓ {t}</span>)}
              </div>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <img src="/hero-desktop.png" alt="Herbal extracts hero" className="w-full max-w-md h-auto max-h-[380px] object-contain drop-shadow-lg" />
            </div>
          </div>
          {/* Mobile */}
          <div className="md:hidden flex flex-col items-center text-center px-5 py-10 gap-5 relative z-10">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-semibold text-primary">
              <LeafyGreen className="h-3.5 w-3.5" /> 100% Botanical
            </span>
            <h1 className="text-3xl font-bold tracking-tight leading-tight">Pure Herbal <span className="text-primary">Excellence</span> From Nature</h1>
            <img src="/hero-mobile.png" alt="Herbal extracts hero" className="w-full max-w-[260px] h-auto object-contain drop-shadow-md" />
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">Nature Nook manufactures 150+ premium herbal extracts for medicines, cosmetics, and nutraceuticals.</p>
            <div className="flex flex-col gap-2.5 w-full max-w-xs">
              <Link href="/catalogue"><Button className="w-full rounded-full bg-primary text-primary-foreground font-semibold shadow-md">Browse Catalogue <ArrowRight className="ml-1.5 h-4 w-4" /></Button></Link>
              <Link href="/vendor"><Button variant="outline" className="w-full rounded-full border-primary/30">Wholesale Inquiry</Button></Link>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* SLIDE 2: Editorial Center Text (Color Scheme: Deep Terracotta)    */}
        {/* ================================================================= */}
        <div className="min-w-full relative overflow-hidden" style={{ background: "#2a1610" /* Very deep warm brown */ }}>
          <GeometricDecor color="#e48a5c" />
          <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-14 lg:py-16 min-h-[420px] lg:min-h-[500px] gap-5 md:gap-6">
            <span
              className="inline-block text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full border"
              style={{ color: "#e48a5c", borderColor: "#e48a5c", background: "rgba(228, 138, 92, 0.08)" }}
            >
              Trending Extract
            </span>
            <div className="space-y-1 md:space-y-2">
              <h2 className="font-bold leading-none tracking-tight text-[#fdf6f0]" style={{ fontSize: "clamp(2.8rem, 9vw, 7rem)", lineHeight: 1 }}>
                Ashwagandha
              </h2>
              <p className="font-light tracking-[0.3em] uppercase text-[#e48a5c]" style={{ fontSize: "clamp(0.85rem, 2.5vw, 1.4rem)" }}>
                Extract
              </p>
            </div>
            <div className="flex items-center gap-4 w-full max-w-sm">
              <div className="flex-1 h-px bg-[#e48a5c]/20" />
              <span className="text-xs text-[#e48a5c]/70 italic">Withania somnifera</span>
              <div className="flex-1 h-px bg-[#e48a5c]/20" />
            </div>
            <div
              className="text-sm md:text-base font-bold tracking-widest uppercase px-5 py-2 rounded-lg"
              style={{ background: "rgba(228, 138, 92, 0.12)", color: "#e48a5c", border: "1px solid rgba(228, 138, 92, 0.2)" }}
            >
              Standardized · 5% Withanolides
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {["Adaptogen", "Stress Relief", "Vitality", "Ayurvedic Grade"].map((tag) => (
                <span key={tag} className="text-xs px-3 py-1 rounded-full text-[#fdf6f0]/60 border border-[#fdf6f0]/10">
                  {tag}
                </span>
              ))}
            </div>
            <Link href="/product/1">
              <Button
                className="rounded-full px-8 h-11 font-bold mt-1 shadow-lg hover:opacity-90 transition-all"
                style={{ background: "#e48a5c", color: "#1a0d0a" }}
              >
                Enquire Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* ================================================================= */}
        {/* SLIDE 3: Green Text Grid Layout (White Background)                */}
        {/* ================================================================= */}
        <div className="min-w-full relative bg-background overflow-hidden">
          <CirclePattern />
          <div className="relative z-10 container mx-auto px-5 lg:px-10 py-10 lg:py-14 min-h-[420px] lg:min-h-[500px] flex flex-col justify-center gap-8">
            
            <div className="text-center space-y-3">
              <span className="inline-block text-[10px] font-bold uppercase tracking-[0.25em] text-primary border border-primary/30 px-3 py-1 rounded-full">
                Immunity & Vitality
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary leading-tight">
                Herbs that shield and strengthen
              </h2>
              <p className="text-primary/70 text-sm md:text-base max-w-xl mx-auto">
                Thousands of years of traditional use, validated by modern research.
              </p>
            </div>

            <div className="flex items-center gap-4 max-w-xs mx-auto">
              <div className="flex-1 h-px bg-primary/20" />
              <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
              <div className="flex-1 h-px bg-primary/20" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 max-w-5xl mx-auto">
              {/* Card 1 */}
              <div className="flex flex-col gap-3 p-5 rounded-xl border border-primary/10 bg-primary/5 hover:border-primary/25 transition-all">
                <div className="text-primary">
                  <svg viewBox="0 0 40 40" fill="none" className="w-7 h-7" aria-hidden="true">
                    <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="1.2" opacity="0.25" />
                    <path d="M20 6 C20 6 10 13 10 20 C10 27 15 34 20 34 C25 34 30 27 30 20 C30 13 20 6 20 6 Z" fill="currentColor" opacity="0.35" />
                    <path d="M20 6 L20 34" stroke="currentColor" strokeWidth="1" opacity="0.3" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-primary text-base">Ashwagandha</h3>
                  <p className="text-primary/70 text-xs mt-1 leading-relaxed">Reduces cortisol, boosts stamina</p>
                </div>
              </div>
              {/* Card 2 */}
              <div className="flex flex-col gap-3 p-5 rounded-xl border border-primary/10 bg-primary/5 hover:border-primary/25 transition-all">
                <div className="text-primary">
                  <svg viewBox="0 0 40 40" fill="none" className="w-7 h-7" aria-hidden="true">
                    <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="1.2" opacity="0.25" />
                    <path d="M20 8 C16 12 8 14 8 20 C8 28 14 34 20 34 C26 34 32 28 32 20 C32 14 24 12 20 8 Z" fill="currentColor" opacity="0.3" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-primary text-base">Tulsi</h3>
                  <p className="text-primary/70 text-xs mt-1 leading-relaxed">Antimicrobial, adaptogenic support</p>
                </div>
              </div>
              {/* Card 3 */}
              <div className="flex flex-col gap-3 p-5 rounded-xl border border-primary/10 bg-primary/5 hover:border-primary/25 transition-all">
                <div className="text-primary">
                  <svg viewBox="0 0 40 40" fill="none" className="w-7 h-7" aria-hidden="true">
                    <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="1.2" opacity="0.25" />
                    {[0,60,120,180,240,300].map((deg, i) => {
                      const rad = (deg * Math.PI) / 180;
                      return <ellipse key={i} cx={20 + Math.cos(rad)*10} cy={20 + Math.sin(rad)*10} rx="5" ry="3" transform={`rotate(${deg}, ${20 + Math.cos(rad)*10}, ${20 + Math.sin(rad)*10})`} fill="currentColor" opacity="0.3" />;
                    })}
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-primary text-base">Amla</h3>
                  <p className="text-primary/70 text-xs mt-1 leading-relaxed">Highest natural Vitamin C source</p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Link href="/catalogue?category=ayurvedic">
                <Button variant="outline" className="rounded-full px-8 h-10 font-semibold border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground transition-all text-sm">
                  Explore Immunity Herbs <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

      </div>

      {/* ── Radio dots (absolute at bottom center) ── */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex justify-center gap-2 z-20">
        {Array.from({ length: totalSlides }).map((_, i) => {
          // Dot color logic based on slide index
          const activeColor = i === 0 ? "hsl(var(--primary))" : i === 1 ? "#e48a5c" : "hsl(var(--primary))";
          const inactiveColor = i === 0 ? "hsla(var(--primary), 0.3)" : i === 1 ? "rgba(228, 138, 92, 0.3)" : "hsla(var(--primary), 0.3)";
          
          return (
            <button
              key={i}
              id={`mixed-slide-${i}`}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all duration-300 ${i === current ? "w-7" : "w-2"}`}
              style={{
                // we want the dot color to contrast well based on the CURRENT slide's background
                background: i === current 
                  ? (current === 0 ? "hsl(var(--primary))" : current === 1 ? "#e48a5c" : "hsl(var(--primary))")
                  : (current === 0 ? "hsla(var(--primary), 0.3)" : current === 1 ? "rgba(228, 138, 92, 0.3)" : "hsla(var(--primary), 0.3)")
              }}
            />
          );
        })}
      </div>
    </section>
  );
}
