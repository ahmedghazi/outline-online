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
  // priceWithMultipleLicenses?: number;
  applyDiscount?: boolean;
  hasMultipleLicenses?: boolean;
  // Combined discount fields (product discount + license discount)
  totalDiscount?: number;
  productDiscount?: number;
  licenseDiscount?: number;
  productId: string;
  productTitle: string;
  fullTitle: string;
  description: string;
  licenseSize: string;
  licenseTypes: string;
  licenseInfos: string;
}
