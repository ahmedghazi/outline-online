"use client";
import {
  BuyModalNotices,
  LicenseSize,
  LicenseType,
  Product,
  ProductBundle,
  ProductSingle,
  SanityKeyed,
} from "@/app/types/schema";
import React, { useEffect, useState } from "react";
import Select from "../ui/Select";
import clsx from "clsx";
import useShop from "./ShopContext";
import { usePathname } from "next/navigation";
import { usePageContext } from "@/app/context/PageContext";
import BuyModalNoticesComponent from "./BuyModalNoticesComponent";
import LicenseTypeUI from "./LicenseTypeUI";
import AddToTmpCart from "./AddToTmpCart";
import AddToCart from "./AddToCart";
import { div } from "framer-motion/client";
import { subscribe, unsubscribe } from "pubsub-js";

type ProductSingleOrBundleProps = {
  productTitle: string;
  productId: string;
  input: SanityKeyed<ProductSingle | ProductBundle>;
  type: "productBundle" | "productSingle";
  priceMultiplier: number;
};

const ProductSingleOrBundle = ({
  input,
  productTitle,
  productId,
  type,
  priceMultiplier,
}: ProductSingleOrBundleProps) => {
  const [active, setActive] = useState<boolean>(false);
  const [canApplyDiscount, setCanApplyDiscount] = useState<boolean>(false);
  const { licenseTypeProfil, products } = useShop();
  const { settings } = usePageContext();
  console.log("productTitle", productTitle);

  console.log(
    "settings.licenseDiscountPercentage",
    settings.licenseDiscountPercentage,
  );
  // Calculate combined discount for display
  const hasMultipleLicenses = licenseTypeProfil && licenseTypeProfil.length > 1;
  const licenseDiscountPercentage = hasMultipleLicenses
    ? settings.licenseDiscountPercentage || 15
    : 0;
  const productDiscount =
    canApplyDiscount && input.priceDiscount ? input.priceDiscount : 0;
  const totalDiscount = productDiscount + licenseDiscountPercentage;
  console.log("totalDiscount", totalDiscount);
  const isInCart = products.some((el) => el.sku === input._key);
  useEffect(() => {
    //each tmpProduct tells if apply discount is on/off
    const tokenA = subscribe("TMP_PRODUCT_APPLY_DISCOUNT", (_e, data) => {
      if (!input.priceDiscount) return;
      if (input._key === data.sku) {
        setCanApplyDiscount(data.applyDiscount);
      }
    });

    const tokenB = subscribe("TMP_PRODUCT_REMOVE", (_e, data) => {
      console.log("TMP_PRODUCT_REMOVE", data);
      if (data.sku === input._key) {
        setActive(false);
      }
    });

    return () => {
      unsubscribe(tokenA);
      unsubscribe(tokenA);
    };
  }, []);

  const _addOrRemove = () => {
    if (isInCart) return;
    setActive(!active);
  };

  return (
    <div
      className={clsx(
        "item _row grid md:grid-cols-6 md:gap-1e cursor-pointer",
        isInCart && "item--in-cart",
      )}
      onClick={_addOrRemove}>
      <div className='title md:col-span-4'>
        <div className='md:flex md:gap-sm '>
          <div className='title'>{input.title}</div>
          <div className='desc flex-2 flex justify-between hidden-sm'>
            <span className='text-gray-100 '>{input.description}</span>
            {totalDiscount > 0 && (
              <span className='text-green '>Save {totalDiscount}%</span>
            )}
          </div>
        </div>
      </div>
      <div className='actions md:col-span-2'>
        <div className='sm-only'>
          {totalDiscount > 0 && (
            <span className='text-green '>Save {totalDiscount}%</span>
          )}
        </div>

        <AddToTmpCart
          active={active}
          isInCart={isInCart}
          productData={{
            bundleOrSingleKey: input._key || "",
            productType: type,
            sku: input._key || "",
            typefaceSlug:
              input._type === "productSingle"
                ? input.typeface?.slug?.current || ""
                : "",
            relatedTypefaceSlug:
              input._type === "productSingle"
                ? input.relatedTypeface?.slug?.current || ""
                : "",
            basePrice: input.price || 0,
            price: input.price || 0,
            discount: input.priceDiscount || 0,
            applyDiscount: canApplyDiscount,
            finalPrice: input.price || 0,
            productId: productId || "",
            productTitle: productTitle || "",
            fullTitle: `${productTitle} ${input.title || ""}`,
            description: input.description || "",
            licenseSize: "",
            licenseTypes: "",
            licenseInfos: "",
          }}
          priceMultiplier={priceMultiplier}
        />
      </div>
    </div>
  );
};

type BuyProductProps = {
  input: Product;
  priceMultiplier: number;
};

const BuyProduct = ({ input, priceMultiplier }: BuyProductProps) => {
  const [active, setActive] = useState<boolean>(false);
  const pathname = usePathname();
  // console.log(input);
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
                <ProductSingleOrBundle
                  key={i}
                  productId={input._id}
                  productTitle={input.title || ""}
                  input={item}
                  type={item._type}
                  priceMultiplier={priceMultiplier}
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
                <ProductSingleOrBundle
                  key={i}
                  productId={input._id}
                  productTitle={input.title || ""}
                  input={item}
                  type={item._type} //style ???
                  priceMultiplier={priceMultiplier}
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
  const pathname = usePathname();
  const { tab } = usePageContext();
  const [priceMultiplier, setPriceMultiplier] = useState<number>(1);
  // console.log({ productsCart });
  const {
    licenseSizes,
    licenseTypes,
    licenseSizeProfil,
    setLicenseSizeProfil,
    licenseTypeProfil,
    tmpProducts,
  } = useShop();

  useEffect(() => {
    // console.log(pathname);
    // setActive(tab.name === "BUY" && tab.active);
    setOpen(tab.name === "BUY");
  }, [tab]);

  useEffect(() => {
    setReady(true);

    // window.addEventListener("hashchange", (event) => {
    //   // console.log(event, location.hash);
    //   if (location.hash.indexOf("cart") > -1) {
    //     setOpen(false);
    //   }
    // });
  }, []);

  useEffect(() => {
    // console.log(pathname);
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("is-product--open", open);
  }, [open]);

  useEffect(() => {
    let priceMultiplier = 1;
    if (licenseSizeProfil && licenseTypeProfil) {
      priceMultiplier = licenseSizeProfil.priceMultiplier || 1;
      let counter = 0;
      licenseTypeProfil.forEach((el) => {
        if (el.label) {
          counter += el.priceMultiplier || 0;
        }
      });
      priceMultiplier = priceMultiplier * counter;
      // console.log({ priceMultiplier });
    }
    setPriceMultiplier(priceMultiplier);
  }, [licenseSizeProfil, licenseTypeProfil]);

  const _updateLicenseSize = (val: LicenseSize) => {
    setLicenseSizeProfil(val);
  };

  return (
    <div className={clsx("buy-modal", open ? "is-open" : "")}>
      <div className='outter'>
        <div className='inner'>
          <div className='header'>
            {licenseSizes && licenseTypes && (
              <div className='_row grid md:grid-cols-8 '>
                <div className='label'>Company Size</div>
                <div className='input'>
                  <Select
                    options={licenseSizes}
                    onChange={(val: LicenseSize) => _updateLicenseSize(val)}
                  />
                </div>

                <div className='label'>Licenses</div>
                <div className='licenses md:col-span-5 md:py-05e'>
                  <div className='flex flex-wrap md:justify-between gap-sm md:gap-0'>
                    {licenseTypes.map((item, i) => (
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
          <div className='body'>
            <div className='items'>
              {productsCart.map((item, i) => (
                <BuyProduct
                  input={item}
                  key={i}
                  priceMultiplier={priceMultiplier}
                />
              ))}
            </div>
            {buyModalNotices && (
              <BuyModalNoticesComponent input={buyModalNotices} />
            )}
          </div>
          <div className='footer'>
            <AddToCart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyModal;
