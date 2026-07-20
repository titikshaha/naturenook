export const metadata = {
  title: "Terms of Service | Nature Nook",
  description: "Terms and Conditions of Service for Nature Nook",
};

export default function TermsOfServicePage() {
  const lastUpdated = "July 20, 2026";
  const email = "sales@naturenook.co.in";
  const jurisdiction = "Indore, Madhya Pradesh";

  return (
    <div className="min-h-screen bg-background py-12 md:py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Terms of Service</h1>
        <p className="text-muted-foreground mb-10">Last Updated: {lastUpdated}</p>

        <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none space-y-8">
          
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">1. Agreement to Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              These Terms of Service constitute a legally binding agreement made between you and Nature Nook concerning your access to and use of our website as well as any other media form, channel, mobile website, or mobile application related, linked, or otherwise connected thereto. You agree that by accessing the site, you have read, understood, and agreed to be bound by all of these Terms of Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">2. Products and Pricing</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              We make every effort to display as accurately as possible the colors, features, specifications, and details of the products available on the site. However, we do not guarantee that the colors, features, specifications, and details of the products will be accurate, complete, reliable, current, or free of other errors.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              All pricing is subject to change without notice. Wholesale and bulk pricing tiers are available to approved B2B accounts at our sole discretion. We reserve the right to refuse or cancel orders placed for products listed at the incorrect price.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">3. B2B / Wholesale Accounts</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you apply for a vendor/wholesale account, you must provide accurate corporate information, including a valid GSTIN where applicable. We reserve the right to verify this information before granting wholesale access. B2B purchases may be subject to different return policies and payment terms (such as Purchase Orders) which will be communicated during the onboarding process.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">4. Return and Refund Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              Please review our Return Policy posted on the site prior to making any purchases. 
              Due to the nature of our products (herbal powders, extracts, and nutraceuticals), returns are typically only accepted for unsealed, defective, or incorrect items within 7 days of delivery.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">5. Governing Law and Jurisdiction</h2>
            <p className="text-muted-foreground leading-relaxed">
              These terms shall be governed by and defined following the laws of India. Nature Nook and yourself irrevocably consent that the courts of <strong>{jurisdiction}</strong> shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">6. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at: <strong>{email}</strong>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
