"use client";
import { KeyValString, ProductSingle } from "@/app/types/schema";
import React, { useEffect, useRef, useState } from "react";
import { alphabets } from "./alphabets";
import useType from "./TypeContext";
import clsx from "clsx";
// import useType from "./typeContext";

type Props = {
  input: ProductSingle;
};

const Glyphs = ({ input }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [glyh, setGlyph] = useState<string | KeyValString>("");
  const { type } = useType();

  // console.log(glyh);

  return (
    <section
      className='glyphs '
      // ref={ref}
      onMouseLeave={() => setGlyph("")}>
      {input.typeface?.glyphs &&
        input.typeface?.glyphs.length > 0 &&
        input.typeface?.glyphs.map((item, i) => (
          <div className='mb-md' key={i}>
            <h3 className='mb-sm'>{item.title}</h3>
            <div
              className='grid '
              style={{
                fontFamily: type?.slug?.current,
              }}>
              {item.items &&
                item.items.map((_item, j) => (
                  <div
                    className='item'
                    key={j}
                    onClick={() => setGlyph(_item)}
                    onMouseEnter={() => setGlyph(_item)}>
                    <div className='glyph'>{_item}</div>
                    <div className='unicode'>{_item.codePointAt(0)}</div>
                  </div>
                ))}
              {item.itemsAdvanced &&
                item.itemsAdvanced.map((_item, j) => (
                  <div
                    className='item'
                    key={j}
                    onClick={() => setGlyph(_item || "")}
                    onMouseEnter={() => setGlyph(_item || "")}>
                    <div
                      className='glyph'
                      style={{
                        fontVariant: _item.val,
                      }}>
                      {_item.key}
                    </div>
                    <div className='unicode'>
                      {_item.key ? _item.key.codePointAt(0) : ""}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      {glyh && (
        <div className='overview'>
          {typeof glyh === "object" && (
            <span
              style={{
                fontVariant: glyh.val,
              }}>
              {glyh.key}
            </span>
          )}
          {typeof glyh === "string" && <span>{glyh}</span>}
        </div>
      )}
    </section>
  );
};

export default Glyphs;
