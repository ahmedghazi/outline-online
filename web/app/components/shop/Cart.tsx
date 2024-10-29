"use client";
// import { _localizeText } from "@/app/utils/utils";
import { publish, subscribe, unsubscribe } from "pubsub-js";
import React, { useEffect, useRef, useState } from "react";
import useShop from "./ShopContext";
import { usePathname } from "next/navigation";
import { usePageContext } from "@/app/context/PageContext";

const Cart = () => {
  const [count, setCount] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const cartRef = useRef<HTMLDivElement>(null);
  const { cartObject } = useShop();
  const pathname = usePathname();
  const { tab, setTab } = usePageContext();

  const _onClick = () => {
    const nextActive = !open;
    setTab({
      name: nextActive ? "CART" : "",
      active: nextActive,
    });
  };

  useEffect(() => {
    // console.log(open);
    // if (!open) return;

    _toggle();
    // setTab({
    //   name: open ? "CART" : "",
    //   active: open,
    // });
    // else setTab("");
    // publish("HEADER_TAB_CHANGE", {
    //   item: "CART",
    //   active: open,
    // });
  }, [open]);

  useEffect(() => {
    // console.log(pathname);
    setOpen(tab.name === "CART");
  }, [tab]);

  useEffect(() => {
    // const token = subscribe("HEADER_TAB_CHANGE", (e, d) => {
    //   const { item, active } = d;
    //   console.log(e, d);
    //   if (item === "BUY") {
    //     setOpen(false);
    //   }
    // });
    // return () => {
    //   unsubscribe(token);
    // };
  }, []);

  useEffect(() => {
    if (cartObject) {
      // console.log(cartObject.items.count);
      setCount(cartObject.items.count);
    }
  }, [cartObject]);

  useEffect(() => {
    _onClose();
  }, [pathname]);

  const _onClose = () => {
    if (!window.Snipcart) return;
    window.Snipcart.api.theme.cart.close();
    // const btnClose: HTMLElement = document.querySelector(
    //   ".snipcart-modal__close"
    // ) as HTMLElement;
    // if (btnClose) btnClose.click();
  };

  const _toggle = () => {
    if (!window.Snipcart) return;
    if (open) {
      window.Snipcart.api.theme.cart.open();
    } else {
      window.Snipcart.api.theme.cart.close();
    }
  };

  return (
    <div className='cart' ref={cartRef}>
      <button
        onClick={_onClick}
        className='btn--cart snipcart-checkout-'
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

export default Cart;
