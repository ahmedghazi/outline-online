import { KeyValString, ProductSingle } from "@/app/types/schema";
import React, { useEffect, useMemo, useRef, useState } from "react";
// import TypeTester from "./TypeTester";
// import useType from "./TypeContext";
// import TesterSize from "./TesterSize";
// import TesterLeading from "./TesterLeading";
// import TesterSpacing from "./TesterSpacing";
// import Select from "../ui/Select";
// import { div } from "three/examples/jsm/nodes/Nodes.js";
import CompositionTool from "./CompositionTool";
import useDeviceDetect from "@/app/hooks/useDeviceDetect";

type Props = {
  input: ProductSingle[];
  pangram: string;
};

type Item = {
  regular: ProductSingle | undefined;
  italic: ProductSingle | undefined;
};

const TypeTesterHero = ({ input, pangram }: Props) => {
  const [size, setSize] = useState<number>(6);
  const { isMobile } = useDeviceDetect();
  // console.log("input", input);
  const items = useMemo(() => {
    let arr: Item[] = [];
    const allStyles = input.map((item) => item.typeface?.style);
    let filteredStyles = allStyles.filter(
      (item) => item?.toLowerCase().indexOf("italic") === -1,
    );
    filteredStyles = filteredStyles.filter(
      (item) => item?.toLowerCase().indexOf("variable") === -1,
    );

    // console.log(allStyles);
    // console.log(filteredStyles);
    const uniqueStyles = [...new Set(filteredStyles)];
    // console.log(uniqueStyles);
    uniqueStyles.forEach((style) => {
      if (!style) return;
      // console.log(style);
      let obj: Item = {
        regular: undefined,
        italic: undefined,
      };

      // matching item with desired style
      const items = input.filter((item) => item.typeface?.style === style);
      const item = items[0];
      if (item) {
        obj.regular = item;
      }

      // collect corresponding italic items
      const italicItems = input.filter(
        (item) => item.typeface?.style === `${style}Italic`,
      );
      const itemItalic = italicItems[0];
      if (itemItalic) {
        obj.italic = itemItalic;
      }
      // console.log(obj);
      arr.push(obj);
    });
    // console.log(arr);
    return arr;
  }, [input]);
  // console.log("output", items);

  useEffect(() => {
    _format();
    window.addEventListener("resize", _format);
    return () => {
      window.removeEventListener("resize", _format);
    };
  }, [isMobile]);

  const _format = () => {
    const minus = isMobile ? 400 : 200;
    const wHeight = window.innerHeight;
    const leftOverHeight = wHeight - minus;
    const length = items.length;
    const itemMaxHeight = Math.floor(leftOverHeight / length);
    const size = (itemMaxHeight * 100) / wHeight;

    setSize(size);
  };

  return (
    <section className='type-tester--hero'>
      <div className='items'>
        {items.map((item, i) => (
          <div
            key={i}
            className='item'
            style={{
              fontSize: `clamp(5vh, ${size}vh, 8vh)`,
              lineHeight: 1,
            }}>
            <span
              style={{
                fontFamily: item.regular?.typeface?.slug?.current,
              }}>
              {item.regular?.typeface?.title}
            </span>
            {item?.italic && (
              <span
                style={{
                  fontFamily: item.italic?.typeface?.slug?.current,

                  marginLeft: "1rem",
                }}>
                Italic
              </span>
            )}
          </div>
        ))}
      </div>
      <CompositionTool input={input} pangram={pangram} />
    </section>
  );
};

export default TypeTesterHero;
