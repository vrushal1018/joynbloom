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
  ExternalLink,
  Sparkles,
  Gift,
  FileText,
  Clock,
  Heart,
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

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [promoCode, setPromoCode] = useState("JOY15");
  const [giftNote, setGiftNote] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("Today (Same-Day Express)");
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutNotice, setCheckoutNotice] = useState<string | null>(null);

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const isDiscountEligible = promoCode.trim().toUpperCase() === "JOY15" || subtotal >= 2000;
  const discountAmount = isDiscountEligible ? Math.round(subtotal * 0.15) : 0;
  const total = Math.max(0, subtotal - discountAmount);
  const config = getShopifyConfig();

  const handleCheckout = async () => {
    if (items.length === 0) return;
    setIsCheckingOut(true);

    try {
      // Fire celebratory confetti!
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });

      const { checkoutUrl } = await createShopifyCheckout(
        items,
        isDiscountEligible ? "JOY15" : ""
      );

      setCheckoutNotice(`Redirecting to Shopify Payment Gateway on ${config.shopDomain}...`);

      setTimeout(() => {
        setIsCheckingOut(false);
        // Open Shopify Payment Gateway checkout
        window.open(checkoutUrl, "_blank", "noopener,noreferrer");
      }, 900);
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
            className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-[#FDFBF7] text-[#3A2318] z-50 shadow-2xl flex flex-col border-l-4 border-[#3A2318]"
          >
            {/* Header */}
            <div className="p-6 bg-[#4A1D6F] text-white flex items-center justify-between border-b-2 border-[#3A2318]">
              <div>
                <h3 className="text-xl font-black tracking-tight uppercase flex items-center gap-2">
                  <span>Your Celebration Hamper</span>
                  <span className="bg-[#FFD13B] text-black text-xs font-bold px-2 py-0.5 rounded-full">
                    {items.reduce((s, i) => s + i.quantity, 0)} items
                  </span>
                </h3>
                <p className="text-xs text-white/80 font-medium">
                  Same-Day PAN India Delivery • Shopify Secure Checkout
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
                aria-label="Close Cart"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Same-day Banner in Cart */}
            <div className="bg-[#E4F150] px-4 py-2 border-b-2 border-[#3A2318] flex items-center justify-between text-xs font-black text-[#3A2318]">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-black" />
                <span>Express 2-Hr Delivery Available</span>
              </div>
              <span className="bg-black text-[#E4F150] text-[10px] px-2 py-0.5 rounded-full font-black">
                FREE MESSAGE CARD
              </span>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                  <div className="w-20 h-20 rounded-full bg-stone-200 border-2 border-[#3A2318] flex items-center justify-center shadow-[3px_3px_0px_#3A2318]">
                    <Gift className="w-10 h-10 text-stone-500" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-black text-xl">Your box is empty!</h4>
                    <p className="text-xs text-stone-600 max-w-xs font-medium">
                      Add fresh flowers, decadent eggless cakes, or a surprise balloon setup to celebrate.
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="bg-[#FFD13B] text-[#3A2318] px-6 py-2.5 rounded-full font-black text-xs uppercase border-2 border-[#3A2318] shadow-[2px_2px_0px_#3A2318] hover:bg-yellow-400 transition"
                  >
                    Browse Collections
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
                    className="flex gap-4 p-3 bg-white rounded-2xl border-2 border-[#3A2318] shadow-[3px_3px_0px_#3A2318]"
                  >
                    {/* Product Image */}
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-stone-100 shrink-0 border border-stone-200">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[10px] font-black uppercase text-[#4A1D6F]">
                            {item.product.category}
                          </span>
                          <h4 className="font-black text-sm text-[#3A2318] leading-tight line-clamp-1">
                            {item.product.name}
                          </h4>
                        </div>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-stone-400 hover:text-red-500 transition p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        {/* Quantity Stepper */}
                        <div className="flex items-center border-2 border-[#3A2318] rounded-full overflow-hidden bg-[#FDFBF7]">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, -1)}
                            className="p-1.5 hover:bg-stone-200 transition"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 font-black text-xs">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, 1)}
                            className="p-1.5 hover:bg-stone-200 transition"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <span className="font-black text-sm text-[#3A2318]">
                            ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}

              {/* Free Handwritten Note Input */}
              {items.length > 0 && (
                <div className="p-3.5 bg-[#FFF9E6] rounded-2xl border-2 border-[#3A2318] space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-black uppercase text-[#3A2318]">
                    <FileText className="w-3.5 h-3.5 text-[#4A1D6F]" />
                    <span>Free Handwritten Message Note</span>
                  </div>
                  <input
                    type="text"
                    value={giftNote}
                    onChange={(e) => setGiftNote(e.target.value)}
                    placeholder="Enter recipient name & your heartfelt message..."
                    className="w-full text-xs font-semibold px-3 py-2 bg-white rounded-xl border border-stone-300 outline-hidden focus:border-[#4A1D6F]"
                  />
                  <p className="text-[10px] text-stone-500 font-medium">
                    Delivered on our signature luxury card with sealed envelope.
                  </p>
                </div>
              )}
            </div>

            {/* Footer Summary & Checkout Button */}
            {items.length > 0 && (
              <div className="p-6 bg-white border-t-3 border-[#3A2318] space-y-4">
                {/* Promo Code Input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Discount code (e.g. JOY15)"
                    className="flex-1 px-4 py-2 text-xs font-bold rounded-xl border-2 border-[#3A2318] bg-[#FDFBF7] uppercase outline-hidden"
                  />
                  <button
                    onClick={() => {
                      confetti({ particleCount: 30, spread: 45 });
                    }}
                    className="bg-[#4A1D6F] text-white px-4 py-2 rounded-xl text-xs font-black uppercase hover:bg-black transition border-2 border-[#3A2318]"
                  >
                    Apply
                  </button>
                </div>

                {/* Pricing Summary */}
                <div className="space-y-1.5 text-xs font-semibold text-stone-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString("en-IN")}</span>
                  </div>

                  {isDiscountEligible && (
                    <div className="flex justify-between text-emerald-600 font-bold">
                      <span className="flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> Celebration Discount (15%)
                      </span>
                      <span>-₹{discountAmount.toLocaleString("en-IN")}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>PAN India Delivery</span>
                    <span className="text-emerald-700 font-black uppercase text-[10px] bg-emerald-100 px-2 py-0.5 rounded-full">
                      Calculated at checkout
                    </span>
                  </div>

                  <div className="pt-2 border-t-2 border-stone-200 flex justify-between items-baseline text-base font-black text-[#3A2318]">
                    <span>Total Due</span>
                    <span className="text-xl">₹{total.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                {/* Checkout Notice */}
                {checkoutNotice && (
                  <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-300 text-xs text-emerald-800 font-bold text-center animate-pulse">
                    {checkoutNotice}
                  </div>
                )}

                {/* Primary Shopify Payment Button */}
                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full bg-[#E4F150] hover:bg-[#d4e13f] text-[#3A2318] py-4 rounded-2xl font-black uppercase text-sm border-3 border-[#3A2318] shadow-[4px_4px_0px_#3A2318] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50"
                >
                  <ShieldCheck className="w-5 h-5 text-emerald-700" />
                  <span>
                    {isCheckingOut ? "Connecting Gateway..." : "Checkout via Shopify"}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Security Trust Badges */}
                <div className="text-center text-[10px] text-stone-500 font-semibold space-y-1">
                  <div>
                    🔒 Encrypted 256-bit PCI-Compliant Shopify Gateway
                  </div>
                  <div>
                    UPI • Google Pay • PhonePe • Cards • NetBanking • EMI
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
