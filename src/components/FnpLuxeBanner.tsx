"use client";

import Image from "next/image";
import { Sparkles, ArrowRight, ShieldCheck, Award } from "lucide-react";

interface FnpLuxeBannerProps {
  onExploreLuxe: () => void;
}

export default function FnpLuxeBanner({ onExploreLuxe }: FnpLuxeBannerProps) {
  return (
    <section className="py-10 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto rounded-3xl overflow-hidden bg-gradient-to-r from-[#5F0B48] via-[#480836] to-[#2B0421] text-white border border-[#7C0E5F]/50 shadow-xl relative">
        {/* Background glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#A64D8C]/25 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 sm:p-12 relative z-10">
          {/* Left Text details */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 bg-[#E7C4D9]/20 text-[#E7C4D9] border border-[#E7C4D9]/40 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 text-[#E7C4D9]" />
              <span>Joy Luxe Handcrafted Reserve</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
              Grand Floral Vases &amp; <br />
              <span className="text-[#E7C4D9]">Luxury Centerpieces</span>
            </h2>

            <p className="text-xs sm:text-sm text-purple-100/90 leading-relaxed max-w-lg font-medium">
              Elevate your milestones with our signature Joy Luxe collection. Featuring premium long-stemmed roses, exotic orchids, and vibrant lilies presented in imported hand-blown glass vases.
            </p>

            {/* Feature Bullets */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="flex items-center gap-2 text-gray-100 font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#E7C4D9]" />
                <span>Imported Dutch Stems</span>
              </div>
              <div className="flex items-center gap-2 text-gray-100 font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#E7C4D9]" />
                <span>Heavy Glass Vase Included</span>
              </div>
              <div className="flex items-center gap-2 text-gray-100 font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#E7C4D9]" />
                <span>Handwritten Gold Card</span>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-3 flex items-center gap-4">
              <button
                onClick={onExploreLuxe}
                className="bg-[#E7C4D9] hover:bg-white text-[#5F0B48] font-black text-xs sm:text-sm px-7 py-3 rounded-full flex items-center gap-2 shadow-lg transition-transform hover:scale-105"
              >
                <span>Explore Joy Luxe Collection</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Image Feature */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-4/3 sm:aspect-16/11 w-full rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl">
              <Image
                src="https://cdn.shopify.com/s/files/1/0766/9281/5929/files/luxury-red-rose-grand-vase-arrangement_1.jpg?v=1770544299"
                alt="Joy Luxe Grand Flower Vase"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs">
                <span className="bg-[#7C0E5F] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                  Signature Grand Vase
                </span>
                <span className="font-extrabold text-white text-sm">
                  Starting ₹2,499
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
