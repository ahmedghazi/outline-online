"use client";
import React, { useMemo, useState } from "react";
import useShop from "./ShopContext";
import clsx from "clsx";
import { usePageContext } from "@/app/context/PageContext";

// type Props = {};

const AddToCart = () => {
  const { tmpProducts, products, setProducts } = useShop();
  const [buttonStatus, setButtonStatus] = useState("Add To Cart");
  const { setTab } = usePageContext();
  const _addToCart = async () => {
    //clean
    setButtonStatus("Adding...");

    products.forEach((product) => {
      if (
        tmpProducts.some((dialogProduct) => dialogProduct.sku === product.sku)
      ) {
        setProducts({ type: "REMOVE", payload: product });
      }
    });

    // console.log(uniqueBundlesOrSingles);
    tmpProducts.forEach((item) => {
      setProducts({ type: "ADD", payload: item });
      // TOASTER
      // publish("DIALOG.CLOSE");
    });
    if (tmpProducts.length > 0) {
      setButtonStatus("Adding...");

      setTimeout(() => {
        // publish("CART_OPEN");
        setTab({ name: "CART", active: true });
      }, 700);
    }
  };

  return (
    <div className='add-to-cart'>
      <button
        onClick={_addToCart}
        className={clsx(
          "atc-all  block",
          tmpProducts.length > 0
            ? "button-submit"
            : "button-disabled pointer-events-none",
        )}>
        {buttonStatus}{" "}
        {tmpProducts.length > 0 && (
          <span className='length'>
            <span>{tmpProducts.length} </span>
            <span>product{tmpProducts.length > 1 && "s"}</span>
          </span>
        )}
      </button>
    </div>
  );
};

export default AddToCart;
