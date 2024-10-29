"use client";
import React, { useEffect, useState } from "react";
import { Product } from "../types/schema";
import BuyModal from "./shop/BuyModal";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { publish, subscribe, unsubscribe } from "pubsub-js";
import { usePageContext } from "../context/PageContext";

type Props = {
  productsCart: Product[];
};

const Buy = ({ productsCart }: Props) => {
  const [active, setActive] = useState<boolean>(false);
  const pathname = usePathname();
  const { tab, setTab } = usePageContext();

  const _onClick = () => {
    const nextActive = !active;
    setTab({
      name: nextActive ? "BUY" : "",
      active: nextActive,
    });
  };

  useEffect(() => {
    // console.log("Buy", active);
    // setTab({
    //   name: active ? "BUY" : "",
    //   active: active,
    // });
    // else setTab("");
  }, [active]);

  useEffect(() => {
    // console.log("Buy", tab);
    setActive(tab.name === "BUY");
  }, [tab]);

  useEffect(() => {
    // const token = subscribe("HEADER_TAB_CHANGE", (e, d) => {
    //   console.log(e, d);
    //   const { item, active } = d;
    //   if (item === "CART") {
    //     setActive(false);
    //   }
    // });

    return () => {
      // unsubscribe(token);
    };
  }, []);

  // useEffect(() => {
  //   setActive(false);
  // }, [pathname]);

  return (
    <button
      onClick={_onClick}
      className={clsx("btn--buy z-10", active && "bg-gray")}>
      <span>BUY</span>
    </button>
  );
};

export default Buy;
