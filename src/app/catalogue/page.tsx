import Link from "next/link";
import Image from "next/image";
import { Filter, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function CataloguePage(props: {
  searchParams: Promise<{ category?: string; form?: string; q?: string }>;
}) {
  const searchParams = await props.searchParams;
  const category = searchParams.category || "all";
  const form = searchParams.form || "all";
  const query = searchParams.q;

  const where: any = {};
  if (category !== "all") where.category = category;
  if (form !== "all") where.form = form;
  if (query) {
    where.OR = [
      { name: { contains: query } },
      { scientificName: { contains: query } },
    ];
  }

  const products = await prisma.product.findMany({
    where,
    orderBy: { name: "asc" },
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-10 md:py-14">
        
        {/* Header */}
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Product Catalogue</h1>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl">
            Browse our complete range of premium herbal extracts and powders. 
            All capsules are concentrated extracts, while everything else is in pure powder form.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Filters Sidebar */}
          <aside className="w-full lg:w-64 shrink-0 space-y-8">
            <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-5 pb-4 border-b border-border">
                <Filter className="w-5 h-5 text-primary" />
                <h2 className="font-bold text-foreground">Filters</h2>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">Category</h3>
                <div className="space-y-2.5">
                  {["all", "Ayurvedic", "Cosmetic", "Nutraceutical", "Homecare"].map((c) => {
                    const isActive = category === c;
                    const url = new URLSearchParams(searchParams as any);
                    url.set("category", c);
                    return (
                      <Link 
                        key={c} 
                        href={`/catalogue?${url.toString()}`}
                        className={`block text-sm transition-colors ${isActive ? "text-primary font-bold" : "text-muted-foreground hover:text-foreground"}`}
                      >
                        {c === "all" ? "All Categories" : c}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Form Filter */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">Product Form</h3>
                <div className="space-y-2.5">
                  {[
                    { val: "all", label: "All Forms" }, 
                    { val: "CAPSULE_EXTRACT", label: "Capsules (Extracts)" }, 
                    { val: "POWDER", label: "Powders" }
                  ].map((f) => {
                    const isActive = form === f.val;
                    const url = new URLSearchParams(searchParams as any);
                    url.set("form", f.val);
                    return (
                      <Link 
                        key={f.val} 
                        href={`/catalogue?${url.toString()}`}
                        className={`block text-sm transition-colors ${isActive ? "text-primary font-bold" : "text-muted-foreground hover:text-foreground"}`}
                      >
                        {f.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1 w-full">
            
            {/* Active Filters Summary */}
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{products.length}</span> products
                {query && <span> for &quot;<span className="text-foreground font-medium">{query}</span>&quot;</span>}
              </p>
              
              {(category !== "all" || form !== "all" || query) && (
                <Link href="/catalogue" className="text-xs font-semibold text-primary hover:underline">
                  Clear All Filters
                </Link>
              )}
            </div>

            {products.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="group rounded-xl border border-border bg-card overflow-hidden hover:border-primary/30 hover:shadow-md transition-all duration-200 flex flex-col"
                  >
                    <div className="relative overflow-hidden group/img aspect-square bg-secondary/40 flex items-center justify-center">
                      {product.imageUrl ? (
                        <Image 
                          src={product.imageUrl} 
                          alt={product.name} 
                          fill
                          className="object-cover group-hover/img:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <span className="text-xs text-muted-foreground">No Image</span>
                      )}
                      
                      <span className="absolute top-2 left-2 text-[10px] md:text-xs rounded-full bg-background/90 border border-border px-2 py-0.5 font-medium text-foreground/70">
                        {product.category}
                      </span>
                    </div>

                    <div className="p-4 flex flex-col flex-1 gap-2">
                      <div>
                        <h3 className="font-semibold text-foreground text-sm md:text-base leading-snug group-hover:text-primary transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-[11px] md:text-xs text-muted-foreground italic mt-0.5">
                          {product.scientificName || "N/A"}
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5 mt-1">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <Star key={i} className={`h-3 w-3 ${i <= 4 ? "fill-primary text-primary" : "fill-muted text-muted"}`} />
                          ))}
                        </div>
                        <span className="text-[10px] text-muted-foreground">(42)</span>
                      </div>

                      <div className="mt-auto pt-2">
                        {product.potency && (
                          <span className="inline-block text-[10px] md:text-xs font-semibold text-primary bg-primary/10 rounded px-2 py-0.5 mb-2.5">
                            {product.potency}
                          </span>
                        )}
                        <div className="flex items-center justify-between mb-3">
                          <p className="font-bold text-foreground">₹{product.price?.toLocaleString() || "TBA"}</p>
                          <p className="text-[10px] text-muted-foreground uppercase">{product.form === "CAPSULE_EXTRACT" ? "Extract" : "Powder"}</p>
                        </div>
                        <Link href={`/product/${product.id}`} className="block">
                          <Button className="w-full h-9 text-xs md:text-sm rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all">
                            <ShoppingCart className="h-3.5 w-3.5 mr-1.5" />
                            Add to Cart
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-card rounded-2xl border border-border">
                <div className="w-16 h-16 bg-secondary/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Filter className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">No products found</h3>
                <p className="text-muted-foreground">Try adjusting your filters or search query.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
