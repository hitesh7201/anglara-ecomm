"use client";

import { Product, productApi } from "@/data/products";
import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { use, useState, useEffect } from "react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function CategoryPage({ params }: PageProps) {
  const { slug } = use(params);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const allProducts = await productApi.getAllProducts();
      const filteredProducts = allProducts.filter((p) => p.category === slug);
      setProducts(filteredProducts);
      setLoading(false);
    };

    fetchProducts();
  }, [slug]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-24">
        <div className="h-12 bg-gray-200 rounded w-48 mb-12 animate-pulse"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white p-4">
              <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-200 animate-pulse"></div>
              <div className="mt-5 flex flex-1 flex-col">
                <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="h-6 bg-gray-200 rounded animate-pulse w-16"></div>
                  <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-4xl font-black text-brand-navy mb-8">Category not found</h1>
        <p className="text-gray-500">The category "{slug}" does not exist or has no products.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-4xl font-black text-brand-navy mb-12 uppercase tracking-tighter">
        {slug.replace("-", " ")}
      </h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
