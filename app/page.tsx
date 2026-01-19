"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";

export default function Home() {
  const { addToCart } = useCart();
  const [loading] = useState(false);

  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-brand-light-gray py-20 md:py-32">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 text-center md:text-left z-10">
            <span className="inline-block px-4 py-1 rounded-full bg-brand-teal/10 text-brand-teal text-xs font-bold uppercase tracking-widest mb-6">
              Exclusive Collection 2026
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-brand-navy leading-[1.1] mb-8">
              PREMIUM <br />
              <span className="text-brand-teal italic">STYLE & QUALITY</span> <br />
              FOR YOU
            </h1>
            <p className="text-gray-500 text-lg mb-10 max-w-lg mx-auto md:mx-0 leading-relaxed">
              Discover our latest collection of premium products. Quality meets style in every piece we offer. Up to 60% off this season.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button 
                onClick={() => document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-brand-teal text-white px-10 py-5 rounded-full font-black flex items-center justify-center gap-3 hover:bg-brand-navy transition-all transform hover:scale-105 shadow-xl shadow-brand-teal/20"
              >
                SHOP NOW <ArrowRight className="h-5 w-5" />
              </button>
              <button 
                onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-brand-navy border-2 border-brand-navy/10 px-10 py-5 rounded-full font-black hover:bg-brand-navy hover:text-white transition-all transform hover:scale-105"
              >
                VIEW CATALOG
              </button>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-teal/5 rounded-full blur-3xl animate-pulse"></div>
              <div className="relative z-10 w-full h-full bg-linear-to-tr from-brand-teal/20 to-transparent rounded-full flex items-center justify-center border border-white/50 backdrop-blur-sm shadow-2xl">
                <Image 
                  src="https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_t.png" 
                  alt="Banner Image" 
                  width={500}
                  height={500}
                  className="w-[85%] h-[85%] object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.3)] transform hover:scale-105 transition-transform duration-700 rounded-2xl" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Grid */}
      <section id="featured" className="container mx-auto px-4 pt-20">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-4xl font-black text-brand-navy uppercase tracking-tighter">Featured Products</h2>
            <div className="h-1.5 w-24 bg-brand-teal mt-4 rounded-full"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white p-4 transition-all hover:shadow-xl">
              <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-50">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-6 transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="mt-5 flex flex-1 flex-col">
                <h3 className="text-sm font-bold text-brand-navy line-clamp-2 h-10 leading-tight">
                  {product.name}
                </h3>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-lg font-black text-brand-teal">${product.price.toFixed(2)}</p>
                  <button 
                    onClick={() => {
                      addToCart({
                        id: product.id,
                        title: product.name,
                        price: product.price,
                        image: product.image
                      });
                    }}
                    className="bg-brand-teal text-white p-2 rounded-full hover:bg-brand-navy transition-colors"
                  >
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Products */}
      <section id="catalog" className="container mx-auto px-4 pt-20">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-4xl font-black text-brand-navy uppercase tracking-tighter">Most Popular</h2>
            <div className="h-1.5 w-24 bg-brand-teal mt-4 rounded-full"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.slice(0, 4).map((product) => (
            <div key={product.id} className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white p-4 transition-all hover:shadow-xl">
              <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-50">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-6 transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="mt-5 flex flex-1 flex-col">
                <h3 className="text-sm font-bold text-brand-navy line-clamp-2 h-10 leading-tight">
                  {product.name}
                </h3>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-lg font-black text-brand-teal">${product.price.toFixed(2)}</p>
                  <button 
                    onClick={() => {
                      addToCart({
                        id: product.id,
                        title: product.name,
                        price: product.price,
                        image: product.image
                      });
                    }}
                    className="bg-brand-teal text-white p-2 rounded-full hover:bg-brand-navy transition-colors"
                  >
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
