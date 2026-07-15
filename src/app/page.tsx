import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MixedHeroCarousel } from "@/components/banners/MixedHeroCarousel";
import { TrustStatsCarousel } from "@/components/banners/TrustStatsCarousel";
import {
  FlaskConical,
  ShieldCheck,
  Truck,
  ArrowRight,
  Leaf,
  Star,
  ShoppingCart,
} from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

const categories = [
  { label: "Ayurvedic",     href: "/catalogue?category=ayurvedic",     icon: "🌿", image: "/category1.png" },
  { label: "Cosmetics",     href: "/catalogue?category=cosmetic",      icon: "🌸", image: "/category3.png" },
  { label: "Nutraceutical", href: "/catalogue?category=nutraceutical", icon: "💊", image: "/category4.png" },
  { label: "Homecare",      href: "/catalogue?category=homecare",      icon: "🏠", image: "/category2.png" },
];

const featuredProducts = [
  {
    id: "1",
    name: "Ashwagandha Powder",
    scientific: "Withania somnifera",
    potency: "5% Withanolides",
    category: "Ayurvedic",
    rating: 4.8,
    reviews: 124,
    image: "/images/products/Ashwagandha3.jpg",
  },
  {
    id: "2",
    name: "Shatavari Powder",
    scientific: "Asparagus racemosus",
    potency: "20% Saponins",
    category: "Ayurvedic",
    rating: 4.7,
    reviews: 89,
    image: "/images/products/Shatavari7.jpg",
  },
  {
    id: "3",
    name: "Gymnema Powder (Gudmar)",
    scientific: "Gymnema sylvestre",
    potency: "25% Gymnemic Acid",
    category: "Nutraceutical",
    rating: 4.9,
    reviews: 67,
    image: "/images/products/Gudmar19.jpg",
  },
  {
    id: "4",
    name: "Spirulina Powder",
    scientific: "Arthrospira platensis",
    potency: "60% Protein",
    category: "Nutraceutical",
    rating: 4.6,
    reviews: 102,
    image: "/images/products/Spirulina11.jpg",
  },
  {
    id: "5",
    name: "Brahmi Powder",
    scientific: "Bacopa monnieri",
    potency: "20% Bacosides",
    category: "Ayurvedic",
    rating: 4.8,
    reviews: 78,
    image: "/images/products/Brahmi15.jpg",
  },
  {
    id: "6",
    name: "Moringa Powder",
    scientific: "Moringa oleifera",
    potency: "5% Isothiocyanates",
    category: "Nutraceutical",
    rating: 4.7,
    reviews: 95,
    image: "/images/products/Moringa1.jpg",
  },
  {
    id: "7",
    name: "Bhringraj Powder",
    scientific: "Eclipta prostrata",
    potency: "10% Wedelolactone",
    category: "Cosmetic",
    rating: 4.5,
    reviews: 143,
    image: "/images/products/Bhringraj21.jpg",
  },
  {
    id: "8",
    name: "Triphala Powder",
    scientific: "Three-fruit blend",
    potency: "20% Tannins",
    category: "Ayurvedic",
    rating: 4.6,
    reviews: 58,
    image: "/images/products/Triphala23.jpg",
  },
];

const whyChoose = [
  {
    icon: ShieldCheck,
    title: "Standardized Potency",
    desc: "Consistent active compound profiles verified batch after batch through rigorous testing.",
  },
  {
    icon: FlaskConical,
    title: "150+ Powders",
    desc: "Extensive range for Ayurvedic, cosmetic, nutraceutical, and homecare industries.",
  },
  {
    icon: Truck,
    title: "Reliable Supply Chain",
    desc: "Dedicated support for bulk and wholesale orders with timely nationwide delivery.",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Generic image placeholder — keeps bg until real image is added */
function ImagePlaceholder({ className = "", label = "" }: { className?: string; label?: string }) {
  return (
    <div className={`bg-secondary/40 flex flex-col items-center justify-center gap-2 ${className}`}>
      <Leaf className="h-10 w-10 text-primary/25" />
      {label && <span className="text-xs text-muted-foreground">{label}</span>}
    </div>
  );
}

/** Star rating row */
function StarRating({ rating, reviews }: { rating: number; reviews: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className={`h-3.5 w-3.5 ${i <= Math.round(rating) ? "fill-primary text-primary" : "fill-muted text-muted"}`}
          />
        ))}
      </div>
      <span className="text-xs text-muted-foreground">({reviews})</span>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div className="flex flex-col">

      {/* ── Main Hero Carousel (3 distinct slide types + 3 banners) ── */}
      <MixedHeroCarousel />
      
      {/* ── 4th Carousel Component (Stats) left as it is ── */}
      
      {/* ══════════════════════════════════════════════════════════════════════
          PRODUCTS — immediately after banner
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-10 md:py-14 bg-background">
        <div className="container mx-auto px-4">

          {/* Section header */}
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-1.5">
                Our Collection
              </p>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
                Featured Powders
              </h2>
            </div>
            <Link
              href="/catalogue"
              className="hidden md:inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline underline-offset-4"
            >
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="group rounded-xl border border-border bg-card overflow-hidden hover:border-primary/30 hover:shadow-md transition-all duration-200 flex flex-col"
              >
                {/* Product image */}
                <div className="relative overflow-hidden group/img">
                  {product.image ? (
                    <Image 
                      src={product.image} 
                      alt={product.name} 
                      width={400} 
                      height={400} 
                      className="w-full aspect-square object-cover group-hover/img:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <ImagePlaceholder className="w-full aspect-square" />
                  )}
                  {/* Category badge — overlaid */}
                  <span className="absolute top-2 left-2 text-[10px] md:text-xs rounded-full bg-background/90 border border-border px-2 py-0.5 font-medium text-foreground/70">
                    {product.category}
                  </span>
                </div>

                {/* Product info */}
                <div className="p-3 md:p-4 flex flex-col flex-1 gap-2">
                  <div>
                    <h3 className="font-semibold text-foreground text-sm md:text-base leading-snug group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-[11px] md:text-xs text-muted-foreground italic mt-0.5">
                      {product.scientific}
                    </p>
                  </div>

                  <StarRating rating={product.rating} reviews={product.reviews} />

                  <div className="mt-auto pt-1">
                    <span className="inline-block text-xs font-semibold text-primary bg-primary/8 rounded px-2 py-0.5 mb-2.5">
                      {product.potency}
                    </span>
                    <Link href={`/product/${product.id}`} className="block">
                      <Button
                        className="w-full h-9 text-xs md:text-sm rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all"
                      >
                        <ShoppingCart className="h-3.5 w-3.5 mr-1.5" />
                        Enquire Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
            
          {/* Mobile — view all */}
          <div className="mt-6 md:hidden">
            <Link href="/catalogue">
              <Button variant="outline" className="w-full rounded-full border-primary/30 text-primary hover:bg-primary/5 font-semibold">
                View All Products <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
       <TrustStatsCarousel />

      {/* ══════════════════════════════════════════════════════════════════════
          SHOP BY CATEGORY
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-10 md:py-14 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-10">
            <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">
              Our Categories
            </p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
              Shop By Category
            </h2>
          </div>

          <div className="flex items-start justify-center gap-5 md:gap-12 overflow-x-auto pb-2 [-ms-overflow-style:none] scrollbar-none [&::-webkit-scrollbar]:hidden">
            {[
              { label: "All", href: "/catalogue", count: "150+", image: "/logo2.png" },
              ...categories.map((c) => ({ label: c.label, href: c.href, count: "30+", image: c.image })),
            ].map((cat) => (
              <Link
                key={cat.label}
                href={cat.href}
                className="group flex flex-col items-center gap-3 shrink-0"
              >
                <div className="w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-border group-hover:border-primary transition-colors duration-200">
                  <img src={cat.image} alt={cat.label} className="w-full h-full object-cover" />
                </div>
                <div className="text-center">
                  <p className="text-sm md:text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                    {cat.label}
                  </p>
                  <p className="text-xs text-muted-foreground">{cat.count} Products</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          PROMO BANNER
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-10 md:py-14 bg-background">
        <div className="container mx-auto px-4">
          <div className="rounded-2xl bg-secondary/30 border border-border overflow-hidden flex flex-col md:flex-row">
            <div className="flex-1 p-8 md:p-12 flex flex-col justify-center gap-5">
              <span className="w-fit rounded-full bg-primary text-primary-foreground px-4 py-1.5 text-sm font-semibold">
                GET 20% OFF
              </span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-tight">
                Your First Purchase
              </h2>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-sm">
                Discover our natural, eco-friendly herbal products and enjoy
                exclusive savings. Sign up for a greener, healthier lifestyle.
              </p>
              <Link href="/catalogue">
                <Button className="w-fit rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-7 h-11 font-semibold shadow-sm transition-all">
                  Shop Products
                </Button>
              </Link>
            </div>
            <div className="flex-1 min-h-50 md:min-h-0">
              <ImagePlaceholder className="w-full h-full min-h-50" label="Promo Image" />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          WHY CHOOSE US
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-10 md:py-14 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-10">
            <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">
              Why Choose Us
            </p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
              Blending Tradition with Science
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto text-sm md:text-base">
              With modern values of sustainability, skin-friendly care, and emotional well-being.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {whyChoose.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="rounded-xl border border-border bg-card p-6 flex flex-col gap-4 hover:border-primary/30 hover:shadow-sm transition-all"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-base md:text-lg mb-1.5">{title}</h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          CTA STRIP
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-12 md:py-16 bg-primary">
        <div className="container mx-auto px-4 text-center space-y-5">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary-foreground">
            Ready to Source Premium Herbal Powders?
          </h2>
          <p className="text-primary-foreground/80 max-w-xl mx-auto text-sm md:text-base">
            Join hundreds of manufacturers and brands who trust Nature Nook for
            consistent quality and reliable supply.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-1">
            <Link href="/catalogue">
              <Button className="w-full sm:w-auto bg-background text-primary hover:bg-background/90 rounded-full px-8 h-11 font-semibold shadow-md transition-all">
                Browse Catalogue
              </Button>
            </Link>
            <Link href="/vendor">
              <Button
                variant="outline"
                className="w-full sm:w-auto rounded-full px-8 h-11 font-semibold border-primary-foreground/40 text-primary-background hover:bg-primary-foreground/10 transition-all"
              >
                Wholesale Inquiry
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
