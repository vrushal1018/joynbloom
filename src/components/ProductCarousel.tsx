"use client";

import { useState, useRef } from "react";
import { Sparkles, ArrowRight, ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { BakeryProduct, ProductOccasion } from "@/lib/types";
import FnpProductCard from "./FnpProductCard";

interface ProductCarouselProps {
  products: BakeryProduct[];
  onAddToCart: (product: BakeryProduct) => void;
  activeCategory?: string;
  onSelectCategory?: (category: string) => void;
  activeOccasion?: string;
  onSelectOccasion?: (occasion: string) => void;
  wishlistIds?: string[];
  onToggleWishlist?: (productId: string) => void;
}

const CATEGORIES = [
  { id: "All", label: "All Items" },
  { id: "Flowers", label: "🌸 Flowers" },
  { id: "Cakes", label: "🎂 Cakes" },
  { id: "Plants", label: "🪴 Plants" },
  { id: "Gifts & Hampers", label: "🎁 Hampers" },
];

const OCCASIONS: { id: string; label: string }[] = [
  { id: "All", label: "All Occasions" },
  { id: "Birthday", label: "Birthday" },
  { id: "Anniversary", label: "Anniversary" },
  { id: "Thank You", label: "Thank You" },
  { id: "Love It. Buy", label: "Love & Romance" },
];

export default function ProductCarousel({
  products,
  onAddToCart,
  activeCategory = "All",
  onSelectCategory,
  activeOccasion = "All",
  onSelectOccasion,
  wishlistIds = [],
  onToggleWishlist,
}: ProductCarouselProps) {
  const [localCategory, setLocalCategory] = useState("All");
  const [localOccasion, setLocalOccasion] = useState("All");
  const [visibleCount, setVisibleCount] = useState(12);

  const currentCategory = onSelectCategory ? activeCategory : localCategory;
  const currentOccasion = onSelectOccasion ? activeOccasion : localOccasion;

  const handleCategoryChange = (cat: string) => {
    if (onSelectCategory) {
      onSelectCategory(cat);
    } else {
      setLocalCategory(cat);
    }
    setVisibleCount(12);
  };

  const handleOccasionChange = (occ: string) => {
    if (onSelectOccasion) {
      onSelectOccasion(occ);
    } else {
      setLocalOccasion(occ);
    }
    setVisibleCount(12);
  };

  const filteredProducts = products.filter((item) => {
    const matchesCat = currentCategory === "All" || item.category === currentCategory;
    const matchesOccasion =
      currentOccasion === "All" ||
      (item.occasions && item.occasions.includes(currentOccasion as ProductOccasion));
    return matchesCat && matchesOccasion;
  });

  const displayedProducts = filteredProducts.slice(0, visibleCount);

  return (
    <section className="py-14 px-4 md:px-8 bg-gray-50/50" id="products-section">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header (FNP Signature) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7C0E5F] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Handcrafted Celebration Specials</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Best Sellers &amp; Trending Gifts
            </h2>
            <p className="text-xs text-gray-500 font-medium max-w-lg">
              Fresh farm flowers, freshly baked 100% eggless cakes, serene plants, and curated celebration hampers.
            </p>
          </div>

          <div className="text-xs text-gray-500 font-semibold">
            Showing <strong className="text-gray-900">{filteredProducts.length}</strong> celebration items
          </div>
        </div>

        {/* 1. Category Filter Tabs (Pill tabs) */}
        <div className="flex items-center justify-between gap-4 border-b border-gray-200 pb-3 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2">
            {CATEGORIES.map((tab) => {
              const isSelected = currentCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleCategoryChange(tab.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition shrink-0 ${
                    isSelected
                      ? "bg-[#7C0E5F] text-white shadow-xs"
                      : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Occasion Filter Buttons */}
          <div className="hidden lg:flex items-center gap-1.5 shrink-0">
            <span className="text-[11px] font-bold text-gray-400 uppercase mr-1">
              Filter:
            </span>
            {OCCASIONS.map((occ) => {
              const isSelected = currentOccasion === occ.id;
              return (
                <button
                  key={occ.id}
                  onClick={() => handleOccasionChange(occ.id)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition ${
                    isSelected
                      ? "bg-[#E7C4D9]/40 text-[#7C0E5F] font-bold border border-[#7C0E5F]"
                      : "bg-white text-gray-600 hover:text-gray-900 border border-gray-200"
                  }`}
                >
                  {occ.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Product Grid */}
        {displayedProducts.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center space-y-3 border border-gray-200">
            <p className="text-base font-bold text-gray-800">
              No products found in this filter combination.
            </p>
            <p className="text-xs text-gray-500">
              Try switching to &quot;All Items&quot; or selecting a different category.
            </p>
            <button
              onClick={() => {
                handleCategoryChange("All");
                handleOccasionChange("All");
              }}
              className="bg-[#7C0E5F] hover:bg-[#5F0B48] text-white text-xs font-bold px-5 py-2.5 rounded-full uppercase transition"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {displayedProducts.map((product) => (
              <FnpProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                isWishlisted={wishlistIds.includes(product.id)}
                onToggleWishlist={onToggleWishlist}
              />
            ))}
          </div>
        )}

        {/* Load More Button */}
        {visibleCount < filteredProducts.length && (
          <div className="text-center pt-4">
            <button
              onClick={() => setVisibleCount((prev) => prev + 12)}
              className="bg-white hover:bg-gray-50 text-gray-800 font-bold text-xs uppercase px-8 py-3.5 rounded-full border border-gray-300 shadow-2xs hover:border-gray-400 transition"
            >
              Load More Celebration Items ({filteredProducts.length - visibleCount} remaining)
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
