"use client";
import {
  LabelPrice,
  LicenseSize,
  LicenseType,
  Product,
} from "@/app/types/schema";
import React, { useEffect, useState } from "react";
import Select from "../ui/Select";
import clsx from "clsx";
import Checkbox from "../ui/Checkbox";
import Price from "./Price";
import useShop from "./ShopContext";
import AddToCart from "./AddToCart";
import { subscribe, unsubscribe } from "pubsub-js";

type CartProductProps = {
  input: Product;
};

/*
# PROCESS
set context licenseSize (type LicenseSize)
- default is company size <5 or first item
1 row = 1 product (pizza)
each product (bundle, single style) has custom attr of type license
input checkbox snipcart, on change set Products
# TO DO
Default is first license type

{
  productID: xxx,
  type: bundle,
  ref: bundle.ref
}
{
  productID: xxx,
  type: style
  ref: style.ref
}
*/
const CartProduct = ({ input }: CartProductProps) => {
  const [active, setActive] = useState<boolean>(false);
  // const { licenseSizeProfil } = useShop();

  // console.log(input.bundles);
  return (
    <div className={clsx("typeface-item", active && "is-active")}>
      <div className='_row py-05e'>
        <div
          className={clsx("flex gap-sm col-span-2 cursor-pointer")}
          onClick={() => setActive(!active)}>
          <button className='btn-toggle'>
            <svg
              version='1.1'
              id='Calque_1'
              xmlns='http://www.w3.org/2000/svg'
              x='0px'
              y='0px'
              viewBox='0 0 4.9 9.9'
              width={4.9}
              height={9.9}>
              <polygon points='4.9,4.9 0,9.9 0,0 ' />
            </svg>
          </button>
          <h2>{input.title}</h2>
        </div>
      </div>

      <div className={clsx("detail", active ? "block" : "hidden")}>
        <div className='group'>
          <div className='grid md:grid-cols-8'>
            <div className='label text-muted- col-span-2'>Bundles</div>
            <div className='items col-span-6'>
              {input.bundles?.map((item, i) => (
                <div className='item _row grid md:grid-cols-6' key={i}>
                  <div className='title col-span-4'>
                    <div className='flex gap-sm'>
                      <div className='title'>{item.title}</div>
                      <ul className='flex text-muted gap-sm'>
                        {item.typefaces?.map((_item, j) => (
                          <li key={j}>{_item.title}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  {/* <Price price={item.price} /> */}
                  <div className='actions col-span-2'>
                    <AddToCart
                      id={item._key || ""}
                      title={item.title || ""}
                      blurb={"ze blurb"}
                      price={item.price || 20000000000}
                      metadata={{
                        type: "bundle",
                        typefaces: item.typefaces ? item.typefaces : [],
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='group'>
          <div className='grid md:grid-cols-8'>
            <div className='label text-muted- col-span-2'>Single Styles</div>
            <div className='items col-span-6'>
              {input.singles?.map((item, i) => (
                <div className='item _row grid md:grid-cols-6' key={i}>
                  <div className='title col-span-4'>{item.title}</div>

                  {/* <Price price={item.price} /> */}
                  <div className='actions col-span-2'>
                    <AddToCart
                      id={item._key || ""}
                      title={item.title || ""}
                      blurb={"ze blurb"}
                      price={item.price || 20000000000}
                      metadata={{
                        type: "style",
                        typefaces: item.typeface ? [item.typeface] : [],
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

type Props = {
  productsCart: Product[];
};

declare global {
  interface Window {
    Snipcart: any; // 👈️ turn off type checking
  }
}

const BuyModal = ({ productsCart }: Props) => {
  // const [active, setActive] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);
  const [buttonStatus, setButtonStatus] = useState("Add To Cart");

  const {
    licenses,
    licenseSizeProfil,
    setLicenseSizeProfil,
    licenseTypeProfil,
    setLicenseTypeProfil,
    products,
  } = useShop();
  // console.log(products);

  useEffect(() => {
    _setDefaultLicenses();
    const token = subscribe("BUY_MODAL_ACTIVE", (e, d) => {
      setActive(d);
    });

    return () => {
      unsubscribe(token);
    };
  }, []);

  const _setDefaultLicenses = () => {
    // console.log(licenseTypeProfil);
    //setLicenseSizeProfil()
    //setLicenseTypeProfil()
  };

  const _updateLicenseType = (checked: boolean, val: LicenseType) => {
    const items = licenseTypeProfil?.filter((el) => el.label === val.label);
    // if (checked) console.log(checked, val, items);
    if ((items && items.length > 0) || !checked) {
      //remove
      setLicenseTypeProfil({ type: "REMOVE", payload: val });
    } else {
      //add
      setLicenseTypeProfil({ type: "ADD", payload: val });
    }
  };
  // const _addToCart = () => {};
  const _addToCart = async () => {
    //https://docs.snipcart.com/v3/sdk/api#cart
    // console.log(products);
    setButtonStatus("Adding...");
    try {
      // const productsToAdd = ''
      // await Snipcart.api.cart.items.add(products)
      await Promise.all(
        products.map(async (product) => {
          console.log(product);
          await window.Snipcart.api.cart.items.add(product);
        })
      );
      // products.forEach(product => {})

      // console.log(products.toString())
      await window.Snipcart.api.theme.cart.open();
      setButtonStatus("Add");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={clsx("buy-modal", active ? "block" : "hidden")}>
      {/* <pre>{JSON.stringify(productsCart, null, 2)}</pre> */}
      <div className='outter'>
        <div className='inner'>
          <div className='header'>
            {licenses && (
              <div className='_row grid md:grid-cols-8'>
                <div className='label'>Company Size</div>
                <div className='input'>
                  <Select
                    options={licenses}
                    onChange={(val: string) => setLicenseSizeProfil(val)}
                  />
                </div>
                <div></div>
                <div></div>
                <div className='label'>Licenses</div>
                <div className='licenses md:col-span-3 py-05e'>
                  <div className='flex justify-between'>
                    {licenseSizeProfil?.licenseType?.map((item, i) => (
                      <div className='input flex gap-sm' key={i}>
                        <Checkbox
                          name={item.label || ""}
                          checked={i === 0}
                          onChange={(checked: boolean) => {
                            // console.log(checked, item.label);
                            _updateLicenseType(checked, item);
                          }}
                        />
                        {/* <div className='label !p-0'>{item.label}</div> */}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className='body overflow-y-auto- h-screen-'>
            <div className='items'>
              {productsCart.map((item, i) => (
                <CartProduct input={item} key={i} />
              ))}
            </div>
          </div>
          <div className='footer'>
            {/* <pre>{JSON.stringify(products, null, 2)}</pre> */}
            {products.length > 0 && (
              <button onClick={_addToCart} className='atc-all bg-green block'>
                {buttonStatus}{" "}
                <span className='length'>
                  {products.length} product{products.length > 1 && "s"}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyModal;
