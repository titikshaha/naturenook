"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import Fuse from "fuse.js";
import Link from "next/link";

// Temporary mock catalogue data for search
const mockCatalogue = [
  { id: "1", name: "Ashwagandha powder", category: "Ayurvedic", scientific: "Withania somnifera" },
  { id: "2", name: "Shatavari powder", category: "Ayurvedic", scientific: "Asparagus racemosus" },
  { id: "3", name: "Gymnema powder (Gudmar)", category: "Nutraceutical", scientific: "Gymnema sylvestre" },
  { id: "4", name: "Spirulina powder", category: "Nutraceutical", scientific: "Arthrospira platensis" },
  { id: "5", name: "Brahmi powder", category: "Ayurvedic", scientific: "Bacopa monnieri" },
  { id: "6", name: "Moringa powder", category: "Nutraceutical", scientific: "Moringa oleifera" },
  { id: "7", name: "Bhringraj powder", category: "Cosmetic", scientific: "Eclipta prostrata" },
  { id: "8", name: "Triphala powder", category: "Ayurvedic", scientific: "Three-fruit blend" },
  { id: "9", name: "Neem powder", category: "Cosmetic", scientific: "Azadirachta indica" },
  { id: "10", name: "Aloe Vera powder", category: "Cosmetic", scientific: "Aloe barbadensis" },
];

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Setup Fuse.js
  const fuse = new Fuse(mockCatalogue, {
    keys: ["name", "scientific", "category"],
    threshold: 0.3, // Lower is more exact, higher is more fuzzy
  });

  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
    } else {
      const searchResults = fuse.search(query).map((res) => res.item);
      setResults(searchResults);
    }
  }, [query]);

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative flex items-center">
      {isOpen ? (
        <div className="absolute right-4 md:right-0 top-1/2 -translate-y-1/2 flex items-center w-[220px] md:w-[300px] bg-background border border-border rounded-full px-3 py-1.5 shadow-md z-50">
          <Search className="h-4 w-4 text-muted-foreground mr-2 shrink-0" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search powders..."
            className="w-full bg-transparent text-sm focus:outline-none text-foreground"
          />
          <button onClick={() => { setIsOpen(false); setQuery(""); }} className="text-muted-foreground hover:text-foreground shrink-0 ml-2">
            <X className="h-4 w-4" />
          </button>

          {/* Results Dropdown */}
          {query.trim().length > 0 && (
            <div className="absolute top-full right-0 mt-2 w-[280px] md:w-full bg-card border border-border rounded-xl shadow-lg overflow-hidden py-2 max-h-[300px] overflow-y-auto">
              {results.length > 0 ? (
                results.map((item) => (
                  <Link
                    key={item.id}
                    href={`/product/${item.id}`}
                    onClick={() => { setIsOpen(false); setQuery(""); }}
                    className="block px-4 py-2 hover:bg-secondary/40 transition-colors"
                  >
                    <p className="text-sm font-semibold text-foreground">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.scientific} • {item.category}</p>
                  </Link>
                ))
              ) : (
                <div className="px-4 py-3 text-sm text-muted-foreground text-center">
                  No products found.
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-md text-foreground/70 hover:text-primary transition-colors"
          aria-label="Search"
        >
          <Search className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
