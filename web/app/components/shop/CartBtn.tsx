"use client";
// import { _localizeText } from "@/app/utils/utils";
import { publish, subscribe, unsubscribe } from "pubsub-js";
import React, { useEffect, useRef, useState } from "react";
import useShop from "./ShopContext";
import { usePathname } from "next/navigation";
import { usePageContext } from "@/app/context/PageContext";
import clsx from "clsx";

const CartBtn = () => {
  const [open, setOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const { tab, setTab } = usePageContext();
  const [active, setActive] = useState<boolean>(false);
  const { products } = useShop();
  const count = products.length;
  // console.log(cartObject);
  const _onClick = () => {
    const nextActive = !active;
    setTab({
      name: nextActive ? "CART" : "",
      active: nextActive,
    });
  };

  useEffect(() => {
    setActive(tab.name === "CART");
  }, [tab]);

  useEffect(() => {
    setActive(false);
  }, [pathname]);

  return (
    <div className='cart'>
      <button
        onClick={_onClick}
        className={clsx("btn--cart", active && "bg-gray")}
        aria-label='open cart'
        title='open cart'>
        <span className='label'>CART</span>
        <span className='snipcart-items-count- text-green pl-02e'>
          ({count})
        </span>
      </button>
    </div>
  );
};

export default CartBtn;
