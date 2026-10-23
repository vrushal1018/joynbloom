"use client";

import { useRef } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { BakeryProduct } from "@/lib/types";
import FnpProductCard from "./FnpProductCard";

interface FnpCategoryShowcaseProps {
  title: string;
  subtitle: string;
  badge: string;
  category: string;
  products: BakeryProduct[];
  onAddToCart: (product: BakeryProduct) => void;
  onViewAll: (category: string) => void;
  wishlistIds?: string[];
  onToggleWishlist?: (productId: string) => void;
  bgLight?: boolean;
}

export default function FnpCategoryShowcase({
  title,
  subtitle,
  badge,
  category,
  products,
  onAddToCart,
  onViewAll,
  wishlistIds = [],
  onToggleWishlist,
  bgLight = true,
}: FnpCategoryShowcaseProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const categoryProducts = products.filter((p) => p.category === category);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const amount = direction === "left" ? -340 : 340;
      scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  if (categoryProducts.length === 0) return null;

  return (
    <section className={`py-12 px-4 md:px-8 ${bgLight ? "bg-white" : "bg-gray-50/70"}`}>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7C0E5F] uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{badge}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              {title}
            </h2>
            <p className="text-xs text-gray-500 font-medium max-w-lg mt-0.5">
              {subtitle}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onViewAll(category)}
              className="text-xs font-bold text-[#7C0E5F] hover:underline flex items-center gap-1"
            >
              <span>View All {category}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Scroll buttons */}
            <div className="hidden sm:flex items-center gap-1.5">
              <button
                onClick={() => scroll("left")}
                aria-label="Scroll Left"
                className="w-8 h-8 rounded-full border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center text-gray-600 transition"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scroll("right")}
                aria-label="Scroll Right"
                className="w-8 h-8 rounded-full border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center text-gray-600 transition"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Scroll Track */}
        <div
          ref={scrollRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar pb-3 pt-1 scroll-smooth"
        >
          {categoryProducts.slice(0, 8).map((product) => (
            <div key={product.id} className="w-[240px] sm:w-[280px] shrink-0">
              <FnpProductCard
                product={product}
                onAddToCart={onAddToCart}
                isWishlisted={wishlistIds.includes(product.id)}
                onToggleWishlist={onToggleWishlist}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
