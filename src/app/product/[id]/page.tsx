import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star, ShieldCheck, Truck, ArrowLeft, Leaf, CheckCircle2 } from "lucide-react";

export default async function ProductPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const product = await prisma.product.findUnique({
    where: { id: params.id },
  });

  if (!product) {
    notFound();
  }

  // Use a nice placeholder if image is missing
  const hasImage = Boolean(product.imageUrl);

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb / Back Navigation */}
      <div className="border-b border-border bg-secondary/10">
        <div className="container mx-auto px-4 py-3 flex items-center text-sm text-muted-foreground">
          <Link href="/catalogue" className="hover:text-primary transition-colors flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" />
            Back to Catalogue
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground font-medium truncate max-w-[200px] md:max-w-md">
            {product.name}
          </span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start">
          
          {/* Left Column - Image Gallery */}
          <div className="space-y-4 sticky top-24">
            <div className="aspect-square w-full rounded-2xl border border-border bg-card overflow-hidden relative flex items-center justify-center">
              {hasImage ? (
                <Image
                  src={product.imageUrl!}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-muted-foreground/50">
                  <Leaf className="w-24 h-24 mb-4" />
                  <p className="font-medium text-lg">Image Coming Soon</p>
                </div>
              )}
              <span className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm border border-border px-3 py-1 rounded-full text-xs font-bold text-foreground/80 uppercase tracking-wider">
                {product.category}
              </span>
            </div>
            
            {/* Thumbnail placeholders for future */}
            <div className="grid grid-cols-4 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={`aspect-square rounded-xl border flex items-center justify-center bg-card cursor-not-allowed opacity-60 ${i === 1 ? 'border-primary' : 'border-border'}`}>
                  <Leaf className="w-6 h-6 text-muted-foreground/30" />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Product Details */}
          <div className="flex flex-col">
            <div className="mb-6">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-2">
                {product.name}
              </h1>
              {product.scientificName && (
                <p className="text-lg text-muted-foreground italic font-medium">
                  {product.scientificName}
                </p>
              )}
            </div>

            {/* Ratings & Form */}
            <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-border">
              <div className="flex items-center gap-1.5 bg-primary/10 px-3 py-1.5 rounded-full">
                <Star className="w-4 h-4 fill-primary text-primary" />
                <span className="text-sm font-bold text-primary">4.8</span>
                <span className="text-sm text-primary/70">(124 Reviews)</span>
              </div>
              <div className="h-4 w-px bg-border hidden sm:block" />
              <span className="text-sm font-bold text-foreground bg-secondary px-3 py-1.5 rounded-full uppercase tracking-wider">
                {product.form === "CAPSULE_EXTRACT" ? "Extract / Capsule" : "Powder"}
              </span>
              {product.potency && (
                <span className="text-sm font-bold text-primary-foreground bg-primary px-3 py-1.5 rounded-full uppercase tracking-wider">
                  {product.potency}
                </span>
              )}
            </div>

            {/* Price & Action */}
            <div className="mb-8 p-6 rounded-2xl border border-primary/20 bg-primary/5">
              <div className="mb-4">
                <p className="text-sm text-muted-foreground font-medium mb-1">Wholesale Price</p>
                <div className="flex items-end gap-3">
                  <span className="text-4xl font-black text-foreground">
                    ₹{product.price?.toLocaleString() || "TBA"}
                  </span>
                  <span className="text-sm text-muted-foreground mb-1.5">/ unit</span>
                </div>
                <p className="text-xs text-primary font-semibold mt-2 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> In Stock & Ready to Ship
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button className="flex-1 h-12 text-base font-bold rounded-xl shadow-lg hover:shadow-primary/25 transition-all">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                <Link href="/find-us" className="flex-1">
                  <Button variant="outline" className="w-full h-12 text-base font-bold rounded-xl border-primary text-primary hover:bg-primary/10">
                    Bulk Enquiry
                  </Button>
                </Link>
              </div>
            </div>

            {/* Value Props */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border">
                <ShieldCheck className="w-6 h-6 text-primary shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-foreground">GMP Certified</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">Strict quality control & lab tested</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border">
                <Truck className="w-6 h-6 text-primary shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-foreground">Fast Dispatch</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">Ships within 24-48 hours</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-xl font-bold text-foreground mb-4">About this Product</h3>
              <div className="prose prose-sm md:prose-base prose-neutral max-w-none text-muted-foreground leading-relaxed">
                {product.description ? (
                  <p>{product.description}</p>
                ) : (
                  <p>A premium quality {product.category.toLowerCase()} product. Sourced responsibly and standardized for consistent potency and efficacy. Detailed documentation and Certificate of Analysis (COA) available upon request.</p>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
