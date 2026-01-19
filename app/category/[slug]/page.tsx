import { products } from "@/data/products";
import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const filteredProducts = products.filter((p) => p.category === slug);

  if (filteredProducts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-4xl font-black text-brand-navy mb-8">Category not found</h1>
        <p className="text-gray-500">The category "{slug}" does not exist.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-4xl font-black text-brand-navy mb-12 uppercase tracking-tighter">
        {slug.replace("-", " ")}
      </h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
