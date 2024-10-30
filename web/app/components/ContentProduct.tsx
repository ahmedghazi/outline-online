"use client";
import React, { useEffect, useState } from "react";
import { Product, Typeface } from "../types/schema";
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
  console.log(type);
  const _gerRandomPangram = (p: string[] | any) => {
    if (!p)
      return "24 wacky bandmates mixed zany rhythms, blowing jazzy saxophones and fixing broken xylophones for a quirky gig.";
    const len = p.length;
    const rand = Math.round(Math.random() * len);
    return p[rand];
  };

  const pangram = _gerRandomPangram(input.pangrams);

  useEffect(() => {
    setCurrentProduct(input);
    _setDefaultTypeface();
    _loadAllTypefaces();
  }, []);

  useEffect(() => {
    if (type) setReady(true);
  }, [type]);

  const _setDefaultTypeface = () => {
    // console.log(input.singles);
    const regular = input.singles?.filter(
      (el) => el.typeface?.style === "regular"
    );
    if (regular && regular?.length === 1) {
      // console.log(dispatchType);
      dispatchType(regular[0].typeface);
    }
  };

  const _loadAllTypefaces = () => {
    let arr: Typeface[] = [];
    input.singles?.forEach((el) => {
      // console.log(el.typeface);
      if (el.typeface) arr.push(el.typeface);
    });
    dispatchTypes(arr);
  };

  // const hasLicences =
  //   licenseTypeProfil && licenseTypeProfil.length > 0 && licenseSizeProfil;

  return (
    <div
      className='content content-product px-sm md:px-lg'
      style={
        {
          // fontFamily: type?.slug?.current,
          "--typeface": type?.slug?.current,
          opacity: type ? 1 : 0,
        } as React.CSSProperties
      }>
      {/* <pre>{JSON.stringify(input.singles, null, 2)}</pre> */}
      {ready && input.singles && (
        <TypeTesterHero input={input.singles} pangram={pangram} />
      )}

      <section className='content mb-lg'>
        {input.content && <Modules input={input.content} />}
      </section>

      {input.singles &&
        input.singles.map((item, i) => (
          <div className='mb-md' key={i}>
            <Glyphs input={item} />
          </div>
        ))}
    </div>
  );
};

export default ContentProduct;
