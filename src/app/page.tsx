import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  FlaskConical,
  ShieldCheck,
  Truck,
  LeafyGreen,
  ArrowRight,
  Leaf,
  Star,
} from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

const categories = [
  { label: "Ayurvedic",    href: "/catalogue?category=ayurvedic",    icon: "🌿", image: "/category1.png" },
  { label: "Cosmetics",    href: "/catalogue?category=cosmetic",     icon: "🌸", image: "/category3.png" },
  { label: "Nutraceutical", href: "/catalogue?category=nutraceutical", icon: "💊", image: "/category4.png" },
  { label: "Homecare",     href: "/catalogue?category=homecare",     icon: "🏠", image: "/category2.png" },
];

const featuredProducts = [
  {
    id: "1",
    name: "Ashwagandha Extract",
    scientific: "Withania somnifera",
    potency: "5% Withanolides",
    category: "Ayurvedic",
    rating: 4.8,
    reviews: 124,
  },
  {
    id: "2",
    name: "Tulsi Extract",
    scientific: "Ocimum sanctum",
    potency: "2% Ursolic Acid",
    category: "Ayurvedic",
    rating: 4.7,
    reviews: 89,
  },
  {
    id: "3",
    name: "Gymnema Extract",
    scientific: "Gymnema sylvestre",
    potency: "25% Gymnemic Acid",
    category: "Nutraceutical",
    rating: 4.9,
    reviews: 67,
  },
  {
    id: "4",
    name: "Neem Extract",
    scientific: "Azadirachta indica",
    potency: "2.5% Azadirachtin",
    category: "Cosmetic",
    rating: 4.6,
    reviews: 102,
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
    title: "150+ Extracts",
    desc: "An extensive range catering to Ayurvedic, cosmetic, nutraceutical, and homecare industries.",
  },
  {
    icon: Truck,
    title: "Reliable Supply Chain",
    desc: "Dedicated support for bulk and wholesale orders with timely nationwide delivery.",
  },
];

// ─── Components ───────────────────────────────────────────────────────────────

// Generic placeholder: soft bg with leaf icon
function ImagePlaceholder({
  className = "",
  label = "",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <div
      className={`bg-secondary/40 flex flex-col items-center justify-center gap-2 ${className}`}
    >
      <Leaf className="h-10 w-10 text-primary/30" />
      {label && <span className="text-xs text-muted-foreground">{label}</span>}
    </div>
  );
}

/**
 * MOBILE hero image — visible only on screens < md (below 768px)
 * Recommended: square or portrait image, e.g. 600×600px or 600×700px
 * Sits between the headline/body text and the CTA buttons on mobile.
 */
function HeroImageMobile() {
  return (
    <div className="md:hidden w-full max-w-xs mx-auto">
      {/* ↓ Replace with your mobile hero image */}
      <img
        src="/hero.png"
        alt="Nature Nook"
        className="w-full h-auto object-contain"
      />
    </div>
  );
}

/**
 * DESKTOP hero image — visible only on screens ≥ md (768px+)
 * Recommended: landscape image, e.g. 800×600px or 900×700px
 * Fills the right column of the two-column hero flex layout.
 */
function HeroImageDesktop() {
  return (
    <div className="hidden md:flex flex-1 items-center justify-center">
      {/* ↓ Replace with your desktop hero image */}
      <img
        src="/hero.png"
        alt="Nature Nook"
        className="w-200 h-auto max-h-[620px] object-contain"
      />
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-secondary/30 overflow-hidden">
        {/* ── MOBILE layout: stacked column ───────────────────────────────── */}
        <div className="md:hidden container mx-auto px-4 py-10 flex flex-col items-center gap-6 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-medium text-primary">
            <LeafyGreen className="h-3.5 w-3.5" />
            100% Botanical · Standardized Quality
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground leading-tight">
            Pure Herbal{" "}
            <span className="text-primary">Excellence</span>{" "}
            From Nature
          </h1>
          <p className="text-muted-foreground text-base leading-relaxed max-w-sm">
            Nature Nook manufactures and distributes 150+ premium herbal
            extracts for Ayurvedic medicines, cosmetics, and nutraceuticals.
          </p>

          {/* Mobile hero image — square, centered, natural height */}
          <HeroImageMobile />

          <div className="flex flex-col gap-3 w-full max-w-xs">
            <Link href="/catalogue">
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-7 h-11 text-sm font-semibold shadow-md">
                Browse Catalogue <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/vendor">
              <Button variant="outline" className="w-full rounded-full px-7 h-11 text-sm font-semibold border-primary/30">
                Wholesale Inquiry
              </Button>
            </Link>
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {["GMP Certified", "Lab Tested", "150+ SKUs", "PAN India Delivery"].map((t) => (
              <span key={t} className="text-xs bg-background border border-border rounded-full px-3 py-1 text-muted-foreground">
                ✓ {t}
              </span>
            ))}
          </div>
        </div>

        {/* ── DESKTOP layout: two-column flex row ─────────────────────────── */}
        <div className="hidden md:flex container mx-auto px-4 flex-row items-center gap-16">
          {/* Left: text */}
          <div className="flex-1 space-y-6 text-left">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-medium text-primary">
              <LeafyGreen className="h-3.5 w-3.5" />
              100% Botanical · Standardized Quality
            </span>
            <h1 className="text-6xl font-bold tracking-tight text-foreground leading-tight">
              Pure Herbal{" "}
              <span className="text-primary">Excellence</span>{" "}
              From Nature
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
              Nature Nook manufactures and distributes 150+ premium herbal
              extracts for Ayurvedic medicines, cosmetics, and nutraceuticals.
            </p>
            <div className="flex flex-row gap-3">
              <Link href="/catalogue">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-7 h-11 text-sm font-semibold shadow-md hover:shadow-lg transition-all">
                  Browse Catalogue <ArrowRight className="ml-1.5 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/vendor">
                <Button variant="outline" className="rounded-full px-7 h-11 text-sm font-semibold border-primary/30 hover:bg-primary/5 transition-all">
                  Wholesale Inquiry
                </Button>
              </Link>
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              {["GMP Certified", "Lab Tested", "150+ SKUs", "PAN India Delivery"].map((t) => (
                <span key={t} className="text-xs bg-background border border-border rounded-full px-3 py-1 text-muted-foreground">
                  ✓ {t}
                </span>
              ))}
            </div>
          </div>

          {/* Right: desktop hero image — landscape, fills column */}
          <HeroImageDesktop />
        </div>
      </section>

      {/* ── Shop By Category ──────────────────────────────────────────────── */}
      <section className="py-14 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">
              Our Categories
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Shop By Category
            </h2>
          </div>

          {/* Circular category cards — scrollable on mobile */}
          <div className="flex items-start justify-center gap-6 md:gap-10 overflow-x-auto pb-2 [-ms-overflow-style:none] scrollbar-none [&::-webkit-scrollbar]:hidden">
            {[
              { label: "All", href: "/catalogue", count: "150+", image: "/cat-all.png" },
              ...categories.map((c) => ({ label: c.label, href: c.href, count: "30+", image: c.image })),
            ].map((cat) => (
              <Link
                key={cat.label}
                href={cat.href}
                className="group flex flex-col items-center gap-3 shrink-0"
              >
                {/* Circle image — one per category */}
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-border group-hover:border-primary transition-colors duration-200">
                  <img
                    src={cat.image}
                    alt={cat.label}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                    {cat.label}
                  </p>
                  <p className="text-xs text-muted-foreground">{cat.count} Products</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Products ─────────────────────────────────────────────── */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-1">
                Our Collection
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Featured Extracts
              </h2>
            </div>
            <Link
              href="/catalogue"
              className="hidden md:inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="group rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/30 hover:shadow-md transition-all duration-200 flex flex-col"
              >
                {/* Product image placeholder */}
                <ImagePlaceholder
                  className="w-full aspect-square"
                  label={product.name}
                />

                <div className="p-4 flex flex-col flex-1 gap-3">
                  {/* Category badge */}
                  <span className="w-fit text-xs rounded-full bg-secondary text-secondary-foreground px-2.5 py-0.5 font-medium">
                    {product.category}
                  </span>

                  <div>
                    <h3 className="font-semibold text-foreground text-sm leading-snug group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs text-muted-foreground italic mt-0.5">
                      {product.scientific}
                    </p>
                  </div>

                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-xs font-semibold text-primary bg-primary/10 rounded px-2 py-0.5">
                      {product.potency}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Star className="h-3 w-3 fill-primary text-primary" />
                      {product.rating}
                    </div>
                  </div>

                  <Button
                    variant="secondary"
                    className="w-full mt-1 rounded-full text-xs h-8 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  >
                    View Details
                  </Button>
                </div>
              </Link>
            ))}
          </div>

          {/* Mobile view all */}
          <div className="mt-8 md:hidden">
            <Link href="/catalogue">
              <Button
                variant="outline"
                className="w-full rounded-full border-primary/30 text-primary hover:bg-primary/5"
              >
                View All Products <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Promo Banner ──────────────────────────────────────────────────── */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="rounded-2xl bg-card border border-border overflow-hidden flex flex-col md:flex-row">
            {/* Text side */}
            <div className="flex-1 p-8 md:p-12 flex flex-col justify-center gap-5">
              <span className="w-fit rounded-full bg-primary text-primary-foreground px-4 py-1.5 text-sm font-semibold">
                GET –20% OFF
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
                Your First Purchase
              </h2>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-sm">
                Discover our natural, eco-friendly herbal products and enjoy
                exclusive savings. Sign up for a greener, healthier lifestyle.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/catalogue">
                  <Button className="w-full sm:w-auto rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-6 h-10 font-semibold shadow-sm hover:shadow-md transition-all">
                    Shop Products
                  </Button>
                </Link>
              </div>
            </div>

            {/* Image side */}
            <div className="flex-1 min-h-[220px] md:min-h-0">
              <ImagePlaceholder
                className="w-full h-full min-h-[220px]"
                label="Promo Image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ─────────────────────────────────────────────────── */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">
              Why Choose Us
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Blending the healing wisdom of traditional herbalism
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto text-sm md:text-base">
              With modern values of sustainability, skin-friendly care, and
              emotional well-being.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {whyChoose.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="rounded-2xl border border-border bg-card p-6 flex flex-col gap-4 hover:border-primary/30 hover:shadow-sm transition-all"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1.5">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Strip ─────────────────────────────────────────────────────── */}
      <section className="py-14 bg-primary">
        <div className="container mx-auto px-4 text-center space-y-5">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground">
            Ready to Source Premium Herbal Extracts?
          </h2>
          <p className="text-primary-foreground/80 max-w-xl mx-auto text-sm md:text-base">
            Join hundreds of manufacturers and brands who trust Nature Nook for
            consistent quality and reliable supply.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/catalogue">
              <Button className="w-full sm:w-auto bg-background text-primary hover:bg-background/90 rounded-full px-8 h-11 font-semibold shadow-md hover:shadow-lg transition-all">
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
