import React from "react";

type Props = {
  price: number | any;
  priceCrossed?: number;
};

const Price = ({ price, priceCrossed }: Props) => {
  // console.log(price, priceCrossed);
  const displayPriceCrossed = priceCrossed && priceCrossed > 0;
  return (
    <div className='price  grid grid-cols-2 gap-sm'>
      <span className='w-[70px]'>{price} CHF</span>
      {displayPriceCrossed && (
        <span className='text-muted line-through'>{priceCrossed} CHF</span>
      )}
    </div>
  );
};

export default Price;
