"use client";
import { Style } from "@/app/types/schema";
import React, { useEffect, useRef } from "react";
import { alphabets } from "./alphabets";
import useType from "./TypeContext";
// import useType from "./typeContext";

type Props = {
  input: Style;
};

const Glyphs = ({ input }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const { type } = useType();

  const glyphsList = [
    ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    ..."abcdefghijklmnopqrstuvwxyz",
    ..."0123456789",
    ..."abčděfghíjklmňopqřštůvwxýž",
    ...'!@#$%^&*()_+-=[]{}|;:",.<>/?`~',
  ];

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
  return (
    <section
      className='glyphs ee'
      // ref={ref}
      style={{
        fontFamily: type?.slug?.current,
      }}>
      <div className='mb-md'>
        <h3>Basic latin</h3>
        <div className='grid md:grid-cols-10-  md:grid-cols-16 '>
          {input.items?.glyphs &&
            input.items?.glyphs.map((item, i) => (
              <div className='item md:col-span-2' key={i}>
                <div>{item}</div>
              </div>
            ))}
        </div>
      </div>
      {/* <div className='mb-md'>
        <h3>Latin supplement</h3>
        <div className='grid md:grid-cols-20'>
          {latin_extended.map((item, i) => (
            <div className='item' key={i}>
              {item}
            </div>
          ))}
        </div>
      </div> */}
    </section>
  );
};

export default Glyphs;
