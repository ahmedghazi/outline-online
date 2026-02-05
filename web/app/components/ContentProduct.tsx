"use client";
import React, { useEffect, useMemo, useState } from "react";
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
  // const _gerRandomPangram = (p: string[] | any) => {
  //    const len = p.length;
  //   const rand = Math.round(Math.random() * len);
  //   console.log(len, rand);
  //   return p[rand];
  // };
  const pangram = useMemo(() => {
    if (!input.pangrams)
      return "24 wacky bandmates mixed zany rhythms, blowing jazzy saxophones and fixing broken xylophones for a quirky gig.";

    const len = input.pangrams.length - 1;
    const rand = Math.round(Math.random() * len);
    console.log(len, rand);
    return input.pangrams[rand] !== ""
      ? input.pangrams[rand]
      : "24 wacky bandmates mixed zany rhythms, blowing jazzy saxophones and fixing broken xylophones for a quirky gig.";
  }, [input.pangrams]);

  // const pangram = _gerRandomPangram;

  useEffect(() => {
    setCurrentProduct(input);
    _setDefaultTypeface();
    _loadAllTypefaces();
  }, []);

  useEffect(() => {
    if (type) setReady(true);
  }, [type]);

  const _setDefaultTypeface = () => {
    const regular = input.singles?.filter(
      (el) => (el.typeface as Typeface | undefined)?.style === "regular",
    );
    if (regular && regular?.length === 1) {
      dispatchType((regular[0].typeface as Typeface) ?? null);
    }
  };

  const _loadAllTypefaces = () => {
    const arr: Typeface[] = [];
    input.singles?.forEach((el) => {
      if (el.typeface) arr.push(el.typeface as Typeface);
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
