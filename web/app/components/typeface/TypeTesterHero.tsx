import { KeyValString, Style } from "@/app/types/schema";
import React, { useMemo, useRef } from "react";
import TypeTester from "./TypeTester";
import useType from "./TypeContext";
import TesterSize from "./TesterSize";
import TesterLeading from "./TesterLeading";
import Select from "../ui/Select";
import { div } from "three/examples/jsm/nodes/Nodes.js";
import TesterSpacing from "./TesterSpacing";

type Props = {
  input: Style[];
};

const TypeTesterHero = ({ input }: Props) => {
  const { type } = useType();
  const ref = useRef<HTMLDivElement>(null);

  const _stylisticSets = useMemo(() => {
    let arr: KeyValString[] = [];
    input.forEach((el) => {
      if (el.typeface?.stylisticSets && el.typeface?.stylisticSets.length > 0) {
        el.typeface?.stylisticSets.forEach((s) => {
          if (arr.some((e) => e.key === s.key)) {
          } else {
            arr.push(s);
          }
        });
      }
    });

    return arr;
  }, []);

  const _handleStylisticSets = (ss: KeyValString) => {
    console.log(ss);
    if (!ref.current) return;
    if (!ss || !ss.val) return;
    ref.current.style.setProperty("--type-features", ss.val);
  };

  return (
    <section className='type-tester--hero'>
      {/* <pre>{JSON.stringify(type)}</pre> */}
      <div className='items' ref={ref}>
        {input.map((item, i) => (
          <div
            key={i}
            style={{
              fontFamily: item.typeface?.slug?.current,
            }}>
            <TypeTester title={item.typeface?.title || item.title || ""} />
          </div>
        ))}
      </div>
      {/* <TypeTester
        title={listStylesName}
        fontName={type?.slug?.current}
        styles={input}
        // base64={type?.typefaceFile?.base64}
      /> */}
      {ref && ref.current && (
        <div className='footer '>
          <TesterSize initialValue='72' target={ref.current} />
          <TesterSpacing initialValue='1' target={ref.current} />
          <TesterLeading initialValue='80' target={ref.current} />
          {_stylisticSets && _stylisticSets.length > 0 && (
            <Select
              options={_stylisticSets}
              onChange={_handleStylisticSets}
              label='Stylistic Sets'
            />
          )}
          {/* <Select />
          <Select />
          <Select /> */}
        </div>
      )}
    </section>
  );
};

export default TypeTesterHero;
