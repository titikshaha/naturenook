"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDebounce } from "use-debounce";

export function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 300);
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (debouncedQuery.trim() === "") {
      setResults([]);
      return;
    }

    const fetchResults = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(debouncedQuery)}`);
        const data = await res.json();
        setResults(data.results || []);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [debouncedQuery]);

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
            onKeyDown={(e) => {
              if (e.key === "Enter" && query.trim()) {
                setIsOpen(false);
                router.push(`/catalogue?q=${encodeURIComponent(query)}`);
              }
            }}
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
                  <button
                    key={item.id}
                    onClick={() => { 
                      setIsOpen(false); 
                      setQuery(""); 
                      router.push(`/product/${item.id}`); 
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-secondary/40 transition-colors"
                  >
                    <p className="text-sm font-semibold text-foreground">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.scientificName || "Product"} • {item.category}</p>
                  </button>
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
