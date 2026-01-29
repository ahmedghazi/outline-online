import { ProductData } from "@/app/types/extra-types";
import React from "react";
import { _licensesTypesToString } from "./utils";
import Price from "./Price";

type Props = {
  input: ProductData;
  _delete?: Function;
};

const CartItem = ({ input, _delete }: Props) => {
  // All discounts are pre-computed in AddToTmpCart
  const totalDiscount = input.totalDiscount || 0;
  const hasDiscount = totalDiscount > 0;

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
        {hasDiscount && (
          <span className='text-green '>Saving {totalDiscount}%</span>
        )}
        {hasDiscount ? (
          <Price price={input.price} discount={totalDiscount} />
        ) : (
          <div className='price'>{input.finalPrice}€</div>
        )}
      </div>
    </div>
  );
};

export default CartItem;
