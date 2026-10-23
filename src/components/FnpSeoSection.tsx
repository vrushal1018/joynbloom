"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FnpSeoSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="py-8 px-4 md:px-8 bg-white border-t border-gray-100 text-gray-600 text-xs leading-relaxed">
      <div className="max-w-7xl mx-auto space-y-4">
        <div>
          <h2 className="text-base font-bold text-gray-900 mb-2">
            JoyNbloom: India&apos;s Trusted Online Flower, Cake &amp; Celebration Gift Shop
          </h2>
          <p>
            When words fall short, let nature&apos;s vibrant blooms and handcrafted sweet treats express what is truly in your heart. At JoyNbloom, we believe that every birthday, anniversary, romantic milestone, and quiet moment of gratitude deserves an extraordinary celebration. Operating from our flagship florist and artisanal bakery studio in Thane &amp; Mumbai, JoyNbloom connects loved ones across 450+ cities in India with express 60-minute delivery, same-day surprise delivery, and midnight gifting services.
          </p>
        </div>

        {isExpanded && (
          <div className="space-y-4 pt-2 border-t border-gray-100">
            <div>
              <h3 className="font-bold text-gray-800 text-xs mb-1">
                Farm-Fresh Flowers Handcrafted by Master Florists
              </h3>
              <p>
                Our floral artisans carefully select farm-fresh stems of royal blue orchids, passionate red Dutch roses, elegant white lilies, and pastel carnations. Every bouquet is hand-tied with luxurious wrapping paper, finished with satin ribbons, and accompanied by a complimentary handwritten greeting card containing your personalized words.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-gray-800 text-xs mb-1">
                100% Eggless Artisan Cakes Baked Fresh Daily
              </h3>
              <p>
                A celebration is never complete without a decadent cake. JoyNbloom specializes in 100% eggless designer cakes, including Dutch Chocolate Truffle, velvety Red Velvet, classic Black Forest, tropical Butterscotch, and fresh seasonal fruit gateaux. Every cake is baked on demand using premium ingredients in certified hygienic facilities to ensure peak taste and fluffiness.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-gray-800 text-xs mb-1">
                Air-Purifying Indoor Plants &amp; Luxury Hampers
              </h3>
              <p>
                Looking for a gift that continues to grow? Explore our collection of 2-tier Lucky Bamboo, jade plants, and Syngonium in elegant ceramic planters. Pair them with gourmet Ferrero Rocher chocolates, plush soft toys, and luxury personalized keepsakes for a truly memorable celebration package.
              </p>
            </div>
          </div>
        )}

        <div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[#7C0E5F] font-bold inline-flex items-center gap-1 hover:underline text-xs"
          >
            <span>{isExpanded ? "Read Less" : "Read More About JoyNbloom"}</span>
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform ${isExpanded ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      </div>
    </section>
  );
}
