import React, { useEffect, useState } from "react";
import Price from "./Price";
import useShop from "./ShopContext";
import { usePathname } from "next/navigation";
import { ProductData } from "@/app/types/extra-types";

type Props = {
  productData: ProductData;
  priceMultiplier: number;
};

const PaddleAddToCart = ({ productData, priceMultiplier }: Props) => {
  const { price, discount } = productData;
  const { products, setProducts } = useShop();
  const [active, setActive] = useState<boolean>(false);
  // const isBundle = metadata.type === "bundle";
  // const isDiscount = discount && discount > 0;
  const pathname = usePathname();
  let _price: number = price * (priceMultiplier || 1);
  let finalPriceWithDiscount: number = _price;
  if (discount) {
    const discountAmount = (discount * _price) / 100;
    finalPriceWithDiscount = finalPriceWithDiscount - discountAmount;
  }
  // console.log(title, price);
  const _updatedProductData = {
    basePrice: price,
    price: _price,
    finalPrice: discount ? finalPriceWithDiscount : _price,
  };
  const _productData: ProductData = {
    ...productData,
    ..._updatedProductData,
  };
  console.log(_productData);

  useEffect(() => {
    // console.log(title, active);
    if (active) {
      const exist = products.filter((el) => el.sku === _productData.sku);
      if (exist.length === 0)
        setProducts((prev: any) => [...prev, _productData]);
    } else {
      const _productToRemove = products.filter(
        (item) => item.sku !== _productData.sku
      );
      // console.log(_productToRemove);
      setProducts(_productToRemove);
    }
  }, [active]);

  /**
   * if license changes, update
   */
  return (
    <div
      className='add-to-cart cursor-pointer bg-red-'
      onClick={() => {
        setActive(!active);
      }}>
      <div className='flex justify-between'>
        <Price discount={discount} price={_price} />
        <div className='checkbox-ui'>
          <input
            // onChange={_addToCart}
            checked={active}
            onChange={() => {}}
            type='checkbox'
            name='atc'
          />
          <span className='checkmark'></span>
        </div>
      </div>
    </div>
  );
};

export default PaddleAddToCart;
