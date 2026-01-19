"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { ShoppingCart, Search, User, Heart, Menu } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileSearchQuery, setMobileSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery(""); // Clear search after navigation
    }
  };

  const handleMobileSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobileSearchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(mobileSearchQuery.trim())}`);
      setMobileSearchQuery(""); // Clear search after navigation
      setIsMenuOpen(false); // Close mobile menu
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      {/* Top Bar */}
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <button className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="h-6 w-6" />
          </button>
          <Link href="/" className="text-3xl font-black text-brand-navy tracking-tighter">
            ANGLARA
          </Link>
        </div>

        {/* Search Bar - Hidden on Mobile */}
        <div className="hidden max-w-lg flex-1 px-12 lg:block">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-gray-200 bg-gray-50 py-2.5 pl-5 pr-12 text-sm focus:border-brand-teal focus:outline-none transition-colors"
            />
            <button type="submit" className="absolute right-1 top-1 flex h-8 w-8 items-center justify-center rounded-full bg-brand-teal text-white cursor-pointer hover:bg-brand-navy transition-colors">
              <Search className="h-4 w-4" />
            </button>
          </form>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4 lg:gap-8">
          <button className="hidden text-gray-700 hover:text-brand-teal transition-colors lg:block">
            <Search className="h-6 w-6 lg:hidden" /> {/* Show search icon on small screens if needed, otherwise hide */}
            {/* <User className="h-6 w-6" /> */}
          </button>
          <button className="hidden text-gray-700 hover:text-brand-teal transition-colors lg:block relative group">
            <User className="h-6 w-6" />
            {/* Simple User Dropdown Mock */}
            <div className="absolute right-0 top-full mt-2 w-48 bg-white shadow-xl rounded-xl border border-gray-100 p-2 transform opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all origin-top-right pointer-events-none group-hover:pointer-events-auto">
                <div className="text-sm font-bold text-gray-700 px-4 py-2 border-b border-gray-100">My Account</div>
                <Link href="#" className="block px-4 py-2 text-sm text-gray-500 hover:text-brand-teal hover:bg-gray-50 rounded-lg">Orders</Link>
                <Link href="#" className="block px-4 py-2 text-sm text-gray-500 hover:text-brand-teal hover:bg-gray-50 rounded-lg">Settings</Link>
                <div className="px-4 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg cursor-pointer">Logout</div>
            </div>
          </button>
          <Link href="/wishlist" className="hidden text-gray-700 hover:text-brand-teal transition-colors lg:block relative">
            <Heart className="h-6 w-6" />
            {wishlistCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-teal text-[9px] font-bold text-white">{wishlistCount}</span>
            )}
          </Link>
          <Link href="/cart" className="relative text-gray-700 hover:text-brand-teal transition-colors">
            <ShoppingCart className="h-6 w-6" />
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-brand-teal text-[10px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="border-y border-gray-100 hidden lg:block bg-white">
        <div className="container mx-auto px-4">
          <ul className="flex items-center justify-center gap-10 py-4 text-sm font-bold">
            {["Home", "Men", "Women", "Kids", "Accessories", "Contact Us"].map((item) => (
              <li key={item}>
                <Link 
                  href={
                    item === "Home" ? "/" : 
                    item === "Contact Us" ? "/contact" : 
                    `/category/${item.toLowerCase().replace(" ", "-")}`
                  } 
                  className="text-brand-navy hover:text-brand-teal uppercase tracking-wide transition-colors"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-16 z-40 bg-white lg:hidden">
          <div className="p-4">
            <form onSubmit={handleMobileSearch} className="relative mb-6">
              <input
                type="text"
                placeholder="Search products..."
                value={mobileSearchQuery}
                onChange={(e) => setMobileSearchQuery(e.target.value)}
                className="w-full rounded-full border bg-gray-50 py-2 pl-4 pr-10 focus:border-brand-teal focus:outline-none"
              />
              <button type="submit" className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 hover:text-brand-teal">
                <Search className="h-5 w-5" />
              </button>
            </form>
            <ul className="space-y-4 font-medium uppercase tracking-wide">
              {["Home", "Men", "Women", "Kids", "Accessories", "Contact Us"].map((item) => (
                <li key={item}>
                  <Link 
                    href={
                      item === "Home" ? "/" : 
                      item === "Contact Us" ? "/contact" : 
                      `/category/${item.toLowerCase().replace(" ", "-")}`
                    } 
                    className="block border-b pb-2 text-gray-700 hover:text-brand-teal transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}
