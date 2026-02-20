"use client";
import React, { useState } from "react";
import useShop from "./ShopContext";
import clsx from "clsx";

type Props = {
  canCheckout: boolean;
};

const CheckoutBtn = ({ canCheckout }: Props) => {
  const { products } = useShop();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (!products || products.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ products }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Checkout failed. Please try again.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Checkout failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className='flex justify-center'>
      <button
        className={clsx(
          "ui-btn ui-btn__accent",
          (!canCheckout || loading) && "disabled",
        )}
        onClick={handleCheckout}
        disabled={loading}>
        {loading ? "Redirecting..." : "Checkout"}
      </button>
    </div>
  );
};

export default CheckoutBtn;
