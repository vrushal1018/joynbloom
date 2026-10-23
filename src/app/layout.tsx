import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://joynbloom.com"),
  title: "JoyNbloom — Flowers, Customised Cakes & Premium Gift Hampers | Same Day PAN India",
  description:
    "JoynBloom is your celebration partner for fresh flowers, customised cakes, luxury hampers, and plants. Enjoy same-day and PAN India delivery for every special occasion.",
  keywords: [
    "JoyNbloom",
    "fresh flowers delivery",
    "customised cakes",
    "luxury gift hampers",
    "same day flower delivery",
    "birthday cakes",
    "anniversary flowers",
    "balloon decor setups",
    "indoor plants",
    "Thane florist",
    "Mumbai gift delivery",
    "PAN India celebration delivery",
  ],
  openGraph: {
    title: "JoyNbloom — Celebration Partner for Flowers, Cakes & Gifts",
    description: "Flowers, customised cakes, and premium gift hampers with same-day & PAN India delivery.",
    images: ["https://cdn.shopify.com/s/files/1/0766/9281/5929/files/images.png?v=1770381669"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakarta.variable} scroll-smooth antialiased`}>
      <body className="min-h-full font-sans bg-[#FFFFFF] text-[#222222]">{children}</body>
    </html>
  );
}
