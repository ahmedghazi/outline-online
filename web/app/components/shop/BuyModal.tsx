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

  // let isPriceCrossed: boolean =
  //   typeof input.priceDiscount !== "undefined" && input.priceDiscount !== null;

  const _addOrRemove = () => {
    setActive(!active);
  };
  return (
    <div
      className={clsx(
        "item _row grid md:grid-cols-6 md:gap-1e cursor-pointer"
        // isPriceCrossed && "is-price-crossed"
      )}
      onClick={_addOrRemove}>
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
      <div className='actions md:col-span-2'>
        <div className='sm-only'>
          {input._type === "productBundle" && input.priceDiscount && (
            <span className='text-green '>Save {input.priceDiscount}%</span>
          )}
        </div>

        <AddToTmpCart
          active={active}
          productData={{
            bundleOrSingleKey: input._key || "",
            productType: type,
            sku: input._key || "",
            basePrice: input.price || 0,
            price: input.price || 0,
            discount: input.priceDiscount || 0,
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
  // console.log({ tab });
  const {
    licenseSizes,
    licenseTypes,
    licenseSizeProfil,
    setLicenseSizeProfil,
    licenseTypeProfil,
    tmpProducts,
  } = useShop();
  console.log({ licenseTypeProfil });

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
          // à préciser, + ou *
          // priceMultiplier *= el.priceMultiplier || 0;
          // console.log(priceMultiplier, el.priceMultiplier);
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
            {/* <pre>{priceMultiplier}</pre> */}
            {/* <pre>{JSON.stringify(tmpProducts, null, 2)}</pre> */}
            {/* <pre>{JSON.stringify(products, null, 2)}</pre> */}

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
