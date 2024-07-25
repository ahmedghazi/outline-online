"use client";
import React, { useEffect, useState } from "react";
import { Product, Style, Typeface } from "../types/schema";
// import Typetester from "./typeface/TypeTester";
// import Licences from "./shop/Licences";
// import BundleUI from "./shop/BundleUI";
// import StylesUI from "./shop/StylesUI";
// import LicenseTypeUI from "./shop/LicenseTypeUI";
// import LicenseSizeUI from "./shop/LicenseSizeUI";
import useShop from "./shop/ShopContext";
// import clsx from "clsx";
import TypeTesterHero from "./typeface/TypeTesterHero";
import Modules from "./modules";
// import { PortableText } from "next-sanity";
// import portableTextComponents from "../utils/portableTextComponents";
import Glyphs from "./typeface/Glyphs";
// import { SanityReference } from "sanity-codegen";
import useType from "./typeface/TypeContext";
import CartModal from "./shop/BuyModal";
// import useType from "./typeface/TypeContext";

type Props = {
  input: Product;
};

const ContentProduct = ({ input }: Props) => {
  const {
    setCurrentProduct,
    licenseTypeProfil,
    licenseSizeProfil,
    dataAttributes,
  } = useShop();

  const { type, dispatchType, dispatchTypes } = useType();
  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    setCurrentProduct(input);
    _setDefaultTypeface();
    _loadAllTypefaces();
  }, []);

  useEffect(() => {
    if (type) setReady(true);
  }, [type]);

  const _setDefaultTypeface = () => {
    const regular = input.styles?.filter(
      (el) => el.typeface?.style === "regular"
    );
    if (regular && regular?.length === 1) {
      // console.log(dispatchType);
      dispatchType(regular[0].typeface);
    }
  };

  const _loadAllTypefaces = () => {
    let arr: Typeface[] = [];
    input.styles?.forEach((el) => {
      // console.log(el.typeface);
      if (el.typeface) arr.push(el.typeface);
    });
    dispatchTypes(arr);
  };

  const hasLicences =
    licenseTypeProfil && licenseTypeProfil.length > 0 && licenseSizeProfil;

  return (
    <div
      className='content-product px-lg'
      style={
        {
          // fontFamily: type?.slug?.current,
          "--typeface": type?.slug?.current,
          opacity: type ? 1 : 0,
        } as React.CSSProperties
      }>
      {input.styles && <TypeTesterHero input={input.styles} />}

      <section className='content mb-lg'>
        {input.content && <Modules input={input.content} />}
      </section>

      {input.styles && <Glyphs input={input.styles[0]} />}

      {/* <div className='mb-lg'>
        <LicenseTypeUI input={input} />
      </div>

      <div className='mb-lg'>
        <LicenseSizeUI input={input} />
      </div>

      <div className={clsx("packages", hasLicences ? "block" : "hidden")}>
        <div className='mb-md'>3. Select your packages</div>

        <div className='bundles mb-lg b-b'>
          <h2>Bundles</h2>
          {input.bundles?.map((item, i) => (
            <div className='bundle' key={i}>
              <BundleUI input={item} title={input.title} />
            </div>
          ))}
        </div>
        <div className='styles'>
          <h2>Styles</h2>
          {input.styles?.map((item, i) => (
            <div className='style' key={i}>
              <StylesUI input={item} title={input.title} />
            </div>
          ))}
        </div>
      </div>

      <pre>{JSON.stringify(licenseTypeProfil, null, 2)}</pre>
      <pre>{JSON.stringify(licenseSizeProfil, null, 2)}</pre>
      <pre>{JSON.stringify(dataAttributes, null, 2)}</pre> */}
    </div>
  );
};

export default ContentProduct;
