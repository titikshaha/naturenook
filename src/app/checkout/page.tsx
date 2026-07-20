"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ChevronLeft, CreditCard, ShoppingCart, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/useCartStore";

export default function CheckoutPage() {
  const [mounted, setMounted] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const cart = useCartStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (orderPlaced) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-3">Order Placed Successfully!</h1>
        <p className="text-muted-foreground max-w-md text-center mb-8">
          Thank you for choosing Nature Nook. Your bulk enquiry/order has been securely recorded. We will contact you shortly with shipping details.
        </p>
        <Link href="/">
          <Button className="rounded-full px-8 h-12">Return to Home</Button>
        </Link>
      </div>
    );
  }

  const subtotal = cart.getCartTotal();
  const tax = subtotal * 0.18; // Mock 18% GST
  const total = subtotal + tax;

  return (
    <div className="container mx-auto px-4 py-10 md:py-16 max-w-6xl">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Link href="/catalogue" className="hover:text-primary transition-colors flex items-center">
          <ChevronLeft className="w-4 h-4 mr-1" /> Back to Shopping
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-foreground mb-8">Secure Checkout</h1>

      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* Left Side: Mock Forms */}
        <div className="flex-1 space-y-8">
          
          <div className="bg-card border border-border p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Truck className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold">Shipping Information</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 sm:col-span-1">
                <label className="text-xs font-semibold text-muted-foreground uppercase mb-1.5 block">First Name</label>
                <input type="text" className="w-full h-11 rounded-lg border border-border bg-background px-3 text-sm focus:outline-primary" placeholder="Jane" />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="text-xs font-semibold text-muted-foreground uppercase mb-1.5 block">Last Name</label>
                <input type="text" className="w-full h-11 rounded-lg border border-border bg-background px-3 text-sm focus:outline-primary" placeholder="Doe" />
              </div>
              <div className="col-span-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase mb-1.5 block">Company (Optional)</label>
                <input type="text" className="w-full h-11 rounded-lg border border-border bg-background px-3 text-sm focus:outline-primary" placeholder="Herbal Corp" />
              </div>
              <div className="col-span-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase mb-1.5 block">Address</label>
                <input type="text" className="w-full h-11 rounded-lg border border-border bg-background px-3 text-sm focus:outline-primary" placeholder="123 Wellness Avenue" />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="text-xs font-semibold text-muted-foreground uppercase mb-1.5 block">City</label>
                <input type="text" className="w-full h-11 rounded-lg border border-border bg-background px-3 text-sm focus:outline-primary" placeholder="Mumbai" />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="text-xs font-semibold text-muted-foreground uppercase mb-1.5 block">Postal Code</label>
                <input type="text" className="w-full h-11 rounded-lg border border-border bg-background px-3 text-sm focus:outline-primary" placeholder="400001" />
              </div>
            </div>
          </div>

          <div className="bg-card border border-border p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <CreditCard className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold">Payment Method</h2>
            </div>
            
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-4 border border-primary bg-primary/5 rounded-xl cursor-pointer">
                <input type="radio" name="payment" className="w-4 h-4 text-primary" defaultChecked />
                <span className="font-semibold text-sm">Credit / Debit Card</span>
              </label>
              <label className="flex items-center gap-3 p-4 border border-border rounded-xl cursor-pointer hover:bg-secondary/50 transition-colors">
                <input type="radio" name="payment" className="w-4 h-4 text-primary" />
                <span className="font-semibold text-sm">UPI / Net Banking</span>
              </label>
              <label className="flex items-center gap-3 p-4 border border-border rounded-xl cursor-pointer hover:bg-secondary/50 transition-colors">
                <input type="radio" name="payment" className="w-4 h-4 text-primary" />
                <span className="font-semibold text-sm">Purchase Order (Wholesale)</span>
              </label>
            </div>
          </div>

        </div>

        {/* Right Side: Order Summary */}
        <div className="w-full lg:w-[400px]">
          <div className="bg-secondary/20 border border-border p-6 rounded-2xl sticky top-24">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            
            <div className="flex flex-col gap-4 max-h-[300px] overflow-y-auto mb-6 pr-2">
              {cart.items.length === 0 ? (
                <p className="text-sm text-muted-foreground italic">Your cart is empty.</p>
              ) : (
                cart.items.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <div className="h-16 w-16 bg-card border border-border rounded-lg relative overflow-hidden shrink-0">
                      {item.imageUrl ? (
                        <Image src={item.imageUrl} alt={item.name} fill sizes="64px" className="object-contain" />
                      ) : (
                        <ShoppingCart className="w-6 h-6 m-auto mt-5 text-muted-foreground/50" />
                      )}
                      <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold leading-tight line-clamp-2">{item.name}</p>
                    </div>
                    <p className="text-sm font-bold">₹{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))
              )}
            </div>

            <div className="border-t border-border pt-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold">₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-green-600 font-semibold">Free</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Estimated Tax (18%)</span>
                <span className="font-semibold">₹{tax.toLocaleString()}</span>
              </div>
              
              <div className="border-t border-border pt-4 mt-4 flex justify-between items-center">
                <span className="text-lg font-bold">Total</span>
                <span className="text-2xl font-black text-primary">₹{total.toLocaleString()}</span>
              </div>
            </div>

            <Button 
              className="w-full h-14 mt-8 text-base font-bold rounded-xl shadow-lg hover:shadow-primary/25 transition-all"
              disabled={cart.items.length === 0}
              onClick={() => {
                setOrderPlaced(true);
                cart.clearCart();
                window.scrollTo(0, 0);
              }}
            >
              Place Order Securely
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}
