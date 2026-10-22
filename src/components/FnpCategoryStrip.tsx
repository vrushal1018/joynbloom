"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface FnpCategoryStripProps {
  onSelectCategory: (category: string) => void;
  onSelectOccasion?: (occasion: string) => void;
  activeCategory: string;
}

const CATEGORY_ITEMS = [
  {
    id: "all",
    label: "All Gifts",
    category: "All",
    image: "https://cdn.shopify.com/s/files/1/0766/9281/5929/files/vivid-love-6-red-roses-bouquetes_1_569bc10f-1417-464a-a6a2-5c7f7cf7f977.jpg?v=1770544312",
    badge: "118 Items",
  },
  {
    id: "flowers",
    label: "Flowers",
    category: "Flowers",
    image: "https://cdn.shopify.com/s/files/1/0766/9281/5929/files/WhatsAppImage2026-08-10at20.07.14.jpg?v=1791882340",
    badge: "Fresh Blooms",
  },
  {
    id: "cakes",
    label: "Cakes",
    category: "Cakes",
    image: "https://cdn.shopify.com/s/files/1/0766/9281/5929/collections/heart-shaped-butterscotch-cake-half-kg_1.jpg?v=1768490658",
    badge: "100% Eggless",
  },
  {
    id: "plants",
    label: "Plants",
    category: "Plants",
    image: "https://cdn.shopify.com/s/files/1/0766/9281/5929/collections/serene-charm-lucky-bamboo_1.webp?v=1768490690",
    badge: "Air-Purifying",
  },
  {
    id: "hampers",
    label: "Gift Hampers",
    category: "Gifts & Hampers",
    image: "https://cdn.shopify.com/s/files/1/0766/9281/5929/collections/personalised-mr-gentleman-valentine-gift-box_1.webp?v=1783345466",
    badge: "Curated",
  },
  {
    id: "birthday",
    label: "Birthday",
    occasion: "Birthday",
    image: "https://cdn.shopify.com/s/files/1/0766/9281/5929/collections/rosy-white-forest-cake-half-kg-eggless_1.webp?v=1783345370",
    badge: "Celebration",
  },
  {
    id: "anniversary",
    label: "Anniversary",
    occasion: "Anniversary",
    image: "https://cdn.shopify.com/s/files/1/0766/9281/5929/files/WhatsAppImage2026-08-10at20.04.32.jpg?v=1791882286",
    badge: "Romantic",
  },
  {
    id: "express",
    label: "60-Min Express",
    category: "All",
    image: "https://cdn.shopify.com/s/files/1/0766/9281/5929/files/vivid-love-6-red-roses-bouquetes_1_569bc10f-1417-464a-a6a2-5c7f7cf7f977.jpg?v=1770544312",
    badge: "⚡ Superfast",
  },
];

export default function FnpCategoryStrip({
  onSelectCategory,
  onSelectOccasion,
  activeCategory,
}: FnpCategoryStripProps) {
  const handleClick = (item: (typeof CATEGORY_ITEMS)[0]) => {
    if (item.occasion && onSelectOccasion) {
      onSelectOccasion(item.occasion);
    } else if (item.category) {
      onSelectCategory(item.category);
    }
    const el = document.getElementById("products-section");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="bg-white py-6 border-b border-gray-100 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-start sm:justify-center gap-4 sm:gap-8 overflow-x-auto no-scrollbar pb-1">
          {CATEGORY_ITEMS.map((item) => {
            const isSelected = activeCategory === item.category;
            return (
              <motion.button
                key={item.id}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleClick(item)}
                className="flex flex-col items-center group shrink-0 focus:outline-none"
              >
                {/* Circular Image Container (FNP Signature) */}
                <div
                  className={`relative w-18 h-18 sm:w-20 sm:h-20 rounded-full p-1 transition-all duration-300 shadow-xs ${
                    isSelected
                      ? "ring-3 ring-[#00853D] ring-offset-2 bg-[#EBF7EE]"
                      : "ring-2 ring-gray-100 group-hover:ring-[#00853D] group-hover:ring-offset-2 bg-gray-50"
                  }`}
                >
                  <div className="relative w-full h-full rounded-full overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.label}
                      fill
                      sizes="80px"
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* Category Label & Badge */}
                <div className="mt-2 text-center">
                  <span
                    className={`block text-xs font-bold leading-tight transition ${
                      isSelected
                        ? "text-[#00853D]"
                        : "text-gray-800 group-hover:text-[#00853D]"
                    }`}
                  >
                    {item.label}
                  </span>
                  <span className="text-[10px] text-gray-500 font-medium hidden sm:block">
                    {item.badge}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
