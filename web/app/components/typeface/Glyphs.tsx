"use client";
import { ProductSingle, Style } from "@/app/types/schema";
import React, { useEffect, useRef, useState } from "react";
import { alphabets } from "./alphabets";
import useType from "./TypeContext";
// import useType from "./typeContext";

type Props = {
  input: ProductSingle;
};

const Glyphs = ({ input }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [glyh, setGlyph] = useState<string>("");
  const { type } = useType();

  const glyphsList = [
    ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    ..."abcdefghijklmnopqrstuvwxyz",
    ..."0123456789",
    ..."abčděfghíjklmňopqřštůvwxýž",
    ...'!@#$%^&*()_+-=[]{}|;:",.<>/?`~',
  ];

  // const str = '!@#$%^&*()_+-=[]{}|;:",.<>/?`~'.split("").join(" ");
  // console.log(str);
  // const latin = alphabets.latin.split("");
  // const latin_extended = alphabets.latin_extended.split("");
  // console.log(input);
  useEffect(() => {
    // if (!ref.current) return;
    // var content = "";
    // var max = 65535; // See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCharCode
    // for (var i = 34; i < max; i++) {
    //   if (i % 1000 === 0) {
    //     content += "<hr>";
    //   }
    //   content += "<div title='" + i + "'>" + String.fromCharCode(i) + "</div>";
    // }
    // ref.current.innerHTML = content;
  }, []);
  // console.log({ type });
  const _getUnicode = (item: string) => {};
  return (
    <section
      className='glyphs '
      // ref={ref}
      onMouseLeave={() => setGlyph("")}
      style={{
        fontFamily: type?.slug?.current,
      }}>
      {input.typeface?.glyphs &&
        input.typeface?.glyphs.length > 0 &&
        input.typeface?.glyphs.map((item, i) => (
          <div className='mb-md' key={i}>
            <h3 className='mb-sm'>{item.title}</h3>
            <div className='grid '>
              {item.items &&
                item.items.map((_item, j) => (
                  <div
                    className='item'
                    key={j}
                    onClick={() => setGlyph(_item)}
                    onMouseEnter={() => setGlyph(_item)}
                    // onMouseLeave={() => setGlyph("")}
                  >
                    {/* <div className='pointer-events-none '> */}
                    <div className='glyph'>{_item}</div>
                    <div className='unicode'>{_item.codePointAt(0)}</div>
                    {/* </div> */}
                  </div>
                ))}
            </div>
          </div>
        ))}
      {glyh && (
        <div className='overview'>
          <span>{glyh}</span>
        </div>
      )}
    </section>
  );
};

export default Glyphs;
