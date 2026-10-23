"use client";

import { Star, CheckCircle, Quote, ThumbsUp } from "lucide-react";

const REVIEWS = [
  {
    id: 1,
    name: "Pooja Deshmukh",
    city: "Thane West, Hiranandani Estate",
    rating: 5,
    title: "Delivered within 50 minutes! Incredible freshness",
    comment:
      "Ordered the Vivid Love Red Roses and chocolate cake for my sister's birthday. The flowers were dewy fresh and the cake was freshly baked, soft and 100% eggless. The handwritten note added such a lovely touch!",
    product: "Vivid Love 6 Red Roses Bouquet & Chocolate Cake",
    date: "Verified Delivery",
  },
  {
    id: 2,
    name: "Rohan Malhotra",
    city: "Bandra West, Mumbai",
    rating: 5,
    title: "Hands down the best flower delivery service in Mumbai",
    comment:
      "The Royal Blue Orchids looked even more stunning in person than on the website. Delivered right at midnight as promised. My fiancée was thrilled to tears. Highly recommended!",
    product: "Royal Blue Orchids Artisanal Bunch",
    date: "Verified Delivery",
  },
  {
    id: 3,
    name: "Dr. Ananya Sengupta",
    city: "Powai, Mumbai",
    rating: 5,
    title: "Exquisite presentation & seamless checkout",
    comment:
      "The Serene Lucky Bamboo plant with ceramic planter arrived securely packed without a single leaf bent. The Shopify checkout was swift and secure. JoyNbloom has earned a customer for life.",
    product: "Serene Charm Lucky Bamboo 2-Tier",
    date: "Verified Delivery",
  },
  {
    id: 4,
    name: "Vikram Singhania",
    city: "Bengaluru, Indiranagar",
    rating: 5,
    title: "Pan India courier arrived in immaculate shape",
    comment:
      "Sent a luxury hamper to my parents in Bengaluru. It was dispatched on time with live courier tracking. Everything from the sweets to the packaging was top notch.",
    product: "Joy Luxe Celebration Hamper",
    date: "Verified Delivery",
  },
];

export default function FnpTestimonials() {
  return (
    <section className="py-14 px-4 md:px-8 bg-white border-t border-gray-100" id="testimonials">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#7C0E5F] uppercase tracking-wider mb-1">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Verified Customer Stories</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Loved by 50,000+ Celebrations
            </h2>
          </div>

          {/* Aggregate Rating Badge */}
          <div className="flex items-center gap-3 bg-[#E7C4D9]/30 border border-[#E7C4D9] px-4 py-2.5 rounded-2xl">
            <div className="flex items-center gap-1 text-[#7C0E5F]">
              <span className="text-2xl font-black">4.9</span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#7C0E5F] text-[#7C0E5F]" />
                ))}
              </div>
            </div>
            <div className="border-l border-[#A64D8C]/30 pl-3 text-xs text-gray-700">
              <p className="font-bold">India&apos;s Top Rated</p>
              <p className="text-[11px] text-gray-500">1,200+ Verified Reviews</p>
            </div>
          </div>
        </div>

        {/* 4 Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-gray-50/70 border border-gray-200/80 rounded-2xl p-5 flex flex-col justify-between hover:bg-white hover:shadow-lg transition-all duration-300 space-y-3"
            >
              <div className="space-y-2.5">
                {/* Stars & Verified */}
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="flex items-center gap-1 text-[10px] font-bold text-[#7C0E5F] bg-white px-2 py-0.5 rounded-full border border-[#E7C4D9]">
                    <CheckCircle className="w-2.5 h-2.5" />
                    {rev.date}
                  </span>
                </div>

                <h4 className="text-xs font-bold text-gray-900 leading-snug">
                  &ldquo;{rev.title}&rdquo;
                </h4>

                <p className="text-[11px] text-gray-600 leading-relaxed font-normal">
                  {rev.comment}
                </p>
              </div>

              <div className="pt-3 border-t border-gray-200/60 space-y-1">
                <p className="text-xs font-bold text-gray-900">{rev.name}</p>
                <p className="text-[10px] text-gray-500">{rev.city}</p>
                <p className="text-[10px] text-[#7C0E5F] font-medium line-clamp-1">
                  Item: {rev.product}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
