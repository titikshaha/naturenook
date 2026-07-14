"use client";

import Link from "next/link";
import { ShoppingCart, Leaf, Menu, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const navLinks = [
  { label: "Products", href: "/catalogue" },
  { label: "Wholesale", href: "/vendor" },
  { label: "Find Us", href: "#" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Leaf className="h-5 w-5 text-primary" />
          <span className="font-bold text-lg text-primary tracking-tight">Nature Nook</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-foreground/70 transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="hidden md:inline-flex text-foreground/70 hover:text-primary">
            <Search className="h-5 w-5" />
          </Button>
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative text-foreground/70 hover:text-primary">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary" />
            </Button>
          </Link>
          <Link href="/account">
            <Button className="hidden md:inline-flex bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-5 text-sm h-9">
              Get Started
            </Button>
          </Link>
          {/* Mobile hamburger */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-foreground/70"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="md:hidden border-t border-border bg-background px-4 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-base font-medium text-foreground/80 hover:text-primary transition-colors py-1"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/account" onClick={() => setMenuOpen(false)}>
            <Button className="mt-2 w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full">
              Get Started
            </Button>
          </Link>
        </div>
      )}
    </header>
  );
}
