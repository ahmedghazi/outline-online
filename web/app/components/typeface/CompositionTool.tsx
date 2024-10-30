import React, { useEffect, useMemo, useRef, useState } from "react";
import TesterSize from "./TesterSize";
import TesterLeading from "./TesterLeading";
import TesterSpacing from "./TesterSpacing";
import Select from "../ui/Select";
import { KeyValString, ProductSingle } from "@/app/types/schema";
import clsx from "clsx";
import TesterColor from "./TesterColor";
import TesterParagraph from "./TesterParagraph";

type Props = {
  input: ProductSingle[];
  pangram: string;
};

const CompositionTool = ({ input, pangram }: Props) => {
  const [active, setActive] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const defaultStyle = input.length > 0 ? input[0].typeface?.slug?.current : "";
  const [currentStyle, setCurrentStyle] = useState<string | undefined>(
    defaultStyle
  );

  useEffect(() => {
    ref.current?.addEventListener("paste", _onPaste);
    return () => {
      ref.current?.removeEventListener("paste", _onPaste);
    };
  }, []);

  const _onPaste = (e: ClipboardEvent) => {
    e.preventDefault();
    // console.log(e);
    const clipboardData = e.clipboardData;
    if (!clipboardData) return;
    const text = clipboardData.getData("text/plain");

    // // insert text manually
    document.execCommand("insertHTML", false, text);
  };

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

  const _styles = useMemo(() => {
    const arr: KeyValString[] = input.map((item) => {
      return {
        _type: "keyValString",
        key: item.title,
        val: item.typeface?.slug?.current,
      };
    });
    return arr;
  }, []);
  // console.log(_styles);

  const _handleStylisticSets = (ss: KeyValString) => {
    // console.log(ss);
    if (!ref.current) return;
    if (!ss || !ss.val) return;
    ref.current.style.setProperty("--type-features", ss.val);
  };

  const _handleStyles = (s: KeyValString) => {
    // console.log(s);
    if (!ref.current) return;
    if (!s || !s.val) return;
    // ref.current.style.fontFamily = s.val;
    ref.current.style.setProperty("--type-family", s.val);
    setCurrentStyle(s.val);
  };

  const _handleColor = (hex: string) => {
    if (!ref.current) return;
    if (!hex) return;
    // console.log(hex);
    ref.current.style.setProperty("--type-color", hex);
    // setCurrentStyle(s.val);
  };

  return (
    <div className={clsx("composition-tool", active && "is-active")}>
      <button className='btn-toggle button-ui' onClick={() => setActive(true)}>
        Composition Tool
      </button>
      <div className='modal'>
        <button className='btn-close' onClick={() => setActive(false)}>
          <svg
            width='27'
            height='26'
            viewBox='0 0 27 26'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <line
              x1='0.353553'
              y1='0.646447'
              x2='25.2254'
              y2='25.5183'
              stroke='#FF0000'
            />
            <line
              x1='1.35152'
              y1='25.6464'
              x2='26.1385'
              y2='0.859436'
              stroke='#FF0000'
            />
          </svg>
        </button>

        <div className='inner'>
          <div className='faden-kreuz faden-kreuz--tl'></div>
          <div className='faden-kreuz faden-kreuz--tr'></div>
          <div className='faden-kreuz faden-kreuz--br'></div>
          <div className='faden-kreuz faden-kreuz--bl'></div>
          <div
            className='text-editor text-lg'
            style={{
              fontFamily: currentStyle,
            }}
            ref={ref}
            contentEditable={true}
            suppressContentEditableWarning={true}
            spellCheck='false'
            autoCorrect='off'>
            {pangram}
          </div>
        </div>

        {ref && ref.current && (
          <div className='footer '>
            <TesterSize initialValue='89' target={ref.current} />
            <TesterSpacing initialValue='0' target={ref.current} />
            <TesterLeading initialValue='89' target={ref.current} />

            {_styles && _styles.length > 0 && (
              <Select
                options={_styles}
                onChange={_handleStyles}
                // label='Family'
                label=''
              />
            )}

            {_stylisticSets && _stylisticSets.length > 0 && (
              <Select
                options={_stylisticSets}
                onChange={_handleStylisticSets}
                label='Stylistic Sets'
              />
            )}
            <TesterColor onChange={_handleColor} />
            <TesterParagraph target={ref.current} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CompositionTool;
