"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Menu, X, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const navLinks = [
  { label: "Products", href: "/catalogue" },
  { label: "Wholesale", href: "/vendor" },
  { label: "About", href: "#" },
  { label: "Find Us", href: "#" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* ── Announcement bar ── */}
      <div className="bg-primary text-primary-foreground text-center text-xs py-2 px-4 font-medium tracking-wide">
        Free shipping on orders above ₹999 &nbsp;·&nbsp; GMP Certified &nbsp;·&nbsp; 150+ Premium Extracts
      </div>

      {/* ── Main navbar ── */}
      <div className="bg-background border-b border-border">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 gap-4">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image src="/logo.png" alt="Nature Nook Logo" width={32} height={32} className="h-8 w-8" />
          <span className="font-bold text-2xl text-primary tracking-tight">Nature Nook</span>
          </Link>

          {/* Desktop Nav — centered */}
          <nav className="hidden md:flex items-center gap-8 text-lg font-medium">
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
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="hidden md:inline-flex text-foreground/70 hover:text-primary" aria-label="Search">
              <Search className="h-5 w-5" />
            </Button>
            <Link href="/account">
              <Button variant="ghost" size="icon" className="hidden md:inline-flex text-foreground/70 hover:text-primary" aria-label="Account">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative text-foreground/70 hover:text-primary" aria-label="Cart">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary" />
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
          <div className="md:hidden border-t border-border bg-background px-4 py-5 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-base font-medium text-foreground/80 hover:text-primary transition-colors py-2.5 border-b border-border/50 last:border-0"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-3 pt-4">
              <Link href="/account" onClick={() => setMenuOpen(false)} className="flex-1">
                <Button variant="outline" className="w-full rounded-full border-primary/30 text-primary">
                  My Account
                </Button>
              </Link>
              <Link href="/cart" onClick={() => setMenuOpen(false)} className="flex-1">
                <Button className="w-full rounded-full bg-primary text-primary-foreground">
                  View Cart
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
