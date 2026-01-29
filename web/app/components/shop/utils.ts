import { ProductData } from "@/app/types/extra-types";
import { LabelPrice, Product } from "@/app/types/schema";

export const _getPriceWithDiscount = (price: number, discount: number) => {
  return price - (price * discount) / 100;
};

export const cartTotalPrice = (items: ProductData[], discount: number = 0) => {
  let total = 0;
  items.forEach((el) => {
    const price = el.finalPrice || 0;
    if (el.hasMultipleLicenses) {
      total += _getPriceWithDiscount(price, discount);
    } else {
      total += price;
    }
  });

  return total;
};

// export const cartPriceDiscount = (
//   total: number,
//   discount: number,
//   applyDiscount: boolean = false,
// ) => {
//   if (!applyDiscount) return total;
//   return total - _getPriceWithDiscount(total, discount);
// };

export const cartTotalDiscount = (items: ProductData[], discount: number) => {
  let totalDiscount = 0;
  items.forEach((el) => {
    if (el.hasMultipleLicenses) {
      const price = el.finalPrice || 0;
      totalDiscount += price - _getPriceWithDiscount(price, discount);
    }
  });
  return totalDiscount;
};

export const _slugify = (str: string) => {
  return str.replace(" ", "-").toLowerCase();
};

export const _licensesTypesToString = (str: string) => {
  const arr = str?.replace("|", " + ") || str;
  return arr;
};
