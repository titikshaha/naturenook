import Link from "next/link";
import { Leaf, Mail, MapPin, Phone } from "lucide-react";

const shopLinks = [
  { label: "All powders", href: "/catalogue" },
  { label: "Ayurvedic", href: "/catalogue?category=ayurvedic" },
  { label: "Cosmetic Grade", href: "/catalogue?category=cosmetic" },
  { label: "Nutraceutical", href: "/catalogue?category=nutraceutical" },
  { label: "Bulk / Wholesale", href: "/vendor" },
];

const supportLinks = [
  { label: "Track Order", href: "/track" },
  { label: "My Account", href: "/account" },
  { label: "Contact Us", href: "#" },
  { label: "FAQs", href: "#" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/20">
      <div className="container mx-auto py-14 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Leaf className="h-5 w-5 text-primary" />
              <span className="font-bold text-lg text-primary tracking-tight">Nature Nook</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Manufacturing and distributing 150+ premium herbal powders for
              Ayurvedic medicines, herbal cosmetics, and nutraceuticals.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold text-sm mb-4 text-foreground">Shop</h4>
            <ul className="space-y-2.5">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-sm mb-4 text-foreground">Support</h4>
            <ul className="space-y-2.5">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm mb-4 text-foreground">Find Us</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                <span>Mark Square, Bicholi Road,<br />Indore, Madhya Pradesh, India</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                <a href="tel:+91 74891 74084" className="hover:text-primary transition-colors">+91 74891 74084</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <a href="mailto:hello@naturenook.in" className="hover:text-primary transition-colors">hello@naturenook.in</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Nature Nook. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
