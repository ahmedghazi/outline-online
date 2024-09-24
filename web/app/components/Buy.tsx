"use client";
import React, { useEffect, useState } from "react";
import { Product } from "../types/schema";
import BuyModal from "./shop/BuyModal";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { publish } from "pubsub-js";

type Props = {
  productsCart: Product[];
};

const Buy = ({ productsCart }: Props) => {
  const [active, setActive] = useState<boolean>(false);

  const pathnem = usePathname();
  useEffect(() => {
    setActive(false);
  }, [pathnem]);

  useEffect(() => {
    publish("BUY_MODAL_ACTIVE", active);
    document.body.classList.toggle("has-scrolled", active);
  }, [active]);

  return (
    <div>
      <button
        onClick={() => setActive(!active)}
        className={clsx("btn--buy z-10", active && "bg-gray")}>
        <span>BUY</span>
      </button>
      {/* {active && productsCart && <BuyModal productsCart={productsCart} />} */}
    </div>
  );
};

export default Buy;
