"use client";

import { motion } from "framer-motion";
import { Sparkles, Heart } from "lucide-react";

interface RotatingBadgeProps {
  text?: string;
  className?: string;
  size?: number;
}

export default function RotatingBadge({
  text = "• JOY N BLOOM • CELEBRATE SPECIAL MOMENTS • SAME DAY DELIVERY • ",
  className = "",
  size = 140,
}: RotatingBadgeProps) {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;

  return (
    <div
      className={`relative flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Outer glow ring */}
      <div className="absolute inset-1 rounded-full bg-[#E7C4D9]/40 blur-md pointer-events-none" />

      {/* Rotating SVG Text Container */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
        className="w-full h-full flex items-center justify-center"
      >
        <svg
          viewBox="0 0 140 140"
          className="w-full h-full drop-shadow-md overflow-visible"
        >
          <defs>
            <path
              id="circlePath"
              d="M 70, 70 m -50, 0 a 50,50 0 1,1 100,0 a 50,50 0 1,1 -100,0"
            />
          </defs>
          <circle cx="70" cy="70" r="50" fill="#5F0B48" />
          <text
            fill="#E7C4D9"
            fontSize="8.8"
            fontWeight="900"
            letterSpacing="1.8"
            className="uppercase tracking-widest font-sans"
          >
            <textPath href="#circlePath" startOffset="0%">
              {text}
            </textPath>
          </text>
        </svg>
      </motion.div>

      {/* Center Static or Pulse Badge */}
      <motion.div
        whileHover={{ scale: 1.15, rotate: 15 }}
        whileTap={{ scale: 0.9 }}
        className="absolute w-12 h-12 rounded-full bg-[#7C0E5F] border-2 border-white flex items-center justify-center shadow-lg cursor-pointer z-10"
        title="JoyNBloom Celebration Guaranteed!"
      >
        <Heart className="w-6 h-6 text-white fill-white" />
      </motion.div>
    </div>
  );
}
