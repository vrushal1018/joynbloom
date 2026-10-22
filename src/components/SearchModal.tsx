"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ArrowRight, Star, TrendingUp } from "lucide-react";
import Image from "next/image";
import { BakeryProduct } from "@/lib/types";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: BakeryProduct[];
  onSelectProduct: (product: BakeryProduct) => void;
}

const TRENDING_KEYWORDS = [
  "Roses",
  "Chocolate Truffle Cake",
  "Lucky Bamboo",
  "Royal Blue Orchids",
  "Birthday Cake",
  "Eggless",
  "Lily Lane",
  "Gift Hamper",
];

export default function SearchModal({
  isOpen,
  onClose,
  products,
  onSelectProduct,
}: SearchModalProps) {
  const [query, setQuery] = useState("");

  const filtered = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase()) ||
          (p.occasions && p.occasions.some((o) => o.toLowerCase().includes(query.toLowerCase()))) ||
          (p.features && p.features.some((i) => i.toLowerCase().includes(query.toLowerCase()))) ||
          (p.ingredients && p.ingredients.some((i) => i.toLowerCase().includes(query.toLowerCase())))
      )
    : products.slice(0, 6);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50"
          />

          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-16 left-1/2 -translate-x-1/2 w-[92vw] max-w-xl bg-white text-gray-900 z-50 rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
          >
            {/* Search Input Bar (FNP Signature) */}
            <div className="p-4 bg-white border-b border-gray-100 flex items-center gap-3">
              <Search className="w-5 h-5 text-[#00853D]" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search flowers, cakes, hampers, plants, birthday..."
                className="flex-1 bg-transparent text-sm md:text-base font-semibold outline-none placeholder:text-gray-400"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="text-xs text-gray-400 hover:text-gray-600 px-2 py-1"
                >
                  Clear
                </button>
              )}
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            {/* Trending Keywords Strip */}
            <div className="px-4 py-2.5 bg-gray-50 border-b border-gray-100 flex items-center gap-2 overflow-x-auto no-scrollbar text-xs">
              <span className="flex items-center gap-1 font-bold text-gray-500 uppercase text-[10px] shrink-0">
                <TrendingUp className="w-3 h-3 text-[#00853D]" /> Trending:
              </span>
              {TRENDING_KEYWORDS.map((k) => (
                <button
                  key={k}
                  onClick={() => setQuery(k)}
                  className="bg-white hover:bg-[#EBF7EE] text-gray-700 hover:text-[#00853D] px-2.5 py-1 rounded-full border border-gray-200 text-[11px] font-medium shrink-0 transition"
                >
                  {k}
                </button>
              ))}
            </div>

            {/* Results */}
            <div className="p-4 max-h-[60vh] overflow-y-auto space-y-2">
              <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                {query.trim() ? `Search Results (${filtered.length})` : "Trending Celebration Gifts"}
              </div>

              {filtered.length === 0 ? (
                <div className="py-12 text-center text-sm font-medium text-gray-500">
                  No items found matching &quot;{query}&quot;. Try searching for &quot;Roses&quot;, &quot;Cakes&quot;, or &quot;Bamboo&quot;.
                </div>
              ) : (
                filtered.map((prod) => (
                  <div
                    key={prod.id}
                    onClick={() => {
                      onSelectProduct(prod);
                      onClose();
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#EBF7EE] cursor-pointer border border-transparent hover:border-[#B4E3C4] transition group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                        <Image src={prod.image} alt={prod.name} fill className="object-cover" />
                      </div>
                      <div>
                        <div className="font-semibold text-xs sm:text-sm text-gray-900 group-hover:text-[#00853D] transition line-clamp-1">
                          {prod.name}
                        </div>
                        <div className="text-[11px] text-gray-500 flex items-center gap-2 mt-0.5">
                          <span className="font-semibold text-[#00853D]">{prod.category}</span>
                          <span>•</span>
                          <span className="font-bold text-gray-900">₹{prod.price.toLocaleString("en-IN")}</span>
                          <span className="inline-flex items-center gap-0.5 text-amber-500 font-bold">
                            ★ {prod.rating.toFixed(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white group-hover:bg-[#00853D] group-hover:text-white border border-gray-200 flex items-center justify-center text-gray-600 shadow-2xs transition">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
