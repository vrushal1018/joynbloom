"use client";

import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { ProductOccasion } from "@/lib/types";

interface FnpOccasionsGridProps {
  onSelectOccasion: (occasion: string) => void;
}

const OCCASIONS = [
  {
    id: "birthday",
    title: "Birthday Surprises",
    subtitle: "Flowers, Eggless Cakes & Midnight Treats",
    occasion: "Birthday" as ProductOccasion,
    image: "https://cdn.shopify.com/s/files/1/0766/9281/5929/collections/rosy-white-forest-cake-half-kg-eggless_1.webp?v=1783345370",
    badge: "Most Popular",
    badgeColor: "bg-[#7C0E5F]",
  },
  {
    id: "anniversary",
    title: "Anniversary Romance",
    subtitle: "Heart Cakes & Grand Rose Arrangements",
    occasion: "Anniversary" as ProductOccasion,
    image: "https://cdn.shopify.com/s/files/1/0766/9281/5929/collections/heart-shaped-butterscotch-cake-half-kg_1.jpg?v=1768490658",
    badge: "Couple Special",
    badgeColor: "bg-[#A64D8C]",
  },
  {
    id: "thankyou",
    title: "Thank You & Gratitude",
    subtitle: "Royal Blue Orchids & Thoughtful Hampers",
    occasion: "Thank You" as ProductOccasion,
    image: "https://cdn.shopify.com/s/files/1/0766/9281/5929/files/WhatsAppImage2026-08-10at20.07.14.jpg?v=1791882340",
    badge: "Express Appreciation",
    badgeColor: "bg-[#5F0B48]",
  },
  {
    id: "loveit",
    title: "Luxury Keepsakes",
    subtitle: "Curated Gifting Boxes & Fresh Blooms",
    occasion: "Love It. Buy" as ProductOccasion,
    image: "https://cdn.shopify.com/s/files/1/0766/9281/5929/collections/personalised-mr-gentleman-valentine-gift-box_1.webp?v=1783345466",
    badge: "Trending Gifts",
    badgeColor: "bg-[#7C0E5F]",
  },
];

export default function FnpOccasionsGrid({ onSelectOccasion }: FnpOccasionsGridProps) {
  const handleClick = (occasion: string) => {
    onSelectOccasion(occasion);
    const el = document.getElementById("products-section");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-12 px-4 md:px-8 bg-gray-50/60" id="occasions-section">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#7C0E5F] uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Moments of Joy</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Celebrate Special Moments
            </h2>
          </div>
          <p className="text-xs text-gray-500 font-medium max-w-sm">
            Discover curated flowers, artisan cakes, and personalized hampers crafted for life&apos;s most meaningful milestones.
          </p>
        </div>

        {/* 4-Card Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {OCCASIONS.map((item) => (
            <div
              key={item.id}
              onClick={() => handleClick(item.occasion)}
              className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-xs hover:shadow-xl transition-all duration-300 bg-white border border-gray-100 flex flex-col"
            >
              <div className="relative aspect-4/3 w-full overflow-hidden bg-gray-100">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <span
                  className={`absolute top-3 left-3 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm ${item.badgeColor}`}
                >
                  {item.badge}
                </span>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
              </div>

              <div className="p-4 flex flex-col justify-between flex-1 space-y-2">
                <div>
                  <h3 className="font-bold text-gray-900 text-sm group-hover:text-[#7C0E5F] transition">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                    {item.subtitle}
                  </p>
                </div>

                <div className="flex items-center text-xs font-bold text-[#7C0E5F] group-hover:translate-x-1 transition-transform pt-1">
                  <span>Explore Collection</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
