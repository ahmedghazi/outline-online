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
  ProductSingle,
  SanityKeyed,
  Style,
  Variant,
} from "@/app/types/schema";
import { usePathname } from "next/navigation";
import { _getDataAttributes } from "./utils";

interface ShopContextProps {
  // location?: object;
  children: ReactNode;
  licenses: LicenseSize[] | undefined;
  // pageContext: object;
}

// An enum with all the types of actions to use in our reducer
enum CountActionKind {
  INCREASE = "INCREASE",
  DECREASE = "DECREASE",
}

// An interface for our actions
interface CountAction {
  type: CountActionKind;
  payload: number;
}

// An interface for our state
interface CountState {
  count: number;
}

interface ProductData {
  id: string;
  price: number;
  alternatePrices: any;
  url: string;
  description: string;
  name: string;
  quantity: number;
  stackable: string;
  shippable: boolean;
  customFields: any[];
  metadata: string;
}

const initialLicenseTypeState: LabelPrice[] = [];

function licenseTypeReducer(state: any, action: any) {
  // console.log(state, action);
  const { type, payload } = action;
  switch (type) {
    case "ADD":
      return [...state, payload];
    case "REMOVE":
      return state.filter((item: any) => item.label !== payload.label);

    // case "REPLACE":
    //   return state.map((item: any) =>
    //     item.title === payload.title ? payload : item
    //   );
    case "REMOVE_ALL":
      return [];
    default:
      throw new Error();
  }
}

function trialsReducer(state: any, action: any) {
  // console.log(state);
  const { type, payload } = action;
  switch (type) {
    case "ADD":
      return [...state, payload];
    case "REMOVE":
      return state.filter((item: SanityKeyed<ProductSingle>) => {
        console.log(item._key, payload._key);
        return item._key !== payload._key;
      });

    // case "REPLACE":
    //   return state.map((item: any) =>
    //     item.title === payload.title ? payload : item
    //   );
    case "REMOVE_ALL":
      return [];
    default:
      throw new Error();
  }
}

type ContextProps = {
  ready: boolean;
  licenses: LicenseSize[] | undefined;
  // userStatus: string;
  // customer: any;
  cartObject: any;
  // products: any;
  currentProduct: Product | null;
  products: ProductData[];
  setProducts: Function;
  setCurrentProduct: Function;
  licenseTypeProfil: Array<SanityKeyed<LicenseType>> | null;
  setLicenseTypeProfil: Function;
  licenseSizeProfil: LicenseSize | null;
  setLicenseSizeProfil: Function;
  dataAttributes: Array<string> | null;
  setDataAttributes: Function;
  trials: ProductSingle[];
  setTrials: Function;
  // isVip: boolean;
  // setIsVip: Function;
};

const ShopContext = createContext<ContextProps>({} as ContextProps);

declare global {
  interface Window {
    Snipcart: any; // 👈️ turn off type checking
  }
}

type EmptyObj = Record<PropertyKey, never | any>;

export const ShopWrapper = ({ children, licenses }: ShopContextProps) => {
  const defaultLicense = licenses && licenses?.length > 0 ? licenses[0] : null;
  const initialLicenseTypeState: (LicenseType & { _key: string })[] =
    defaultLicense &&
    defaultLicense?.licenseType &&
    defaultLicense?.licenseType?.length > 0
      ? [defaultLicense?.licenseType[0]]
      : [];
  // const initialLicenseTypeState: (LicenseType & { _key: string })[] = [];
  // console.log(defaultLicense);
  // console.log(initialLicenseTypeState);

  const [ready, setReady] = useState<boolean>(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState([]);
  const [cartObject, setCartObject] = useState(null);

  const [licenseSizeProfil, setLicenseSizeProfil] = useState<
    LabelPrice | any | null
  >(defaultLicense);
  const [licenseTypeProfil, setLicenseTypeProfil] = useReducer(
    licenseTypeReducer,
    initialLicenseTypeState
  );

  const [dataAttributes, setDataAttributes] = useState<Array<string>>([""]);
  const [isVip, setIsVip] = useState<boolean>(false);
  // const [trials, setTrials] = useState([]);
  const [trials, setTrials] = useReducer(trialsReducer, []);

  const pathname = usePathname();

  useEffect(() => {
    const Snipcart = window.Snipcart;
    // console.log(window);
    if (!Snipcart) {
      document.addEventListener("snipcart.ready", (e) => {
        // console.log(e);
        setReady(true);
      });
    } else {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    // setLicenseTypeProfil({ type: "REMOVE_ALL" });
  }, [pathname]);

  useEffect(() => {
    // console.log(licenseTypeProfil);

    if (!currentProduct) return;

    // const _dataAttributes = _getDataAttributes(
    //   currentProduct,
    //   licenseTypeProfil,
    //   licenseSizeProfil
    // );
    // if (_dataAttributes) setDataAttributes(_dataAttributes);
  }, [currentProduct, licenseTypeProfil, licenseSizeProfil]);

  // const _getDataAttributes = () => {
  //   // if (!input.items || input.items.length === 0) return "";
  //   let dataAttributes: any = {};
  //   let index: number = 0;
  //   if (
  //     currentProduct &&
  //     currentProduct?.licenseType &&
  //     currentProduct?.licenseType.items
  //   ) {
  //     // console.log(currentProduct?.licenseType);
  //     currentProduct?.licenseType.items.forEach((item, i) => {
  //       index = i;
  //       dataAttributes[`data-item-custom${i}-placeholder`] = "Licence";
  //       dataAttributes[`data-item-custom${i}-name`] = item.label;
  //       dataAttributes[`data-item-custom${i}-type`] = "checkbox";
  //       // dataAttributes[`data-item-custom${i}-required`] = "true";
  //       dataAttributes[`data-item-custom${i}-shippable`] = "false";

  //       dataAttributes[
  //         `data-item-custom${i}-options`
  //       ] = `true[+${item.price}]|false`;

  //       if (licenseTypeProfil) {
  //         const exist = licenseTypeProfil.filter(
  //           (el: LabelPrice) => el.label === item.label
  //         );
  //         if (exist && exist.length > 0) {
  //           dataAttributes[`data-item-custom${i}-value`] = "true";
  //         } else {
  //           dataAttributes[`data-item-custom${i}-value`] = "false";
  //         }
  //       }
  //     });
  //   }

  //   if (
  //     currentProduct &&
  //     currentProduct?.licenseSize &&
  //     currentProduct?.licenseSize.items
  //   ) {
  //     index += 1;

  //     dataAttributes[`data-item-custom${index}-placeholder`] = "Company Size";
  //     dataAttributes[`data-item-custom${index}-name`] = "Company Size";
  //     // dataAttributes[`data-item-custom${index}-required`] = "true";
  //     dataAttributes[`data-item-custom${index}-shippable`] = "false";

  //     // dataAttributes[`data-item-custom${index}-type`] = "checkbox";
  //     const values = currentProduct?.licenseSize.items
  //       .map((item: LabelPrice) => {
  //         const price = `[+${item.price}]`;
  //         return `${item.label}${price}`;
  //       })
  //       .toString()
  //       .split(",")
  //       .join("|");
  //     dataAttributes[`data-item-custom${index}-options`] = values;
  //     if (licenseSizeProfil) {
  //       dataAttributes[`data-item-custom${index}-value`] =
  //         licenseSizeProfil.label;
  //     }
  //   }

  //   return dataAttributes;
  // };

  useEffect(() => {
    if (!ready) return;
    const { Snipcart } = window;

    const listenSnipcart = () => {
      const { cart } = Snipcart.store.getState();

      setCartObject(cart);

      Snipcart.events.on("item.adding", (item: any, items: any) => {
        // console.log("item.adding", item)
      });
      Snipcart.events.on("item.added", (cartItem: any) => {
        // console.log("item.added", cartItem)
      });

      Snipcart.events.on("cart.confirm.error", (confirmError: any) => {
        console.log(confirmError);
      });
    };
    // listen store update
    const unsubscribe = Snipcart.store.subscribe(listenSnipcart);
    // call first
    listenSnipcart();
    return () => {
      unsubscribe();
    };
  }, [ready]);

  return (
    <ShopContext.Provider
      value={{
        ready,
        licenses,
        cartObject,
        currentProduct,
        setCurrentProduct,
        products,
        setProducts,
        licenseTypeProfil,
        setLicenseTypeProfil,
        licenseSizeProfil,
        setLicenseSizeProfil,
        dataAttributes,
        setDataAttributes,
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
