export const metadata = {
  title: "Privacy Policy | Nature Nook",
  description: "Privacy Policy for Nature Nook",
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "July 20, 2026";
  const email = "sales@naturenook.co.in";

  return (
    <div className="min-h-screen bg-background py-12 md:py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Privacy Policy</h1>
        <p className="text-muted-foreground mb-10">Last Updated: {lastUpdated}</p>

        <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none space-y-8">
          
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">1. Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              Welcome to Nature Nook. We are committed to protecting your personal information and your right to privacy. 
              If you have any questions or concerns about this privacy notice or our practices with regard to your personal information, 
              please contact us at <strong>{email}</strong>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">2. Information We Collect</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              We collect personal information that you voluntarily provide to us when you register on the website, express an interest 
              in obtaining information about us or our products, or when you contact us. This includes:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li><strong>Personal Info:</strong> Name, email address, phone numbers, and billing/shipping addresses.</li>
              <li><strong>Business Info (for B2B):</strong> Company name and GSTIN for tax invoice purposes.</li>
              <li><strong>Payment Data:</strong> We may collect data necessary to process your payment if you make purchases. Payment data is securely handled by our payment processors.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">3. How We Use Your Information</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              We process your information for purposes based on legitimate business interests, the fulfillment of our contract with you, compliance with our legal obligations, and/or your consent. Specifically, we use your information to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Fulfill and manage your orders, payments, returns, and exchanges.</li>
              <li>Send you administrative information, such as order confirmations and shipping updates.</li>
              <li>Respond to your inquiries and offer support to you.</li>
              <li>Facilitate account creation and logon process.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">4. Will Your Information Be Shared?</h2>
            <p className="text-muted-foreground leading-relaxed">
              We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. 
              We may share your data with third-party vendors, service providers, contractors, or agents who perform services for us (e.g., shipping partners, payment gateways, and email service providers).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">5. Data Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. 
              However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">6. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have questions or comments about this notice, you may email us at <strong>{email}</strong> or contact us via our Contact Page.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
