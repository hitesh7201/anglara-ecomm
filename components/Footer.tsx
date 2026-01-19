"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-brand-navy text-white mt-12">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div>
            <h2 className="text-2xl font-bold text-brand-teal mb-4">ANGLARA</h2>
            <p className="text-gray-400 mb-6">
              Experience the best online shopping with Anglara. Quality products, affordable prices.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="hover:text-brand-teal"><Facebook className="h-5 w-5" /></Link>
              <Link href="#" className="hover:text-brand-teal"><Twitter className="h-5 w-5" /></Link>
              <Link href="#" className="hover:text-brand-teal"><Instagram className="h-5 w-5" /></Link>
              <Link href="#" className="hover:text-brand-teal"><Youtube className="h-5 w-5" /></Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="#" className="hover:text-white">New Arrivals</Link></li>
              <li><Link href="#" className="hover:text-white">Best Sellers</Link></li>
              <li><Link href="#" className="hover:text-white">Promotions</Link></li>
              <li><Link href="#" className="hover:text-white">Sale</Link></li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h3 className="text-lg font-bold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="#" className="hover:text-white">Help Center</Link></li>
              <li><Link href="#" className="hover:text-white">Shipping Policy</Link></li>
              <li><Link href="#" className="hover:text-white">Return & Refund</Link></li>
              <li><Link href="#" className="hover:text-white">FAQs</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-brand-teal" />
                <span>123 Street, New York, USA</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-brand-teal" />
                <span>+1 234 567 890</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-brand-teal" />
                <span>support@anglara.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2026 Anglara. All rights reserved.
          </p>
          <div className="flex gap-4">
            {/* Payment methods icons could go here */}
          </div>
        </div>
      </div>
    </footer>
  );
}
