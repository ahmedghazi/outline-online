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
      <span className='min-w-[80px]'>{price} EUR</span>
      {/* <div>saving in CHH</div>
      <div>original price - saving</div> */}
      {displayPriceCrossed && (
        // <span className='text-muted line-through'>{priceCrossed} EUR</span>
        <span className='text-muted line-through'>priceCrossed here EUR</span>
      )}
    </div>
  );
};

export default Price;
