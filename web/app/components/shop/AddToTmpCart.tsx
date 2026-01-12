import React, { useEffect, useState } from "react";
import Price from "./Price";
import useShop from "./ShopContext";
import { usePathname } from "next/navigation";
import { ProductData } from "@/app/types/extra-types";
import { _getPriceWithDiscount } from "./utils";

type Props = {
  productData: ProductData;
  priceMultiplier: number;
  active?: boolean;
};

const AddToTmpCart = ({
  productData,
  priceMultiplier,
  active = false,
}: Props) => {
  const { price, discount } = productData;
  const { tmpProducts, setTmpProducts, licenseTypeProfil, licenseSizeProfil } =
    useShop();
  const [mounted, setMounted] = useState<boolean>(false);

  const pathname = usePathname();
  let _price: number = price * (priceMultiplier || 1);
  //to fixed if price = 119.99999999997
  _price = Math.round(_price * 100) / 100;
  let finalPriceWithDiscount: number = _price;
  if (discount) {
    // const discountAmount = (discount * _price) / 100;
    // const discountAmount = _getPriceWithDiscount(_price, discount);
    finalPriceWithDiscount = _getPriceWithDiscount(_price, discount);
  }
  // console.log(title, price);
  const _updatedProductData = {
    basePrice: price,
    price: _price,
    finalPrice: discount ? finalPriceWithDiscount : _price,
    licenseSize: licenseSizeProfil?.title || "",
    licenseTypes: licenseTypeProfil?.map((e) => e.label).join("|") || "",
    licenseInfos: "",
  };
  const _productData: ProductData = {
    ...productData,
    ..._updatedProductData,
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // console.log(title, active);
    if (!mounted) return;
    if (active && _productData.finalPrice > 0) {
      // console.log(_productData);
      const exist = tmpProducts.filter((el) => el.sku === _productData.sku);
      if (exist.length === 0)
        setTmpProducts({ type: "ADD", payload: _productData });
      else setTmpProducts({ type: "REPLACE", payload: _productData });
    } else {
      const isInTmpProducts = tmpProducts.some(
        (el) => el.sku === _productData.sku
      );
      if (isInTmpProducts) {
        setTmpProducts({ type: "REMOVE_BY_SKU", payload: _productData.sku });
      }
    }
  }, [active, priceMultiplier]);

  return (
    <div
      className='add-to-cart cursor-pointer bg-red-'
      // onClick={() => {
      //   setActive(!active);
      // }}
    >
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

export default AddToTmpCart;
