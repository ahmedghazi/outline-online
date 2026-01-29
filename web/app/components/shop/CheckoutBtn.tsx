"use client";
import React, { useContext, useEffect } from "react";
import { PaddleContext } from "./Paddle/PaddleProvider";
import useShop from "./ShopContext";
import website from "@/app/config/website";
import { ProductData } from "@/app/types/extra-types";
import clsx from "clsx";
import { _licensesTypesToString } from "./utils";
import { usePageContext } from "@/app/context/PageContext";

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
  const { settings } = usePageContext();
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
    // let unitAmount = Math.round(product.finalPrice * 100);

    // // 2. Apply the 15% discount manually if the condition is met
    // // This ensures ONLY this specific product is discounted
    // if (product.hasMultipleLicenses) {
    //   unitAmount = Math.round(unitAmount * 0.85);
    // }

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
          amount: Math.round(product.finalPrice * 100).toString(), // Rounding Protection: In TypeScript, product.finalPrice * 100 can sometimes result in floating point errors (e.g., 19.99 * 100 = 1998.9999). It is safer to use
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
          shouldApplyDiscount: product.hasMultipleLicenses,
          discountPercentage: product.hasMultipleLicenses ? 15 : 0,
        },
      },
    };
  };

  const handleCheckout = async () => {
    if (!paddle) return alert("Paddle not initialized");

    console.log("BtnCheckout clicked");

    // Prevent checkout when cart is empty
    if (!products || products.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    //store products (with custom data) locale storage
    storeProducts(products, 300);
    // then on order completed, get thoses produicts and post to sanity
    const items = products.map((product) => _renderItemJson(product));

    console.table(items);
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
