import { ProductData } from "@/app/types/extra-types";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import useShop from "./ShopContext";
import { log } from "console";
import { _licensesTypesToString } from "./utils";

type Props = {
  input: ProductData;
  _delete?: Function;
};

const CartItem = ({ input, _delete }: Props) => {
  const { products, setProducts } = useShop();

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
        <div className='price'>{input.finalPrice}€</div>
      </div>
    </div>
  );
};

export default CartItem;
