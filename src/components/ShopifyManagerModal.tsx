"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  Store,
  RefreshCw,
  KeyRound,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import { BakeryProduct, ShopifyConfig } from "@/lib/types";
import { getShopifyConfig, saveShopifyConfig, pushProductToShopify } from "@/lib/shopify";

interface ShopifyManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: BakeryProduct[];
  onProductPushed?: (productId: string) => void;
}

export default function ShopifyManagerModal({
  isOpen,
  onClose,
  products,
  onProductPushed,
}: ShopifyManagerModalProps) {
  const [config, setConfig] = useState<ShopifyConfig>({
    shopDomain: "joynbloom.com",
    storefrontAccessToken: "",
    adminAccessToken: "",
    apiVersion: "2024-01",
  });
  const [activeTab, setActiveTab] = useState<"push" | "settings" | "gateway">("push");
  const [pushStatus, setPushStatus] = useState<Record<string, { loading: boolean; message?: string; success?: boolean; link?: string }>>({});
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [bulkPushing, setBulkPushing] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setConfig(getShopifyConfig());
    }
  }, [isOpen]);

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    saveShopifyConfig(config);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handlePushSingle = async (product: BakeryProduct) => {
    setPushStatus((prev) => ({
      ...prev,
      [product.id]: { loading: true },
    }));

    const result = await pushProductToShopify(product);

    setPushStatus((prev) => ({
      ...prev,
      [product.id]: {
        loading: false,
        message: result.message,
        success: result.success,
        link: result.shopifyProductUrl,
      },
    }));

    if (result.success && onProductPushed) {
      onProductPushed(product.id);
    }
  };

  const handleBulkPush = async () => {
    setBulkPushing(true);
    for (const prod of products) {
      await handlePushSingle(prod);
    }
    setBulkPushing(false);
  };

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
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92vw] max-w-2xl bg-white text-gray-900 z-50 rounded-2xl shadow-2xl border border-gray-200 overflow-hidden max-h-[90vh] flex flex-col"
          >
            {/* Header */}
            <div className="bg-[#7C0E5F] text-white p-5 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center text-white font-bold text-sm">
                  <Store className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-base font-bold tracking-tight flex items-center gap-2">
                    Shopify Integration Center
                    <span className="text-[10px] bg-[#E7C4D9] text-[#5F0B48] px-2 py-0.5 rounded font-bold uppercase">
                      Live Gateway
                    </span>
                  </h3>
                  <p className="text-xs text-white/80">
                    Push items to Shopify catalog & route checkouts exclusively through Shopify PCI Gateway
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-gray-200 bg-gray-50 text-xs font-bold">
              <button
                onClick={() => setActiveTab("push")}
                className={`flex-1 py-3 px-4 border-r border-gray-200 flex items-center justify-center gap-2 transition ${
                  activeTab === "push" ? "bg-white text-[#7C0E5F] border-b-2 border-b-[#7C0E5F]" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <UploadCloud className="w-4 h-4" />
                <span>Push Products ({products.length})</span>
              </button>
              <button
                onClick={() => setActiveTab("gateway")}
                className={`flex-1 py-3 px-4 border-r border-gray-200 flex items-center justify-center gap-2 transition ${
                  activeTab === "gateway" ? "bg-white text-[#7C0E5F] border-b-2 border-b-[#7C0E5F]" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Shopify Payment Gateway</span>
              </button>
              <button
                onClick={() => setActiveTab("settings")}
                className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 transition ${
                  activeTab === "settings" ? "bg-white text-[#7C0E5F] border-b-2 border-b-[#7C0E5F]" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <KeyRound className="w-4 h-4" />
                <span>API Settings</span>
              </button>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {activeTab === "push" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between bg-[#FAF3F7] p-4 rounded-2xl border-2 border-[#7C0E5F]">
                    <div>
                      <h4 className="font-black text-sm uppercase text-[#5F0B48]">Shopify Catalog Synchronizer</h4>
                      <p className="text-xs font-medium text-gray-700">
                        Target Store: <strong>{config.shopDomain}</strong>
                      </p>
                    </div>
                    <button
                      onClick={handleBulkPush}
                      disabled={bulkPushing}
                      className="bg-[#7C0E5F] text-white px-4 py-2 rounded-xl font-black text-xs uppercase hover:bg-[#5F0B48] transition flex items-center gap-1.5 shadow-[2px_2px_0px_#A64D8C] disabled:opacity-50"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${bulkPushing ? "animate-spin" : ""}`} />
                      <span>{bulkPushing ? "Pushing All..." : "Push All to Shopify"}</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {products.map((product) => {
                      const status = pushStatus[product.id];
                      return (
                        <div
                          key={product.id}
                          className="flex items-center justify-between p-3 bg-white rounded-2xl border-2 border-[#7C0E5F]/20 shadow-[2px_2px_0px_#E7C4D9]"
                        >
                          <div className="flex items-center gap-3">
                            <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-stone-200">
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-black text-xs">{product.name}</span>
                                <span className="text-[10px] bg-[#FAF3F7] text-[#7C0E5F] font-bold px-1.5 py-0.5 rounded border border-[#E7C4D9]">
                                  {product.category}
                                </span>
                              </div>
                              <div className="text-xs text-stone-500 font-medium">
                                ₹{product.price.toLocaleString("en-IN")} • Variant:{" "}
                                <code className="text-[10px] bg-stone-100 px-1 rounded">
                                  {product.shopifyVariantId}
                                </code>
                              </div>
                              {status?.message && (
                                <p
                                  className={`text-[11px] font-bold mt-1 ${
                                    status.success ? "text-[#7C0E5F]" : "text-amber-600"
                                  }`}
                                >
                                  {status.message}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            {status?.link && (
                              <a
                                href={status.link}
                                target="_blank"
                                rel="noreferrer"
                                className="text-xs text-[#7C0E5F] font-bold underline flex items-center gap-1 hover:text-[#5F0B48]"
                              >
                                View <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                            <button
                              onClick={() => handlePushSingle(product)}
                              disabled={status?.loading}
                              className="bg-[#7C0E5F] hover:bg-[#5F0B48] text-white text-xs font-black uppercase px-3.5 py-2 rounded-xl border border-[#7C0E5F] shadow-[2px_2px_0px_#E7C4D9] flex items-center gap-1 transition disabled:opacity-50"
                            >
                              <UploadCloud className={`w-3.5 h-3.5 ${status?.loading ? "animate-pulse" : ""}`} />
                              <span>{status?.loading ? "Pushing..." : "Push"}</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {activeTab === "gateway" && (
                <div className="space-y-4">
                  <div className="bg-[#5F0B48] text-white p-5 rounded-2xl border-2 border-[#7C0E5F] space-y-2">
                    <div className="flex items-center gap-2 text-[#E7C4D9] font-black text-sm uppercase">
                      <ShieldCheck className="w-5 h-5 text-[#E7C4D9]" />
                      Shopify Exclusively Configured as Payment Gateway
                    </div>
                    <p className="text-xs leading-relaxed text-white/90">
                      In accordance with your request, all payment transactions, credit card handling,
                      Apple Pay, Google Pay, and Shop Pay operations bypass third-party payment forms and
                      are routed directly to Shopify's high-converting, PCI-DSS Level 1 compliant checkout.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 bg-white rounded-2xl border-2 border-[#7C0E5F]/30 space-y-2">
                      <h5 className="font-black uppercase text-[#5F0B48]">1. Storefront API Cart</h5>
                      <p className="text-stone-600 leading-snug">
                        Uses GraphQL <code className="bg-stone-100 px-1 py-0.5 rounded">cartCreate</code> mutation with item variant IDs and quantities. Returns a secure Shopify checkoutUrl.
                      </p>
                    </div>

                    <div className="p-4 bg-white rounded-2xl border-2 border-[#7C0E5F]/30 space-y-2">
                      <h5 className="font-black uppercase text-[#5F0B48]">2. Direct Permalinks</h5>
                      <p className="text-stone-600 leading-snug">
                        Standard Shopify checkout permalinks (<code className="bg-stone-100 px-1 py-0.5 rounded">https://store.myshopify.com/cart/id:qty</code>) provide 100% reliable checkout redirection.
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#FAF3F7] p-4 rounded-2xl border border-[#E7C4D9] text-xs space-y-2">
                    <h5 className="font-bold text-[#5F0B48]">Checkout Test Verification:</h5>
                    <p className="text-stone-600">
                      When customers click <strong>"Order Now"</strong> or <strong>"Pay via Shopify Checkout"</strong> in their cart, the cart items are serialized and sent directly to Shopify Checkout on <strong>{config.shopDomain}</strong>.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === "settings" && (
                <form onSubmit={handleSaveConfig} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-black uppercase text-[#5F0B48]">
                      Shopify Store Domain
                    </label>
                    <input
                      type="text"
                      value={config.shopDomain}
                      onChange={(e) => setConfig({ ...config, shopDomain: e.target.value })}
                      placeholder="e.g. your-store.myshopify.com"
                      className="w-full p-3 rounded-xl border-2 border-[#7C0E5F]/40 text-xs font-medium bg-white focus:outline-hidden focus:ring-2 focus:ring-[#7C0E5F]"
                      required
                    />
                    <p className="text-[11px] text-stone-500">
                      Your store's myshopify domain or connected custom primary domain.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-black uppercase text-[#5F0B48]">
                      Storefront Access Token
                    </label>
                    <input
                      type="text"
                      value={config.storefrontAccessToken}
                      onChange={(e) => setConfig({ ...config, storefrontAccessToken: e.target.value })}
                      placeholder="e.g. 78a87b3240..."
                      className="w-full p-3 rounded-xl border-2 border-[#7C0E5F]/40 text-xs font-medium bg-white focus:outline-hidden focus:ring-2 focus:ring-[#7C0E5F]"
                    />
                    <p className="text-[11px] text-stone-500">
                      Used for Storefront GraphQL cart generation and customer checkout creation.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-black uppercase text-[#5F0B48]">
                      Admin API Access Token (Optional, for live Product Push)
                    </label>
                    <input
                      type="password"
                      value={config.adminAccessToken || ""}
                      onChange={(e) => setConfig({ ...config, adminAccessToken: e.target.value })}
                      placeholder="shpat_..."
                      className="w-full p-3 rounded-xl border-2 border-[#7C0E5F]/40 text-xs font-medium bg-white focus:outline-hidden focus:ring-2 focus:ring-[#7C0E5F]"
                    />
                    <p className="text-[11px] text-stone-500">
                      If provided, "Push to Shopify" executes a live Admin REST call to create the product directly in your Shopify backend!
                    </p>
                  </div>

                  {saveSuccess && (
                    <div className="p-3 bg-[#FAF3F7] text-[#7C0E5F] border border-[#E7C4D9] rounded-xl text-xs font-bold flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#7C0E5F]" />
                      Shopify configuration updated successfully!
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-[#7C0E5F] text-white py-3.5 px-6 rounded-2xl font-black uppercase text-xs hover:bg-[#5F0B48] transition shadow-[3px_3px_0px_#5F0B48] border-2 border-[#7C0E5F]"
                  >
                    Save Shopify Settings
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
