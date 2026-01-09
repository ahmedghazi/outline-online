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
    const items = products.map((product) => ({
      quantity: 1,
      priceId: null,
      price: {
        name: `License size: ${
          product.licenseSize
        }, License types: ${_licensesTypesToString(product.licenseTypes)}`,
        description: product.sku,
        quantity: {
          minimum: 1,
          maximum: 1,
        },
        unitPrice: {
          amount: String(product.finalPrice * 100), // in cents
          currencyCode: "EUR",
        },
        product: {
          // name: product.fullTitle,
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
          // licenseFor,
          // licenseForData,
        },
      },
    }));
    console.log(items);
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
          // licenseFor: licenseFor,
          // licenseForData: licenseForData,
        },
      }),
    });
    const data = await response.json();
    console.log("Response from server:", data.tsx);
    paddle?.Checkout.open({
      allowQuantity: false,
      transactionId: data.tsx,
      // customer: customerInfo,
      settings: {
        displayMode: "overlay",
        theme: "dark",
        successUrl: `${website.url}/post-checkout?status=success`,
        variant: "multi-page",
      },
    });
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
