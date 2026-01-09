"use client";
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
  useReducer,
} from "react";
import {
  LabelPrice,
  LicenseSize,
  LicenseType,
  Product,
  SanityKeyed,
} from "@/app/types/schema";
import { usePathname } from "next/navigation";
import { ProductData } from "@/app/types/extra-types";

interface ShopContextProps {
  children: ReactNode;
  licenses: LicenseSize[] | undefined;
  licenseTypes: LicenseType[] | undefined;
  licenseSizes: LicenseSize[] | undefined;
}

// interface ProductData {
//   id: string;
//   price: number;
//   alternatePrices: any;
//   url: string;
//   description: string;
//   name: string;
//   quantity: number;
//   stackable: string;
//   shippable: boolean;
//   customFields: any[];
//   metadata: string;
// }

const initialLicenseTypeState: LabelPrice[] = [];

function licenseTypeReducer(state: any, action: any) {
  const { type, payload } = action;
  switch (type) {
    case "SET":
      return payload;
    case "ADD":
      // only add if it doesn't already exist
      return state.some((item: any) => item._key === payload._key)
        ? state
        : [...state, payload];
    case "REPLACE":
      return state.map((item: any) =>
        item._key === payload._key ? payload : item
      );
    case "REMOVE":
      return state.filter((item: any) => item.label !== payload.label);

    case "REMOVE_ALL":
      return [];
    default:
      throw new Error();
  }
}

function trialsReducer(state: any, action: any) {
  const { type, payload } = action;
  switch (type) {
    case "ADD":
      return [...state, payload];
    case "REMOVE":
      return state.filter((item: Product) => {
        return item._id !== payload._id;
      });

    case "REMOVE_ALL":
      return [];
    default:
      throw new Error();
  }
}

type ContextProps = {
  ready: boolean;
  licenses: LicenseSize[] | undefined;
  licenseSizes: LicenseSize[] | undefined;
  licenseTypes: LicenseType[] | undefined;
  currentProduct: Product | null;
  products: ProductData[];
  setProducts: Function;
  tmpProducts: ProductData[];
  setTmpProducts: Function;
  setCurrentProduct: Function;
  licenseSizeProfil: LicenseSize | null;
  setLicenseSizeProfil: Function;
  licenseTypeProfil: Array<SanityKeyed<LicenseType>> | null;
  setLicenseTypeProfil: Function;
  trials: Product[];
  setTrials: Function;
};

const ShopContext = createContext<ContextProps>({} as ContextProps);

function productsReducer(state: any, action: any) {
  // console.log(state, action);
  const { type, payload } = action;
  // console.log(type, payload);
  switch (type) {
    case "SET":
      return payload;
    case "ADD":
      const exist = state.filter((item: any) => item.sku === payload.sku);
      if (exist.length === 0) {
        return [...state, payload];
      }
      return state;
    case "REMOVE":
      return state.filter((item: any) => item.sku !== payload.sku);
    case "REMOVE_BY_SKU":
      console.log("REMOVE_BY_SKU", payload);
      // console.log(state);
      return state.filter((item: any) => item.sku !== payload);
    case "REPLACE":
      return state.map((item: any) => {
        return item.sku === payload.sku ? payload : item;
      });
    case "REMOVE_ALL":
      return [];
    default:
      throw new Error();
  }
}

export const ShopWrapper = ({
  children,
  licenses,
  licenseSizes,
  licenseTypes,
}: ShopContextProps) => {
  const defaultLicense = licenses && licenses?.length > 0 ? licenses[0] : null;

  const [ready, setReady] = useState<boolean>(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [products, setProducts] = useReducer(productsReducer, []);
  const [tmpProducts, setTmpProducts] = useReducer(productsReducer, []);
  // const [cartObject, setCartObject] = useState(null);
  // console.log(products);
  const [licenseSizeProfil, setLicenseSizeProfil] = useState<
    LabelPrice | any | null
  >(defaultLicense);
  const [licenseTypeProfil, setLicenseTypeProfil] = useReducer(
    licenseTypeReducer,
    initialLicenseTypeState
  );

  const [isVip, setIsVip] = useState<boolean>(false);
  const [trials, setTrials] = useReducer(trialsReducer, []);
  const [licenseFor, setLicenseFor] = useState<"me" | "client">("me");
  const [licenseForData, setLicenseForData] = useState<{
    companyName?: string;
    email?: string;
    inUseFor?: string;
  }>({
    companyName: "",
    email: "",
    inUseFor: "",
  });

  const pathname = usePathname();

  useEffect(() => {
    // setLicenseTypeProfil({ type: "REMOVE_ALL" });
  }, [pathname]);

  /**
   * handle local storage
   */
  useEffect(() => {
    // return;
    console.log(status);
    //preprod-overtype-foundry.vercel.app/post-checkout?status=success
    if (status === "success") return;

    const cart = localStorage.getItem("oo-cart");
    if (cart) {
      const cartArr = JSON.parse(cart);
      cartArr.forEach((item: ProductData) => {
        setProducts({ type: "ADD", payload: item });
      });
    }

    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) {
      localStorage.setItem("oo-cart", JSON.stringify(products));
    }
  }, [products, ready]);

  return (
    <ShopContext.Provider
      value={{
        ready,
        licenses,
        licenseSizes,
        licenseTypes,
        tmpProducts,
        setTmpProducts,
        currentProduct,
        setCurrentProduct,
        products,
        setProducts,
        licenseTypeProfil,
        setLicenseTypeProfil,
        licenseSizeProfil,
        setLicenseSizeProfil,

        trials,
        setTrials,
      }}>
      {children}
    </ShopContext.Provider>
  );
};
export default function useShop() {
  return useContext(ShopContext);
}
