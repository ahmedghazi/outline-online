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
      <div className='header mb-1e !p-0'>
        <h1 className=''>Thank you for your purchase!</h1>

        <p className=''>
          {/* Your download link{items.length > 1 && "s"} is on its way to your
          inbox. */}
          Your payment has been successfully processed. You can find the font
          files for download the zip files along with our EULA in your email. If
          any problems might occur, please get in touch through
          info@outline-online.com. The order details will be sent in a separate
          email.
        </p>
        <p>
          Enjoy your new typeface! <br />
          We would love to see our typefaces in use, so don’t hesitate to reach
          out to us at{" "}
          <a href='mailto:info@outline-online.com'>
            info@outline-online.com
          </a>{" "}
          with your designs!
        </p>
      </div>

      <section className='products mb-lg '>
        <div className='title py-05e'>
          <div>ITEMS</div>
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
