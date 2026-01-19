"use client";

import Link from "next/link";
import { CheckCircle, ArrowRight, ShoppingBag } from "lucide-react";
import { useEffect } from "react";
import confetti from "canvas-confetti";

export default function CheckoutSuccessPage() {
  
  useEffect(() => {
    // Trigger confetti on mount
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const random = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      confetti({
        ...defaults, 
        particleCount,
        origin: { x: random(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults, 
        particleCount,
        origin: { x: random(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center border border-gray-100">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-green-50 p-6 ring-8 ring-green-50/50 animate-bounce">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
        </div>
        
        <h1 className="text-3xl font-black text-brand-navy mb-2 tracking-tighter">ORDER CONFIRMED!</h1>
        <p className="text-gray-500 mb-8">
          Thank you for your purchase. We've received your order and are getting it ready!
        </p>

        <div className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-100">
            <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Order Number</p>
            <p className="text-2xl font-black text-brand-navy tracking-widest">#ORD-{Math.floor(100000 + Math.random() * 900000)}</p>
        </div>

        <div className="space-y-3">
          <Link 
            href="/"
            className="w-full bg-brand-teal text-white py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-brand-navy transition-all shadow-lg shadow-brand-teal/20"
          >
            CONTINUE SHOPPING <ArrowRight className="h-4 w-4" />
          </Link>
          <Link 
            href="/contact"
            className="w-full bg-white text-brand-navy border-2 border-brand-navy/10 py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-brand-navy/5 transition-all"
          >
            NEED HELP?
          </Link>
        </div>
      </div>
    </div>
  );
}
