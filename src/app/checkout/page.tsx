"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { CheckCircle2, ChevronLeft, CreditCard, ShoppingCart, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/useCartStore";
import { createRazorpayOrder, verifyRazorpayPayment } from "@/app/actions/checkout";

export default function CheckoutPage() {
  const [mounted, setMounted] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
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
          Thank you for choosing Nature Nook. Your order has been securely recorded. You will receive an email confirmation shortly.
        </p>
        <Link href="/">
          <Button className="rounded-full px-8 h-12">Return to Home</Button>
        </Link>
      </div>
    );
  }

  const subtotal = cart.getCartTotal();
  const tax = subtotal * 0.5; // Mock 18% GST
  const total = subtotal + tax;

  const handleCheckout = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsProcessing(true);

    const formData = new FormData(e.currentTarget);
    const guestDetails = {
      name: `${formData.get("firstName")} ${formData.get("lastName")}`.trim(),
      email: formData.get("email") as string || "guest@naturenook.co.in",
      phone: formData.get("phone") as string || "",
      address: `${formData.get("address")}, ${formData.get("city")}, ${formData.get("postalCode")}`,
    };

    // 1. Create order on server
    const result = await createRazorpayOrder(total, guestDetails, cart.items);

    if (!result.success || !result.order) {
      alert(result.error || "Failed to initiate checkout.");
      setIsProcessing(false);
      return;
    }

    // 2. Initialize Razorpay options
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Use public key if needed, or rely on script
      amount: result.order.amount,
      currency: "INR",
      name: "Nature Nook",
      description: "Test Transaction",
      order_id: result.order.id, // The order_id from Razorpay
      handler: async function (response: any) {
        // 3. Verify payment on server
        const verifyResult = await verifyRazorpayPayment(
          response.razorpay_payment_id,
          response.razorpay_order_id,
          response.razorpay_signature,
          result.order!.dbOrderId
        );

        if (verifyResult.success) {
          setOrderPlaced(true);
          cart.clearCart();
          window.scrollTo(0, 0);
        } else {
          alert(verifyResult.error || "Payment verification failed.");
        }
      },
      prefill: {
        name: guestDetails.name,
        email: guestDetails.email,
        contact: guestDetails.phone,
      },
      theme: {
        color: "#16a34a",
      },
    };

    // Open Razorpay Modal
    try {
      const rzp = new (window as any).Razorpay(options);
      rzp.on("payment.failed", function (response: any) {
        alert("Payment Failed: " + response.error.description);
        setIsProcessing(false);
      });
      rzp.open();
    } catch (err) {
      alert("Razorpay SDK failed to load. Are you connected to the internet?");
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      
      <div className="container mx-auto px-4 py-10 md:py-16 max-w-6xl">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/catalogue" className="hover:text-primary transition-colors flex items-center">
            <ChevronLeft className="w-4 h-4 mr-1" /> Back to Shopping
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-foreground mb-8">Secure Checkout</h1>

        <form onSubmit={handleCheckout} className="flex flex-col lg:flex-row gap-10">
          
          {/* Left Side: Forms */}
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
                  <label className="text-xs font-semibold text-muted-foreground uppercase mb-1.5 block">First Name *</label>
                  <input name="firstName" required type="text" className="w-full h-11 rounded-lg border border-border bg-background px-3 text-sm focus:outline-primary" placeholder="Jane" />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="text-xs font-semibold text-muted-foreground uppercase mb-1.5 block">Last Name *</label>
                  <input name="lastName" required type="text" className="w-full h-11 rounded-lg border border-border bg-background px-3 text-sm focus:outline-primary" placeholder="Doe" />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="text-xs font-semibold text-muted-foreground uppercase mb-1.5 block">Email *</label>
                  <input name="email" required type="email" className="w-full h-11 rounded-lg border border-border bg-background px-3 text-sm focus:outline-primary" placeholder="jane@example.com" />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="text-xs font-semibold text-muted-foreground uppercase mb-1.5 block">Phone Number *</label>
                  <input name="phone" required type="tel" className="w-full h-11 rounded-lg border border-border bg-background px-3 text-sm focus:outline-primary" placeholder="+91 ..." />
                </div>
                <div className="col-span-2">
                  <label className="text-xs font-semibold text-muted-foreground uppercase mb-1.5 block">Address *</label>
                  <input name="address" required type="text" className="w-full h-11 rounded-lg border border-border bg-background px-3 text-sm focus:outline-primary" placeholder="123 Wellness Avenue" />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="text-xs font-semibold text-muted-foreground uppercase mb-1.5 block">City *</label>
                  <input name="city" required type="text" className="w-full h-11 rounded-lg border border-border bg-background px-3 text-sm focus:outline-primary" placeholder="Mumbai" />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="text-xs font-semibold text-muted-foreground uppercase mb-1.5 block">Postal Code *</label>
                  <input name="postalCode" required type="text" className="w-full h-11 rounded-lg border border-border bg-background px-3 text-sm focus:outline-primary" placeholder="400001" />
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
                  <span className="font-semibold text-sm">Credit / Debit Card / UPI (Razorpay)</span>
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
                  <span className="text-muted-foreground">Estimated Tax (5%)</span>
                  <span className="font-semibold">₹{tax.toLocaleString()}</span>
                </div>
                
                <div className="border-t border-border pt-4 mt-4 flex justify-between items-center">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-2xl font-black text-primary">₹{total.toLocaleString()}</span>
                </div>
              </div>

              <Button 
                type="submit"
                className="w-full h-14 mt-8 text-base font-bold rounded-xl shadow-lg hover:shadow-primary/25 transition-all"
                disabled={cart.items.length === 0 || isProcessing}
              >
                {isProcessing ? "Processing..." : "Pay Securely with Razorpay"}
              </Button>
            </div>
          </div>

        </form>
      </div>
    </>
  );
}
