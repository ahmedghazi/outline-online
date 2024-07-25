"use client";
import React, { useState } from "react";
import { Product } from "../types/schema";
import BuyModal from "./shop/BuyModal";
import clsx from "clsx";

type Props = {
  productsCart: Product[];
};

const Buy = ({ productsCart }: Props) => {
  const [active, setActive] = useState<boolean>(false);
  return (
    <div>
      <button
        onClick={() => setActive(!active)}
        className={clsx(active && "line-through")}>
        Buy
      </button>
      {active && <BuyModal input={productsCart} />}
    </div>
  );
};

export default Buy;
