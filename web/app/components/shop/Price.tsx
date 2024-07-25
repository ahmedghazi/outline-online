import React from "react";

type Props = {
  price: number | any;
  priceCrossed?: number;
};

const Price = ({ price, priceCrossed }: Props) => {
  return (
    <div className='price  flex gap-sm'>
      {/* <span>FROM</span> */}
      <span className={priceCrossed ? "price--crossed" : ""}>{price} CHF</span>
      {/* {priceCrossed && <span className=''>{priceCrossed} CHF</span>} */}
    </div>
  );
};

export default Price;
