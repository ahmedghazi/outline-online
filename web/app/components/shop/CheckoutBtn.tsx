"use client";
import React, { useContext, useEffect } from "react";
import { PaddleContext } from "./Paddle/PaddleProvider";
import useShop from "./ShopContext";
import website from "@/app/config/website";
import { ProductData } from "@/app/types/extra-types";
import clsx from "clsx";
import { _licensesTypesToString } from "./utils";

type Props = {
  canCheckout: boolean;
  // shouldApplyDiscount?: boolean;
};

type CheckoutOpenAttrs = {
  allowQuantity: boolean;
  transactionId: string; // adjust type if needed
  settings: {
    displayMode: string;
    theme: string;
    successUrl: string;
    variant: string;
  };
  discountId?: string; // optional
};

const CheckoutBtn = ({ canCheckout }: Props) => {
  const paddle = useContext(PaddleContext);
  const { products } = useShop();

  const storeProducts = (products: ProductData[], ttl: number) => {
    const now = new Date();

    // `item` is an object which contains the original value
    // as well as the time when it's supposed to expire
    const item = {
      value: products,
      expiry: now.getTime() + ttl,
    };
    localStorage.setItem("oo-products", JSON.stringify(item));
  };

  const _renderItemJson = (product: ProductData) => {
    // Send price BEFORE discount to Paddle
    // Paddle will apply the discount so it appears on the receipt
    const totalDiscount = product.totalDiscount || 0;
    const shouldApplyDiscount = totalDiscount > 0;

    return {
      quantity: 1,
      price: {
        name: `${product.fullTitle} - ${
          product.bundleOrSingleKey === "single"
            ? "Single License"
            : "Bundle License"
        }, License types: ${_licensesTypesToString(product.licenseTypes)}
        `,
        description: product.sku,
        quantity: {
          minimum: 1,
          maximum: 1,
        },
        unitPrice: {
          // Send price before discount (product.price has priceMultiplier but no discount)
          amount: Math.round(product.price * 100).toString(),
          currencyCode: "EUR",
        },

        product: {
          name: `${product.fullTitle}`,
          description: product.sku || "sku",
          taxCategory: "standard",
        },
        // use camelCase per Paddle SDK expectations
        customData: {
          sku: product.sku,
          productType: product.productType,
          productId: product.productId,
          bundleOrSingleKey: product.bundleOrSingleKey,
          licenseSize: product.licenseSize,
          licenseTypes: product.licenseTypes,
          shouldApplyDiscount: shouldApplyDiscount,
          discountPercentage: totalDiscount,
        },
      },
    };
  };

  const handleCheckout = async () => {
    if (!paddle) return alert("Paddle not initialized");

    // console.log("BtnCheckout clicked");

    // Prevent checkout when cart is empty
    if (!products || products.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    //store products (with custom data) locale storage
    storeProducts(products, 300);
    // then on order completed, get thoses produicts and post to sanity
    const items = products.map((product) => _renderItemJson(product));

    // console.table(items);
    // return;

    const response = await fetch("/api/paddle/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: items,
        // use camelCase per Paddle SDK expectations
        customData: {
          foo: "bar",
          // discount_code: shouldApplyDiscount,
          // licenseFor: licenseFor,
          // licenseForData: licenseForData,
        },
      }),
    });
    const data = await response.json();
    console.log("Response from server:", data);
    const checkoutOpenAttrs: CheckoutOpenAttrs = {
      allowQuantity: false,
      transactionId: data.transactionId,
      // customer: customerInfo,
      settings: {
        displayMode: "overlay",
        theme: "dark",
        successUrl: `${website.url}/post-checkout?status=success`,
        variant: "multi-page",
      },
    };
    // if (shouldApplyDiscount) {
    //   checkoutOpenAttrs.discountId = settings.licenseDiscountID;
    // }
    // console.log(checkoutOpenAttrs);
    paddle?.Checkout.open(checkoutOpenAttrs);
  };
  return (
    <div className='flex justify-center'>
      <button
        className={clsx("ui-btn ui-btn__accent", !canCheckout && "disabled")}
        onClick={handleCheckout}>
        Checkout
      </button>
    </div>
  );
};

export default CheckoutBtn;
