"use client";
import React, { useEffect, useState } from "react";
import useShop from "./ShopContext";
import clsx from "clsx";
import CartItem from "./CartItem";
import { usePageContext } from "@/app/context/PageContext";
import {
  cartTotalDiscount,
  cartTotalPrice,
  cartSubtotal,
  cartHasDiscount,
} from "./utils";
import CheckoutBtn from "./CheckoutBtn";
import { publish } from "pubsub-js";

type Props = {};

const CartModal = (props: Props) => {
  const { products, setProducts, tmpProducts, setTmpProducts } = useShop();
  const [open, setOpen] = useState<boolean>(true);
  const { tab, setTab, settings } = usePageContext();
  const isEmpty = products.length === 0;

  // Check if any product has a discount applied
  const hasAnyDiscount = cartHasDiscount(products);

  useEffect(() => {
    // RESET BUY MODAL WHEN CART IS OPENED
    // if (tab.name === "CART") {
    //   tmpProducts.forEach((item) => {
    //     // setTmpProducts({ type: "REMOVE_BY_SKU", payload: item.sku });
    //     publish("TMP_PRODUCT_REMOVE", { sku: item.sku });
    //   });
    //   // setTmpProducts({ type: "REMOVE_ALL" });
    // }
  }, [tab]);

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
                  <div className=''>Your cart is empty.</div>
                  {/* <button
                    className='ui-btn ui-btn__accent'
                    onClick={() => {
                      setTab({ name: "BUY", active: true });
                    }}>
                    Explore our catalogue
                  </button> */}
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
                {hasAnyDiscount && (
                  <>
                    <div className='cart-row'>
                      <div className='inner-grid'>
                        <div className='label'>SUM</div>
                        <div className='label'>Sub Total</div>

                        <div className='value col-span-2'>
                          <div className='price'>{cartSubtotal(products)}€</div>
                        </div>
                      </div>
                    </div>
                    <div className='cart-row '>
                      <div className='inner-grid'>
                        <div className='title '></div>
                        <div className='label'>
                          {settings.licenseDiscountLabel}
                        </div>
                        <div className=' value col-span-2'>
                          <div className='price'>
                            -{cartTotalDiscount(products)}€
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {/* {hasAnyDiscount && (
                  <div className='cart-row'>
                    <div className='inner-grid'>
                      <div className='label'>Sub Total</div>
                      <div></div>
                      <div className='value col-span-2'>
                        <div className='price'>{cartSubtotal(products)}€</div>
                      </div>
                    </div>
                  </div>
                )} */}
                {/* {hasAnyDiscount && (
                  <div className='cart-row '>
                    <div className='inner-grid'>
                      <div className='title '>Discount</div>
                      <div className='label'>Savings</div>
                      <div className=' value col-span-2'>
                        <div className='price'>
                          -{cartTotalDiscount(products)}€
                        </div>
                      </div>
                    </div>
                  </div>
                )} */}
                <div className='cart-row cart-row--totals mb-lg '>
                  <div className='inner-grid text-blue'>
                    <div className='title '>{!hasAnyDiscount ? "SUM" : ""}</div>
                    <div className='label'>Total</div>
                    <div className='value col-span-2'>
                      <div className='price'>{cartTotalPrice(products)}€</div>
                    </div>
                  </div>
                </div>
                <div className='cart-row reassurances  flex items-center gap-sm justify-end'>
                  <div className='whitespace-nowrap flex gap-sm'>
                    Secure checkout
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
