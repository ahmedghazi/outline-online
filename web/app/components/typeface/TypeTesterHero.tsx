import { KeyValString, ProductSingle, Style } from "@/app/types/schema";
import React, { useMemo, useRef } from "react";
import TypeTester from "./TypeTester";
import useType from "./TypeContext";
import TesterSize from "./TesterSize";
import TesterLeading from "./TesterLeading";
import TesterSpacing from "./TesterSpacing";
import Select from "../ui/Select";
import { div } from "three/examples/jsm/nodes/Nodes.js";
import CompositionTool from "./CompositionTool";

type Props = {
  input: ProductSingle[];
  pangram: string;
};

const TypeTesterHero = ({ input, pangram }: Props) => {
  // const { type } = useType();
  // const ref = useRef<HTMLDivElement>(null);

  // const _stylisticSets = useMemo(() => {
  //   let arr: KeyValString[] = [];
  //   input.forEach((el) => {
  //     if (el.typeface?.stylisticSets && el.typeface?.stylisticSets.length > 0) {
  //       el.typeface?.stylisticSets.forEach((s) => {
  //         if (arr.some((e) => e.key === s.key)) {
  //         } else {
  //           arr.push(s);
  //         }
  //       });
  //     }
  //   });

  //   return arr;
  // }, []);

  // const _handleStylisticSets = (ss: KeyValString) => {
  //   // console.log(ss);
  //   if (!ref.current) return;
  //   if (!ss || !ss.val) return;
  //   ref.current.style.setProperty("--type-features", ss.val);
  // };

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
            <div className='item'>
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
