export default function ProductPage({ params }: { params: { slug: string } }) {
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-primary">Product Details</h1>
      <p className="text-muted-foreground">Details for product: {params.slug}</p>
    </div>
  );
}
