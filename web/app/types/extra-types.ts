export interface ProductData {
  productType: "productBundle" | "productSingle";
  bundleOrSingleKey: string;
  sku: string;
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
  licenseType: string;
  licenseInfos: string;
  // isLogo: string | boolean | undefined;
}
