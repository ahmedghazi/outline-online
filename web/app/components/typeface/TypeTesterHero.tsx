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

type Props = {
  input: ProductSingle[];
  pangram: string;
};

const TypeTesterHero = ({ input, pangram }: Props) => {
  const [size, setSize] = useState<number>(6);

  useEffect(() => {
    _format();
    window.addEventListener("resize", _format);
    return () => {
      window.removeEventListener("resize", _format);
    };
  }, []);

  const _format = () => {
    // const width = window.innerWidth;
    const height = window.innerHeight;
    const leftOverHeight = height - 200;
    const length = input.length;
    const itemMaxHeight = Math.floor(leftOverHeight / length);
    const size = (itemMaxHeight * 100) / height;
    // console.log(height, leftOverHeight, length, itemMaxHeight);

    setSize(size);
  };

  return (
    <section className='type-tester--hero'>
      <div className='items'>
        {/* <pre>{JSON.stringify(input, null, 2)}</pre> */}
        {input.map((item, i) => (
          <div
            key={i}
            style={{
              fontFamily: item.typeface?.slug?.current,
            }}>
            {/* <TypeTester title={item.typeface?.title || item.title || ""} /> */}
            <div
              className='item'
              style={{
                // fontSize: `${size}vh`,
                fontSize: `clamp(6vh, ${size}vh, 8vh)`,
                lineHeight: 1,
              }}>
              {item.typeface?.title || item.title || ""}
            </div>
          </div>
        ))}
      </div>
      <CompositionTool input={input} pangram={pangram} />
    </section>
  );
};

export default TypeTesterHero;
