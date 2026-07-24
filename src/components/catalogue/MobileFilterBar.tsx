"use client";

import { Filter } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export function MobileFilterBar({
  category,
  form,
}: {
  category: string;
  form: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const navigate = (key: string, val: string) => {
    const u = new URLSearchParams(searchParams.toString());
    u.set(key, val);
    router.push(`/catalogue?${u.toString()}`);
  };

  return (
    <div className="flex lg:hidden items-center gap-2 mb-4">
      <Filter className="w-4 h-4 text-primary shrink-0" />
      <select
        id="mobile-category-filter"
        value={category}
        onChange={(e) => navigate("category", e.target.value)}
        className="flex-1 text-sm h-10 rounded-lg border border-border bg-background px-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
      >
        <option value="all">All Categories</option>
        <option value="Ayurvedic">Ayurvedic</option>
        <option value="Cosmetic">Cosmetic</option>
        <option value="Nutraceutical">Nutraceutical</option>
        <option value="Homecare">Homecare</option>
      </select>
      <select
        id="mobile-form-filter"
        value={form}
        onChange={(e) => navigate("form", e.target.value)}
        className="flex-1 text-sm h-10 rounded-lg border border-border bg-background px-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
      >
        <option value="all">All Forms</option>
        <option value="CAPSULE_EXTRACT">Capsules</option>
        <option value="POWDER">Powders</option>
      </select>
    </div>
  );
}
