"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, Suspense } from "react";
import CartItem from "./CartItem";
import { ProductData } from "@/app/types/extra-types";

const CheckoutSuccess = () => {
  const [items, setItems] = React.useState<ProductData[]>([]);

  useEffect(() => {
    const raw = localStorage?.getItem("oo-products");
    const storedProducts = raw ? JSON.parse(raw) : [];
    setItems(storedProducts?.value || []);
  }, []);

  return (
    <div className='success'>
      <div className='header mb-lg !p-0'>
        <h1> Thank you for your order with Outline Online!</h1>

        <p>
          Your payment has been successfully processed. You’ll find the font
          files ready for download in a separate email. The full order details
          will also be sent to you shortly. If you run into any issues, please
          don’t hesitate to get in touch.
        </p>
        <p>
          We’d also love to see our typefaces in use, so feel free to send us
          images of your work anytime. ❤
        </p>
      </div>

      <section className='products mb-lg '>
        <div className='title py-05e'>
          <div>Items</div>
        </div>
        <div className='items'>
          {items?.map((item: ProductData, i: number) => (
            <CartItem key={i} input={item} />
          ))}
        </div>
      </section>
    </div>
  );
};

const CheckoutError = () => {
  return (
    <div className='error'>
      <div className='header mb-1e !p-0'>
        <h1>Error :(</h1>
      </div>
      <p>display some error message here</p>
      <a href='mailto:hello@outlineonline.com'>Contact us</a>
    </div>
  );
};

const PostCheckoutContent = () => {
  const search = useSearchParams();
  const status = search.get("status");

  return (
    <>
      {status === "success" && <CheckoutSuccess />}
      {status === "canceled" && <CheckoutError />}
    </>
  );
};

const PostCheckout = () => {
  return (
    <div className='post-checkout pt-header-height px-sm md:px-lg'>
      <div className='h-header-height'></div>

      <Suspense fallback={<div>Loading...</div>}>
        <PostCheckoutContent />
      </Suspense>
    </div>
  );
};

export default PostCheckout;
