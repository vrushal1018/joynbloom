"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, Heart, Clock, ShoppingCart, Zap, Check } from "lucide-react";
import confetti from "canvas-confetti";
import { BakeryProduct } from "@/lib/types";
import { createShopifyCheckout } from "@/lib/shopify";

interface FnpProductCardProps {
  product: BakeryProduct;
  onAddToCart: (product: BakeryProduct) => void;
  isWishlisted?: boolean;
  onToggleWishlist?: (productId: string) => void;
}

export default function FnpProductCard({
  product,
  onAddToCart,
  isWishlisted = false,
  onToggleWishlist,
}: FnpProductCardProps) {
  const [isAdded, setIsAdded] = useState(false);
  const [isBuying, setIsBuying] = useState(false);

  const discountPercent =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleInstantBuy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsBuying(true);
    try {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.7 },
      });
      const { checkoutUrl } = await createShopifyCheckout(
        [{ product, quantity: 1 }],
        "JOY15"
      );
      window.open(checkoutUrl, "_blank", "noopener,noreferrer");
    } catch (err) {
      console.error(err);
    } finally {
      setIsBuying(false);
    }
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleWishlist) {
      onToggleWishlist(product.id);
    }
  };

  return (
    <div className="group bg-white rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden relative">
      {/* 1. Image Container */}
      <div className="relative aspect-square w-full overflow-hidden bg-gray-50">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Top Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
          <span className="bg-[#00853D] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs flex items-center gap-1">
            <Zap className="w-2.5 h-2.5 fill-current" />
            60 MINS
          </span>
          {product.badge && (
            <span className="bg-amber-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-xs">
              {product.badge}
            </span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={handleWishlistClick}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition shadow-xs z-10 ${
            isWishlisted
              ? "bg-rose-50 text-rose-600"
              : "bg-white/80 hover:bg-white text-gray-500 hover:text-rose-500"
          }`}
        >
          <Heart
            className={`w-4 h-4 ${isWishlisted ? "fill-rose-600 text-rose-600" : ""}`}
          />
        </button>

        {/* Category Tag (Bottom left of image) */}
        <div className="absolute bottom-2 left-2 z-10">
          <span className="bg-black/60 backdrop-blur-xs text-white text-[9px] font-semibold px-2 py-0.5 rounded">
            {product.category}
          </span>
        </div>
      </div>

      {/* 2. Content Details (Exact FNP Typography & Metrics) */}
      <div className="p-3.5 flex flex-col flex-1 justify-between gap-3">
        <div className="space-y-1.5">
          {/* Rating Pill & Review Count */}
          <div className="flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1 bg-[#00853D] text-white text-[10px] font-black px-1.5 py-0.5 rounded">
              <span>{product.rating.toFixed(1)}</span>
              <Star className="w-2.5 h-2.5 fill-white" />
            </span>
            <span className="text-[11px] text-gray-400 font-medium">
              ({product.reviewsCount || 120} reviews)
            </span>
          </div>

          {/* Product Title */}
          <h3 className="text-xs sm:text-sm font-semibold text-gray-800 line-clamp-2 group-hover:text-[#00853D] transition leading-snug">
            {product.name}
          </h3>

          {/* Price Block */}
          <div className="flex items-baseline gap-2 pt-0.5">
            <span className="text-sm sm:text-base font-bold text-gray-900">
              ₹{product.price.toLocaleString("en-IN")}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-gray-400 line-through">
                ₹{product.originalPrice.toLocaleString("en-IN")}
              </span>
            )}
            {discountPercent && discountPercent > 0 && (
              <span className="text-[11px] font-bold text-[#00853D]">
                {discountPercent}% OFF
              </span>
            )}
          </div>

          {/* Earliest Delivery Info (FNP Signature) */}
          <div className="flex items-center gap-1 text-[11px] text-gray-500 font-medium pt-0.5">
            <Clock className="w-3 h-3 text-[#00853D]" />
            <span>Earliest Delivery: <strong className="text-gray-700">Today</strong></span>
          </div>
        </div>

        {/* 3. Action Buttons (Add to Cart + Instant Buy) */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100">
          <button
            onClick={handleAdd}
            className={`py-2 px-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1 border ${
              isAdded
                ? "bg-[#EBF7EE] text-[#00853D] border-[#00853D]"
                : "bg-white text-[#00853D] border-[#00853D] hover:bg-[#EBF7EE]"
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>

          <button
            onClick={handleInstantBuy}
            disabled={isBuying}
            className="py-2 px-2 rounded-lg text-xs font-bold bg-[#00853D] hover:bg-[#006B31] text-white transition flex items-center justify-center gap-1 shadow-xs"
          >
            <span>{isBuying ? "Connecting..." : "Buy Now"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
