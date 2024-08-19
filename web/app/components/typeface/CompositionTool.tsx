import React, { useMemo, useRef, useState } from "react";
import TesterSize from "./TesterSize";
import TesterLeading from "./TesterLeading";
import TesterSpacing from "./TesterSpacing";
import Select from "../ui/Select";
import { KeyValString, Style } from "@/app/types/schema";
import clsx from "clsx";
import TesterColor from "./TesterColor";
import TesterParagraph from "./TesterParagraph";

type Props = {
  input: Style[];
};

const CompositionTool = ({ input }: Props) => {
  const [active, setActive] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const defaultStyle = input.length > 0 ? input[0].typeface?.slug?.current : "";
  const [currentStyle, setCurrentStyle] = useState<string | undefined>(
    defaultStyle
  );

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
          ╳
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
            This website exists as an ongoing collaborative experiment in
            digital publishing and information sharing. Because this website
            functions as a wiki, all members of the School of Art
            community—graduate students, faculty, staff, and alums—have the
            ability to add new content and pages, and to edit most of the site’s
            existing content. Content is the property of its various authors.
            When you contribute to this site, you agree to abide by Yale
            University academic and network use policy, and to act as a
            responsible member of our community.
          </div>
        </div>

        {ref && ref.current && (
          <div className='footer '>
            <TesterSize initialValue='28' target={ref.current} />
            <TesterSpacing initialValue='0' target={ref.current} />
            <TesterLeading initialValue='28' target={ref.current} />

            {_styles && _styles.length > 0 && (
              <Select
                options={_styles}
                onChange={_handleStyles}
                label='Family'
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
