import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
      <h1 className="text-5xl font-bold mb-6 text-primary">Welcome to Nature Nook</h1>
      <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
        Discover our premium collection of 150+ herbal extracts for Ayurvedic medicines, cosmetics, and more.
      </p>
      <div className="flex gap-4">
        <Link href="/catalogue" className="px-6 py-3 bg-primary text-primary-foreground rounded-md font-semibold hover:bg-primary/90 transition-colors">
          Browse Catalogue
        </Link>
        <Link href="/vendor" className="px-6 py-3 bg-secondary text-secondary-foreground rounded-md font-semibold hover:bg-secondary/80 transition-colors border border-border">
          Vendor Portal
        </Link>
      </div>
    </div>
  );
}
