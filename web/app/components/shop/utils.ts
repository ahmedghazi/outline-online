import { ProductData } from "@/app/types/extra-types";

export const _getPriceWithDiscount = (price: number, discount: number) => {
  const total = price - (price * discount) / 100;
  return parseFloat(total.toFixed(2));
};

// Calculate total price (all discounts are already applied in finalPrice)
export const cartTotalPrice = (items: ProductData[]) => {
  const total = items.reduce((sum, el) => sum + (el.finalPrice || 0), 0);
  return total.toFixed(2);
};

// Calculate subtotal before discounts (using price which has priceMultiplier but no discounts)
export const cartSubtotal = (items: ProductData[]) => {
  const total = items.reduce((sum, el) => sum + (el.price || 0), 0);
  return total.toFixed(2);
};

// Calculate total discount amount saved
export const cartTotalDiscount = (items: ProductData[]) => {
  const totalDiscount = items.reduce((sum, el) => {
    // Discount = price before discount - final price
    return sum + (el.price - el.finalPrice);
  }, 0);
  return totalDiscount.toFixed(2);
};

// Check if any item has a discount applied
export const cartHasDiscount = (items: ProductData[]) => {
  return items.some((el) => (el.totalDiscount || 0) > 0);
};

export const _slugify = (str: string) => {
  return str.replace(" ", "-").toLowerCase();
};

export const _licensesTypesToString = (str: string) => {
  const arr = str?.replace("|", " + ") || str;
  return arr;
};
