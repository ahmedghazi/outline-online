import React from "react";

type Props = {
  price: number | any;
  priceDiscount?: number;
};

const Price = ({ price, priceDiscount }: Props) => {
  // console.log(price, priceDiscount);
  const displayPriceCrossed = priceDiscount && priceDiscount > 0;
  let discount = 0;
  if (displayPriceCrossed) {
    discount = (priceDiscount * price) / 100;
  }
  return (
    <div className='price  grid grid-cols-2 gap-sm'>
      {!displayPriceCrossed && (
        <span className='min-w-[80px]'>{price} EUR</span>
      )}
      {}
      {/* <div>saving in CHH</div>
      <div>original price - saving</div> */}
      {displayPriceCrossed && (
        <>
          <span className='min-w-[80px]'>{price - discount} EUR</span>
          <span className='text-muted line-through'>{price} EUR</span>
        </>
        // <span className='text-muted line-through'>{priceCrossed} EUR</span>
      )}
    </div>
  );
};

export default Price;
