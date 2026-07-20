"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, X, Plus, Minus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCartStore } from "@/store/useCartStore";

export function CartDrawer() {
  const [mounted, setMounted] = useState(false);
  const cart = useCartStore();

  // Prevent hydration errors by only rendering the cart data after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="relative">
        <ShoppingCart className="h-5 w-5" />
      </Button>
    );
  }

  const itemCount = cart.getCartCount();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      {/* @ts-expect-error Radix UI type mismatch for asChild */}
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center border-2 border-background">
              {itemCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      
      <SheetContent className="w-full sm:max-w-lg flex flex-col p-0">
        <SheetHeader className="px-6 py-4 border-b border-border text-left">
          <SheetTitle className="flex items-center gap-2 text-xl font-bold">
            <ShoppingCart className="h-5 w-5 text-primary" />
            Your Cart
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-5">
          {cart.items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center opacity-70">
              <ShoppingCart className="h-16 w-16 mb-4 text-muted" />
              <p className="text-lg font-semibold text-foreground">Your cart is empty</p>
              <p className="text-sm text-muted-foreground mt-1">Looks like you haven't added anything yet.</p>
              <Link href="/catalogue" onClick={() => setIsOpen(false)}>
                <Button className="mt-6 rounded-full px-8 w-full">
                  Start Shopping
                </Button>
              </Link>
            </div>
          ) : (
            cart.items.map((item) => (
              <div key={item.id} className="flex gap-4 p-4 rounded-xl border border-border bg-secondary/10">
                {/* Image */}
                <div className="h-20 w-20 rounded-md bg-secondary overflow-hidden shrink-0 relative border border-border/50">
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      sizes="80px"
                      className="object-contain"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-secondary/50">
                      <ShoppingCart className="h-6 w-6 text-muted-foreground/50" />
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-semibold text-sm line-clamp-2 leading-snug">{item.name}</h4>
                    <p className="text-primary font-semibold text-sm mt-1">
                      ₹{item.price ? item.price.toLocaleString() : "TBD"}
                    </p>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-3 border border-border rounded-full px-2 py-1 bg-background">
                      <button 
                        onClick={() => cart.updateQuantity(item.id, item.quantity - 1)}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="text-xs font-semibold w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => cart.updateQuantity(item.id, item.quantity + 1)}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <button 
                      onClick={() => cart.removeItem(item.id)}
                      className="text-red-500 hover:text-red-600 transition-colors bg-red-500/10 p-1.5 rounded-full"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.items.length > 0 && (
          <div className="p-6 border-t border-border bg-card">
            <div className="flex justify-between items-center mb-4">
              <span className="text-muted-foreground font-medium">Subtotal</span>
              <span className="text-xl font-bold text-foreground">₹{cart.getCartTotal().toLocaleString()}</span>
            </div>
            <p className="text-xs text-muted-foreground mb-6 text-center">Shipping and taxes calculated at checkout.</p>
            <Link href="/checkout" onClick={() => setIsOpen(false)}>
              <Button className="w-full h-12 rounded-xl text-base font-semibold shadow-md bg-primary hover:bg-primary/90 transition-all">
                Proceed to Checkout
              </Button>
            </Link>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
