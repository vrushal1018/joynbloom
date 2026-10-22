export type ProductCategory =
  | "All"
  | "Flowers"
  | "Cakes"
  | "Gifts & Hampers"
  | "Plants"
  | "Cookies"
  | "Cake"
  | "Pretzel"
  | "Bakery";

export type ProductOccasion = "Birthday" | "Anniversary" | "Thank You" | "Love It. Buy";

export interface BakeryProduct {
  id: string;
  name: string;
  category: "Flowers" | "Cakes" | "Gifts & Hampers" | "Plants" | "Cookies" | "Cake" | "Pretzel" | "Bakery";
  occasions?: ProductOccasion[];
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  badge?: string;
  badgeColor?: string;
  description: string;
  ingredients: string[];
  features?: string[];
  image: string;
  images?: string[];
  handle?: string;
  shopifyVariantId: string;
  shopifyProductId?: string;
  isPushedToShopify?: boolean;
}

export type JoyProduct = BakeryProduct;

export interface CartItem {
  product: BakeryProduct;
  quantity: number;
}

export interface ShopifyConfig {
  shopDomain: string; // e.g., 'your-store.myshopify.com'
  storefrontAccessToken: string;
  adminAccessToken?: string;
  apiVersion: string;
}

export interface ShopifyPushResult {
  success: boolean;
  message: string;
  shopifyProductId?: string;
  shopifyProductUrl?: string;
}
