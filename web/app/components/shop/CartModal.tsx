"use client";
import React, { useEffect, useState } from "react";
import useShop from "./ShopContext";
import clsx from "clsx";
import Link from "next/link";
import { _linkResolver } from "@/app/sanity-api/utils";
import CartItem from "./CartItem";
import { usePageContext } from "@/app/context/PageContext";
import { cartTotalPrice } from "./utils";
import CheckoutBtn from "./CheckoutBtn";

type Props = {};

const CartModal = (props: Props) => {
  const { products, setProducts } = useShop();
  const [canCheckout, setCanCheckout] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(true);
  const { tab } = usePageContext();
  const isEmpty = products.length === 0;

  const _delete = (sku: string) => {
    setProducts({ type: "REMOVE_BY_SKU", payload: sku });
  };

  useEffect(() => {
    setOpen(tab.name === "CART");
  }, [tab]);

  return (
    <div
      className={clsx("cart-modal", { "is-empty": isEmpty, "is-open": open })}>
      <div className='outter'>
        <div className='inner'>
          <div className='header'>
            <h2 className=''>Cart</h2>
          </div>
          <div className='body'>
            {isEmpty && (
              <section className='cart-empty py-xl flex justify-center'>
                <div className='flex flex-col items-center gap-md'>
                  <div className=''>Your cart is empty</div>
                  <Link href={"/"} className='ui-btn ui-btn__accent'>
                    Explore our catalogue
                  </Link>
                </div>
              </section>
            )}
            {products && products.length > 0 && (
              <section className='products mb-lg '>
                <div className='title py-05e'>
                  <div>ITEMS</div>
                </div>
                <div className='items'>
                  {products.map((item, i) => (
                    <CartItem
                      key={i}
                      input={item}
                      _delete={() => _delete(item.sku)}
                    />
                  ))}
                </div>
              </section>
            )}
          </div>
          {!isEmpty && (
            <div className='footer'>
              <div className='totals mb-lg'>
                <div className='totals--inner'>
                  <div className='title '>SUM</div>
                  <div className='label'>Total</div>
                  <div className='value'>
                    <div className='price'>{cartTotalPrice(products)}€ </div>
                  </div>
                </div>
              </div>
              <CheckoutBtn canCheckout={products.length > 0} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartModal;
