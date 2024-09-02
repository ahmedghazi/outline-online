"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  KeyValString,
  Product,
  SanityKeyed,
  Style,
  Typeface,
} from "../types/schema";
import Link from "next/link";
import { _linkResolver } from "../utils/utils";
import clsx from "clsx";
import TypeCard from "./typeface/TypeCard";
import useType, { TypeContextProvider } from "./typeface/TypeContext";
import useInViewPort from "../hooks/useInViewport";
import { publish } from "pubsub-js";
import Select from "./ui/Select";

type ItemProps = {
  input: Product;
  defaultStyle?: Typeface;
};

const Item = ({ input, defaultStyle }: ItemProps) => {
  const [active, setActive] = useState<boolean>(false);
  // const [style, setStyle] = useState<Style>(defaultStyle);
  const { type, dispatchType } = useType();

  useEffect(() => {
    dispatchType(defaultStyle);
  }, []);

  const _handleStyles = (s: KeyValString) => {
    // console.log(s);
    // if (!ref.current) return;
    if (!s || !s.val) return;
    // ref.current.style.fontFamily = s.val;
    // ref.current.style.setProperty("--type-family", s.val);
    // setCurrentStyle(s.val);
    dispatchType(JSON.parse(s.val));
  };
  // console.log(input.singles);
  // console.log(style.typeface);
  // const defaulttypeface
  const _singles = useMemo(() => {
    if (!input.singles) return;
    const arr: KeyValString[] = input.singles.map((item) => {
      return {
        _type: "keyValString",
        key: item.title,
        // val: JSON.stringify(item.typeface?.slug?.current),
        val: JSON.stringify(item.typeface),
      };
    });
    return arr;
  }, []);
  // console.log(_singles);

  return (
    <div className={clsx("typeface--item", active && "is-active")}>
      <div
        className='title'
        onClick={() => setActive(!active)}
        contentEditable={true}
        suppressContentEditableWarning={true}
        spellCheck='false'
        autoCorrect='off'
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
            {_singles && _singles.length > 0 && (
              <Select
                options={_singles}
                onChange={_handleStyles}
                label='Family'
              />
            )}
            {/* <select
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
            </select> */}
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
  const targetRef = useRef<HTMLDivElement>(null);
  const inViewport = useInViewPort(targetRef, { threshold: 0.5 });
  console.log(inViewport);
  useEffect(() => {
    publish("IS_PRODUCT", inViewport);
  }, [inViewport]);

  return (
    <section className='section--typefaces' ref={targetRef}>
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
