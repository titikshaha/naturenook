import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { ProductGallery } from "@/components/product/ProductGallery";
import { getProductDataFromCSV } from "@/lib/csvParser";
import { ShoppingCart, Star, ShieldCheck, Truck, ArrowLeft, CheckCircle2 } from "lucide-react";

export default async function ProductPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const product = await prisma.product.findUnique({
    where: { id: params.id },
  });

  if (!product) {
    notFound();
  }

  // Fetch dynamic data from CSV for trial (images, discounts)
  const csvData = getProductDataFromCSV(product.name);
  
  // Combine all images
  let allImages = csvData?.images?.length ? csvData.images : (product.imageUrl ? [product.imageUrl] : []);

  // TEMP: Remove the second image (back cover) for all products
  // To restore the second images, simply comment out or remove the block below:
  if (allImages.length > 1) {
    allImages = [allImages[0], ...allImages.slice(2)];
  }

  // Calculate pricing
  const wholesaleMSRP = csvData?.wholesalePrice || product.price;
  const currentPrice = csvData?.discountedPrice || wholesaleMSRP;
  const discountAmount = wholesaleMSRP && currentPrice && wholesaleMSRP > currentPrice 
    ? wholesaleMSRP - currentPrice 
    : 0;
  const discountPercent = wholesaleMSRP && discountAmount > 0 
    ? Math.round((discountAmount / wholesaleMSRP) * 100) 
    : 0;

  const hash = String(product.id).split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const rating = 4.0 + (hash % 9) / 10;
  const reviews = 20 + (hash % 150);

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
            <ProductGallery images={allImages} productName={product.name} />
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
              <div className="flex items-center gap-1.5 bg-yellow-400/10 px-3 py-1.5 rounded-full">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-bold text-yellow-600">{rating.toFixed(1)}</span>
                <span className="text-sm text-yellow-600/70">({reviews} Reviews)</span>
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
              <div className="mb-5">
                <p className="text-sm text-muted-foreground font-medium mb-1">Wholesale Price</p>
                <div className="flex items-end gap-3 flex-wrap">
                  <span className="text-4xl font-black text-foreground">
                    ₹{currentPrice?.toLocaleString() || "TBA"}
                  </span>
                  {discountAmount > 0 && (
                    <>
                      <span className="text-lg text-muted-foreground line-through mb-1 font-semibold">
                        ₹{wholesaleMSRP?.toLocaleString()}
                      </span>
                      <span className="mb-1.5 px-2 py-0.5 bg-green-500/10 text-green-700 border border-green-500/20 rounded font-bold text-xs">
                        Save {discountPercent}% (₹{discountAmount})
                      </span>
                    </>
                  )}
                  <span className="text-sm text-muted-foreground mb-1.5 ml-auto">/ unit</span>
                </div>
                <p className="text-xs text-primary font-semibold mt-3 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> In Stock & Ready to Ship
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <AddToCartButton 
                  product={{
                    id: String(product.id),
                    name: String(product.name),
                    price: currentPrice || product.price || 0,
                    imageUrl: product.imageUrl,
                  }}
                  className="flex-1 h-12 text-base font-bold rounded-xl shadow-lg hover:shadow-primary/25 transition-all"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </AddToCartButton>
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
              <div className="prose prose-sm md:prose-base prose-neutral max-w-none text-muted-foreground leading-relaxed whitespace-pre-line">
                {(csvData?.fullDescription || product.description) ? (
                  <p>{csvData?.fullDescription || product.description}</p>
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
