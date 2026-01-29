import { ProductSingle } from "./schema";

export interface ProductData {
  productType: "productBundle" | "productSingle";
  bundleOrSingleKey: string;
  sku: string;
  typefaceSlug?: string;
  relatedTypefaceSlug?: string;
  basePrice: number;
  price: number;
  discount: number;
  finalPrice: number;
  priceWithMultipleLicenses?: number;
  applyDiscount?: boolean;
  hasMultipleLicenses?: boolean;
  productId: string;
  productTitle: string;
  fullTitle: string;
  description: string;
  licenseSize: string;
  licenseTypes: string;
  licenseInfos: string;
  // isLogo: string | boolean | undefined;
}
