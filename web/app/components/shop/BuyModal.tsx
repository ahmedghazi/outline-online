"use client";
import {
  BuyModalNotices,
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
import { usePageContext } from "@/app/context/PageContext";
import BuyModalNoticesComponent from "./BuyModalNoticesComponent";
import LicenseTypeUI from "./LicenseTypeUI";

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
  productId: string;
  input: SanityKeyed<ProductSingle | ProductBundle>;
  type: "bundle" | "single";
};

const CartProductItem = ({
  input,
  title,
  productId,
  type,
}: CartProductItemProps) => {
  const [active, setActive] = useState<boolean>(false);
  const typefaces =
    input._type === "productBundle"
      ? input.typefaces
        ? input.typefaces
        : []
      : input.typeface
      ? [input.typeface]
      : [];

  // let greenText = "";
  let isPriceCrossed: boolean =
    typeof input.priceDiscount !== "undefined" && input.priceDiscount !== null;

  return (
    <div
      className={clsx(
        "item _row grid md:grid-cols-6 md:gap-1e cursor-pointer",
        isPriceCrossed && "is-price-crossed"
      )}
      onClick={() => setActive(!active)}>
      <div className='title md:col-span-4'>
        <div className='md:flex md:gap-sm '>
          <div className='title'>{input.title}</div>
          <div className='desc flex-2 flex justify-between hidden-sm'>
            <span className='text-muted '>{input.description}</span>
            {input._type === "productBundle" && input.priceDiscount && (
              <span className='text-green '>Save {input.priceDiscount}%</span>
            )}
          </div>
        </div>
      </div>
      {/* <Price price={item.price} /> */}
      <div className='actions md:col-span-2'>
        <div className='sm-only'>
          {/* {input._type === "productBundle" && input.descriptionAlt && (
            <span className='text-green'>{input.descriptionAlt}</span>
          )} */}
          {input._type === "productBundle" && input.priceDiscount && (
            <span className='text-green '>Save {input.priceDiscount}%</span>
          )}
        </div>
        <AddToCart
          id={input._key || ""}
          title={input.title || ""}
          fullTitle={title || ""}
          blurb={""}
          categories={input.categories || []}
          categoryLicensePrice={
            input._type === "productBundle" ? input.categoryLicensePrice : ""
          }
          price={input.price || 0}
          // priceCrossed={isPriceCrossed ? priceCrossed : undefined}
          priceDiscount={input.priceDiscount}
          metadata={{
            productId: productId,
            type: type,
            _key: input._key,
            // typefaces: typefaces,
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
  const pathname = usePathname();

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
                  productId={input._id}
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
                  productId={input._id}
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
  buyModalNotices?: BuyModalNotices;
};

const BuyModal = ({ productsCart, buyModalNotices }: Props) => {
  // const [active, setActive] = useState<boolean>(false);
  const [ready, setReady] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [buttonStatus, setButtonStatus] = useState("Add To Cart");
  const pathname = usePathname();
  const { tab } = usePageContext();
  // console.log({ tab });
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
    // console.log(pathname);
    // setActive(tab.name === "BUY" && tab.active);
    setOpen(tab.name === "BUY");
  }, [tab]);

  useEffect(() => {
    setReady(true);

    window.addEventListener("hashchange", (event) => {
      // console.log(event, location.hash);
      if (location.hash.indexOf("cart") > -1) {
        setOpen(false);
      }
    });
  }, []);

  useEffect(() => {
    // console.log(pathname);
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("is-product--open", open);
    // if (active && pathname === "/") {
    //   window.scroll(0, window.innerHeight);
    // }
  }, [open]);

  const _updateLicenseSize = (val: LicenseSize) => {
    setLicenseSizeProfil(val);
  };
  useEffect(() => {
    if (licenseTypeProfil) {
      licenseTypeProfil.forEach((el) => {
        if (licenseSizeProfil && licenseSizeProfil?.licenseType) {
          const replacer = licenseSizeProfil?.licenseType.filter(
            (_el) => _el.label === el.label
          );
          if (replacer && replacer.length === 1) {
            setLicenseTypeProfil({ type: "REPLACE", payload: replacer[0] });
          }
        }
      });
    }
  }, [licenseSizeProfil]);

  const _updateLicenseType = (checked: boolean, val: LicenseType) => {
    const items = licenseTypeProfil?.filter((el) => el.label === val.label);
    // console.log(checked, val.label, items);
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
          // console.log(product);
          await window.Snipcart.api.cart.items.add(product);
        })
      );

      await window.Snipcart.api.theme.cart.open();
      setButtonStatus("Add");
    } catch (error) {
      console.log(error);
    }
  };
  console.log(licenseTypeProfil);
  return (
    <div className={clsx("buy-modal", open ? "block" : "hidden")}>
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

                <div className='label'>Licenses</div>
                <div className='licenses md:col-span-5 md:py-05e'>
                  <div className='flex flex-wrap md:justify-between gap-sm md:gap-0'>
                    {licenseSizeProfil?.licenseType?.map((item, i) => (
                      // <div className='input flex gap-sm' key={i}>
                      //   <Checkbox
                      //     name={item.label || ""}
                      //     checked={ready && i === 0}
                      //     onChange={(checked: boolean) => {
                      //       // console.log(checked, item.label);
                      //       _updateLicenseType(checked, item);
                      //     }}
                      //   />
                      // </div>
                      <LicenseTypeUI
                        key={i}
                        input={item}
                        index={i}
                        ready={ready}
                      />
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
            {buyModalNotices && (
              <BuyModalNoticesComponent input={buyModalNotices} />
            )}
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
      {/* <pre>{JSON.stringify(licenseTypeProfil, null, 2)}</pre> */}
    </div>
  );
};

export default BuyModal;
