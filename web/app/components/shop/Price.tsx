import React from "react";
import { _getPriceWithDiscount } from "./utils";

type Props = {
  price: number | any;
  discount?: number;
};

const Price = ({ price, discount }: Props) => {
  // console.log(price, priceDiscount);
  const displayPriceCrossed = discount && discount > 0;
  let priceDiscount = 0;
  if (displayPriceCrossed) {
    // priceDiscount = (discount * price) / 100;
    priceDiscount = _getPriceWithDiscount(price, discount);
  }

  return (
    <div className='price flex gap-sm'>
      {!displayPriceCrossed && (
        <span className='w-[90px] text-right'>{price} EUR</span>
      )}

      {displayPriceCrossed === true && (
        <>
          <span className='w-[90px] text-right'>
            {price - priceDiscount} EUR
          </span>
          <span className='text-muted line-through md:max-w-[90px] text-right'>
            {price} EUR
          </span>
        </>
      )}
    </div>
  );
};

export default Price;
