"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ArrowRight, Star } from "lucide-react";
import Image from "next/image";
import { BakeryProduct } from "@/lib/types";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: BakeryProduct[];
  onSelectProduct: (product: BakeryProduct) => void;
}

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
    : products.slice(0, 5);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50"
          />

          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 w-[92vw] max-w-xl bg-[#FDFBF7] text-[#3A2318] z-50 rounded-3xl shadow-2xl border-4 border-[#3A2318] overflow-hidden"
          >
            {/* Search Input Bar */}
            <div className="p-4 bg-white border-b-2 border-[#3A2318] flex items-center gap-3">
              <Search className="w-6 h-6 text-[#4A1D6F]" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search flowers, cakes, hampers, plants, birthday..."
                className="flex-1 bg-transparent text-sm md:text-base font-bold outline-hidden placeholder:text-stone-400"
              />
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Results */}
            <div className="p-4 max-h-[60vh] overflow-y-auto space-y-2">
              <div className="text-[11px] font-black uppercase tracking-wider text-stone-500 mb-2">
                {query.trim() ? `Search Results (${filtered.length})` : "Popular Right Now"}
              </div>

              {filtered.length === 0 ? (
                <div className="py-8 text-center text-sm font-bold text-stone-500">
                  No celebration items found matching &quot;{query}&quot;
                </div>
              ) : (
                filtered.map((prod) => (
                  <div
                    key={prod.id}
                    onClick={() => {
                      onSelectProduct(prod);
                      onClose();
                    }}
                    className="flex items-center justify-between p-2.5 rounded-2xl hover:bg-[#FFD13B]/20 cursor-pointer border border-transparent hover:border-[#3A2318] transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-stone-100 shrink-0 border border-stone-200">
                        <Image src={prod.image} alt={prod.name} fill className="object-cover" />
                      </div>
                      <div>
                        <div className="font-black text-sm text-[#3A2318]">{prod.name}</div>
                        <div className="text-xs text-stone-500 flex items-center gap-2">
                          <span className="font-semibold text-[#4A1D6F]">{prod.category}</span>
                          <span>•</span>
                          <span className="font-bold text-[#3A2318]">₹{prod.price.toLocaleString("en-IN")}</span>
                          {prod.badge && (
                            <span className="text-[9px] font-black px-1.5 py-0.2 rounded-full bg-stone-200 text-stone-700">
                              {prod.badge}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white border border-[#3A2318] flex items-center justify-center text-[#3A2318] shadow-[1px_1px_0px_#3A2318]">
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
