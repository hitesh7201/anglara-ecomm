"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Heart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);

  const toggleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white p-4 transition-all hover:shadow-xl">
      {/* Wishlist Button */}
      <button 
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleWishlist();
        }}
        className={`absolute top-4 right-4 z-10 p-2 rounded-full transition-all ${
          isWishlisted 
            ? "bg-brand-teal text-white shadow-lg shadow-brand-teal/20" 
            : "bg-white/80 text-gray-400 hover:bg-white hover:text-red-500"
        }`}
      >
        <Heart className={`w-4 h-4 ${isWishlisted ? "fill-white" : ""}`} />
      </button>

      <Link href={`/product/${product.id}`} className="block relative aspect-square overflow-hidden rounded-xl bg-gray-50">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-6 transition-transform duration-500 group-hover:scale-110"
        />
      </Link>
      <div className="mt-5 flex flex-1 flex-col">
        <Link href={`/product/${product.id}`}>
          <h3 className="text-sm font-bold text-brand-navy line-clamp-2 h-10 leading-tight hover:text-brand-teal transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-lg font-black text-brand-teal">${product.price.toFixed(2)}</p>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart({
                id: product.id,
                title: product.name,
                price: product.price,
                image: product.image,
              });
            }}
            className="bg-brand-teal text-white p-2 rounded-full hover:bg-brand-navy transition-colors shadow-lg shadow-brand-teal/10"
            aria-label="Add to cart"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
