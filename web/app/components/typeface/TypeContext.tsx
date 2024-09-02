"use client";
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { Typeface } from "@/app/types/schema";

interface TypeContextProps {
  // location?: object;
  children: ReactNode;
  // typeface: Typeface;
  // base64: string;
  // pageContext: object;
}

type ContextProps = {
  type: Typeface | null;
  dispatchType: Function;
  types: Typeface[] | null;
  dispatchTypes: Function;
};

const TypeContext = createContext<ContextProps>({} as ContextProps);

export const TypeContextProvider = ({
  children,
}: // typeface,
TypeContextProps) => {
  const [types, dispatchTypes] = useState<Typeface[] | null>([]);
  const [type, dispatchType] = useState<Typeface | null>(null);
  // console.log({ typeface });
  // console.log(type);
  useEffect(() => {
    if (type) _loadFont(type);
    if (types) {
      types.forEach((el) => {
        // console.log({ el });
        _loadFont(el);
      });
    }
  }, [type]);

  const _loadFont = async (item: Typeface) => {
    //if (!ref.current) return;
    // return;

    // console.log(item);
    if (!item || !item.slug) return;
    const font = new FontFace(
      item.slug?.current || "",
      `url(${item.typefaceFile?.base64})`,
      {
        // style: "normal",
        // weight: "400",
        // stretch: "condensed",
      }
    );
    // wait for font to be loaded
    await font.load();
    // add font to document
    document.fonts.add(font);
    // console.log(font);
    // ref.current.classList.add("is-ready");
    // setReady(true);
  };

  return (
    <TypeContext.Provider value={{ type, dispatchType, types, dispatchTypes }}>
      {children}
    </TypeContext.Provider>
  );
};

export default function useType() {
  return useContext(TypeContext);
}
