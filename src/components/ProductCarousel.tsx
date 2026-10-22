"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  Star,
  ShoppingBag,
  ArrowRight,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Zap,
  Heart,
  Gift,
  Clock,
} from "lucide-react";
import Image from "next/image";
import confetti from "canvas-confetti";
import { BakeryProduct, ProductCategory, ProductOccasion } from "@/lib/types";
import { createShopifyCheckout } from "@/lib/shopify";

interface ProductCarouselProps {
  products: BakeryProduct[];
  onAddToCart: (product: BakeryProduct) => void;
  onOpenProductModal?: (product: BakeryProduct) => void;
}

export default function ProductCarousel({
  products,
  onAddToCart,
  onOpenProductModal,
}: ProductCarouselProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [activeOccasion, setActiveOccasion] = useState<string>("All");

  const categories: string[] = ["All", "Flowers", "Cakes", "Gifts & Hampers", "Plants"];
  const occasions: string[] = ["All", "Birthday", "Anniversary", "Thank You", "Love It. Buy"];

  const carouselRef = useRef<HTMLDivElement>(null);

  const filteredProducts = products.filter((item) => {
    const matchesCat =
      activeCategory === "All" || item.category === activeCategory;
    const matchesOccasion =
      activeOccasion === "All" ||
      (item.occasions && item.occasions.includes(activeOccasion as ProductOccasion));
    return matchesCat && matchesOccasion;
  });

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -360, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 360, behavior: "smooth" });
    }
  };

  const handleInstantShopifyBuy = async (e: React.MouseEvent, product: BakeryProduct) => {
    e.stopPropagation();
    confetti({
      particleCount: 50,
      spread: 50,
      origin: { y: 0.7 },
    });
    const { checkoutUrl } = await createShopifyCheckout([{ product, quantity: 1 }], "JOY15");
    window.open(checkoutUrl, "_blank", "noopener,noreferrer");
  };

  const handleAdd = (e: React.MouseEvent, product: BakeryProduct) => {
    e.stopPropagation();
    onAddToCart(product);
  };

  return (
    <section className="py-20 px-4 md:px-12 bg-[#FDFBF7] relative overflow-hidden" id="products-section">
      {/* Decorative Background Blob */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[#FFD13B]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#4A1D6F]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 bg-[#4A1D6F] text-[#E4F150] px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Handcrafted With Fresh Love Daily</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-[#3A2318] leading-[0.9]">
              Celebration Specials <br />
              <span className="text-[#4A1D6F] underline decoration-[#FFD13B] decoration-4">Delivered Fresh</span>
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-stone-600 max-w-lg">
              Explore freshly baked eggless & designer cakes, exotic hand-tied bouquets, luxury hampers, and vibrant indoor plants.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={scrollLeft}
              className="w-12 h-12 rounded-full bg-white text-[#3A2318] border-2 border-[#3A2318] shadow-[2px_2px_0px_#3A2318] hover:bg-[#FFD13B] transition flex items-center justify-center active:translate-x-0.5 active:translate-y-0.5"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={scrollRight}
              className="w-12 h-12 rounded-full bg-[#FFD13B] text-[#3A2318] border-2 border-[#3A2318] shadow-[2px_2px_0px_#3A2318] hover:bg-yellow-400 transition flex items-center justify-center active:translate-x-0.5 active:translate-y-0.5"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Filter Bars (Category & Occasion) */}
        <div className="space-y-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <span className="text-xs font-black uppercase tracking-wider text-stone-400 mr-2 shrink-0">
              Category:
            </span>
            <div className="flex flex-wrap gap-2 p-1.5 bg-stone-200/80 rounded-full border-2 border-[#3A2318]">
              {categories.map((category) => {
                const isActive = activeCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 sm:px-5 py-2 rounded-full font-black text-xs uppercase tracking-wider transition-all duration-200 shrink-0 ${
                      isActive
                        ? "bg-[#3A2318] text-[#E4F150] shadow-md scale-105"
                        : "text-[#3A2318] hover:bg-white/80"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Occasion Quick Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <span className="text-xs font-black uppercase tracking-wider text-stone-400 mr-2 shrink-0">
              Occasion:
            </span>
            <div className="flex items-center gap-2">
              {occasions.map((occ) => {
                const isActive = activeOccasion === occ;
                return (
                  <button
                    key={occ}
                    onClick={() => setActiveOccasion(occ)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all border shrink-0 ${
                      isActive
                        ? "bg-[#4A1D6F] text-[#E4F150] border-[#3A2318] shadow-[2px_2px_0px_#3A2318]"
                        : "bg-white text-stone-700 border-stone-300 hover:border-[#3A2318]"
                    }`}
                  >
                    {occ === "All" ? "All Moments" : occ}
                  </button>
                );
              })}
              <span className="text-xs font-bold text-stone-500 pl-3">
                Showing {filteredProducts.length} items
              </span>
            </div>
          </div>
        </div>

        {/* Horizontal Scroll Carousel */}
        <div
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto pb-8 pt-2 scrollbar-none scroll-smooth"
        >
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.2 }}
              className="w-[290px] sm:w-[320px] shrink-0 bg-white rounded-3xl border-3 border-[#3A2318] shadow-[5px_5px_0px_#3A2318] overflow-hidden flex flex-col justify-between group transition-shadow cursor-pointer"
              onClick={() => onOpenProductModal && onOpenProductModal(product)}
            >
              {/* Image and Floating Badges */}
              <div className="relative h-60 w-full bg-[#FDFBF7] overflow-hidden border-b-3 border-[#3A2318]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="320px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Top Badge */}
                {product.badge && (
                  <span
                    style={{ backgroundColor: product.badgeColor || "#FFD13B" }}
                    className="absolute top-4 left-4 text-black text-[10px] font-black uppercase px-2.5 py-1 rounded-full border-2 border-[#3A2318] shadow-[2px_2px_0px_#3A2318]"
                  >
                    {product.badge}
                  </span>
                )}

                {/* Rating Pill */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-xs text-[#3A2318] text-[11px] font-black px-2.5 py-1 rounded-full border border-[#3A2318] flex items-center gap-1 shadow-xs">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                  <span>{product.rating}</span>
                  <span className="text-stone-400">({product.reviewsCount})</span>
                </div>

                {/* Same-day Pill */}
                <div className="absolute bottom-3 left-3 bg-[#3A2318]/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 border border-white/20">
                  <Clock className="w-3 h-3 text-[#E4F150]" />
                  <span>Same-Day Available</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-wider text-[#4A1D6F]">
                    <span>{product.category}</span>
                    {product.occasions && product.occasions[0] && (
                      <span className="text-[10px] font-bold text-stone-500 bg-stone-100 px-2 py-0.5 rounded-full">
                        {product.occasions[0]}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-black text-[#3A2318] leading-tight line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed font-medium">
                    {product.description}
                  </p>
                </div>

                {/* Features tags */}
                <div className="flex flex-wrap gap-1.5">
                  {(product.features || product.ingredients || []).slice(0, 3).map((feat, i) => (
                    <span
                      key={i}
                      className="text-[10px] bg-stone-100 text-stone-700 font-semibold px-2 py-0.5 rounded-md border border-stone-200"
                    >
                      {feat}
                    </span>
                  ))}
                </div>

                {/* Pricing and Action Buttons */}
                <div className="pt-3 border-t-2 border-stone-100 flex items-center justify-between gap-2">
                  <div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl font-black text-[#3A2318]">
                        ₹{product.price.toLocaleString("en-IN")}
                      </span>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <span className="text-xs text-stone-400 line-through font-bold">
                          ₹{product.originalPrice.toLocaleString("en-IN")}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-emerald-600 font-bold uppercase">
                      ✓ In Stock For Delivery
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={(e) => handleAdd(e, product)}
                      className="bg-[#FFD13B] hover:bg-yellow-400 text-[#3A2318] p-3 rounded-2xl font-black border-2 border-[#3A2318] shadow-[2px_2px_0px_#3A2318] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition active:scale-95"
                      title="Add to Celebration Cart"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>

                    <button
                      onClick={(e) => handleInstantShopifyBuy(e, product)}
                      className="bg-[#4A1D6F] hover:bg-[#391555] text-white px-3 py-2.5 rounded-2xl font-black text-xs uppercase border-2 border-[#3A2318] shadow-[2px_2px_0px_#3A2318] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition flex items-center gap-1"
                      title="Shopify Instant Payment Gateway"
                    >
                      <Zap className="w-3.5 h-3.5 text-[#E4F150]" />
                      <span>Buy</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
