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
  applyDiscount?: boolean;
  finalPrice: number;
  productId: string;
  productTitle: string;
  fullTitle: string;
  description: string;
  // license: string;
  licenseSize: string;
  licenseTypes: string;
  licenseInfos: string;
  // isLogo: string | boolean | undefined;
}
