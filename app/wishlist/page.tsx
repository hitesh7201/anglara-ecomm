"use client";

import Link from "next/link";
import { useWishlist } from "@/context/WishlistContext";
import ProductCard from "@/components/ProductCard";
import { Heart, ArrowRight } from "lucide-react";

export default function WishlistPage() {
  const { wishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <div className="mb-8 flex justify-center">
          <div className="rounded-full bg-red-50 p-10 ring-8 ring-red-50/50">
            <Heart className="h-16 w-16 text-red-300" />
          </div>
        </div>
        <h1 className="text-4xl font-black text-brand-navy mb-4 tracking-tighter">WISHLIST IS EMPTY</h1>
        <p className="text-gray-500 mb-10 max-w-md mx-auto">
          Save your favorite items here to check them out later.
        </p>
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 bg-brand-teal text-white px-8 py-4 rounded-full font-bold hover:bg-brand-navy transition-all transform hover:scale-105"
        >
          START BROWSING <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-black text-brand-navy mb-12 uppercase tracking-tighter">Your Wishlist</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {wishlist.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
