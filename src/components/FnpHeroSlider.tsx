"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles, Clock, ArrowRight, ShieldCheck } from "lucide-react";
import Image from "next/image";

interface FnpHeroSliderProps {
  onOrderNow: () => void;
  onExploreCategory: (category: string) => void;
}

const SLIDES = [
  {
    id: 1,
    tag: "⚡ 60-MINS EXPRESS DELIVERY",
    tagColor: "bg-emerald-600",
    title: "Fresh Blooms & Designer Cakes",
    subtitle: "Hand-tied daily farm-fresh flowers & 100% freshly baked eggless cakes delivered with love to their doorstep.",
    cta: "Order Flowers & Cakes",
    category: "Flowers",
    badge: "Thane & Mumbai 60-Min Rush Delivery",
    image: "https://cdn.shopify.com/s/files/1/0766/9281/5929/files/WhatsAppImage2026-08-10at20.07.14.jpg?v=1791882340",
    accent: "#00853D",
    gradient: "from-[#004B22] via-[#005B2A] to-transparent",
  },
  {
    id: 2,
    tag: "👑 JOY LUXE COLLECTION",
    tagColor: "bg-amber-600",
    title: "Luxury Floral Vases & Exotics",
    subtitle: "Artisanal Dutch roses, vibrant lilies and royal orchids arranged in handcrafted imported glass vases.",
    cta: "Explore Luxe Collection",
    category: "Flowers",
    badge: "Handcrafted For Milestone Celebrations",
    image: "https://cdn.shopify.com/s/files/1/0766/9281/5929/files/luxury-red-rose-grand-vase-arrangement_1.jpg?v=1770544299",
    accent: "#E49F2B",
    gradient: "from-[#422006] via-[#78350F] to-transparent",
  },
  {
    id: 3,
    tag: "🎂 CELEBRATE SPECIAL MOMENTS",
    tagColor: "bg-rose-600",
    title: "Birthday & Anniversary Hampers",
    subtitle: "From heart-shaped truffle cakes to customized hampers, make every anniversary and birthday unforgettable.",
    cta: "Shop Celebration Cakes",
    category: "Cakes",
    badge: "100% Hygienic & Eggless Options",
    image: "https://cdn.shopify.com/s/files/1/0766/9281/5929/collections/heart-shaped-butterscotch-cake-half-kg_1.jpg?v=1768490658",
    accent: "#E11D48",
    gradient: "from-[#881337] via-[#9F1239] to-transparent",
  },
  {
    id: 4,
    tag: "🌿 SERENE INDOOR GREENERY",
    tagColor: "bg-teal-700",
    title: "Air-Purifying Plants & Good Luck",
    subtitle: "Serene 2-tier Lucky Bamboo, jade plants and desktop green companions to bring peace and prosperity.",
    cta: "Shop Green Plants",
    category: "Plants",
    badge: "Same-Day & PAN India Courier",
    image: "https://cdn.shopify.com/s/files/1/0766/9281/5929/collections/serene-charm-lucky-bamboo_1.webp?v=1768490690",
    accent: "#0D9488",
    gradient: "from-[#134E4A] via-[#115E59] to-transparent",
  },
];

export default function FnpHeroSlider({
  onOrderNow,
  onExploreCategory,
}: FnpHeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isHovered]);

  const slide = SLIDES[currentSlide];

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  return (
    <section
      className="relative bg-[#004B22] overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="max-w-7xl mx-auto relative min-h-[360px] sm:min-h-[420px] md:min-h-[460px] flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 flex flex-col md:flex-row items-center justify-between"
          >
            {/* Background Image Container */}
            <div className="absolute inset-0 z-0">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority
                sizes="100vw"
                className="object-cover object-center md:object-right"
              />
              {/* Gradient Mask for Readability (FNP Style) */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${slide.gradient} md:w-3/4`}
              />
              <div className="absolute inset-0 bg-black/35 md:bg-transparent" />
            </div>

            {/* Slide Content (Left) */}
            <div className="relative z-10 px-6 sm:px-12 py-12 max-w-2xl text-white space-y-4">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm"
                style={{ backgroundColor: slide.accent }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{slide.tag}</span>
              </motion.div>

              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-[1.1] text-white"
              >
                {slide.title}
              </motion.h1>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-xs sm:text-sm md:text-base text-white/90 font-medium max-w-lg leading-relaxed drop-shadow-sm"
              >
                {slide.subtitle}
              </motion.p>

              {/* Badges / Micro Promises */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="flex flex-wrap items-center gap-3 pt-1 text-xs"
              >
                <span className="flex items-center gap-1.5 bg-black/40 backdrop-blur-xs px-3 py-1 rounded-full border border-white/20 text-white font-semibold">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>{slide.badge}</span>
                </span>
                <span className="hidden sm:flex items-center gap-1.5 bg-black/40 backdrop-blur-xs px-3 py-1 rounded-full border border-white/20 text-white font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>100% Smile Guaranteed</span>
                </span>
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="flex items-center gap-3 sm:gap-4 pt-2"
              >
                <button
                  onClick={() => {
                    onExploreCategory(slide.category);
                    const el = document.getElementById("products-section");
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="bg-[#00853D] hover:bg-[#006B31] text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-full flex items-center gap-2 shadow-lg transition-transform hover:scale-105"
                >
                  <span>{slide.cta}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onOrderNow}
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-xs text-white border border-white/40 font-bold text-xs sm:text-sm px-5 py-3 rounded-full transition"
                >
                  Instant Order
                </button>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Arrows */}
        <button
          onClick={handlePrev}
          aria-label="Previous Slide"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/25 hover:bg-white text-gray-900 flex items-center justify-center transition backdrop-blur-xs shadow-md"
        >
          <ChevronLeft className="w-5 h-5 text-white hover:text-gray-900" />
        </button>
        <button
          onClick={handleNext}
          aria-label="Next Slide"
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/25 hover:bg-white text-gray-900 flex items-center justify-center transition backdrop-blur-xs shadow-md"
        >
          <ChevronRight className="w-5 h-5 text-white hover:text-gray-900" />
        </button>

        {/* Indicator Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {SLIDES.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentSlide
                  ? "w-8 bg-[#00853D] ring-2 ring-white"
                  : "w-2 bg-white/60 hover:bg-white"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
