import { ProductData } from "@/app/types/extra-types";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import useShop from "./ShopContext";
import { log } from "console";
import { _getPriceWithDiscount, _licensesTypesToString } from "./utils";
import Price from "./Price";
import { usePageContext } from "@/app/context/PageContext";

type Props = {
  input: ProductData;
  _delete?: Function;
};

const CartItem = ({ input, _delete }: Props) => {
  const { products, setProducts } = useShop();
  const { settings } = usePageContext();
  // console.log("CartItem", input);
  const hasMultipleLicenses = input.licenseTypes.split("|").length > 1;

  useEffect(() => {
    // return;

    if (hasMultipleLicenses) {
      const upadedProductData = input;
      // upadedProductData.discount = 15;
      // upadedProductData.applyDiscount = true;
      upadedProductData.hasMultipleLicenses = true;
      upadedProductData.priceWithMultipleLicenses = _getPriceWithDiscount(
        upadedProductData.price,
        settings.licenseDiscountPercentage || 15,
      );
      // const finalPriceWithDiscount = _getPriceWithDiscount(
      //   upadedProductData.price,
      //   upadedProductData.discount,
      // );
      // upadedProductData.finalPrice = parseFloat(
      //   finalPriceWithDiscount.toFixed(2),
      // );
      setProducts({ type: "REPLACE", payload: upadedProductData });
    }
  }, []);
  // console.log("CartItem", input);
  return (
    <div className='cart-item '>
      <div className='cart-item__header'>
        <h3 className='title '>{input.fullTitle}</h3>
        {_delete && (
          <button
            className='btn__delete text-red'
            onClick={() => _delete(input.sku)}>
            ×
          </button>
        )}
      </div>
      <div className='cart-item__content'>
        <div className='license-size b-b pb-05e'>
          License Size: {input.licenseSize}
        </div>
        <div className='license-types pt-05e'>
          License Types: {_licensesTypesToString(input.licenseTypes)}
        </div>
      </div>
      <div className='cart-item__price'>
        {input.discount !== undefined &&
          input.discount > 0 &&
          input.applyDiscount && (
            <span className='text-green '>Saving {input.discount}%</span>
          )}
        {hasMultipleLicenses && (
          <>
            <span className='text-green '>
              Saving {settings.licenseDiscountPercentage}%
            </span>
            <Price
              price={input.finalPrice}
              discount={settings.licenseDiscountPercentage}
            />
          </>
        )}
        {input.basePrice !== input.finalPrice && !hasMultipleLicenses && (
          <Price price={input.price} discount={input.discount} />
        )}
        {input.basePrice === input.finalPrice && (
          <div className='price'>{input.finalPrice}€</div>
        )}
      </div>
    </div>
  );
};

export default CartItem;
