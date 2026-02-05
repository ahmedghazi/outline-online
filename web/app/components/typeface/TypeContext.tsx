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

// Encode asset ref for the proxy URL (same logic as server)
function encodeAssetId(assetRef: string): string {
  return btoa(assetRef)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

// Get font URL - uses proxy if asset ref available, falls back to base64
function getFontUrl(typefaceFile: Typeface["typefaceFile"]): string | null {
  if (!typefaceFile) return null;

  // Prefer proxy URL if asset reference is available
  const assetRef = typefaceFile.asset?._ref;
  if (assetRef) {
    const encodedId = encodeAssetId(assetRef);
    return `/api/font?id=${encodedId}`;
  }

  // Fallback to base64 for backwards compatibility
  return typefaceFile.base64 || null;
}

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

    const fontUrl = getFontUrl(item.typefaceFile);
    if (!fontUrl) return;
    console.log(fontUrl);
    const font = new FontFace(item.slug?.current || "", `url(${fontUrl})`, {
      // style: "normal",
      // weight: "400",
      // stretch: "condensed",
    });
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
