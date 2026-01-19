"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CreditCard, Truck, ShieldCheck } from "lucide-react";

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    clearCart();
    setIsProcessing(false);
    router.push("/checkout/success");
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <h1 className="text-3xl font-bold text-brand-navy mb-4">You have nothing to checkout!</h1>
        <Link href="/" className="text-brand-teal hover:underline font-bold">
          Continue Shopping
        </Link>
      </div>
    );
  }

  const tax = cartTotal * 0.08;
  const total = cartTotal + tax;

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="container mx-auto px-4 py-8">
        <Link 
          href="/cart" 
          className="inline-flex items-center gap-2 text-gray-500 hover:text-brand-teal font-medium mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Cart
        </Link>

        <h1 className="text-4xl font-black text-brand-navy mb-8 uppercase tracking-tighter">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Form */}
          <div className="space-y-8">
            <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h2 className="text-xl font-bold text-brand-navy mb-6 flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-navy text-white text-sm">1</span>
                Contact Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-xl border-gray-200 bg-gray-50 p-3 text-sm focus:border-brand-teal focus:ring-brand-teal"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
            </section>

            <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h2 className="text-xl font-bold text-brand-navy mb-6 flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-navy text-white text-sm">2</span>
                Shipping Address
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-bold text-gray-700 mb-2">First Name</label>
                  <input
                    required
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full rounded-xl border-gray-200 bg-gray-50 p-3 text-sm focus:border-brand-teal focus:ring-brand-teal"
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Last Name</label>
                  <input
                    required
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full rounded-xl border-gray-200 bg-gray-50 p-3 text-sm focus:border-brand-teal focus:ring-brand-teal"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Address</label>
                  <input
                    required
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full rounded-xl border-gray-200 bg-gray-50 p-3 text-sm focus:border-brand-teal focus:ring-brand-teal"
                    placeholder="123 Main St"
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-bold text-gray-700 mb-2">City</label>
                  <input
                    required
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full rounded-xl border-gray-200 bg-gray-50 p-3 text-sm focus:border-brand-teal focus:ring-brand-teal"
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Postal Code</label>
                  <input
                    required
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    className="w-full rounded-xl border-gray-200 bg-gray-50 p-3 text-sm focus:border-brand-teal focus:ring-brand-teal"
                  />
                </div>
              </div>
            </section>

            <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm opacity-75 grayscale-[0.5] pointer-events-none relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center bg-white/40 z-10">
                    <span className="bg-brand-navy text-white text-xs font-bold px-3 py-1 rounded-full uppercase">Payment (Simulated)</span>
                </div>
              <h2 className="text-xl font-bold text-brand-navy mb-6 flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-navy text-white text-sm">3</span>
                Payment Method
              </h2>
              <div className="flex items-center gap-4 p-4 border border-brand-teal/20 bg-brand-teal/5 rounded-xl">
                <CreditCard className="h-6 w-6 text-brand-teal" />
                <span className="font-bold text-brand-navy">Credit Card (Simulated)</span>
              </div>
            </section>
            
            <button
                onClick={handleSubmit}
                disabled={isProcessing}
                className="w-full bg-brand-teal text-white py-5 rounded-full font-black text-lg hover:bg-brand-navy hover:shadow-xl hover:shadow-brand-navy/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed transform hover:-translate-y-1"
            >
                {isProcessing ? "PROCESSING ORDER..." : `PAY $${total.toFixed(2)}`}
            </button>
            <p className="text-center text-xs text-gray-400 font-bold uppercase tracking-widest">
                Secure Encrypted Payment
            </p>

          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl">
              <h2 className="text-xl font-black text-brand-navy mb-8 uppercase tracking-tight">Order Summary</h2>
              
              <div className="space-y-6 mb-8 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative h-20 w-20 shrink-0 bg-gray-50 rounded-lg overflow-hidden border border-gray-100">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-contain p-2"
                      />
                      <span className="absolute top-0 right-0 bg-brand-navy text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-bl-lg">
                        {item.quantity}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-brand-navy line-clamp-2 mb-1">{item.title}</h3>
                      <p className="text-brand-teal font-black">${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-6 border-t border-gray-100">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span className="font-bold text-brand-navy">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Shipping</span>
                  <span className="font-bold text-green-500">FREE</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Taxes</span>
                  <span className="font-bold text-brand-navy">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <span className="text-lg font-bold text-brand-navy">Total</span>
                  <span className="text-3xl font-black text-brand-teal">${total.toFixed(2)}</span>
                </div>
              </div>
              
               <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-center text-center gap-2 p-4 bg-gray-50 rounded-2xl">
                    <Truck className="h-6 w-6 text-brand-navy" />
                    <span className="text-[10px] font-bold uppercase text-gray-500">Free Express Delivery</span>
                  </div>
                  <div className="flex flex-col items-center text-center gap-2 p-4 bg-gray-50 rounded-2xl">
                    <ShieldCheck className="h-6 w-6 text-brand-navy" />
                    <span className="text-[10px] font-bold uppercase text-gray-500">Buyer Protection</span>
                  </div>
               </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
