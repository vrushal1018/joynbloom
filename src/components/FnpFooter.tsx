"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, ShieldCheck, Heart, ArrowRight, Store } from "lucide-react";
import confetti from "canvas-confetti";

interface FnpFooterProps {
  onOpenPolicy: (policy: "shipping" | "refund" | "terms" | "privacy") => void;
  onOpenShopifyModal: () => void;
  onSelectCategory: (category: string) => void;
  onSelectOccasion: (occasion: string) => void;
}

export default function FnpFooter({
  onOpenPolicy,
  onOpenShopifyModal,
  onSelectCategory,
  onSelectOccasion,
}: FnpFooterProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    confetti({ particleCount: 50, spread: 60 });
    setTimeout(() => {
      setSubscribed(false);
      setEmail("");
    }, 4000);
  };

  const scrollToProducts = (cat: string) => {
    onSelectCategory(cat);
    const el = document.getElementById("products-section");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToOccasion = (occ: string) => {
    onSelectOccasion(occ);
    const el = document.getElementById("products-section");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-[#1C241E] text-gray-300 text-xs border-t border-gray-800" id="footer">
      {/* 1. Newsletter Strip (FNP Signature) */}
      <div className="bg-[#005B2A] py-8 px-4 md:px-8 text-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-black tracking-tight">
              Get ₹150 OFF On Your First Celebration Order
            </h3>
            <p className="text-xs text-white/80 font-medium">
              Join 50,000+ subscribers for secret discounts, anniversary reminders &amp; festive deals. Use Code: <strong>JOY15</strong>
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="flex w-full md:w-auto max-w-md gap-2">
            <div className="relative flex-1">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="w-full bg-white text-gray-900 text-xs pl-10 pr-3 py-3 rounded-full outline-none focus:ring-2 focus:ring-amber-400 transition"
              />
            </div>
            <button
              type="submit"
              className="bg-[#E49F2B] hover:bg-[#c68516] text-black font-extrabold text-xs px-6 py-3 rounded-full shrink-0 transition"
            >
              {subscribed ? "Subscribed! 🎉" : "Subscribe"}
            </button>
          </form>
        </div>
      </div>

      {/* 2. Main Footer Directory */}
      <div className="max-w-7xl mx-auto py-14 px-4 md:px-8 space-y-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {/* Brand info */}
          <div className="space-y-3.5 sm:col-span-2 md:col-span-1 lg:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#00853D] flex items-center justify-center text-white text-lg">
                🌸
              </div>
              <span className="text-xl font-black text-white">JoyNbloom</span>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed">
              India&apos;s preferred online flower &amp; celebration gift shop. Fresh farm flowers, 100% eggless artisan cakes, and curated hampers delivered with heartfelt love.
            </p>
            <div className="pt-1 space-y-1.5 text-gray-400 text-[11px]">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#00853D] shrink-0" />
                <span>Thane West, Hiranandani Estate, Mumbai 400607</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#00853D] shrink-0" />
                <span>+91 98330 00000 (8 AM – 11 PM)</span>
              </div>
            </div>
          </div>

          {/* Column 1: Flower Delivery */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider border-b border-gray-800 pb-2">
              Flower Delivery
            </h4>
            <ul className="space-y-2 text-gray-400 text-xs">
              <li>
                <button onClick={() => scrollToProducts("Flowers")} className="hover:text-white transition">
                  Royal Blue Orchids
                </button>
              </li>
              <li>
                <button onClick={() => scrollToProducts("Flowers")} className="hover:text-white transition">
                  Red Rose Bouquets
                </button>
              </li>
              <li>
                <button onClick={() => scrollToProducts("Flowers")} className="hover:text-white transition">
                  Lily Lane Arrangements
                </button>
              </li>
              <li>
                <button onClick={() => scrollToProducts("Flowers")} className="hover:text-white transition">
                  Glass Vase Grand Florals
                </button>
              </li>
              <li>
                <button onClick={() => scrollToProducts("Flowers")} className="hover:text-white transition">
                  Carnations &amp; Exotics
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Cakes Delivery */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider border-b border-gray-800 pb-2">
              Artisan Cakes
            </h4>
            <ul className="space-y-2 text-gray-400 text-xs">
              <li>
                <button onClick={() => scrollToProducts("Cakes")} className="hover:text-white transition">
                  Chocolate Truffle Cake
                </button>
              </li>
              <li>
                <button onClick={() => scrollToProducts("Cakes")} className="hover:text-white transition">
                  Rosy White Forest Cake
                </button>
              </li>
              <li>
                <button onClick={() => scrollToProducts("Cakes")} className="hover:text-white transition">
                  Heart Shaped Butterscotch
                </button>
              </li>
              <li>
                <button onClick={() => scrollToProducts("Cakes")} className="hover:text-white transition">
                  100% Eggless Cakes
                </button>
              </li>
              <li>
                <button onClick={() => scrollToProducts("Cakes")} className="hover:text-white transition">
                  Midnight Delivery Cakes
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Occasions & Gifts */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider border-b border-gray-800 pb-2">
              Occasions &amp; Hampers
            </h4>
            <ul className="space-y-2 text-gray-400 text-xs">
              <li>
                <button onClick={() => scrollToOccasion("Birthday")} className="hover:text-white transition">
                  Birthday Gifts
                </button>
              </li>
              <li>
                <button onClick={() => scrollToOccasion("Anniversary")} className="hover:text-white transition">
                  Anniversary Specials
                </button>
              </li>
              <li>
                <button onClick={() => scrollToProducts("Plants")} className="hover:text-white transition">
                  Serene Lucky Bamboo
                </button>
              </li>
              <li>
                <button onClick={() => scrollToProducts("Gifts & Hampers")} className="hover:text-white transition">
                  Luxury Gift Boxes
                </button>
              </li>
              <li>
                <button onClick={() => scrollToOccasion("Thank You")} className="hover:text-white transition">
                  Thank You Hampers
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Help & Policies */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider border-b border-gray-800 pb-2">
              Customer Support
            </h4>
            <ul className="space-y-2 text-gray-400 text-xs">
              <li>
                <button onClick={() => onOpenPolicy("shipping")} className="hover:text-white transition">
                  Shipping &amp; Delivery Policy
                </button>
              </li>
              <li>
                <button onClick={() => onOpenPolicy("refund")} className="hover:text-white transition">
                  Refund &amp; Replacement
                </button>
              </li>
              <li>
                <button onClick={() => onOpenPolicy("terms")} className="hover:text-white transition">
                  Terms of Service
                </button>
              </li>
              <li>
                <button onClick={() => onOpenPolicy("privacy")} className="hover:text-white transition">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={onOpenShopifyModal} className="hover:text-[#E49F2B] font-bold transition flex items-center gap-1">
                  <Store className="w-3 h-3" />
                  <span>Shopify Storefront Manager</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* 3. Delivery Cities Strip (FNP Signature) */}
        <div className="pt-8 border-t border-gray-800 space-y-2">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
            Popular Delivery Locations in India:
          </span>
          <p className="text-[11px] text-gray-500 leading-relaxed">
            Mumbai • Thane • Navi Mumbai • Delhi NCR • Bengaluru • Pune • Hyderabad • Chennai • Kolkata • Ahmedabad • Jaipur • Chandigarh • Lucknow • Surat • Kochi • Indore • Nagpur • Coimbatore • Bhopal • Vadodara &amp; 450+ other cities.
          </p>
        </div>

        {/* 4. Bottom Payment Icons & Copyright */}
        <div className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-500">
          <div>
            &copy; 2026 JoyNbloom India. All Rights Reserved. Exact FNP-Class Experience.
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-gray-900 border border-gray-800 px-3 py-1.5 rounded-lg text-gray-300 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-[#00853D]" />
              <span>Shopify PCI-DSS 256-Bit Encrypted</span>
            </div>
            <span className="text-gray-400 font-medium">
              UPI • Cards • NetBanking • Wallets
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
