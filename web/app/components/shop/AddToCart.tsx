"use client";
import React, { useMemo, useState } from "react";
import useShop from "./ShopContext";
import clsx from "clsx";
import { usePageContext } from "@/app/context/PageContext";

// type Props = {};

const AddToCart = () => {
  const { tmpProducts, products, setProducts } = useShop();
  const [buttonStatus, setButtonStatus] = useState("");
  const { setTab } = usePageContext();

  const _defaultLabel = useMemo(() => {
    const hasUpdates = tmpProducts.some((p) =>
      products.some((cp) => cp.sku === p.sku),
    );
    return hasUpdates ? "Update Cart" : "Add To Cart";
  }, [tmpProducts, products]);

  const _addToCart = async () => {
    setButtonStatus("Adding...");

    tmpProducts.forEach((item) => {
      const alreadyInCart = products.some((p) => p.sku === item.sku);
      if (alreadyInCart) {
        setProducts({ type: "REPLACE", payload: item });
      } else {
        setProducts({ type: "ADD", payload: item });
      }
    });
    if (tmpProducts.length > 0) {
      setButtonStatus("Adding...");

      setTimeout(() => {
        setButtonStatus("");
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
        {buttonStatus || _defaultLabel}{" "}
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
