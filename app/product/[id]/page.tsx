"use client";

import { use, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product, productApi } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { ShoppingCart, Heart, ArrowLeft, Check, Truck, ShieldCheck, RefreshCw } from "lucide-react";
import ProductCard from "@/components/ProductCard";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const productId = parseInt(id);
  
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [isAdded, setIsAdded] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const fetchedProduct = await productApi.getProductById(productId);
      setProduct(fetchedProduct);
      
      if (fetchedProduct) {
        // Get all products to find related ones
        const allProducts = await productApi.getAllProducts();
        const related = allProducts
          .filter(p => p.category === fetchedProduct.category && p.id !== fetchedProduct.id)
          .slice(0, 4);
        setRelatedProducts(related);
      }
      
      setLoading(false);
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-32 mb-8"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20">
            <div className="aspect-square bg-gray-200 rounded-3xl"></div>
            <div className="flex flex-col justify-center">
              <div className="h-6 bg-gray-200 rounded w-20 mb-4"></div>
              <div className="h-12 bg-gray-200 rounded w-3/4 mb-6"></div>
              <div className="h-8 bg-gray-200 rounded w-32 mb-8"></div>
              <div className="space-y-2 mb-10">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-4/6"></div>
              </div>
              <div className="h-12 bg-gray-200 rounded mb-12"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <h1 className="text-4xl font-black text-brand-navy mb-4">Product Not Found</h1>
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-brand-teal font-bold hover:underline"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>
      </div>
    );
  }

  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.name,
      price: product.price,
      image: product.image,
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const toggleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <Link 
        href="/" 
        className="inline-flex items-center gap-2 text-gray-500 hover:text-brand-teal font-medium mb-8 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Shopping
      </Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20">
        {/* Product Image */}
        <div className="relative aspect-square lg:aspect-4/3 bg-white rounded-3xl overflow-hidden border border-gray-100 p-8 flex items-center justify-center">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-4"
            priority
          />
          <button 
            onClick={toggleWishlist}
            className={`absolute top-6 right-6 z-10 p-3 rounded-full transition-all ${
              isWishlisted 
                ? "bg-brand-teal text-white shadow-xl shadow-brand-teal/20" 
                : "bg-gray-100 text-gray-400 hover:bg-white hover:text-red-500"
            }`}
          >
            <Heart className={`w-6 h-6 ${isWishlisted ? "fill-white" : ""}`} />
          </button>
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-center">
          <div className="mb-2">
            <span className="inline-block px-3 py-1 rounded-full bg-brand-teal/10 text-brand-teal text-xs font-bold uppercase tracking-wider">
              {product.category}
            </span>
          </div>
          
          <h1 className="text-3xl lg:text-5xl font-black text-brand-navy mb-6 leading-tight">
            {product.name}
          </h1>

          <div className="text-4xl font-black text-brand-teal mb-8">
            ${product.price.toFixed(2)}
          </div>

          <p className="text-gray-600 leading-relaxed mb-10 text-lg">
            {product.description || "No description available for this product."}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <button
              onClick={handleAddToCart}
              disabled={isAdded}
              className={`flex-1 py-4 px-8 rounded-full font-bold flex items-center justify-center gap-3 transition-all transform hover:-translate-y-1 ${
                isAdded 
                  ? "bg-green-500 text-white" 
                  : "bg-brand-navy text-white hover:bg-brand-teal hover:shadow-lg hover:shadow-brand-teal/20"
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="h-5 w-5" /> ADDED TO CART
                </>
              ) : (
                <>
                  <ShoppingCart className="h-5 w-5" /> ADD TO CART
                </>
              )}
            </button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-gray-100">
            <div className="flex flex-col items-center text-center gap-2">
              <div className="p-3 bg-blue-50 text-blue-500 rounded-full mb-1">
                <Truck className="h-5 w-5" />
              </div>
              <span className="text-xs font-bold text-gray-900 uppercase">Free Shipping</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <div className="p-3 bg-purple-50 text-purple-500 rounded-full mb-1">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <span className="text-xs font-bold text-gray-900 uppercase">2 Year Warranty</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <div className="p-3 bg-orange-50 text-orange-500 rounded-full mb-1">
                <RefreshCw className="h-5 w-5" />
              </div>
              <span className="text-xs font-bold text-gray-900 uppercase">30 Day Returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-black text-brand-navy mb-8 uppercase tracking-tighter">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
