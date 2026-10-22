"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldCheck } from "lucide-react";
import confetti from "canvas-confetti";

import { JOY_PRODUCTS } from "@/lib/products";
import { BakeryProduct, CartItem, ProductOccasion } from "@/lib/types";
import FnpHeader from "@/components/FnpHeader";
import DeliveryLocationModal from "@/components/DeliveryLocationModal";
import FnpCategoryStrip from "@/components/FnpCategoryStrip";
import FnpHeroSlider from "@/components/FnpHeroSlider";
import FnpTrustBar from "@/components/FnpTrustBar";
import ProductCarousel from "@/components/ProductCarousel";
import FnpOccasionsGrid from "@/components/FnpOccasionsGrid";
import FnpCategoryShowcase from "@/components/FnpCategoryShowcase";
import FnpLuxeBanner from "@/components/FnpLuxeBanner";
import FnpTestimonials from "@/components/FnpTestimonials";
import FnpFaqAccordion from "@/components/FnpFaqAccordion";
import FnpSeoSection from "@/components/FnpSeoSection";
import FnpFooter from "@/components/FnpFooter";
import CartDrawer from "@/components/CartDrawer";
import SearchModal from "@/components/SearchModal";
import ShopifyManagerModal from "@/components/ShopifyManagerModal";

export default function JoyNbloomFnpLandingPage() {
  const [products, setProducts] = useState<BakeryProduct[]>(JOY_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([
    { product: JOY_PRODUCTS[0], quantity: 1 }, // Royal Blue Orchids
    { product: JOY_PRODUCTS[25] || JOY_PRODUCTS[1], quantity: 1 }, // Signature Cake
  ]);
  const [wishlist, setWishlist] = useState<string[]>([JOY_PRODUCTS[0]?.id, JOY_PRODUCTS[2]?.id]);
  const [deliveryLocation, setDeliveryLocation] = useState<{ city: string; pincode: string }>({
    city: "Mumbai",
    pincode: "400001",
  });

  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [activeOccasion, setActiveOccasion] = useState<string>("All");

  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isShopifyModalOpen, setIsShopifyModalOpen] = useState(false);
  const [policyModal, setPolicyModal] = useState<"shipping" | "refund" | "terms" | "privacy" | null>(null);

  // Cart operations
  const handleAddToCart = (product: BakeryProduct) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });

    confetti({
      particleCount: 25,
      spread: 40,
      origin: { y: 0.8 },
    });
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => setCart([]);

  const handleToggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const handleSelectLocation = (city: string, pincode: string) => {
    setDeliveryLocation({ city, pincode });
  };

  const handleCategorySelect = (category: string) => {
    setActiveCategory(category);
    setActiveOccasion("All");
    const el = document.getElementById("products-section");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  const handleOccasionSelect = (occasion: string) => {
    setActiveOccasion(occasion);
    setActiveCategory("All");
    const el = document.getElementById("products-section");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  const handleOrderNow = () => {
    if (cart.length === 0) {
      handleAddToCart(products[0]);
    }
    setIsCartOpen(true);
  };

  const handleProductPushed = (productId: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, isPushedToShopify: true } : p))
    );
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7] font-sans text-[#222222] selection:bg-[#00853D] selection:text-white">
      {/* 1. Exact FNP Header (Utility Bar, Location Selector, Search, Actions, Mega Menu) */}
      <FnpHeader
        cart={cart}
        wishlistCount={wishlist.length}
        deliveryLocation={deliveryLocation}
        onOpenLocationModal={() => setIsLocationModalOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenShopifyModal={() => setIsShopifyModalOpen(true)}
        onSelectCategory={handleCategorySelect}
        onSelectOccasion={handleOccasionSelect}
        products={products}
      />

      <main>
        {/* 2. FNP Category Quick Circular Story Strip */}
        <FnpCategoryStrip
          activeCategory={activeCategory}
          onSelectCategory={handleCategorySelect}
          onSelectOccasion={handleOccasionSelect}
        />

        {/* 3. FNP Hero Banner Slider */}
        <FnpHeroSlider
          onOrderNow={handleOrderNow}
          onExploreCategory={handleCategorySelect}
        />

        {/* 4. FNP Value Bar / Guarantees Strip */}
        <FnpTrustBar />

        {/* 5. Best Sellers & Trending Gifts (Tabbed Grid) */}
        <ProductCarousel
          products={products}
          onAddToCart={handleAddToCart}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          activeOccasion={activeOccasion}
          onSelectOccasion={setActiveOccasion}
          wishlistIds={wishlist}
          onToggleWishlist={handleToggleWishlist}
        />

        {/* 6. Celebrate Special Moments (Occasion Cards) */}
        <FnpOccasionsGrid onSelectOccasion={handleOccasionSelect} />

        {/* 7. Fresh Flower Arrangements Spotlight Row */}
        <FnpCategoryShowcase
          title="Exotic Flowers & Hand-Tied Bouquets"
          subtitle="Direct from farms. Handpicked Royal Blue Orchids, Dutch Roses, Lilies and Carnations."
          badge="Farm Fresh Stems"
          category="Flowers"
          products={products}
          onAddToCart={handleAddToCart}
          onViewAll={handleCategorySelect}
          wishlistIds={wishlist}
          onToggleWishlist={handleToggleWishlist}
          bgLight={true}
        />

        {/* 8. Joy Luxe Banner (FNP Luxe equivalent) */}
        <FnpLuxeBanner
          onExploreLuxe={() => {
            handleCategorySelect("Flowers");
          }}
        />

        {/* 9. Artisan & Designer Cakes Spotlight Row */}
        <FnpCategoryShowcase
          title="100% Eggless Artisan Cake Studio"
          subtitle="Freshly baked upon order confirmation with premium chocolate truffle, fresh fruits and rich cream."
          badge="100% Eggless"
          category="Cakes"
          products={products}
          onAddToCart={handleAddToCart}
          onViewAll={handleCategorySelect}
          wishlistIds={wishlist}
          onToggleWishlist={handleToggleWishlist}
          bgLight={false}
        />

        {/* 10. Plants & Greenery Spotlight Row */}
        <FnpCategoryShowcase
          title="Serene Indoor Greenery & Good Luck Plants"
          subtitle="Breathe clean air with 2-tier Lucky Bamboo, Syngonium, and Jade plants in elegant ceramic planters."
          badge="Good Luck & Prosperity"
          category="Plants"
          products={products}
          onAddToCart={handleAddToCart}
          onViewAll={handleCategorySelect}
          wishlistIds={wishlist}
          onToggleWishlist={handleToggleWishlist}
          bgLight={true}
        />

        {/* 11. Customer Reviews & Ratings */}
        <FnpTestimonials />

        {/* 12. FNP FAQ Accordion */}
        <FnpFaqAccordion />

        {/* 13. FNP SEO Collapsible Section */}
        <FnpSeoSection />
      </main>

      {/* 14. Comprehensive FNP Multi-Column Footer */}
      <FnpFooter
        onOpenPolicy={(p) => setPolicyModal(p)}
        onOpenShopifyModal={() => setIsShopifyModalOpen(true)}
        onSelectCategory={handleCategorySelect}
        onSelectOccasion={handleOccasionSelect}
      />

      {/* 15. Delivery Location Modal */}
      <DeliveryLocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        currentLocation={deliveryLocation}
        onSelectLocation={handleSelectLocation}
      />

      {/* 16. Slide-in Cart Drawer with Shopify Payment Gateway Redirection */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* 17. Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={products}
        onSelectProduct={(p) => {
          handleAddToCart(p);
          setIsCartOpen(true);
        }}
      />

      {/* 18. Shopify Manager Modal */}
      <ShopifyManagerModal
        isOpen={isShopifyModalOpen}
        onClose={() => setIsShopifyModalOpen(false)}
        products={products}
        onProductPushed={handleProductPushed}
      />

      {/* 19. Policy Viewer Modal (FNP Styled) */}
      <AnimatePresence>
        {policyModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPolicyModal(null)}
              className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92vw] max-w-xl bg-white text-gray-900 z-50 rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-2xl max-h-[85vh] overflow-y-auto"
            >
              <div className="flex justify-between items-start border-b border-gray-100 pb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase text-[#00853D]">
                    JoyNbloom Customer Care
                  </span>
                  <h3 className="text-xl font-bold text-gray-900">
                    {policyModal === "shipping" && "Shipping & Delivery Policy"}
                    {policyModal === "refund" && "Refund & Replacement Policy"}
                    {policyModal === "terms" && "Terms of Service"}
                    {policyModal === "privacy" && "Privacy & Data Protection"}
                  </h3>
                </div>
                <button
                  onClick={() => setPolicyModal(null)}
                  className="p-1 rounded-full hover:bg-gray-100 transition"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="py-4 text-xs text-gray-600 space-y-3 leading-relaxed">
                {policyModal === "shipping" && (
                  <>
                    <p>
                      <strong>60-Mins Express Delivery:</strong> Available across Thane, Mumbai, and select metro pincodes for ready fresh flower bouquets and artisan cakes.
                    </p>
                    <p>
                      <strong>Same-Day &amp; Midnight Delivery:</strong> Orders confirmed before 7:00 PM are delivered same-day in chosen slots. Midnight surprise slots run between 11:00 PM and 12:00 AM.
                    </p>
                    <p>
                      <strong>PAN India Courier:</strong> Personalized keepsakes, gift hampers, and plants are dispatched via express courier with live tracking.
                    </p>
                  </>
                )}

                {policyModal === "refund" && (
                  <>
                    <p>
                      <strong>Freshness &amp; Quality Guarantee:</strong> Due to perishable florist and bakery items, items cannot be returned once handed over.
                    </p>
                    <p>
                      <strong>Damaged or Incorrect Orders:</strong> If your item is damaged or does not match your order, please notify our WhatsApp team (+91 98330 00000) within 24 hours with a photograph for an instant free replacement or store credit.
                    </p>
                  </>
                )}

                {policyModal === "terms" && (
                  <>
                    <p>
                      Joynbloom is an online flower, cake, and gift store. All transactions and checkouts are securely executed through Shopify&apos;s hosted PCI-DSS compliant checkout.
                    </p>
                    <p>
                      Prices are inclusive of standard local taxes. Complimentary greeting cards are included with every gift order.
                    </p>
                  </>
                )}

                {policyModal === "privacy" && (
                  <>
                    <p>
                      We strictly protect customer privacy. Recipient delivery details and personalized message notes are solely used to fulfill your order.
                    </p>
                    <p>
                      Payment credentials are processed directly through 256-bit encrypted bank gateways and never stored on our servers.
                    </p>
                  </>
                )}
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end">
                <button
                  onClick={() => setPolicyModal(null)}
                  className="bg-[#00853D] hover:bg-[#006B31] text-white px-6 py-2 rounded-xl font-bold text-xs uppercase shadow-xs transition"
                >
                  Understood
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
