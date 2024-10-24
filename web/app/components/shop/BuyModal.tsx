"use client";
import {
  LicenseSize,
  // LabelPrice,
  // LicenseSize,
  LicenseType,
  Product,
  ProductBundle,
  ProductSingle,
  SanityKeyed,
} from "@/app/types/schema";
import React, { useEffect, useState } from "react";
import Select from "../ui/Select";
import clsx from "clsx";
import Checkbox from "../ui/Checkbox";
// import Price from "./Price";
import useShop from "./ShopContext";
import AddToCart from "./AddToCart";
import { subscribe, unsubscribe } from "pubsub-js";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    Snipcart: any; // 👈️ turn off type checking
  }
}

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
type CartProductItemProps = {
  title: string;
  input: SanityKeyed<ProductSingle | ProductBundle>;

  type: "bundle" | "single";
};

const CartProductItem = ({ input, title, type }: CartProductItemProps) => {
  const [active, setActive] = useState<boolean>(false);
  const typefaces =
    input._type === "productBundle"
      ? input.typefaces
        ? input.typefaces
        : []
      : input.typeface
      ? [input.typeface]
      : [];
  // console.log(input);
  return (
    <div
      className='item _row grid md:grid-cols-6 md:gap-md cursor-pointer'
      onClick={() => setActive(!active)}>
      <div className='title md:col-span-4'>
        <div className='md:flex md:gap-sm '>
          <div className='title'>
            {input.title} <span className='text-red'>{input.price}</span>
          </div>
          <div className='desc flex-2 flex justify-between hidden-sm'>
            <span className='text-muted '>{input.description}</span>
            {input._type === "productBundle" && input.descriptionAlt && (
              <span className='text-green'>{input.descriptionAlt}</span>
            )}
          </div>
        </div>
      </div>
      {/* <Price price={item.price} /> */}
      <div className='actions md:col-span-2'>
        <div className='sm-only'>
          {input._type === "productBundle" && input.descriptionAlt && (
            <span className='text-green'>{input.descriptionAlt}</span>
          )}
        </div>
        <AddToCart
          id={input._key || ""}
          title={input.title || ""}
          fullTitle={title || ""}
          blurb={""}
          categories={input.categories || []}
          price={input.price || 20000000000}
          priceCrossed={input.priceCrossed}
          metadata={{
            type: type,
            typefaces: typefaces,
          }}
          defaultActive={active}
        />
      </div>
    </div>
  );
};

type CartProductProps = {
  input: Product;
};

const CartProduct = ({ input }: CartProductProps) => {
  const [active, setActive] = useState<boolean>(false);
  // const { licenseSizeProfil } = useShop();
  const pathname = usePathname();
  // console.log(pathname);
  // console.log(input.slug);
  useEffect(() => {
    const isProductPage = pathname.indexOf("product") > -1;
    if (isProductPage) {
      const url = pathname.split("/").pop();

      if (url === input.slug?.current) {
        setActive(true);
      }
    }
  }, [pathname]);

  return (
    <div className={clsx("typeface-item", active && "is-active")}>
      <div
        className='_row py-05e cursor-pointer'
        onClick={() => setActive(!active)}>
        <div className={clsx("flex gap-sm col-span-2 cursor-pointer summary")}>
          <button className='btn-toggle'>◢</button>
          <h2>{input.title}</h2>
        </div>
      </div>

      <div className={clsx("detail", active ? "block" : "hidden")}>
        <div className='group group--bundles'>
          <div className='grid md:grid-cols-8'>
            <div className='label text-gray-100 md:col-span-2'>Bundles</div>
            <div className='items md:col-span-6'>
              {input.bundles?.map((item, i) => (
                <CartProductItem
                  key={i}
                  title={`${input.title} ${item.title}`}
                  input={item}
                  type='bundle'
                />
              ))}
            </div>
          </div>
        </div>
        <div className='group group--singles'>
          <div className='grid md:grid-cols-8'>
            <div className='label text-gray-100 md:col-span-2'>
              Single Styles
            </div>
            <div className='items md:col-span-6'>
              {input.singles?.map((item, i) => (
                <CartProductItem
                  key={i}
                  title={`${input.title} ${item.title}`}
                  input={item}
                  type='single' //style ???
                />
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

const BuyModal = ({ productsCart }: Props) => {
  // const [active, setActive] = useState<boolean>(false);
  const [ready, setReady] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);
  const [buttonStatus, setButtonStatus] = useState("Add To Cart");
  const pathname = usePathname();

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
    setReady(true);
    // _setDefaultLicenses();
    const token = subscribe("BUY_MODAL_ACTIVE", (e, d) => {
      // console.log(e);
      setActive(d);
    });

    const tokenB = subscribe("CART_OPENED", (e, d) => {
      // console.log(e);
      if (d) setActive(false);
    });

    return () => {
      unsubscribe(token);
      unsubscribe(tokenB);
    };
  }, []);

  useEffect(() => {
    // console.log(pathname);
    setActive(false);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("is-product--open", active);
    if (active && pathname === "/") {
      window.scroll(0, window.innerHeight);
    }
  }, [active]);

  // const _setDefaultLicenses = () => {
  //   // console.log(licenseTypeProfil);
  //   //setLicenseSizeProfil()
  //   //setLicenseTypeProfil()
  // };

  const _updateLicenseSize = (val: LicenseType) => {
    setLicenseSizeProfil(val);
  };
  useEffect(() => {
    console.log(licenseSizeProfil);
    console.log("*********** old license types");
    console.table(licenseTypeProfil);
    if (licenseTypeProfil) {
      //replace
      //Lisense Size a changé
      //anciens tableau de licenseYupe
      licenseTypeProfil.forEach((el) => {
        if (licenseSizeProfil && licenseSizeProfil?.licenseType) {
          const replacer = licenseSizeProfil?.licenseType.filter(
            (_el) => _el._key === el._key
          );
          if (replacer) {
            console.log("*********** new license types");
            console.table(replacer[0]);
            setLicenseTypeProfil({ type: "REPLACE", payload: replacer[0] });
          }
        }
      });
      //nx tableau de licenseYupe
    }
  }, [licenseSizeProfil]);

  const _updateLicenseType = (checked: boolean, val: LicenseType) => {
    const items = licenseTypeProfil?.filter((el) => el.label === val.label);
    console.log(checked, val.label, items);
    if (checked) {
      //no dubplicate
      if (items?.length === 0) {
        setLicenseTypeProfil({ type: "ADD", payload: val });
      }
    } else {
      if (items && items.length > 0) {
        //remove
        // console.log("----- remove", val);
        setLicenseTypeProfil({ type: "REMOVE", payload: val });
      }
    }
  };

  const _addToCart = async () => {
    //https://docs.snipcart.com/v3/sdk/api#cart
    // console.log(products);
    setButtonStatus("Adding...");
    try {
      await Promise.all(
        products.map(async (product) => {
          console.log(product);
          await window.Snipcart.api.cart.items.add(product);
        })
      );

      await window.Snipcart.api.theme.cart.open();
      setButtonStatus("Add");
    } catch (error) {
      console.log(error);
    }
  };

  const hasLicenseType = licenseTypeProfil && licenseTypeProfil?.length > 0;
  const hasProducts = products && products.length > 0;
  // console.log(licenseSizeProfil);
  // if (licenseSizeProfil) console.table(licenseSizeProfil.licenseType);
  // console.table(licenseTypeProfil);

  return (
    <div className={clsx("buy-modal", active ? "block" : "hidden")}>
      <div className='outter'>
        <div className='inner'>
          <div className='header'>
            {licenses && (
              <div className='_row grid md:grid-cols-8 '>
                <div className='label'>Company Size</div>
                <div className='input'>
                  <Select
                    options={licenses}
                    onChange={(val: LicenseSize) => _updateLicenseSize(val)}
                    // disabled={hasProducts && hasLicenseType ? true : false}
                  />
                </div>
                {/* <div></div> */}
                {/* <div></div> */}
                <div className='label'>Licenses</div>
                <div className='licenses md:col-span-5 md:py-05e'>
                  <div className='flex flex-wrap md:justify-between gap-sm md:gap-0'>
                    {licenseSizeProfil?.licenseType?.map((item, i) => (
                      <div className='input flex gap-sm' key={i}>
                        <Checkbox
                          name={item.label || ""}
                          checked={ready && i === 0}
                          onChange={(checked: boolean) => {
                            // console.log(checked, item.label);
                            _updateLicenseType(checked, item);
                          }}
                        />
                        <span className='text-red'>{item.price}</span>

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
            <button
              onClick={_addToCart}
              className={clsx(
                "atc-all  block",
                products.length > 0 ? "button-submit" : "button-disabled"
              )}>
              {buttonStatus}{" "}
              {products.length > 0 && (
                <span className='length'>
                  <span>{products.length} </span>
                  <span>product{products.length > 1 && "s"}</span>
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyModal;
