import { ProductData } from "@/app/types/extra-types";
import { LabelPrice, Product } from "@/app/types/schema";

export const _getPriceWithDiscount = (price: number, discount: number) => {
  return price - (price * discount) / 100;
};

export const cartTotalPrice = (
  items: ProductData[],
  shouldApplyDiscount: boolean = false,
) => {
  let total = 0;
  items.forEach((el) => {
    const price = el.finalPrice || 0;
    total += price;
  });
  if (shouldApplyDiscount) {
    total = _getPriceWithDiscount(total, 25);
  }
  return total;
};

export const cartPriceDiscount = (total: number, discount: number) => {
  return total - _getPriceWithDiscount(total, discount);
};

export const _slugify = (str: string) => {
  return str.replace(" ", "-").toLowerCase();
};

export const _licensesTypesToString = (str: string) => {
  const arr = str?.replace("|", " + ") || str;
  return arr;
};
