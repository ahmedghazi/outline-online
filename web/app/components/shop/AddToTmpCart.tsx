import React, { useEffect, useMemo, useState } from "react";
import Price from "./Price";
import useShop from "./ShopContext";
import { ProductData } from "@/app/types/extra-types";
import { _getPriceWithDiscount } from "./utils";
import clsx from "clsx";
import { publish } from "pubsub-js";
import { usePageContext } from "@/app/context/PageContext";

type Props = {
  productData: ProductData;
  priceMultiplier: number;
  active?: boolean;
  isInCart?: boolean;
};

const AddToTmpCart = ({
  productData,
  priceMultiplier,
  active = false,
  isInCart = false,
}: Props) => {
  const { price, discount } = productData;
  const {
    tmpProducts,
    setTmpProducts,
    products,
    licenseTypeProfil,
    licenseSizeProfil,
  } = useShop();
  const [mounted, setMounted] = useState<boolean>(false);
  const [applyDiscount, setApplyDiscount] = useState<boolean>(false);
  const { settings } = usePageContext();

  // Check if multiple licenses are selected
  const hasMultipleLicenses = licenseTypeProfil && licenseTypeProfil.length > 1;

  // Calculate the license discount percentage when multiple licenses are selected
  const licenseDiscountPercentage = hasMultipleLicenses
    ? settings.licenseDiscountPercentage || 15
    : 0;

  // Calculate combined discount: product discount + multi-license discount
  const combinedDiscount = useMemo(() => {
    let total = 0;
    // Add product discount if applicable
    if (discount && applyDiscount) {
      total += discount;
    }
    // Add multi-license discount
    total += licenseDiscountPercentage;
    return total;
  }, [discount, applyDiscount, licenseDiscountPercentage]);

  // Price after priceMultiplier (before any discounts)
  let _price: number = price * (priceMultiplier || 1);
  _price = Math.round(_price * 100) / 100;

  // Calculate final price with combined discount applied
  const _getFinalPrice = () => {
    if (combinedDiscount > 0) {
      return _getPriceWithDiscount(_price, combinedDiscount);
    }
    return _price;
  };

  const _updatedProductData = {
    basePrice: price,
    price: _price,
    finalPrice: _getFinalPrice(),
    licenseSize: licenseSizeProfil?.title || "",
    licenseTypes: licenseTypeProfil?.map((e) => e.label).join("|") || "",
    licenseInfos: "",
    applyDiscount: applyDiscount || !!hasMultipleLicenses,
    hasMultipleLicenses: !!hasMultipleLicenses,
    // Store the combined discount for display in cart
    totalDiscount: combinedDiscount,
    productDiscount: discount || 0,
    licenseDiscount: licenseDiscountPercentage,
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
      // console.log(products);
      const relatedTypefaceRegularIsInProducts = products.some(
        (el) =>
          el.typefaceSlug ===
          _productData.relatedTypefaceSlug?.replace("-italic", ""),
      );

      if (relatedTypefaceRegularIsInProducts) {
        setApplyDiscount(true);
      }

      if (!relatedTypefaceRegularIsInTmpProducts) {
        setApplyDiscount(false);
      }
    }
  }, [tmpProducts, _productData.relatedTypefaceSlug]);

  useEffect(() => {
    if (!mounted) return;
    if (active && _productData.finalPrice > 0) {
      const exist = tmpProducts.filter((el) => el.sku === _productData.sku);
      if (exist.length === 0)
        setTmpProducts({ type: "ADD", payload: _productData });
      else {
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
  }, [active, applyDiscount, priceMultiplier, hasMultipleLicenses]);

  return (
    <div className={clsx("add-to-cart cursor-pointer bg-red-")}>
      <div className='flex justify-between'>
        <Price discount={combinedDiscount} price={_price} />
        <div className='checkbox-ui'>
          <input
            checked={active || isInCart}
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
