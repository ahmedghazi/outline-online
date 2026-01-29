"use client";

import { createContext, useEffect, useState } from "react";
import {
  CheckoutEventsData,
  initializePaddle,
  Paddle,
  PaddleEventData,
} from "@paddle/paddle-js";
import { Environment } from "@paddle/paddle-node-sdk";

type PaddleContext = any;

const PaddleContext = createContext<PaddleContext>(null);

const PaddleProvider = ({ children }: { children: React.ReactNode }) => {
  const [paddle, setPaddle] = useState<Paddle>();

  const _initializePaddle = () => {
    initializePaddle({
      // environment: "sandbox",
      // environment,
      environment:
        process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT === "production"
          ? Environment.production
          : Environment.sandbox,
      token: process.env.NEXT_PUBLIC_PADDLE_PUBLIC_KEY!,
      eventCallback: _handleEvents,
    }).then((paddleInstance: Paddle | undefined) => {
      if (paddleInstance) {
        console.log("Paddle initialized");
        // localStorage.setItem("products", "");
        setPaddle(paddleInstance);
        // console.log(paddleInstance);
      }
    });
  };
  const _handleEvents = (event: PaddleEventData) => {
    console.log(event.name);

    if (event.name === "checkout.completed") {
      console.log(event);
      _processOrderCompleted(event);
    }
    if (
      event.name === "checkout.loaded" ||
      event.name === "checkout.customer.updated"
    ) {
      const data = event.data as CheckoutEventsData;

      const totalDiscount = data.totals.discount;
      const finalTotal = data.totals.total;

      console.log(`********* Discount Applied: ${totalDiscount}`);
      console.log(`********* Final Amount to Pay: ${finalTotal}`);

      // if (parseInt(totalDiscount) > 0) {
      //   // You can trigger a UI message like "Savings applied!"
      // }
    }
  };

  useEffect(() => {
    _initializePaddle();
  }, []);

  const _processOrderCompleted = async (data: PaddleEventData) => {
    const products = JSON.parse(localStorage.getItem("oo-products") || "[]");
    console.log("_processOrderCompleted");
    console.log("data", data);
    console.log("products", products);
    // return;
    /*
    {
      "productTypeRef": "63282b255bdc",
      "productType": "productBundle",
      "sku": "63282b255bdc",
      "basePrice": 360,
      "price": 720,
      "discount": 35,
      "finalPrice": 252,
      "productId": "0e8dd235-d6cc-4905-89a3-667d45e5d6a6",
      "productTitle": "Lyga",
      "fullTitle": "Lyga Essentials",
      "description": "Book, Book Italic, Bold, Bold Italic",
      "licenseSize": "<5",
      "licenseTypes": "PRINT, WEB",
      "licenseInfos": ""
    }
    */
    // return;
    //call api send order to server
    const response = await fetch("/api/order-completed", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        paddleData: data.data,
        products: products.value,
      }),
    });
    const result = await response.json();
    console.log(result);
  };

  return (
    <PaddleContext.Provider value={paddle}>{children}</PaddleContext.Provider>
  );
};

export { PaddleProvider, PaddleContext };
