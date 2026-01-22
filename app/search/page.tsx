"use client";

import { Product, productApi } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { useSearchParams } from "next/navigation";
import { useMemo, useState, useEffect } from "react";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const fetchedProducts = await productApi.getAllProducts();
      setProducts(fetchedProducts);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    
    const searchTerm = query.toLowerCase();
    return products.filter(product => 
      product.name.toLowerCase().includes(searchTerm) ||
      (product.description && product.description.toLowerCase().includes(searchTerm))
    );
  }, [query, products]);

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="mb-12">
        <h1 className="text-4xl font-black text-brand-navy mb-4 uppercase tracking-tighter">
          Search Results
        </h1>
        {query && (
          <p className="text-gray-600">
            {searchResults.length > 0 
              ? `Found ${searchResults.length} result${searchResults.length === 1 ? '' : 's'} for "${query}"`
              : `No results found for "${query}"`
            }
          </p>
        )}
      </div>

      {!query.trim() ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Enter a search term to find products</p>
        </div>
      ) : loading ? (
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
      ) : searchResults.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">No products found matching your search.</p>
          <p className="text-gray-400">Try searching for different keywords or browse our categories.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {searchResults.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}