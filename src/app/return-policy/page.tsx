import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Return & Refund Policy | Nature Nook",
  description: "Return and Refund Policy for Nature Nook",
  alternates: {
    canonical: "https://www.naturenook.co.in/return-policy",
  },
};

export default function ReturnPolicyPage() {
  const lastUpdated = "July 24, 2026";
  const email = "sales@naturenook.co.in";

  return (
    <div className="min-h-screen bg-background py-12 md:py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Return & Refund Policy</h1>
        <p className="text-muted-foreground mb-10">Last Updated: {lastUpdated}</p>

        <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none space-y-8">
          
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">1. Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              At Nature Nook, we take pride in the quality of our premium herbal powders. Due to the nature of our products (herbal, Ayurvedic, and nutraceutical consumables), we adhere to strict hygiene and safety protocols. Please read our policy carefully before making a purchase.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">2. Returns</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Because our products are ingestible and cosmetic-grade powders, <strong>we do not accept returns for "change of mind"</strong> or if the product has been opened.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-3">
              We only accept returns under the following conditions:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>The product received is damaged, defective, or expired upon delivery.</li>
              <li>You received the wrong item.</li>
              <li>The product packaging was compromised during transit.</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-3">
              If your order meets these criteria, you must contact us within <strong>7 days</strong> of delivery with proof of purchase and photographs of the damaged/incorrect item.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">3. How to Initiate a Return</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              To request a return or replacement for a defective item, please follow these steps:
            </p>
            <ol className="list-decimal pl-6 text-muted-foreground space-y-2">
              <li>Email us at <strong>{email}</strong> within 7 days of receiving your order.</li>
              <li>Include your Order Number in the subject line.</li>
              <li>Attach clear photographs of the damaged product or incorrect item.</li>
              <li>Our support team will review your request within 2-3 business days and provide instructions for the return shipment if approved.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">4. Refunds</h2>
            <p className="text-muted-foreground leading-relaxed">
              Once your approved return is received and inspected, we will notify you of the approval or rejection of your refund. If approved, your refund will be processed, and a credit will automatically be applied to your original method of payment within <strong>5-7 business days</strong>. Note that original shipping charges are non-refundable.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">5. Order Cancellations</h2>
            <p className="text-muted-foreground leading-relaxed">
              Orders can be canceled for a full refund only if they have not yet been dispatched from our facility. Once an order is handed over to our shipping partners, it cannot be canceled. Please contact us immediately if you need to cancel your order.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">6. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about our Return and Refund Policy, please email us at <strong>{email}</strong> or call us at +91 74891 74084.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
