"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  MapPin,
  ChevronDown,
  Sparkles,
  Phone,
  Store,
  Menu,
  X,
  Clock,
  ShieldCheck,
  Gift,
} from "lucide-react";
import Image from "next/image";
import { BakeryProduct, CartItem } from "@/lib/types";

interface FnpHeaderProps {
  cart: CartItem[];
  wishlistCount: number;
  deliveryLocation: { city: string; pincode: string };
  onOpenLocationModal: () => void;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenShopifyModal: () => void;
  onSelectCategory: (category: string) => void;
  onSelectOccasion?: (occasion: string) => void;
  products: BakeryProduct[];
}

export default function FnpHeader({
  cart,
  wishlistCount,
  deliveryLocation,
  onOpenLocationModal,
  onOpenCart,
  onOpenSearch,
  onOpenShopifyModal,
  onSelectCategory,
  onSelectOccasion,
  products,
}: FnpHeaderProps) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const searchSuggestions = searchQuery.trim()
    ? products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 5)
    : [];

  const navCategories = [
    {
      id: "flowers",
      label: "Flowers",
      icon: "🌸",
      categoryKey: "Flowers",
      subcategories: [
        { title: "By Flower Type", items: ["Roses", "Orchids", "Lilies", "Carnations", "Exotic Mixed"] },
        { title: "By Arrangement", items: ["Bouquets", "Glass Vase Arrangements", "Luxury Baskets", "Box Arrangements"] },
        { title: "Special Occasions", items: ["Birthday Flowers", "Anniversary Flowers", "Romance & Love", "Get Well Soon"] },
      ],
      featuredProduct: products.find((p) => p.category === "Flowers") || products[0],
    },
    {
      id: "cakes",
      label: "Cakes",
      icon: "🎂",
      categoryKey: "Cakes",
      subcategories: [
        { title: "Best Selling Flavours", items: ["Chocolate Truffle", "Black Forest", "Red Velvet", "Butterscotch", "Fresh Fruit"] },
        { title: "Cake Types", items: ["100% Eggless", "Heart Shaped", "Photo Cakes", "Designer Cakes", "Cupcakes"] },
        { title: "Celebrations", items: ["Birthday Cakes", "Anniversary Cakes", "Midnight Delivery", "Party Special"] },
      ],
      featuredProduct: products.find((p) => p.category === "Cakes") || products[1],
    },
    {
      id: "plants",
      label: "Plants",
      icon: "🪴",
      categoryKey: "Plants",
      subcategories: [
        { title: "By Type", items: ["Lucky Bamboo", "Indoor Greenery", "Air Purifying", "Succulents & Jade", "Bonsai"] },
        { title: "Planters & Pots", items: ["Ceramic Pots", "Self-Watering Pots", "Glass Bowls", "Desktop Planters"] },
        { title: "Occasions", items: ["Housewarming", "Good Luck Gifts", "Corporate Greenery", "Thank You Plants"] },
      ],
      featuredProduct: products.find((p) => p.category === "Plants") || products[2],
    },
    {
      id: "birthday",
      label: "Birthday",
      icon: "🎉",
      occasionKey: "Birthday",
      subcategories: [
        { title: "Birthday Flowers", items: ["Roses for Birthday", "Exotic Orchid Bouquets", "Colourful Carnations"] },
        { title: "Birthday Cakes", items: ["Eggless Birthday Cakes", "Photo Cakes", "Midnight Delivery Surprise"] },
        { title: "Birthday Gifts", items: ["Curated Hampers", "Chocolates Combos", "Balloon Room Decor"] },
      ],
      featuredProduct: products.find((p) => p.occasions?.includes("Birthday")) || products[0],
    },
    {
      id: "anniversary",
      label: "Anniversary",
      icon: "💍",
      occasionKey: "Anniversary",
      subcategories: [
        { title: "Romantic Blooms", items: ["Red Rose Bouquets", "Heart Arrangements", "100 Roses Grand Bouquet"] },
        { title: "Anniversary Cakes", items: ["Heart Shaped Truffle", "Red Velvet Heart", "Tier Cakes"] },
        { title: "Couple Gifts", items: ["Luxury Gift Boxes", "Personalised Keepsakes", "Perfume & Flower Combos"] },
      ],
      featuredProduct: products.find((p) => p.occasions?.includes("Anniversary")) || products[1],
    },
    {
      id: "hampers",
      label: "Gifts & Hampers",
      icon: "🎁",
      categoryKey: "Gifts & Hampers",
      subcategories: [
        { title: "Gift Combos", items: ["Flowers & Cake", "Flowers & Chocolates", "Flowers & Teddy", "Plant & Sweets"] },
        { title: "Luxury Hampers", items: ["Gourmet Treat Boxes", "Festive Hampers", "Dry Fruits & Sweets", "Wellness Boxes"] },
        { title: "Personalised", items: ["Custom Mugs", "Engraved Keepsakes", "Photo Frames", "Celebration Notes"] },
      ],
      featuredProduct: products.find((p) => p.category === "Gifts & Hampers") || products[3],
    },
    {
      id: "express",
      label: "Express 60 Mins",
      icon: "⚡",
      badge: "Fastest",
      categoryKey: "All",
      subcategories: [
        { title: "Instant Express (Thane & Mumbai)", items: ["Fresh Rose Stems", "Artisan Chocolate Cakes", "Lucky Bamboo Pots"] },
        { title: "Delivery Guarantee", items: ["Guaranteed 60-90 Mins", "Real-Time Tracking", "Hand-Delivered with Smile"] },
      ],
      featuredProduct: products[0],
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white shadow-xs">
      {/* 1. Top Utility Notification Bar (FNP Signature) */}
      <div className="bg-[#005B2A] text-white text-[11px] font-medium py-1.5 px-4 md:px-8 border-b border-[#004B22]">
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-4">
          <div className="flex items-center gap-4 overflow-x-auto whitespace-nowrap no-scrollbar">
            <span className="flex items-center gap-1 font-semibold text-[#E4F150]">
              <Sparkles className="w-3 h-3 text-[#E4F150]" />
              India&apos;s Preferred Online Flower &amp; Gift Store
            </span>
            <span className="hidden lg:inline text-white/40">•</span>
            <span className="hidden lg:inline text-white/90">
              ⚡ 60 Mins Express &amp; Midnight Delivery in 450+ Cities
            </span>
            <span className="hidden md:inline text-white/40">•</span>
            <span className="hidden md:inline text-white/90">
              Free Handwritten Greeting Note With Every Order
            </span>
          </div>

          <div className="flex items-center gap-4 shrink-0 text-xs">
            {/* Currency */}
            <div className="flex items-center gap-1 font-semibold text-white/90">
              <span className="text-[13px]">🇮🇳</span>
              <span>INR (₹)</span>
            </div>

            {/* Support / WhatsApp */}
            <a
              href="https://wa.me/919833000000"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center gap-1 text-white/90 hover:text-white transition"
            >
              <Phone className="w-3 h-3 text-[#25D366]" />
              <span>Help: +91 98330 00000</span>
            </a>

            {/* Shopify Live Store Pill */}
            <button
              onClick={onOpenShopifyModal}
              className="flex items-center gap-1 bg-[#007A38] hover:bg-[#00853D] text-[#E4F150] text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-400/40 transition"
              title="Shopify Hosted Storefront Settings"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <Store className="w-2.5 h-2.5" />
              <span>joynbloom.com Active</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Header (FNP Style Logo, Delivery Location, Search, Actions) */}
      <div className="bg-white border-b border-gray-100 px-4 md:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 md:gap-6">
          {/* Mobile Menu Button & Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-lg text-gray-700 hover:bg-gray-100 transition"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* FNP Style Brand Logo */}
            <a href="#" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#00853D] to-[#02A64F] flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
                <span className="text-xl">🌸</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight text-[#00853D] leading-none">
                  JoyNbloom
                </span>
                <span className="text-[9px] uppercase tracking-widest font-bold text-amber-700 leading-tight">
                  Celebrations &amp; Gifts
                </span>
              </div>
            </a>
          </div>

          {/* Delivery Location Picker Pill (FNP Signature) */}
          <button
            onClick={onOpenLocationModal}
            className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-50 hover:bg-[#EBF7EE] border border-gray-200 hover:border-[#00853D] transition text-left group shrink-0"
          >
            <div className="w-7 h-7 rounded-full bg-[#EBF7EE] group-hover:bg-[#00853D] flex items-center justify-center transition">
              <MapPin className="w-4 h-4 text-[#00853D] group-hover:text-white transition" />
            </div>
            <div className="flex flex-col text-xs leading-tight">
              <span className="text-[10px] text-gray-400 font-semibold uppercase">Deliver to:</span>
              <span className="font-bold text-gray-800 flex items-center gap-1">
                {deliveryLocation.city} - {deliveryLocation.pincode}
                <ChevronDown className="w-3 h-3 text-gray-400 group-hover:text-[#00853D]" />
              </span>
            </div>
          </button>

          {/* Centered Pill Search Bar (FNP Signature) */}
          <div className="relative flex-1 max-w-xl mx-auto">
            <div className="relative flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 250)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    onOpenSearch();
                  }
                }}
                placeholder="Search flowers, cakes, gifts, plant hampers..."
                className="w-full bg-gray-50 hover:bg-gray-100 focus:bg-white text-xs md:text-sm pl-4 pr-10 py-2.5 rounded-full border border-gray-200 focus:border-[#00853D] focus:ring-1 focus:ring-[#00853D] outline-none transition placeholder:text-gray-400"
              />
              <button
                onClick={onOpenSearch}
                className="absolute right-1.5 w-7 h-7 rounded-full bg-[#00853D] hover:bg-[#006B31] text-white flex items-center justify-center transition"
                aria-label="Search"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Auto-suggestions Dropdown */}
            {isSearchFocused && searchSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 p-3 z-50">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-2">
                  Top Product Matches
                </span>
                <div className="mt-1 divide-y divide-gray-50">
                  {searchSuggestions.map((prod) => (
                    <div
                      key={prod.id}
                      onClick={() => {
                        setSearchQuery("");
                        onOpenSearch();
                      }}
                      className="p-2 hover:bg-gray-50 rounded-xl cursor-pointer flex items-center justify-between text-xs transition"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="relative w-9 h-9 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                          <Image src={prod.image} alt={prod.name} fill className="object-cover" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 line-clamp-1">{prod.name}</p>
                          <span className="text-[11px] text-gray-500 font-medium">
                            ₹{prod.price} • {prod.category}
                          </span>
                        </div>
                      </div>
                      <span className="text-[11px] font-bold text-[#00853D]">View</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Icons (Right: Corporate, Account, Wishlist, Cart) */}
          <div className="flex items-center gap-2 md:gap-4 shrink-0">
            {/* Corporate Gifting Shortcut */}
            <button
              onClick={() => {
                const el = document.getElementById("occasions-section");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="hidden xl:flex items-center gap-1.5 text-xs font-semibold text-gray-700 hover:text-[#00853D] transition px-2 py-1"
            >
              <Gift className="w-4 h-4 text-amber-600" />
              <span>Corporate</span>
            </button>

            {/* Account / Sign-In Dropdown */}
            <div className="relative">
              <button
                onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                className="flex items-center gap-1.5 p-2 rounded-xl text-gray-700 hover:text-[#00853D] hover:bg-gray-50 transition"
                aria-label="User Account"
              >
                <User className="w-5 h-5" />
                <span className="hidden md:inline text-xs font-semibold">Sign In</span>
                <ChevronDown className="hidden md:inline w-3 h-3 text-gray-400" />
              </button>

              <AnimatePresence>
                {accountMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-3 z-50 text-xs text-gray-700"
                  >
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="font-bold text-gray-900">Welcome to JoyNbloom</p>
                      <p className="text-[11px] text-gray-500">Order tracking &amp; celebration gifts</p>
                    </div>
                    <div className="py-1">
                      <button
                        onClick={() => {
                          setAccountMenuOpen(false);
                          onOpenShopifyModal();
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center justify-between"
                      >
                        <span>Storefront Settings</span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold">
                          Active
                        </span>
                      </button>
                      <button
                        onClick={() => {
                          setAccountMenuOpen(false);
                          onOpenLocationModal();
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50"
                      >
                        Change Delivery Location
                      </button>
                      <button
                        onClick={() => {
                          setAccountMenuOpen(false);
                          const el = document.getElementById("testimonials");
                          el?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50"
                      >
                        Customer Reviews (4.9 ★)
                      </button>
                    </div>
                    <div className="px-4 pt-2 border-t border-gray-100 text-[11px] text-gray-400">
                      Shopify Secure PCI Compliant
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Wishlist Button */}
            <button
              onClick={() => {
                const el = document.getElementById("products-section");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="relative p-2 rounded-xl text-gray-700 hover:text-rose-600 hover:bg-gray-50 transition"
              aria-label="Wishlist"
              title="Saved Favourites"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-600 text-white text-[9px] font-black flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button (FNP Signature: Icon + Badge + Amount) */}
            <button
              onClick={onOpenCart}
              className="flex items-center gap-2.5 bg-[#00853D] hover:bg-[#006B31] text-white px-3.5 py-2 rounded-xl transition shadow-xs group"
              aria-label="Shopping Cart"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5 text-white" />
                <motion.span
                  key={totalCartCount}
                  initial={{ scale: 0.7 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-amber-400 text-gray-900 text-[10px] font-black rounded-full w-4 h-4 flex items-center justify-center border border-white"
                >
                  {totalCartCount}
                </motion.span>
              </div>
              <div className="hidden sm:flex flex-col text-left leading-none">
                <span className="text-[10px] text-white/80 font-medium">Cart</span>
                <span className="text-xs font-bold text-white">
                  {subtotal > 0 ? `₹${subtotal}` : "₹0"}
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Category Navigation Bar with Mega Dropdowns (FNP Style) */}
      <nav className="hidden lg:block bg-white border-b border-gray-200 text-gray-800 text-xs font-semibold">
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
          <ul className="flex items-center space-x-1">
            {navCategories.map((item) => (
              <li
                key={item.id}
                onMouseEnter={() => setActiveDropdown(item.id)}
                onMouseLeave={() => setActiveDropdown(null)}
                className="relative"
              >
                <button
                  onClick={() => {
                    if (item.categoryKey) onSelectCategory(item.categoryKey);
                    if (item.occasionKey && onSelectOccasion) onSelectOccasion(item.occasionKey);
                    const el = document.getElementById("products-section");
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`flex items-center gap-1.5 py-3 px-3.5 hover:text-[#00853D] border-b-2 transition ${
                    activeDropdown === item.id
                      ? "border-[#00853D] text-[#00853D] bg-[#EBF7EE]/40"
                      : "border-transparent"
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[9px] bg-red-500 text-white font-extrabold px-1.5 py-0.2 rounded-full uppercase tracking-tighter">
                      {item.badge}
                    </span>
                  )}
                  <ChevronDown className="w-3 h-3 text-gray-400" />
                </button>

                {/* Mega Menu Dropdown */}
                <AnimatePresence>
                  {activeDropdown === item.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 w-[580px] bg-white rounded-b-2xl shadow-2xl border border-gray-200 border-t-0 p-6 z-50 grid grid-cols-3 gap-6"
                    >
                      {item.subcategories.map((sub, idx) => (
                        <div key={idx} className="space-y-2">
                          <h5 className="font-bold text-gray-900 text-xs border-b border-gray-100 pb-1 text-[#00853D]">
                            {sub.title}
                          </h5>
                          <ul className="space-y-1.5 text-[11px] text-gray-600 font-medium">
                            {sub.items.map((subItem, sIdx) => (
                              <li key={sIdx}>
                                <button
                                  onClick={() => {
                                    if (item.categoryKey) onSelectCategory(item.categoryKey);
                                    setActiveDropdown(null);
                                    const el = document.getElementById("products-section");
                                    el?.scrollIntoView({ behavior: "smooth" });
                                  }}
                                  className="hover:text-[#00853D] hover:translate-x-1 transition-transform block text-left"
                                >
                                  {subItem}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}

                      {/* Featured Item Preview */}
                      {item.featuredProduct && (
                        <div className="bg-[#F8FAF8] rounded-xl p-3 border border-[#E0EAE1] flex flex-col justify-between">
                          <div className="relative w-full h-24 rounded-lg overflow-hidden bg-gray-100">
                            <Image
                              src={item.featuredProduct.image}
                              alt={item.featuredProduct.name}
                              fill
                              className="object-cover"
                            />
                            <span className="absolute top-1 left-1 bg-[#00853D] text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                              Featured
                            </span>
                          </div>
                          <div className="mt-2 text-left">
                            <p className="text-[11px] font-bold text-gray-900 line-clamp-1">
                              {item.featuredProduct.name}
                            </p>
                            <p className="text-xs font-black text-[#00853D] mt-0.5">
                              ₹{item.featuredProduct.price}
                            </p>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ul>

          {/* Quick Promise tag */}
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#00853D]">
            <Clock className="w-3.5 h-3.5" />
            <span>Earliest Delivery: Today (60 Mins)</span>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 lg:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-72 bg-white shadow-2xl z-50 p-5 overflow-y-auto lg:hidden flex flex-col justify-between"
            >
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🌸</span>
                    <span className="text-xl font-black text-[#00853D]">JoyNbloom</span>
                  </div>
                  <button onClick={() => setMobileMenuOpen(false)}>
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                {/* Delivery Location in Mobile Menu */}
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenLocationModal();
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-200 text-left"
                >
                  <div className="flex items-center gap-2 text-xs">
                    <MapPin className="w-4 h-4 text-[#00853D]" />
                    <div>
                      <span className="text-[10px] text-gray-500 font-semibold block">Deliver To</span>
                      <span className="font-bold text-gray-800">
                        {deliveryLocation.city} - {deliveryLocation.pincode}
                      </span>
                    </div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>

                {/* Category Links */}
                <div>
                  <h6 className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2">
                    Shop Categories
                  </h6>
                  <div className="space-y-1">
                    {navCategories.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          if (item.categoryKey) onSelectCategory(item.categoryKey);
                          if (item.occasionKey && onSelectOccasion) onSelectOccasion(item.occasionKey);
                          setMobileMenuOpen(false);
                          const el = document.getElementById("products-section");
                          el?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-[#EBF7EE] text-gray-800 hover:text-[#00853D] text-xs font-semibold flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <span>{item.icon}</span>
                          <span>{item.label}</span>
                        </div>
                        {item.badge && (
                          <span className="text-[9px] bg-red-500 text-white font-extrabold px-1.5 py-0.5 rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Mobile Drawer Footer */}
              <div className="pt-4 border-t border-gray-100 text-xs space-y-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <ShieldCheck className="w-4 h-4 text-[#00853D]" />
                  <span>Shopify PCI Secure Payment</span>
                </div>
                <p className="text-[11px] text-gray-400">&copy; 2026 JoyNbloom India</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
