"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function FindUsPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call for enquiry submission
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background py-12 md:py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">Find Us</p>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Get in Touch</h1>
          <p className="text-muted-foreground">
            Whether you are looking for bulk wholesale powders, custom formulations, or have a question about an existing order, our team in Indore is ready to assist you.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10 items-start">
          
          {/* Contact Details Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-secondary/30 rounded-2xl border border-border p-8 space-y-8">
              <div>
                <h3 className="text-xl font-bold text-foreground mb-6">Contact Details</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Headquarters</p>
                      <p className="text-muted-foreground text-sm mt-1 leading-relaxed">
                        Mark Square, Bicholi Road<br />
                        Indore, Madhya Pradesh<br />
                        India
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Phone</p>
                      <p className="text-muted-foreground text-sm mt-1">+91 74891 74084</p>
                      <p className="text-muted-foreground text-sm">Mon-Sat, 10am to 6pm IST</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Email</p>
                      <p className="text-muted-foreground text-sm mt-1">sales@naturenook.in</p>
                      <p className="text-muted-foreground text-sm">support@naturenook.in</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-primary text-primary-foreground rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-3">B2B & Wholesale</h3>
              <p className="text-primary-foreground/80 text-sm leading-relaxed mb-5">
                Looking to order powders in bulk (10kg+)? We offer specialized pricing, COA documentation, and fast-track shipping for manufacturers.
              </p>
              <Link href="/vendor" className="block w-full">
                <Button className="w-full bg-background text-primary hover:bg-background/90 font-semibold rounded-full">
                  Apply for Vendor Account
                </Button>
              </Link>
            </div>
          </div>

          {/* Enquiry Form Column */}
          <div className="lg:col-span-3">
            <div className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm">
              <h2 className="text-2xl font-bold text-foreground mb-6">Send an Enquiry</h2>
              
              {success ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-green-800 mb-2">Message Sent!</h3>
                  <p className="text-green-700">Thank you for reaching out. Our team will get back to you within 24 business hours.</p>
                  <Button variant="outline" className="mt-6" onClick={() => setSuccess(false)}>Send Another Message</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Full Name *</label>
                      <input required type="text" className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Company Name</label>
                      <input type="text" className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="Optional" />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Email Address *</label>
                      <input required type="email" className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="john@example.com" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Phone Number</label>
                      <input type="tel" className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="+91 ..." />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Enquiry Type *</label>
                    <select required className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
                      <option value="" disabled selected>Select an option...</option>
                      <option value="wholesale">Bulk / Wholesale Pricing</option>
                      <option value="product">Product Details & Specs (COA)</option>
                      <option value="order">Order Tracking / Support</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Message *</label>
                    <textarea required rows={5} className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" placeholder="How can we help you?"></textarea>
                  </div>

                  <Button disabled={loading} type="submit" className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg text-base">
                    {loading ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
