"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, X, Check, Search, Sparkles } from "lucide-react";

interface DeliveryLocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLocation: { city: string; pincode: string };
  onSelectLocation: (city: string, pincode: string) => void;
}

const POPULAR_CITIES = [
  { name: "Mumbai", pincode: "400001", tag: "60-Min Express" },
  { name: "Thane", pincode: "400607", tag: "HQ • 60-Min Express" },
  { name: "Navi Mumbai", pincode: "400703", tag: "Same Day" },
  { name: "Delhi NCR", pincode: "110001", tag: "Same Day" },
  { name: "Bengaluru", pincode: "560001", tag: "Same Day" },
  { name: "Pune", pincode: "411001", tag: "Same Day" },
  { name: "Hyderabad", pincode: "500001", tag: "Same Day" },
  { name: "Chennai", pincode: "600001", tag: "Same Day" },
  { name: "Kolkata", pincode: "700001", tag: "Same Day" },
  { name: "Ahmedabad", pincode: "380001", tag: "Same Day" },
  { name: "Jaipur", pincode: "302001", tag: "Same Day" },
  { name: "Chandigarh", pincode: "160001", tag: "Same Day" },
];

export default function DeliveryLocationModal({
  isOpen,
  onClose,
  currentLocation,
  onSelectLocation,
}: DeliveryLocationModalProps) {
  const [pincodeInput, setPincodeInput] = useState("");
  const [detectedStatus, setDetectedStatus] = useState<string | null>(null);

  const handlePincodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPin = pincodeInput.trim();
    if (cleanPin.length === 6 && /^\d+$/.test(cleanPin)) {
      let inferredCity = "Selected Location";
      if (cleanPin.startsWith("400") || cleanPin.startsWith("401")) {
        inferredCity = cleanPin.startsWith("4006") ? "Thane" : "Mumbai";
      } else if (cleanPin.startsWith("110")) {
        inferredCity = "Delhi NCR";
      } else if (cleanPin.startsWith("560")) {
        inferredCity = "Bengaluru";
      } else if (cleanPin.startsWith("411")) {
        inferredCity = "Pune";
      } else if (cleanPin.startsWith("500")) {
        inferredCity = "Hyderabad";
      }
      onSelectLocation(inferredCity, cleanPin);
      setDetectedStatus(`Delivering to ${inferredCity} (${cleanPin})`);
      setTimeout(() => {
        onClose();
        setDetectedStatus(null);
      }, 400);
    } else {
      setDetectedStatus("Please enter a valid 6-digit PIN code");
    }
  };

  const handleCityClick = (city: string, pincode: string) => {
    onSelectLocation(city, pincode);
    onClose();
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
            className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92vw] max-w-lg bg-white rounded-2xl shadow-2xl z-50 border border-gray-100 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#7C0E5F] text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-white" />
                <h3 className="text-base font-bold tracking-tight">Select Delivery Location</h3>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>

            <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
              {/* Pincode Input Form */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                  Enter 6-Digit Pincode For Express Delivery
                </label>
                <form onSubmit={handlePincodeSubmit} className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      maxLength={6}
                      value={pincodeInput}
                      onChange={(e) => setPincodeInput(e.target.value.replace(/\D/g, ""))}
                      placeholder="e.g. 400607, 400001, 110001"
                      className="w-full pl-9 pr-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-[#7C0E5F] focus:bg-white transition"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-[#7C0E5F] hover:bg-[#5F0B48] text-white px-5 py-2.5 rounded-lg text-xs font-bold uppercase transition"
                  >
                    Check
                  </button>
                </form>

                {detectedStatus && (
                  <p className="mt-2 text-xs font-medium text-[#7C0E5F]">
                    {detectedStatus}
                  </p>
                )}
              </div>

              {/* Current Selection Pill */}
              <div className="bg-[#FAF3F7] border border-[#E7C4D9] rounded-xl p-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-full bg-[#7C0E5F] text-white flex items-center justify-center text-xs">
                    ✓
                  </span>
                  <div>
                    <span className="text-[11px] font-semibold text-gray-500 uppercase">Current Destination</span>
                    <p className="text-sm font-bold text-gray-900">
                      {currentLocation.city} — {currentLocation.pincode}
                    </p>
                  </div>
                </div>
                <span className="text-[10px] bg-white text-[#7C0E5F] font-bold px-2.5 py-1 rounded-full border border-[#E7C4D9]">
                  Active
                </span>
              </div>

              {/* Popular Cities */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-600">
                    Popular Delivery Cities
                  </h4>
                  <span className="text-[11px] text-[#7C0E5F] font-semibold flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> 60 Mins Delivery Available
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {POPULAR_CITIES.map((c) => {
                    const isSelected = currentLocation.city.toLowerCase() === c.name.toLowerCase();
                    return (
                      <button
                        key={c.name}
                        onClick={() => handleCityClick(c.name, c.pincode)}
                        className={`text-left p-2.5 rounded-xl border text-xs transition flex flex-col justify-between ${
                          isSelected
                            ? "bg-[#FAF3F7] border-[#7C0E5F] text-[#7C0E5F] font-bold shadow-xs"
                            : "bg-white border-gray-200 hover:border-[#7C0E5F] hover:bg-gray-50 text-gray-800"
                        }`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className="font-semibold">{c.name}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-[#7C0E5F]" />}
                        </div>
                        <span className="text-[10px] text-gray-500 mt-1 font-normal">
                          {c.tag}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Footnote */}
              <p className="text-[11px] text-gray-500 text-center border-t border-gray-100 pt-3">
                🌿 Fresh flowers, cakes &amp; hampers dispatched directly with same-day and midnight celebration slots.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
