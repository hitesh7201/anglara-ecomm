"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Simulate API call
    setTimeout(() => {
      setIsCheckingOut(false);
      clearCart();
      alert("Checkout Successful! Thank you for your purchase.");
    }, 2000);
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <div className="mb-8 flex justify-center">
          <div className="rounded-full bg-gray-50 p-10 ring-8 ring-gray-50/50">
            <ShoppingBag className="h-16 w-16 text-gray-300" />
          </div>
        </div>
        <h1 className="text-4xl font-black text-brand-navy mb-4 tracking-tighter">YOUR CART IS EMPTY</h1>
        <p className="text-gray-500 mb-10 max-w-md mx-auto">
          Looks like you haven't added anything to your cart yet. Explore our latest collections and find something you love!
        </p>
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 bg-brand-teal text-white px-8 py-4 rounded-full font-bold hover:bg-brand-navy transition-all transform hover:scale-105"
        >
          START SHOPPING <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex items-center justify-between mb-12">
        <h1 className="text-4xl font-black text-brand-navy uppercase tracking-tighter">Shopping Cart</h1>
        <button 
          onClick={clearCart}
          className="text-sm font-bold text-red-500 hover:text-red-700 transition-colors flex items-center gap-2"
        >
          <Trash2 className="h-4 w-4" /> CLEAR ALL
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {cart.map((item) => (
            <div 
              key={item.id} 
              className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm transition-hover hover:shadow-md"
            >
              <div className="relative h-32 w-32 shrink-0 bg-gray-50 rounded-xl overflow-hidden p-4">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-contain"
                />
              </div>
              
              <div className="grow text-center sm:text-left">
                <h3 className="text-lg font-bold text-brand-navy mb-1">{item.title}</h3>
                <p className="text-brand-teal font-black text-xl mb-4 sm:mb-0">${item.price.toFixed(2)}</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-200 rounded-full p-1 bg-gray-50">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-2 hover:bg-white rounded-full transition-colors"
                  >
                    <Minus className="h-4 w-4 text-brand-navy" />
                  </button>
                  <span className="w-10 text-center font-bold text-brand-navy">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-2 hover:bg-white rounded-full transition-colors"
                  >
                    <Plus className="h-4 w-4 text-brand-navy" />
                  </button>
                </div>
                
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-brand-navy text-white p-8 rounded-3xl shadow-xl sticky top-32">
            <h2 className="text-2xl font-black mb-8 border-b border-white/10 pb-4 uppercase tracking-tighter">Order Summary</h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-white/70">
                <span>Subtotal</span>
                <span className="font-bold text-white">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-white/70">
                <span>Shipping</span>
                <span className="font-bold text-white">FREE</span>
              </div>
              <div className="flex justify-between text-white/70">
                <span>Taxes</span>
                <span className="font-bold text-white">${(cartTotal * 0.08).toFixed(2)}</span>
              </div>
              <div className="pt-4 border-t border-white/10 flex justify-between items-end">
                <span className="text-lg font-bold">Total</span>
                <span className="text-3xl font-black text-brand-teal">${(cartTotal * 1.08).toFixed(2)}</span>
              </div>
            </div>

            <Link 
              href="/checkout"
              className="w-full bg-brand-teal text-white py-5 rounded-full font-black flex items-center justify-center gap-3 hover:bg-white hover:text-brand-navy transition-all group"
            >
              PROCEED TO CHECKOUT 
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <p className="text-center text-xs text-white/40 mt-6 uppercase tracking-widest font-bold">
              Secure Checkout • 30 Day Returns
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
