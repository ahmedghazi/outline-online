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
    <div className='price flex gap-sm'>
      {!displayPriceCrossed && (
        <span className='w-[90px] text-right'>{price} EUR</span>
      )}
      {}
      {/* <div>saving in CHH</div>
      <div>original price - saving</div> */}
      {displayPriceCrossed && (
        <>
          {/* <span className="text-green">save</span> */}
          <span className='w-[90px] text-right'>{price - discount} EUR</span>
          <span className='text-muted line-through md:max-w-[90px] text-right'>
            {price} EUR
          </span>
        </>
        // <span className='text-muted line-through'>{priceCrossed} EUR</span>
      )}
    </div>
  );
};

export default Price;
