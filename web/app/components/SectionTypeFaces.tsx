"use client";
import React, { MouseEvent, useEffect, useMemo, useRef, useState } from "react";
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
  const ref = useRef<HTMLDivElement>(null);
  const { type, dispatchType } = useType();
  // console.log(type);
  const [text, setText] = useState<string>("");

  useEffect(() => {
    dispatchType(defaultStyle);
    if (ref && ref.current) {
      ref.current.addEventListener("input", _cEditableChange);
    }

    return () => {
      if (ref && ref.current) {
        ref.current.removeEventListener("input", _cEditableChange);
      }
    };
  }, []);

  const _cEditableChange = (event: Event) => {
    const target = event.target as HTMLDivElement;
    // console.log(target.innerText);
    setText(target.innerText);
  };

  function setCursorEditable(editableElem: HTMLDivElement, position: number) {
    let range = document.createRange();
    let sel = window.getSelection();
    if (!sel) return;
    range.setStart(editableElem.childNodes[0], position);
    range.collapse(true);

    sel.removeAllRanges();
    sel.addRange(range);
    editableElem.focus();
  }

  useEffect(() => {
    if (!text) {
      // setText(type?.title);
    }
    if (text) {
      if (ref && ref.current) setCursorEditable(ref.current, text.length);
    }
  }, [type, text]);

  const _handleStyles = (s: KeyValString) => {
    if (!s || !s.val) return;

    dispatchType(JSON.parse(s.val));
  };

  const _singles = useMemo(() => {
    if (!input.singles) return;
    const arr: KeyValString[] = input.singles.map((item) => {
      return {
        _type: "keyValString",
        key: item.title,
        val: JSON.stringify(item.typeface),
      };
    });
    return arr;
  }, []);

  return (
    <div className={clsx("typeface--item", active && "is-active")}>
      <div
        ref={ref}
        className='title'
        onClick={() => setActive(!active)}
        contentEditable={true}
        suppressContentEditableWarning={true}
        spellCheck='false'
        autoCorrect='off'
        style={{
          fontFamily: type?.slug?.current,
        }}>
        {text ? text : type?.title}
      </div>
      <div className='actions'>
        {input.singles && input.singles.length > 0 && (
          <div>
            {_singles && _singles.length > 0 && (
              <Select
                options={_singles}
                onChange={_handleStyles}
                // label='Family'
              />
            )}
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
  // console.log(inViewport);
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
