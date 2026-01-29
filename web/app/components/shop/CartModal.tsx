"use client";
import React, { useEffect, useState } from "react";
import useShop from "./ShopContext";
import clsx from "clsx";
import Link from "next/link";
import { _linkResolver } from "@/app/sanity-api/utils";
import CartItem from "./CartItem";
import { usePageContext } from "@/app/context/PageContext";
import { cartPriceDiscount, cartTotalPrice } from "./utils";
import CheckoutBtn from "./CheckoutBtn";
import Image from "next/image";
import { div } from "framer-motion/client";

type Props = {};

const CartModal = (props: Props) => {
  const { products, setProducts } = useShop();
  const { settings } = usePageContext();
  const [canCheckout, setCanCheckout] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(true);
  const [hasProductsWithMultipleLicenses, setHasProductsWithMultipleLicenses] =
    useState<boolean>(false);
  const { tab, setTab } = usePageContext();
  const isEmpty = products.length === 0;

  const _hasProductsWithMultipleLicenses = () => {
    return false;
    return products.some((product) => {
      const licenseTypes = product.licenseTypes.split("|");
      return licenseTypes.length > 1;
    });
  };

  const _delete = (sku: string) => {
    setProducts({ type: "REMOVE_BY_SKU", payload: sku });
  };

  useEffect(() => {
    // console.log(products);
    setHasProductsWithMultipleLicenses(_hasProductsWithMultipleLicenses());
  }, [products]);

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
                  <button
                    className='ui-btn ui-btn__accent'
                    onClick={() => {
                      setTab({ name: "BUY", active: true });
                    }}>
                    Explore our catalogue
                  </button>
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
              <div className='inner'>
                {hasProductsWithMultipleLicenses && (
                  <div className='cart-row'>
                    <div className='inner-grid'>
                      <div className='label'>Sub Total</div>
                      <div></div>
                      <div className='value col-span-2'>
                        <div className='price'>{cartTotalPrice(products)}€</div>
                      </div>
                    </div>
                  </div>
                )}
                {hasProductsWithMultipleLicenses && (
                  <div className='cart-row '>
                    <div className='inner-grid'>
                      <div className='title '>Discount</div>
                      <div className='label'>
                        {settings.licenseDiscountLabel}
                      </div>

                      <div className=' value col-span-2'>
                        <div className='price'>
                          -{cartPriceDiscount(cartTotalPrice(products), 25)}€
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div className='cart-row cart-row--totals mb-lg'>
                  <div className='inner-grid'>
                    <div className='title '>SUM</div>
                    <div className='label'>Total</div>
                    <div className='value col-span-2'>
                      <div className='price'>
                        {cartTotalPrice(
                          products,
                          hasProductsWithMultipleLicenses,
                        )}
                        €
                      </div>
                    </div>
                  </div>
                </div>
                <div className='cart-row reassurances  flex items-center gap-sm justify-end'>
                  Secured by{" "}
                  <Image
                    src='/paddle-logo-light.png'
                    alt='Paddle'
                    width={50}
                    height={18}
                  />
                </div>
              </div>
              <CheckoutBtn
                canCheckout={products.length > 0}
                shouldApplyDiscount={hasProductsWithMultipleLicenses}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartModal;
