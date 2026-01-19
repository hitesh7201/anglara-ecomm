"use client";

import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    
    const searchTerm = query.toLowerCase();
    return products.filter(product => 
      product.name.toLowerCase().includes(searchTerm) ||
      (product.description && product.description.toLowerCase().includes(searchTerm))
    );
  }, [query]);

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