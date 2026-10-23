"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Gift,
  FileText,
  Clock,
  Check,
} from "lucide-react";
import Image from "next/image";
import confetti from "canvas-confetti";
import { CartItem } from "@/lib/types";
import { createShopifyCheckout, getShopifyConfig } from "@/lib/shopify";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

const DELIVERY_SLOTS = [
  "⚡ Express 60-Mins Delivery",
  "Standard Slot (9 AM - 6 PM)",
  "Evening Slot (6 PM - 9 PM)",
  "🌙 Midnight Surprise (11 PM - 12 AM)",
];

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [promoCode, setPromoCode] = useState("JOY15");
  const [promoApplied, setPromoApplied] = useState(true);
  const [giftNote, setGiftNote] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(DELIVERY_SLOTS[0]);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutNotice, setCheckoutNotice] = useState<string | null>(null);

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const isDiscountEligible = promoApplied && (promoCode.trim().toUpperCase() === "JOY15" || subtotal >= 2000);
  const discountAmount = isDiscountEligible ? Math.round(subtotal * 0.15) : 0;
  const total = Math.max(0, subtotal - discountAmount);
  const config = getShopifyConfig();

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === "JOY15") {
      setPromoApplied(true);
      confetti({ particleCount: 35, spread: 50 });
    }
  };

  const handleCheckout = async () => {
    if (items.length === 0) return;
    setIsCheckingOut(true);

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
      });

      const { checkoutUrl } = await createShopifyCheckout(
        items,
        isDiscountEligible ? "JOY15" : ""
      );

      setCheckoutNotice(`Redirecting to Shopify Hosted Checkout on ${config.shopDomain}...`);

      setTimeout(() => {
        setIsCheckingOut(false);
        window.open(checkoutUrl, "_blank", "noopener,noreferrer");
      }, 800);
    } catch (err) {
      console.error("Checkout error:", err);
      setIsCheckingOut(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white text-gray-900 z-50 shadow-2xl flex flex-col border-l border-gray-200"
          >
            {/* 1. Header (JoyNbloom Brand Purple) */}
            <div className="p-4 sm:p-5 bg-[#7C0E5F] text-white flex items-center justify-between shadow-xs">
              <div>
                <h3 className="text-base font-bold tracking-tight flex items-center gap-2">
                  <span>Your Celebration Cart</span>
                  <span className="bg-[#E7C4D9] text-[#5F0B48] text-xs font-black px-2 py-0.5 rounded-full">
                    {items.reduce((s, i) => s + i.quantity, 0)} items
                  </span>
                </h3>
                <p className="text-[11px] text-white/80">
                  Same-Day PAN India Delivery • 100% Smile Guaranteed
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
                aria-label="Close Cart"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Same-day Express Notice Bar */}
            <div className="bg-[#FAF3F7] px-4 py-2 border-b border-[#E7C4D9] flex items-center justify-between text-xs text-[#7C0E5F] font-semibold">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#7C0E5F]" />
                <span>60-Mins Express Delivery Available</span>
              </div>
              <span className="bg-[#7C0E5F] text-white text-[10px] px-2 py-0.5 rounded font-bold">
                FREE CARD NOTE
              </span>
            </div>

            {/* 2. Cart Items List */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-16">
                  <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
                    <Gift className="w-10 h-10 text-gray-400" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-lg text-gray-800">Your cart is empty!</h4>
                    <p className="text-xs text-gray-500 max-w-xs leading-relaxed">
                      Explore fresh flowers, designer eggless cakes, serene plants, and luxury celebration hampers.
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="bg-[#7C0E5F] hover:bg-[#5F0B48] text-white px-6 py-2.5 rounded-full font-bold text-xs uppercase shadow-xs transition"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={item.product.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex gap-3.5 p-3 bg-white rounded-xl border border-gray-200 hover:border-gray-300 shadow-2xs transition"
                  >
                    {/* Product Image */}
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-50 shrink-0 border border-gray-100">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <span className="text-[10px] font-bold uppercase text-[#7C0E5F]">
                            {item.product.category}
                          </span>
                          <h4 className="font-semibold text-xs sm:text-sm text-gray-900 leading-snug line-clamp-2">
                            {item.product.name}
                          </h4>
                        </div>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-gray-400 hover:text-red-500 transition p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        {/* Quantity Stepper */}
                        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-gray-50">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, -1)}
                            className="p-1.5 hover:bg-gray-200 transition text-gray-700"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 font-bold text-xs text-gray-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, 1)}
                            className="p-1.5 hover:bg-gray-200 transition text-gray-700"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <span className="font-bold text-sm text-gray-900">
                            ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}

              {/* Delivery Slot Selector */}
              {items.length > 0 && (
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-gray-800">
                    <Clock className="w-3.5 h-3.5 text-[#7C0E5F]" />
                    <span>Select Preferred Delivery Slot</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {DELIVERY_SLOTS.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setSelectedSlot(slot)}
                        className={`text-left p-2 rounded-lg text-[11px] border transition ${
                          selectedSlot === slot
                            ? "bg-[#FAF3F7] border-[#7C0E5F] text-[#7C0E5F] font-bold"
                            : "bg-white border-gray-200 text-gray-700 hover:border-gray-300"
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Free Handwritten Note Input */}
              {items.length > 0 && (
                <div className="p-3.5 bg-[#FAF3F7] rounded-xl border border-[#E7C4D9] space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-[#5F0B48]">
                    <div className="flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-[#7C0E5F]" />
                      <span>Complimentary Handwritten Message Card</span>
                    </div>
                    <span className="text-[10px] bg-[#E7C4D9] text-[#5F0B48] px-1.5 py-0.5 rounded font-bold">
                      FREE
                    </span>
                  </div>
                  <input
                    type="text"
                    value={giftNote}
                    onChange={(e) => setGiftNote(e.target.value)}
                    placeholder="E.g., Happy Birthday Dearest Mom! With all our love..."
                    className="w-full text-xs font-medium px-3 py-2 bg-white rounded-lg border border-[#E7C4D9] outline-none focus:border-[#7C0E5F]"
                  />
                  <p className="text-[10px] text-gray-600 font-medium">
                    Our studio florists will neatly handwrite your note on premium embossed paper.
                  </p>
                </div>
              )}
            </div>

            {/* 3. Footer Summary & Checkout Button */}
            {items.length > 0 && (
              <div className="p-4 sm:p-5 bg-white border-t border-gray-200 space-y-3.5 shadow-lg">
                {/* Promo Code Input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Coupon code (e.g. JOY15)"
                    className="flex-1 px-3 py-2 text-xs font-bold rounded-lg border border-gray-300 uppercase outline-none focus:border-[#7C0E5F]"
                  />
                  <button
                    onClick={handleApplyPromo}
                    className="bg-[#7C0E5F] hover:bg-[#5F0B48] text-white px-4 py-2 rounded-lg text-xs font-bold uppercase transition"
                  >
                    Apply
                  </button>
                </div>

                {/* Pricing Summary */}
                <div className="space-y-1.5 text-xs text-gray-600 font-medium">
                  <div className="flex justify-between">
                    <span>Item Subtotal</span>
                    <span className="font-semibold text-gray-900">₹{subtotal.toLocaleString("en-IN")}</span>
                  </div>

                  {isDiscountEligible && (
                    <div className="flex justify-between text-[#7C0E5F] font-bold">
                      <span className="flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> Celebration Coupon (JOY15)
                      </span>
                      <span>-₹{discountAmount.toLocaleString("en-IN")}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>PAN India Delivery</span>
                    <span className="text-[#7C0E5F] font-bold text-[11px] bg-[#FAF3F7] px-2 py-0.5 rounded">
                      Calculated at checkout
                    </span>
                  </div>

                  <div className="pt-2 border-t border-gray-200 flex justify-between items-baseline text-sm font-bold text-gray-900">
                    <span>Total Amount</span>
                    <span className="text-lg font-black text-[#7C0E5F]">
                      ₹{total.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                {/* Checkout Notice */}
                {checkoutNotice && (
                  <div className="p-2.5 rounded-lg bg-[#FAF3F7] border border-[#E7C4D9] text-xs text-[#5F0B48] font-semibold text-center">
                    {checkoutNotice}
                  </div>
                )}

                {/* Primary Shopify Payment Button */}
                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full bg-[#7C0E5F] hover:bg-[#5F0B48] text-white py-3.5 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50"
                >
                  <ShieldCheck className="w-5 h-5 text-white" />
                  <span>
                    {isCheckingOut ? "Connecting Payment Gateway..." : "Proceed to Checkout"}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Trust Badges */}
                <div className="text-center text-[10px] text-gray-400 space-y-0.5">
                  <p>🔒 256-Bit SSL Encrypted Shopify Payment Gateway</p>
                  <p>UPI • Google Pay • PhonePe • Paytm • Cards • NetBanking</p>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
