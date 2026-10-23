"use client";

import { Zap, Flower2, Cake, ShieldCheck } from "lucide-react";

const TRUST_POINTS = [
  {
    icon: Zap,
    title: "60 Mins Express Delivery",
    subtitle: "Fastest delivery in Thane & Mumbai, PAN India coverage",
    badge: "Superfast",
  },
  {
    icon: Flower2,
    title: "100% Fresh Stems",
    subtitle: "Direct farm blooms hand-tied with love by master florists",
    badge: "Farm Fresh",
  },
  {
    icon: Cake,
    title: "Freshly Baked & Eggless",
    subtitle: "Artisan designer cakes baked daily on order confirmation",
    badge: "100% Veg Options",
  },
  {
    icon: ShieldCheck,
    title: "Shopify Secure Checkout",
    subtitle: "100% PCI-DSS compliant payments via UPI, Cards & NetBanking",
    badge: "Verified",
  },
];

export default function FnpTrustBar() {
  return (
    <div className="bg-white border-y border-gray-100 py-4 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {TRUST_POINTS.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition border border-transparent hover:border-gray-100"
            >
              <div className="w-11 h-11 rounded-full bg-[#E7C4D9]/40 text-[#7C0E5F] flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-gray-900 leading-tight">
                    {item.title}
                  </h4>
                </div>
                <p className="text-[11px] text-gray-500 font-medium leading-snug line-clamp-1">
                  {item.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
