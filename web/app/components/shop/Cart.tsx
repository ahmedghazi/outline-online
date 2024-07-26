"use client";
// import { _localizeText } from "@/app/utils/utils";
import { publish } from "pubsub-js";
import React, { useEffect, useRef, useState } from "react";
import useShop from "./ShopContext";

const Cart = () => {
  const [count, setCount] = useState<number>(0);
  const cartRef = useRef<HTMLDivElement>(null);
  const { cartObject } = useShop();

  useEffect(() => {
    const { Snipcart } = window;
    if (!Snipcart) return;

    // const tokenEsc = subscribe("ESC", _onClose);

    // document.addEventListener("snipcart.ready", function () {
    //   console.log("snipcart ready");
    // });

    Snipcart.events.on("snipcart.initialization.error", () => {
      console.log("Failed to initialize Snipcart");
    });

    // Snipcart.events.on("item.added", (cartItem: any) => {
    //   if (!cartRef || !cartRef.current) return;

    //   // publish("ITEM.ADDED");
    //   setCount(Snipcart.store.getState().cart.items.count);
    // });
    // Snipcart.events.on("item.removed", (cartItem: any) => {
    //   setCount(Snipcart.store.getState().cart.items.count);
    // });

    return () => {
      // unsubscribe(tokenEsc);
    };
  }, []);

  useEffect(() => {
    if (cartObject) {
      // console.log(cartObject.items.count);
      setCount(cartObject.items.count);
    }
  }, [cartObject]);

  // const _onClose = () => {
  //   // const { Snipcart } = window;
  //   // if (!Snipcart) return;

  //   // Snipcart.api.theme.cart.close();
  //   const btnClose: HTMLElement = document.querySelector(
  //     ".snipcart-modal__close"
  //   ) as HTMLElement;
  //   if (btnClose) btnClose.click();
  // };

  return (
    <div className='cart' ref={cartRef}>
      <div className='flex'>
        {count > 0 && (
          <div className='snipcart-items-count px-02e'>[{count}]</div>
        )}
        {/* <span className='snipcart-items-count'>3</span> */}
        <button
          className='snipcart-checkout z-10- relative- block- cartouche'
          aria-label='open cart'
          title='open cart'>
          cart
        </button>
      </div>
    </div>
  );
};

export default Cart;
