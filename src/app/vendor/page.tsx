import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Leaf, Clock, ArrowLeft, MailCheck } from "lucide-react";

export const metadata = {
  title: "Wholesale Portal (Coming Soon) | Nature Nook",
  description: "Our dedicated B2B and Wholesale portal is currently under construction.",
};

export default function VendorComingSoonPage() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-background p-6">
      
      <div className="max-w-xl w-full text-center space-y-6">
        {/* Icon & Badge */}
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary relative overflow-hidden group">
            <Leaf className="w-10 h-10 absolute transition-transform duration-500 group-hover:-translate-y-12" />
            <Clock className="w-10 h-10 absolute translate-y-12 transition-transform duration-500 group-hover:translate-y-0" />
          </div>
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
            Under Construction
          </span>
        </div>

        {/* Text content */}
        <div className="space-y-3">
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
            Wholesale Portal
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We are building a dedicated B2B portal to offer seamless bulk ordering, 
            exclusive volume pricing, and automated GSTIN tax invoicing. 
          </p>
        </div>

        {/* CTA / Alternative actions */}
        <div className="bg-card border border-border rounded-2xl p-6 md:p-8 mt-8 shadow-sm text-left">
          <h3 className="font-bold text-foreground text-lg mb-2 flex items-center gap-2">
            <MailCheck className="w-5 h-5 text-primary" />
            Need to order in bulk right now?
          </h3>
          <p className="text-sm text-muted-foreground mb-6">
            While we put the finishing touches on this portal, our team is still ready 
            to process your wholesale orders manually. Contact us directly for a quote.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/find-us" className="flex-1">
              <Button className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl">
                Contact Sales Team
              </Button>
            </Link>
            <Link href="/catalogue" className="flex-1">
              <Button variant="outline" className="w-full h-11 font-semibold rounded-xl border-border hover:bg-secondary/50">
                Browse Retail Catalogue
              </Button>
            </Link>
          </div>
        </div>

        {/* Back link */}
        <div className="pt-6">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
