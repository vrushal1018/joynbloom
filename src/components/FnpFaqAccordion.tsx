"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FAQS = [
  {
    q: "How does 60-Mins Express & Same-Day Delivery work?",
    a: "We offer dedicated 60-90 minute express delivery across Thane, Mumbai, and selected metro pin codes for fresh flower bouquets and ready artisan cakes. For same-day deliveries, orders placed before 7:00 PM are hand-delivered on the very same day in your preferred time window (Standard, Evening, or Midnight slot).",
  },
  {
    q: "Are JoyNbloom cakes 100% eggless and freshly prepared?",
    a: "Yes! All cakes on JoyNbloom are 100% vegetarian (eggless) and freshly baked upon order confirmation using certified hygienic food standards and premium Belgian cocoa, real butter, and fresh dairy.",
  },
  {
    q: "Can I add a personalized handwritten greeting card?",
    a: "Absolutely. Every order includes a complimentary designer greeting card. You can enter your heartfelt message directly in the cart drawer before checkout, and our studio florists will neatly handwrite it for your recipient.",
  },
  {
    q: "What payment methods are supported?",
    a: "All checkouts are securely handled via Shopify's PCI-DSS compliant checkout. We support UPI (Google Pay, PhonePe, Paytm, BHIM), all major Credit & Debit cards (Visa, Mastercard, RuPay, Amex), and NetBanking from 50+ banks.",
  },
  {
    q: "What cities does JoyNbloom deliver to?",
    a: "We deliver fresh flowers and cakes directly across Mumbai, Thane, Navi Mumbai, Pune, Delhi NCR, Bengaluru, Hyderabad, Chennai, Kolkata, Ahmedabad, and 450+ other cities across India via our network of temperature-controlled local florist studios and express courier partners.",
  },
];

export default function FnpFaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-12 px-4 md:px-8 bg-gray-50/70 border-t border-gray-100">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-1.5">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00853D] uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-gray-500 font-medium">
            Everything you need to know about our fresh flowers, cakes, delivery guarantees, and checkout.
          </p>
        </div>

        <div className="space-y-3 pt-2">
          {FAQS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-gray-200/80 overflow-hidden shadow-2xs transition"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-gray-800 hover:text-[#00853D] transition"
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-[#00853D]" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-4 pt-1 text-xs text-gray-600 leading-relaxed font-normal border-t border-gray-50">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
