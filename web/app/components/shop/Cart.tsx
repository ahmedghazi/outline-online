"use client";
// import { _localizeText } from "@/app/utils/utils";
import { publish, subscribe, unsubscribe } from "pubsub-js";
import React, { useEffect, useRef, useState } from "react";
import useShop from "./ShopContext";
import { usePathname } from "next/navigation";

const Cart = () => {
  const [count, setCount] = useState<number>(0);
  const cartRef = useRef<HTMLDivElement>(null);
  const { cartObject } = useShop();
  const pathname = usePathname();

  // useEffect(() => {
  //   const { Snipcart } = window;
  //   if (!Snipcart) return;

  //   Snipcart.events.on("snipcart.initialization.error", () => {
  //     console.log("Failed to initialize Snipcart");
  //   });
  // }, []);

  useEffect(() => {
    const token = subscribe("CART_OPENED", (e, d) => {
      if (d && pathname === "/") {
        document.body.scroll(0, window.innerHeight);
      }
    });

    return () => {
      unsubscribe(token);
    };
  }, []);

  useEffect(() => {}, []);

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
    // const { Snipcart } = window;
    // if (!Snipcart) return;

    // Snipcart.api.theme.cart.close();
    const btnClose: HTMLElement = document.querySelector(
      ".snipcart-modal__close"
    ) as HTMLElement;
    if (btnClose) btnClose.click();
  };

  return (
    <div className='cart' ref={cartRef}>
      <button
        className='btn--cart snipcart-checkout'
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
