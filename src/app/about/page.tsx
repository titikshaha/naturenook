import Image from "next/image";
import { Leaf, ShieldCheck, FlaskConical, Globe } from "lucide-react";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Nature Nook",
  description: "Learn about Nature Nook's journey to becoming India's leading manufacturer of premium herbal powders and Ayurvedic ingredients.",
  alternates: {
    canonical: "https://www.naturenook.co.in/about",
  },
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-primary text-primary-foreground py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="leaf-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M50 15c-15-10-35-5-40 15-2 10 3 20 15 25 15 5 25 10 25 25 0-15 10-20 25-25 12-5 17-15 15-25-5-20-25-25-40-15z" fill="currentColor" />
              </pattern>
            </defs>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#leaf-pattern)" />
          </svg>
        </div>
        <div className="container relative z-10 mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Rooted in Tradition, Perfected by Science.
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/90 leading-relaxed">
            Founded in 2024, Nature Nook is Central India's premier manufacturer of standardized herbal powders, bridging the gap between ancient Ayurveda and modern wellness.
          </p>
        </div>
      </section>

      {/* Our Story & Mission */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-sm font-semibold text-primary uppercase tracking-widest">Our Story</p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
                To the World.
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Located in Indore at Mark Square, Bicholi Road, Nature Nook began with a singular vision: to make high-quality, standardized herbal powders accessible to both large-scale manufacturers and everyday consumers.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We specialize in over 150 premium botanical products — ranging from staples like Ashwagandha and Tulsi to highly specialized compounds like Gymnema Sylvestre and Boswellia Serrata. Whether it's for Ayurvedic medicine, cosmetics, or nutraceuticals, our powders guarantee consistent active compound profiles batch after batch.
              </p>
            </div>
            {/* Image — hidden on mobile to prevent horizontal overflow */}
            <div className="hidden md:flex relative aspect-square md:aspect-auto md:h-full min-h-[400px] rounded-2xl overflow-hidden bg-secondary/30 border border-border items-center justify-center">
              <Leaf className="w-32 h-32 text-primary/20" />
            </div>
          </div>

        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 md:py-24 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Core Philosophy</h2>
            <p className="text-muted-foreground">We believe that true wellness comes from nature, but consistency and safety come from rigorous science.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: ShieldCheck,
                title: "Standardization",
                desc: "Every batch is strictly tested for active compounds, ensuring that you receive the exact potency promised, every single time."
              },
              {
                icon: FlaskConical,
                title: "Purity & Safety",
                desc: "Our powderion processes are designed to retain the natural goodness of herbs while completely eliminating heavy metals and toxins."
              },
              {
                icon: Globe,
                title: "Sustainable Sourcing",
                desc: "We partner directly with farmers, ensuring ethical harvesting practices that protect the environment and support local communities."
              }
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-card border border-border p-8 rounded-2xl text-center hover:border-primary/40 hover:shadow-md transition-all">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{title}</h3>
                <p className="text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
