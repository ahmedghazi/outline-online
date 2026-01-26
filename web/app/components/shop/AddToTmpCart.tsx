import React, { useEffect, useState } from "react";
import Price from "./Price";
import useShop from "./ShopContext";
import { usePathname } from "next/navigation";
import { ProductData } from "@/app/types/extra-types";
import { _getPriceWithDiscount } from "./utils";
import { div } from "framer-motion/client";
import clsx from "clsx";
import { publish } from "pubsub-js";

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
  const [applyDiscount, setApplyDiscount] = useState<boolean>(false);

  // const pathname = usePathname();

  let _price: number = price * (priceMultiplier || 1);
  _price = Math.round(_price * 100) / 100;
  // let finalPriceWithDiscount: number = _price;
  // if (discount && applyDiscount) {
  //   // const discountAmount = (discount * _price) / 100;
  //   // const discountAmount = _getPriceWithDiscount(_price, discount);
  //   finalPriceWithDiscount = _getPriceWithDiscount(_price, discount);
  // }
  // const _getPrice = () => {
  //   let _price: number = price * (priceMultiplier || 1);
  //   _price = Math.round(_price * 100) / 100;
  //   return _price;
  // };
  const _getFinalPrice = () => {
    let finalPriceWithDiscount: number = _price;
    if (discount && applyDiscount) {
      finalPriceWithDiscount = _getPriceWithDiscount(_price, discount);
    }
    return finalPriceWithDiscount;
  };

  // console.log(title, price);
  const _updatedProductData = {
    basePrice: price,
    price: _price,
    finalPrice: discount && applyDiscount ? _getFinalPrice() : _price,
    licenseSize: licenseSizeProfil?.title || "",
    licenseTypes: licenseTypeProfil?.map((e) => e.label).join("|") || "",
    licenseInfos: "",
    applyDiscount: applyDiscount,
  };
  const _productData: ProductData = {
    ...productData,
    ..._updatedProductData,
  };

  useEffect(() => {
    if (_productData.discount && _productData.productType === "productBundle") {
      setApplyDiscount(true);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    publish("TMP_PRODUCT_APPLY_DISCOUNT", {
      sku: _productData.sku,
      applyDiscount,
    });
  }, [applyDiscount]);

  useEffect(() => {
    if (!_productData.discount) return;
    if (_productData.productType !== "productSingle") return;
    if (_productData.relatedTypefaceSlug) {
      const relatedTypefaceRegularIsInTmpProducts = tmpProducts.some(
        (el) =>
          el.typefaceSlug ===
          _productData.relatedTypefaceSlug?.replace("-italic", ""),
      );

      if (relatedTypefaceRegularIsInTmpProducts) {
        setApplyDiscount(true);
      }

      if (!relatedTypefaceRegularIsInTmpProducts) {
        setApplyDiscount(false);
      }
    }
  }, [tmpProducts, _productData.relatedTypefaceSlug]);

  useEffect(() => {
    // console.log(title, active);
    if (!mounted) return;
    if (active && _productData.finalPrice > 0) {
      // console.log(_productData);
      const exist = tmpProducts.filter((el) => el.sku === _productData.sku);
      if (exist.length === 0)
        setTmpProducts({ type: "ADD", payload: _productData });
      else {
        console.log("REPLACE", _productData);
        //need to check if discount changed
        //if single, and apply discount
        setTmpProducts({ type: "REPLACE", payload: _productData });
      }
    } else {
      const isInTmpProducts = tmpProducts.some(
        (el) => el.sku === _productData.sku,
      );
      if (isInTmpProducts) {
        setTmpProducts({ type: "REMOVE_BY_SKU", payload: _productData.sku });
      }
    }
  }, [active, applyDiscount, priceMultiplier]);

  return (
    <div
      className={clsx(
        "add-to-cart cursor-pointer bg-red-",
        applyDiscount && "bg-red",
      )}
      // onClick={() => {
      //   setActive(!active);
      // }}
    >
      <div className='flex justify-between'>
        <Price
          discount={discount && applyDiscount ? discount : 0}
          price={_price}
        />
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
