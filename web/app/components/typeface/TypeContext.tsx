"use client";
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useCallback,
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
  dispatchType: React.Dispatch<React.SetStateAction<Typeface | null>>;
  types: Typeface[] | null;
  dispatchTypes: React.Dispatch<React.SetStateAction<Typeface[] | null>>;
  loadedFonts: Set<string>;
  isFontLoaded: (slug: string) => boolean;
};

const TypeContext = createContext<ContextProps>({} as ContextProps);

// Encode asset ref for the proxy URL (same logic as server)
function encodeAssetId(assetRef: string): string {
  return btoa(assetRef)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

// Get font URL via proxy
function getFontUrl(typefaceFile: Typeface["typefaceFile"]): string | null {
  if (!typefaceFile) return null;

  const assetRef = typefaceFile.asset?._ref;
  if (!assetRef) return null;

  const encodedId = encodeAssetId(assetRef);
  return `/api/font?id=${encodedId}`;
}

export const TypeContextProvider = ({
  children,
}: // typeface,
TypeContextProps) => {
  const [types, dispatchTypes] = useState<Typeface[] | null>([]);
  const [type, dispatchType] = useState<Typeface | null>(null);
  const [loadedFonts, setLoadedFonts] = useState<Set<string>>(new Set());

  const isFontLoaded = useCallback(
    (slug: string) => loadedFonts.has(slug),
    [loadedFonts]
  );

  const loadFont = useCallback(async (item: Typeface) => {
    if (!item || !item.slug) return;

    const slug = item.slug.current || "";
    if (loadedFonts.has(slug)) return;

    const fontUrl = getFontUrl(item.typefaceFile);
    if (!fontUrl) return;

    const font = new FontFace(slug, `url(${fontUrl})`);
    await font.load();
    document.fonts.add(font);
    setLoadedFonts((prev) => new Set(prev).add(slug));
  }, [loadedFonts]);

  useEffect(() => {
    if (type) loadFont(type);
    if (types) {
      types.forEach((el) => {
        loadFont(el);
      });
    }
  }, [type, types, loadFont]);

  return (
    <TypeContext.Provider value={{ type, dispatchType, types, dispatchTypes, loadedFonts, isFontLoaded }}>
      {children}
    </TypeContext.Provider>
  );
};

export default function useType() {
  return useContext(TypeContext);
}
