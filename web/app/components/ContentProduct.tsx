"use client";
import React, { useEffect, useState } from "react";
import { Product, Typeface } from "../types/schema";
import useShop from "./shop/ShopContext";
import TypeTesterHero from "./typeface/TypeTesterHero";
import Modules from "./modules";
import Glyphs from "./typeface/Glyphs";
import useType from "./typeface/TypeContext";

type Props = {
  input: Product;
};

const ContentProduct = ({ input }: Props) => {
  // console.log(input);
  const {
    setCurrentProduct,
    // licenseTypeProfil,
    // licenseSizeProfil,
    // dataAttributes,
  } = useShop();

  const { type, dispatchType, dispatchTypes } = useType();
  const [ready, setReady] = useState<boolean>(false);
  // console.log(input);
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
      if (el.typeface) arr.push(el.typeface);
    });
    dispatchTypes(arr);
  };

  return (
    <div
      className='content content-product px-sm md:px-lg'
      style={
        {
          "--typeface": type?.slug?.current,
          opacity: type ? 1 : 0,
        } as React.CSSProperties
      }>
      {ready && (
        <div className='inner'>
          {input.singles && (
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
      )}
    </div>
  );
};

export default ContentProduct;
