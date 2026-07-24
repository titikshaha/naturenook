import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GoogleAnalytics } from '@next/third-parties/google';

const raleway = Raleway({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://naturenook.in"),
  title: {
    default: "Nature Nook | Premium Herbal & Ayurvedic Powders",
    template: "%s | Nature Nook",
  },
  description: "Manufacturer and distributor of 150+ premium herbal powders for Ayurvedic medicines, cosmetics, and nutraceuticals from Indore, India.",
  openGraph: {
    title: "Nature Nook | Premium Herbal & Ayurvedic Powders",
    description: "Manufacturer and distributor of 150+ premium herbal powders.",
    url: "https://naturenook.in",
    siteName: "Nature Nook",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nature Nook",
    description: "Manufacturer and distributor of 150+ premium herbal powders.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://naturenook.in/#organization",
      "name": "Nature Nook",
      "url": "https://naturenook.in",
      "logo": "https://naturenook.in/logo.png",
      "description": "Manufacturing and distributing 150+ premium herbal powders.",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-74891-74084",
        "contactType": "customer service",
        "email": "hello@naturenook.in",
        "areaServed": "IN"
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://naturenook.in/#website",
      "url": "https://naturenook.in",
      "name": "Nature Nook",
      "publisher": {
        "@id": "https://naturenook.in/#organization"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://naturenook.in/catalogue?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${raleway.variable} antialiased flex flex-col min-h-screen`}
      >
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <GoogleAnalytics gaId="G-75J24B9TXG" />
      </body>
    </html>
  );
}
