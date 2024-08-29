"use client";
import React, { useEffect, useState } from "react";
import { Product, SanityKeyed, Style, Typeface } from "../types/schema";
import Link from "next/link";
import { _linkResolver } from "../utils/utils";
import clsx from "clsx";
import TypeCard from "./typeface/TypeCard";
import useType, { TypeContextProvider } from "./typeface/TypeContext";

type ItemProps = {
  input: Product;
  defaultStyle?: Typeface;
};

const Item = ({ input, defaultStyle }: ItemProps) => {
  const [active, setActive] = useState<boolean>(false);
  // const [style, setStyle] = useState<Style>(defaultStyle);
  const { type, dispatchType } = useType();
  console.log(type);
  useEffect(() => {
    dispatchType(defaultStyle);
  }, []);
  // console.log(input.singles);
  // console.log(style.typeface);
  // const defaulttypeface
  return (
    <div className={clsx("typeface--item", active && "is-active")}>
      <div
        className='title'
        onClick={() => setActive(!active)}
        style={{
          fontFamily: type?.slug?.current,
        }}>
        {/* <TypeCard
            fontName={input.title}
            base64={style.typeface.typefaceFile.base64}
          /> */}
        {type?.title}
      </div>
      <div className='actions'>
        {input.singles && input.singles.length > 0 && (
          <div>
            <select
              name='styles'
              id=''
              onChange={(e) => {
                // console.log(JSON.parse(e.target.value));
                // setStyle(JSON.parse(e.target.value));
                dispatchType(JSON.parse(e.target.value));
              }}
              // value={JSON.stringify(input.singles[0])}
            >
              {input.singles?.map((item, i) => (
                <option key={i * 10} value={JSON.stringify(item.typeface)}>
                  {item.typeface?.title}
                </option>
              ))}
            </select>
          </div>
        )}

        <Link href={_linkResolver(input)}>Visit {input.title}</Link>
      </div>
    </div>
  );
};

type Props = {
  input: Product[];
};
const SectionTypeFaces = ({ input }: Props) => {
  return (
    <section className='section--typefaces'>
      <div className='items'>
        {input.map((item, i) => (
          <div key={i} className='item'>
            {item && item.singles && item.singles.length > 0 && (
              <TypeContextProvider>
                <Item input={item} defaultStyle={item.singles[0].typeface} />
              </TypeContextProvider>
            )}
          </div>
        ))}
        {input.map((item, i) => (
          <div key={i} className='item'>
            {item && item.singles && item.singles.length > 0 && (
              <TypeContextProvider>
                <Item input={item} defaultStyle={item.singles[0].typeface} />
              </TypeContextProvider>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default SectionTypeFaces;
