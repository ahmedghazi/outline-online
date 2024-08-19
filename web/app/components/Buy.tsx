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
  }, [active]);

  return (
    <div>
      <button
        onClick={() => setActive(!active)}
        className={clsx("btn--buy", active && "line-through")}>
        Buy
      </button>
      {/* {active && <BuyModal input={productsCart} />} */}
    </div>
  );
};

export default Buy;
