"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ShoppingCart,
  Search,
  Sparkles,
  ShieldCheck,
  Check,
  Heart,
  Store,
  Flame,
  Award,
  ChevronRight,
  Share2,
  Globe,
  Mail,
  Phone,
  MapPin,
  Clock,
  Star,
  Gift,
  Smile,
  Truck,
  FileText,
  X,
  HelpCircle,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";
import confetti from "canvas-confetti";

import { JOY_PRODUCTS } from "@/lib/products";
import { BakeryProduct, CartItem, ProductOccasion } from "@/lib/types";
import { createShopifyCheckout, getShopifyConfig } from "@/lib/shopify";
import RotatingBadge from "@/components/RotatingBadge";
import ProductCarousel from "@/components/ProductCarousel";
import CartDrawer from "@/components/CartDrawer";
import ShopifyManagerModal from "@/components/ShopifyManagerModal";
import SearchModal from "@/components/SearchModal";

export default function JoyNBloomLandingPage() {
  const [products, setProducts] = useState<BakeryProduct[]>(JOY_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([
    { product: JOY_PRODUCTS[0], quantity: 1 }, // Royal Blue Orchids
    { product: JOY_PRODUCTS[25] || JOY_PRODUCTS[1], quantity: 1 }, // Chocolate Truffle Heart Cake
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isShopifyModalOpen, setIsShopifyModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [policyModal, setPolicyModal] = useState<"shipping" | "refund" | "terms" | "privacy" | null>(null);

  // Cart operations
  const handleAddToCart = (product: BakeryProduct) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });

    // Gentle micro feedback
    confetti({
      particleCount: 25,
      spread: 40,
      origin: { y: 0.8 },
    });
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => setCart([]);

  const totalCartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleProductPushed = (productId: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, isPushedToShopify: true } : p))
    );
  };

  const handleOrderNow = async () => {
    if (cart.length === 0) {
      handleAddToCart(products[0]);
    }
    setIsCartOpen(true);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSubscribed(true);
    confetti({ particleCount: 60, spread: 60 });
    setTimeout(() => setNewsletterSubscribed(false), 4000);
    setNewsletterEmail("");
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans text-[#3A2318] selection:bg-[#FFD13B] selection:text-black">
      {/* Top Promo Bar */}
      <div className="bg-[#4A1D6F] text-white text-xs font-semibold py-2 px-4 flex justify-between items-center overflow-x-auto whitespace-nowrap scrollbar-none border-b-2 border-[#3A2318]">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#E4F150]" />
          <span>Same-Day & PAN India Celebration Delivery</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[#E4F150] animate-ping" />
          <span className="font-bold text-[#E4F150]">Express 2-Hr Delivery in Thane & Mumbai</span>
        </div>
        <div className="flex items-center gap-2">
          <span>Free Handwritten Greeting Note With Every Order</span>
          <span className="hidden sm:inline bg-[#FFD13B] text-black text-[10px] font-black px-2 py-0.5 rounded-full">
            USE CODE: JOY15
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex justify-between items-center px-4 md:px-8 py-4 bg-[#FDFBF7]/95 backdrop-blur-md sticky top-0 z-40 border-b-2 border-[#3A2318]">
        <div className="flex items-center gap-4">
          <a
            href="#"
            className="flex items-center gap-2 text-2xl md:text-3xl font-black tracking-tighter hover:opacity-90 transition group"
          >
            <span className="w-8 h-8 rounded-full bg-[#FFD13B] border-2 border-[#3A2318] flex items-center justify-center text-sm shadow-[1.5px_1.5px_0px_#3A2318] group-hover:rotate-12 transition-transform">
              🌸
            </span>
            <span>JoyNbloom</span>
          </a>
          {/* Live Shopify Gateway Indicator Pill */}
          <button
            onClick={() => setIsShopifyModalOpen(true)}
            className="hidden sm:inline-flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[11px] font-bold px-3 py-1 rounded-full border border-emerald-300 transition"
            title="Connected to joynbloom.com Shopify Storefront"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <Store className="w-3 h-3 text-emerald-700" />
            <span>joynbloom.com Active</span>
          </button>
        </div>

        <ul className="hidden md:flex space-x-7 text-xs font-black uppercase tracking-wider">
          <li>
            <button
              onClick={() => scrollToSection("products-section")}
              className="cursor-pointer hover:text-[#4A1D6F] transition"
            >
              Flowers
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection("products-section")}
              className="cursor-pointer hover:text-[#4A1D6F] transition"
            >
              Cakes
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection("products-section")}
              className="cursor-pointer hover:text-[#4A1D6F] transition"
            >
              Hampers
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection("products-section")}
              className="cursor-pointer hover:text-[#4A1D6F] transition"
            >
              Plants
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection("occasions-section")}
              className="cursor-pointer hover:text-[#4A1D6F] transition"
            >
              Occasions
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection("testimonials")}
              className="cursor-pointer hover:text-[#4A1D6F] transition"
            >
              Reviews
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection("contact")}
              className="cursor-pointer hover:text-[#4A1D6F] transition"
            >
              Contact
            </button>
          </li>
        </ul>

        <div className="flex items-center space-x-3 md:space-x-4">
          {/* Search Button */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2 rounded-full hover:bg-stone-200 transition"
            aria-label="Search flowers, cakes & gifts"
          >
            <Search className="w-5 h-5 cursor-pointer text-[#3A2318]" />
          </button>

          {/* Shopify Push Products Shortcut */}
          <button
            onClick={() => setIsShopifyModalOpen(true)}
            className="hidden lg:flex items-center gap-1.5 bg-white text-[#3A2318] px-3.5 py-1.5 rounded-full font-bold text-xs uppercase border-2 border-[#3A2318] hover:bg-[#FFD13B] transition shadow-[2px_2px_0px_#3A2318]"
          >
            <Store className="w-3.5 h-3.5" />
            <span>Storefront Settings</span>
          </button>

          {/* Send A Gift Action */}
          <button
            onClick={() => scrollToSection("products-section")}
            className="bg-[#FFD13B] text-black px-4 md:px-6 py-2 rounded-full font-black uppercase text-xs md:text-sm hover:bg-yellow-400 transition border-2 border-[#3A2318] shadow-[2px_2px_0px_#3A2318] active:translate-x-0.5 active:translate-y-0.5"
          >
            Send A Gift
          </button>

          {/* Shopping Cart Drawer Trigger */}
          <div
            onClick={() => setIsCartOpen(true)}
            className="relative cursor-pointer p-2 rounded-full hover:bg-stone-200 transition"
            aria-label="View Cart"
          >
            <ShoppingCart className="w-5 h-5" />
            <motion.span
              key={totalCartCount}
              initial={{ scale: 0.6 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 bg-[#4A1D6F] text-white text-[10px] font-black rounded-full w-5 h-5 flex items-center justify-center border border-white"
            >
              {totalCartCount}
            </motion.span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="px-6 md:px-12 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto relative">
        {/* Left Content */}
        <div className="relative space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Floating Badges */}
            <motion.span
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              className="absolute -top-7 left-12 bg-[#22c55e] text-white text-xs font-black px-3.5 py-1 rounded-full transform -rotate-12 border-2 border-[#3A2318] shadow-[2px_2px_0px_#3A2318]"
            >
              FRESH BLOOMS
            </motion.span>

            <h1 className="text-6xl sm:text-7xl md:text-8xl font-black leading-[0.85] tracking-tighter uppercase text-[#3A2318]">
              Bloom the <br /> Joy
            </h1>

            <motion.span
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="absolute top-4 right-1/4 bg-[#f97316] text-white text-xs font-black px-3.5 py-1 rounded-full transform rotate-12 border-2 border-[#3A2318] shadow-[2px_2px_0px_#3A2318]"
            >
              SAME-DAY
            </motion.span>
          </motion.div>

          <div className="max-w-md space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black uppercase leading-tight text-[#3A2318]">
              Flowers, Customised <br /> Cakes &amp; Luxury Hampers
              <span className="inline-block ml-2 bg-[#ec4899] text-white font-black text-xs px-2.5 py-1 rounded-full align-middle border-2 border-[#3A2318] shadow-[2px_2px_0px_#3A2318]">
                CELEBRATE
              </span>
            </h2>
            <p className="text-sm md:text-base font-medium opacity-80 leading-relaxed text-[#3A2318]">
              JoynBloom is your celebration partner. Handcrafted floral bouquets, freshly baked eggless designer cakes, and curated gift hampers delivered straight to their doorstep with handwritten heartfelt love.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-4">
            <button
              onClick={handleOrderNow}
              className="bg-[#E4F150] text-[#3A2318] px-8 py-4 rounded-full font-black uppercase text-sm hover:bg-[#d5e243] active:translate-y-0.5 transition shadow-[4px_4px_0px_#3A2318] border-2 border-[#3A2318] flex items-center space-x-2 group"
            >
              <span>Order Flowers &amp; Cakes</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </button>

            <button
              onClick={() => scrollToSection("occasions-section")}
              className="uppercase text-xs font-black cursor-pointer flex items-center space-x-1.5 hover:text-[#4A1D6F] transition py-2"
            >
              <span>Shop By Occasion</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 pl-2 text-xs font-bold text-stone-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Shopify Hosted Checkout</span>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="pt-2 flex flex-wrap gap-4 text-xs font-bold text-stone-700">
            <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-stone-300">
              <Truck className="w-3.5 h-3.5 text-[#4A1D6F]" />
              <span>PAN India Shipping</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-stone-300">
              <Clock className="w-3.5 h-3.5 text-emerald-600" />
              <span>2-Hour Rush Delivery</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-stone-300">
              <FileText className="w-3.5 h-3.5 text-pink-600" />
              <span>Free Handwritten Note</span>
            </div>
          </div>
        </div>

        {/* Right Content - Hero Image with Rotating Text Badge */}
        <div className="relative h-[420px] sm:h-[500px] w-full flex justify-center items-center">
          {/* Yellow Rounded Backdrop */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="absolute bg-[#FFD13B] w-[88%] h-[88%] rounded-[80px] sm:rounded-[100px] border-4 border-[#3A2318] shadow-[8px_8px_0px_#3A2318] -z-10"
          />

          {/* Hero Image Showcase */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative w-[85%] h-[85%] rounded-[60px] sm:rounded-[80px] overflow-hidden border-3 border-[#3A2318] shadow-2xl group bg-white"
          >
            <Image
              src="https://cdn.shopify.com/s/files/1/0766/9281/5929/files/vivid-love-6-red-roses-bouquetes_1_569bc10f-1417-464a-a6a2-5c7f7cf7f977.jpg?v=1770544312"
              alt="JoyNBloom Fresh Vivid Love Red Roses Bouquet"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

            <div className="absolute bottom-6 left-6 text-white space-y-1">
              <span className="text-[11px] font-black uppercase tracking-wider bg-[#4A1D6F] px-2.5 py-1 rounded-full border border-white/40">
                Signature Celebration Bloom
              </span>
              <p className="text-xs text-white/95 font-semibold drop-shadow-sm">
                Vivid Love 6 Red Roses Bouquet • Hand-Tied Daily
              </p>
            </div>
          </motion.div>

          {/* Rotating Text Badge ("Joy N Bloom") */}
          <div className="absolute -bottom-6 -right-2 sm:-bottom-4 sm:-right-4 z-20">
            <RotatingBadge
              text="• JOY N BLOOM • CELEBRATE SPECIAL MOMENTS • SAME DAY DELIVERY • "
              size={150}
            />
          </div>
        </div>
      </main>

      {/* Marquee Banner */}
      <div className="bg-[#FFD13B] py-3.5 border-y-3 border-[#3A2318] overflow-hidden flex select-none">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="flex gap-8 whitespace-nowrap text-sm font-black uppercase tracking-widest text-[#3A2318]"
        >
          <span>🌸 SAME-DAY DELIVERY IN THANE &amp; MUMBAI</span>
          <span>•</span>
          <span>🎂 100% FRESHLY BAKED EGGLESS &amp; DESIGNER CAKES</span>
          <span>•</span>
          <span>💐 HAND-PICKED EXOTIC BLOOMS</span>
          <span>•</span>
          <span>🎁 LUXURY HAMPERS &amp; ROOM BALLOON SETUPS</span>
          <span>•</span>
          <span>🚚 PAN INDIA DISPATCH</span>
          <span>•</span>
          <span>💌 FREE HANDWRITTEN MESSAGE CARD</span>
          <span>•</span>
          <span>💳 SHOPIFY SECURE PCI CHECKOUT</span>
          <span>•</span>
          <span>🌸 SAME-DAY DELIVERY IN THANE &amp; MUMBAI</span>
          <span>•</span>
          <span>🎂 100% FRESHLY BAKED EGGLESS &amp; DESIGNER CAKES</span>
          <span>•</span>
          <span>💐 HAND-PICKED EXOTIC BLOOMS</span>
          <span>•</span>
          <span>🎁 LUXURY HAMPERS &amp; ROOM BALLOON SETUPS</span>
          <span>•</span>
          <span>🚚 PAN INDIA DISPATCH</span>
          <span>•</span>
          <span>💌 FREE HANDWRITTEN MESSAGE CARD</span>
          <span>•</span>
          <span>💳 SHOPIFY SECURE PCI CHECKOUT</span>
        </motion.div>
      </div>

      {/* Explore By Category Cards */}
      <section className="py-16 px-6 md:px-12 bg-white border-b-3 border-[#3A2318]" id="categories-section">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-[#4A1D6F] text-[#E4F150] px-3.5 py-1 rounded-full text-xs font-black uppercase">
                Explore By Category
              </div>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight mt-2 text-[#3A2318]">
                Find The Perfect Arrangement
              </h2>
            </div>
            <p className="text-xs font-bold text-stone-500 max-w-sm">
              From hand-tied Ecuadorian roses and luscious cakes to air-purifying indoor plants and lavish hampers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Customised Cakes",
                count: "34 Products",
                tag: "Sweet Indulgence",
                image: "https://cdn.shopify.com/s/files/1/0766/9281/5929/files/chocolate-truffle-heart-cake-half-kg_1.jpg?v=1770544307",
                desc: "Truffle heart cakes, photo cakes, Belgian chocolate, and eggless delights.",
                badge: "100% EGGLESS",
              },
              {
                title: "Fresh Flowers",
                count: "22 Products",
                tag: "Exotic Blooms",
                image: "https://cdn.shopify.com/s/files/1/0766/9281/5929/files/WhatsAppImage2026-08-10at20.07.14.jpg?v=1791882340",
                desc: "Royal Blue Orchids, Scarlet Roses, Lily Lane, and vibrant gerberas.",
                badge: "SAME DAY",
              },
              {
                title: "Gifts & Hampers",
                count: "52 Products",
                tag: "Luxury Keepsakes",
                image: "https://cdn.shopify.com/s/files/1/0766/9281/5929/files/vivid-love-6-red-roses-bouquetes_1_569bc10f-1417-464a-a6a2-5c7f7cf7f977.jpg?v=1770544312",
                desc: "Room balloon setups, curated gourmet boxes, and forever rose cloches.",
                badge: "LUXURY",
              },
              {
                title: "Green Plants",
                count: "10 Products",
                tag: "Living Decor",
                image: "https://cdn.shopify.com/s/files/1/0766/9281/5929/files/gems-decorated-hearty-chocolate-cake-1-kg_1_ffbab65d-0ac9-4d93-870f-3926ab09fa10.jpg?v=1770544311",
                desc: "Serene lucky bamboo, air-purifying greenery, and decorative planters.",
                badge: "AIR PURIFYING",
              },
            ].map((cat, idx) => (
              <div
                key={idx}
                onClick={() => scrollToSection("products-section")}
                className="bg-[#FDFBF7] rounded-3xl border-3 border-[#3A2318] shadow-[4px_4px_0px_#3A2318] overflow-hidden flex flex-col justify-between group cursor-pointer hover:-translate-y-1.5 transition-transform"
              >
                <div className="relative h-52 w-full border-b-2 border-[#3A2318] overflow-hidden bg-stone-100">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    sizes="300px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-[#FFD13B] text-black text-[10px] font-black uppercase px-2.5 py-1 rounded-full border border-[#3A2318]">
                    {cat.badge}
                  </span>
                  <span className="absolute bottom-3 right-3 bg-black/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {cat.count}
                  </span>
                </div>
                <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-stone-500 uppercase">{cat.tag}</span>
                    <h3 className="font-black text-xl text-[#3A2318] group-hover:text-[#4A1D6F] transition">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-stone-600 mt-1 font-medium leading-relaxed">
                      {cat.desc}
                    </p>
                  </div>
                  <div className="pt-3 flex items-center justify-between text-xs font-black uppercase text-[#4A1D6F]">
                    <span>Explore Products</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop By Occasion Section */}
      <section className="py-20 px-6 md:px-12 bg-[#FDFBF7] border-b-3 border-[#3A2318]" id="occasions-section">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="bg-[#FFD13B] text-[#3A2318] text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider inline-block border border-[#3A2318]">
              Shop By Occasion
            </span>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-[#3A2318]">
              Celebrate Every Special Moment
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-stone-600">
              Hand-curated collections tailored for birthdays, romantic anniversaries, sweet thank-yous, and spontaneous love.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                occasion: "Birthday",
                color: "#FFD13B",
                accent: "bg-[#FFD13B]",
                desc: "Custom photo cakes, joyful bouquets, balloon setups, and gourmet sweet surprises.",
                icon: "🎂",
                count: "35 Items",
              },
              {
                occasion: "Anniversary",
                color: "#ec4899",
                accent: "bg-[#ec4899] text-white",
                desc: "Heart-shaped truffle cakes, deep scarlet roses, and luxury memory arrangements.",
                icon: "💍",
                count: "14 Items",
              },
              {
                occasion: "Thank You",
                color: "#22c55e",
                accent: "bg-[#22c55e] text-white",
                desc: "Heartwarming gratitude combos, air-purifying plants, and artisan delicacy boxes.",
                icon: "🌿",
                count: "11 Items",
              },
              {
                occasion: "Love It. Buy",
                color: "#4A1D6F",
                accent: "bg-[#4A1D6F] text-white",
                desc: "Black Amour forever roses, grand vase arrangements, and balloon room decor.",
                icon: "❤️",
                count: "14 Items",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                onClick={() => scrollToSection("products-section")}
                className="bg-white p-6 rounded-3xl border-3 border-[#3A2318] shadow-[4px_4px_0px_#3A2318] space-y-4 hover:-translate-y-1.5 transition-transform cursor-pointer flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">{item.icon}</span>
                    <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full border border-[#3A2318] ${item.accent}`}>
                      {item.count}
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-[#3A2318]">
                    {item.occasion}
                  </h3>
                  <p className="text-xs text-stone-600 font-medium leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="pt-4 border-t border-stone-200 flex items-center justify-between text-xs font-black uppercase text-[#4A1D6F]">
                  <span>Shop Collection</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Showcase Carousel with Filter Tags */}
      <ProductCarousel
        products={products}
        onAddToCart={handleAddToCart}
        onOpenProductModal={(p) => {
          handleAddToCart(p);
          setIsCartOpen(true);
        }}
      />

      {/* Brand Story / "Thoughtfully Sourced. Beautifully Given." */}
      <section className="py-20 px-6 md:px-12 bg-white border-y-3 border-[#3A2318]" id="about-us">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="relative w-full h-[380px] sm:h-[480px] rounded-3xl overflow-hidden border-3 border-[#3A2318] shadow-[6px_6px_0px_#3A2318] bg-stone-100">
              <Image
                src="https://cdn.shopify.com/s/files/1/0766/9281/5929/files/chocolate-truffle-heart-cake-half-kg_1.jpg?v=1770544307"
                alt="JoyNBloom Handcrafted Chocolate Truffle Heart Cake"
                fill
                className="object-cover"
              />
            </div>
            {/* Floating callout */}
            <div className="absolute -bottom-6 -left-4 sm:left-6 bg-[#E4F150] p-4 rounded-2xl border-2 border-[#3A2318] shadow-[3px_3px_0px_#3A2318] max-w-xs">
              <div className="flex items-center gap-2 font-black text-xs uppercase text-[#3A2318]">
                <Clock className="w-4 h-4 text-[#4A1D6F]" />
                <span>2-Hour Express Delivery</span>
              </div>
              <p className="text-xs text-stone-800 font-medium mt-1">
                Order before 7:00 PM for guaranteed same-day surprise delivery in Thane Hiranandani &amp; Mumbai.
              </p>
            </div>
          </div>

          <div className="space-y-6 lg:pl-6">
            <div className="inline-flex items-center gap-2 bg-[#FFD13B] text-[#3A2318] px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider border border-[#3A2318]">
              <Award className="w-4 h-4" />
              <span>Thoughtfully Sourced. Beautifully Given.</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight leading-[0.95]">
              Moments Made Special. <br />
              <span className="text-[#4A1D6F]">Delivered Fresh With Love.</span>
            </h2>

            <p className="text-base text-stone-700 font-medium leading-relaxed">
              Carefully selected products designed to celebrate life&apos;s special moments. Whether it&apos;s a decadent freshly baked cake, vibrant hand-selected flowers, or a thoughtfully curated gift box, each item is crafted to deliver pure joy, superior quality, and an unforgettable celebration.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#FDFBF7] border-2 border-[#3A2318]">
                <div className="text-2xl font-black text-[#4A1D6F]">100% Fresh</div>
                <div className="text-xs font-bold uppercase text-stone-600">Daily Baked &amp; Hand-Tied</div>
                <p className="text-xs text-stone-500 mt-1">Eggless cakes made fresh to order and farm-sourced blooms.</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FDFBF7] border-2 border-[#3A2318]">
                <div className="text-2xl font-black text-[#4A1D6F]">Free Note</div>
                <div className="text-xs font-bold uppercase text-stone-600">Personalized Message</div>
                <p className="text-xs text-stone-500 mt-1">Handwritten greeting card sealed with signature JoyNBloom wax.</p>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={handleOrderNow}
                className="bg-[#3A2318] text-[#E4F150] px-7 py-3.5 rounded-full font-black text-xs uppercase hover:bg-black transition border-2 border-[#3A2318] shadow-[3px_3px_0px_#FFD13B] flex items-center gap-2"
              >
                <Gift className="w-4 h-4" />
                <span>Send A Surprise Hamper</span>
              </button>

              <button
                onClick={() => setPolicyModal("shipping")}
                className="bg-white text-[#3A2318] px-5 py-3.5 rounded-full font-black text-xs uppercase hover:bg-stone-100 transition border-2 border-[#3A2318] shadow-[2px_2px_0px_#3A2318]"
              >
                Delivery Details
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Authentic JoyNBloom Customer Reviews Section */}
      <section className="py-20 px-6 md:px-12 bg-[#FDFBF7]" id="testimonials">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-[#4A1D6F] text-[#E4F150] px-3.5 py-1 rounded-full text-xs font-black uppercase">
                What Our Customers Say
              </div>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight mt-2 text-[#3A2318]">
                Trusted by Thousands
              </h2>
            </div>
            <p className="text-xs font-bold text-stone-500 max-w-sm">
              Authentic reviews from verified happy buyers on JoyNbloom across Thane, Mumbai, and PAN India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Aishwarya Patil",
                role: "Verified Buyer",
                rating: 5,
                review:
                  "They Decorated my Baby shower Set up and it was so beautifully arranged.. All with real flowers, petal and also the fragrance.. Everyone loved the work.. Definitely 10/10 for their work and kind behavior by all!",
                highlight: "Baby Shower Flower Decor",
              },
              {
                name: "Karunashankar Tiwari",
                role: "Verified Buyer",
                rating: 5,
                review:
                  "One stop shop for all your gift needs. I was looking for a florist near Thane Hiranandani when I stumbled upon Joy n Bloom. Not only do they stock fresh flowers but also have an cake and gift shop. I was impressed with options available for all kinds of budget.",
                highlight: "Thane Hiranandani Store & Express Delivery",
              },
              {
                name: "Shrini R",
                role: "Verified Buyer",
                rating: 5,
                review:
                  "I recently ordered a flower bouquet along with a cake and a personalized message card to announce some special news to my family, and Chetna was incredibly accommodating with my last-minute request. From the moment I placed the order to the time it was delivered, which was within just 2 hours, the entire process was smooth, efficient, and impressive. The flowers are always fresh and beautifully arranged, the cakes are delicious, and the overall service is consistently top-notch.",
                highlight: "2-Hour Rush Delivery • Exceptional Service",
              },
            ].map((t, idx) => (
              <div
                key={idx}
                className="bg-white p-7 rounded-3xl border-3 border-[#3A2318] shadow-[5px_5px_0px_#3A2318] flex flex-col justify-between space-y-4 hover:-translate-y-1 transition-transform"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-500" />
                      ))}
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-300">
                      {t.role}
                    </span>
                  </div>
                  <p className="text-xs text-stone-700 font-medium leading-relaxed italic">
                    &ldquo;{t.review}&rdquo;
                  </p>
                </div>

                <div className="pt-3 border-t-2 border-stone-100 flex items-center justify-between">
                  <div>
                    <h4 className="font-black text-sm text-[#3A2318]">{t.name}</h4>
                    <span className="text-[10px] font-bold text-stone-400">{t.highlight}</span>
                  </div>
                  <span className="w-8 h-8 rounded-full bg-[#FFD13B] border border-[#3A2318] flex items-center justify-center font-black text-xs">
                    ✓
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Room Balloon Decor & Grand Setup Highlight */}
      <section className="py-16 px-6 md:px-12 bg-[#FFD13B] border-y-3 border-[#3A2318]" id="balloon-setup">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="bg-[#4A1D6F] text-[#E4F150] text-xs font-black px-3.5 py-1 rounded-full uppercase">
              Event &amp; Room Decoration
            </span>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-[#3A2318]">
              A Room Full of Love Balloon Setup
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-stone-800 leading-relaxed">
              Transform birthdays, anniversaries, and romantic proposals into fairytale settings. Includes customized balloons, ambient fairy lights, real rose petals, and celebration styling.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="bg-white px-5 py-3 rounded-2xl border-2 border-[#3A2318] shadow-[3px_3px_0px_#3A2318]">
              <span className="text-[10px] font-black uppercase text-stone-500 block">Starting At</span>
              <span className="text-2xl font-black text-[#3A2318]">₹6,349</span>
            </div>
            <button
              onClick={() => {
                const setupProd = products.find((p) => p.name.includes("Balloon"));
                if (setupProd) handleAddToCart(setupProd);
                setIsCartOpen(true);
              }}
              className="bg-[#4A1D6F] hover:bg-black text-white px-7 py-4 rounded-2xl font-black uppercase text-xs border-2 border-[#3A2318] shadow-[3px_3px_0px_#3A2318] transition flex items-center gap-2"
            >
              <span>Book Decor Setup</span>
              <ArrowRight className="w-4 h-4 text-[#E4F150]" />
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-6 md:px-12 bg-[#4A1D6F] text-white border-b-3 border-[#3A2318]" id="contact">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <span className="bg-[#FFD13B] text-black text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider inline-block border border-[#3A2318]">
            Claim 15% Off Your Celebration
          </span>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
            Get Sweet Joy In Your Inbox
          </h2>
          <p className="text-sm md:text-base text-white/80 max-w-lg mx-auto font-medium">
            Join the JoyNBloom celebration club for exclusive deals, early access to seasonal bouquets, and anniversary reminders.
          </p>

          <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              required
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Enter your email for 15% off..."
              className="flex-1 px-5 py-3.5 rounded-full bg-white text-[#3A2318] font-bold text-sm outline-hidden placeholder:text-stone-400 border-2 border-[#3A2318]"
            />
            <button
              type="submit"
              className="bg-[#E4F150] text-[#3A2318] px-7 py-3.5 rounded-full font-black uppercase text-xs hover:bg-[#d5e243] transition border-2 border-[#3A2318] shadow-[3px_3px_0px_#3A2318] shrink-0"
            >
              {newsletterSubscribed ? "Saved! ✓" : "Claim 15% Off"}
            </button>
          </form>

          {newsletterSubscribed && (
            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs font-bold text-[#E4F150]"
            >
              🎉 Welcome to JoyNBloom! Use promo code <strong>JOY15</strong> at checkout!
            </motion.p>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#FDFBF7] text-[#3A2318] py-16 px-6 md:px-12 border-t-2 border-[#3A2318]" id="footer">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4 md:col-span-1">
              <div className="flex items-center gap-2 text-3xl font-black tracking-tighter">
                <span className="w-8 h-8 rounded-full bg-[#FFD13B] border-2 border-[#3A2318] flex items-center justify-center text-sm shadow-[1px_1px_0px_#3A2318]">
                  🌸
                </span>
                <span>JoyNbloom</span>
              </div>
              <p className="text-xs font-medium text-stone-600 leading-relaxed">
                JoynBloom is your celebration partner for fresh flowers, customized designer cakes, luxury gift hampers, and indoor plants. Same-day &amp; PAN India delivery for every special occasion.
              </p>
              <div className="flex items-center gap-3 text-stone-600">
                <a
                  href="https://joynbloom.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Website"
                  className="w-8 h-8 rounded-full bg-stone-200 hover:bg-[#FFD13B] flex items-center justify-center transition border border-[#3A2318]"
                >
                  <Globe className="w-4 h-4" />
                </a>
                <button
                  onClick={() => setIsShopifyModalOpen(true)}
                  aria-label="Shopify Connection"
                  className="w-8 h-8 rounded-full bg-stone-200 hover:bg-[#FFD13B] flex items-center justify-center transition border border-[#3A2318]"
                >
                  <Store className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setPolicyModal("shipping")}
                  aria-label="Shipping"
                  className="w-8 h-8 rounded-full bg-stone-200 hover:bg-[#FFD13B] flex items-center justify-center transition border border-[#3A2318]"
                >
                  <Truck className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="font-black uppercase tracking-wider text-[#4A1D6F]">Celebration Menu</div>
              <ul className="space-y-2 font-bold text-stone-600">
                <li><button onClick={() => scrollToSection("products-section")} className="hover:text-black">Fresh Flower Bouquets</button></li>
                <li><button onClick={() => scrollToSection("products-section")} className="hover:text-black">100% Eggless Cakes</button></li>
                <li><button onClick={() => scrollToSection("products-section")} className="hover:text-black">Luxury Gift Hampers</button></li>
                <li><button onClick={() => scrollToSection("products-section")} className="hover:text-black">Air-Purifying Plants</button></li>
                <li><button onClick={() => scrollToSection("balloon-setup")} className="hover:text-black">Room Balloon Setups</button></li>
              </ul>
            </div>

            <div className="space-y-3 text-xs">
              <div className="font-black uppercase tracking-wider text-[#4A1D6F]">Delivery &amp; Hours</div>
              <div className="space-y-1.5 font-medium text-stone-600">
                <p><strong>Operating Hours:</strong> 8:00 AM – 11:00 PM</p>
                <p><strong>Same-Day Cutoff:</strong> 7:00 PM daily</p>
                <p><strong>Studio Location:</strong> Thane West, Hiranandani Estate, Mumbai, Maharashtra 400607</p>
                <p className="text-stone-400 text-[11px]">PAN India courier delivery within 3-5 business days</p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="font-black uppercase tracking-wider text-[#4A1D6F]">Shopify Gateway</div>
              <p className="font-medium text-stone-600 leading-snug">
                All checkouts and payments are securely powered by Shopify&apos;s hosted PCI-compliant payment gateway.
              </p>
              <div className="bg-white p-3 rounded-xl border border-stone-300 space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold text-[11px] text-emerald-700">
                  <ShieldCheck className="w-4 h-4" />
                  <span>joynbloom.com Verified</span>
                </div>
                <div className="text-[10px] text-stone-500">
                  UPI • Google Pay • PhonePe • Cards • NetBanking • EMI
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t-2 border-stone-200 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 font-bold gap-4">
            <div>
              &copy; 2026 JoyNbloom. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setPolicyModal("shipping")}
                className="hover:text-[#4A1D6F] underline"
              >
                Shipping Policy
              </button>
              <span>•</span>
              <button
                onClick={() => setPolicyModal("refund")}
                className="hover:text-[#4A1D6F] underline"
              >
                Refund Policy
              </button>
              <span>•</span>
              <button
                onClick={() => setPolicyModal("terms")}
                className="hover:text-[#4A1D6F] underline"
              >
                Terms of Service
              </button>
              <span>•</span>
              <button
                onClick={() => setPolicyModal("privacy")}
                className="hover:text-[#4A1D6F] underline"
              >
                Privacy Policy
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Slide-in Cart Drawer with Shopify Payment Gateway Redirection */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Shopify Push Products & Payment Gateway Manager Modal */}
      <ShopifyManagerModal
        isOpen={isShopifyModalOpen}
        onClose={() => setIsShopifyModalOpen(false)}
        products={products}
        onProductPushed={handleProductPushed}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={products}
        onSelectProduct={(p) => {
          handleAddToCart(p);
          setIsCartOpen(true);
        }}
      />

      {/* JoyNBloom Policy Viewer Modal */}
      <AnimatePresence>
        {policyModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPolicyModal(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92vw] max-w-xl bg-white text-[#3A2318] z-50 rounded-3xl p-6 sm:p-8 border-4 border-[#3A2318] shadow-2xl max-h-[85vh] overflow-y-auto"
            >
              <div className="flex justify-between items-start border-b-2 border-stone-200 pb-4">
                <div>
                  <span className="text-[10px] font-black uppercase text-[#4A1D6F]">JoyNbloom Guidelines</span>
                  <h3 className="text-2xl font-black text-[#3A2318] uppercase">
                    {policyModal === "shipping" && "Shipping & Delivery Policy"}
                    {policyModal === "refund" && "Refund & Replacement Policy"}
                    {policyModal === "terms" && "Terms of Service"}
                    {policyModal === "privacy" && "Privacy & Data Protection"}
                  </h3>
                </div>
                <button
                  onClick={() => setPolicyModal(null)}
                  className="p-1 rounded-full hover:bg-stone-100 transition"
                >
                  <X className="w-5 h-5 text-stone-600" />
                </button>
              </div>

              <div className="py-4 text-xs font-medium text-stone-700 space-y-3 leading-relaxed">
                {policyModal === "shipping" && (
                  <>
                    <p>
                      <strong>Same-Day Express Delivery:</strong> Joynbloom shall endeavour to deliver the products to the recipient as per the delivery option selected by the user while placing the order. Available across Thane, Mumbai, and surrounding metro areas.
                    </p>
                    <p>
                      <strong>PAN India Courier Delivery:</strong> Gift hampers, customized keepsakes, and select plants are dispatched via express courier with real-time tracking links provided via SMS/Email.
                    </p>
                    <p>
                      <strong>Delivery Windows:</strong> Morning slot (9 AM - 1 PM), Standard slot (1 PM - 6 PM), and Evening rush slot (6 PM - 10 PM).
                    </p>
                  </>
                )}

                {policyModal === "refund" && (
                  <>
                    <p>
                      <strong>Perishable Nature:</strong> Due to the perishable nature of fresh flowers and customized cakes, returns are generally not accepted once delivered.
                    </p>
                    <p>
                      <strong>Damaged or Incorrect Items:</strong> If the product received is damaged, defective, or incorrect, please report the issue to our customer support team within 48 hours of delivery along with a photo of the item delivered. Our team will promptly arrange a free replacement or store refund.
                    </p>
                  </>
                )}

                {policyModal === "terms" && (
                  <>
                    <p>
                      Joynbloom.com is a celebration and gifting platform owned and operated by Joynbloom. The platform allows users to browse, select, and order curated gifts, fresh flowers, and cakes for loved ones.
                    </p>
                    <p>
                      All orders are processed through Shopify&apos;s PCI-compliant hosted payment gateway, ensuring strict fraud protection and secure transaction execution.
                    </p>
                  </>
                )}

                {policyModal === "privacy" && (
                  <>
                    <p>
                      JoyNbloom operates this store and website powered by Shopify. We respect your privacy and only collect necessary details such as delivery address, recipient contact, and message card content to fulfill your celebration order.
                    </p>
                    <p>
                      We never sell or rent your personal information to third-party advertisers.
                    </p>
                  </>
                )}
              </div>

              <div className="pt-4 border-t-2 border-stone-200 flex justify-end">
                <button
                  onClick={() => setPolicyModal(null)}
                  className="bg-[#FFD13B] text-black px-6 py-2.5 rounded-full font-black text-xs uppercase border-2 border-[#3A2318] shadow-[2px_2px_0px_#3A2318]"
                >
                  Understood
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
