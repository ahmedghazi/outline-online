"use client";
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
  useReducer,
  SyntheticEvent,
} from "react";
import {
  LabelPrice,
  LicenseSize,
  LicenseType,
  Product,
  ProductSingle,
  SanityKeyed,
} from "@/app/types/schema";
import { usePathname } from "next/navigation";
import { _getDataAttributes } from "./utils";
import { publish } from "pubsub-js";
import path from "path";

interface ShopContextProps {
  // location?: object;
  children: ReactNode;
  licenses: LicenseSize[] | undefined;
  // pageContext: object;
}

// An enum with all the types of actions to use in our reducer
// enum CountActionKind {
//   INCREASE = "INCREASE",
//   DECREASE = "DECREASE",
// }

// // An interface for our actions
// interface CountAction {
//   type: CountActionKind;
//   payload: number;
// }

// // An interface for our state
// interface CountState {
//   count: number;
// }

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
    case "SET":
      return payload;
    case "ADD":
      return [...state, payload];
    case "REMOVE":
      return state.filter((item: any) => item.label !== payload.label);

    case "REPLACE":
      return state.map((item: any) =>
        item.label === payload.label ? payload : item
      );
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
        // console.log(item._key, payload._key);
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
  // const initialLicenseTypeState: (LicenseType & { _key: string })[] =
  //   defaultLicense &&
  //   defaultLicense?.licenseType &&
  //   defaultLicense?.licenseType?.length > 0
  //     ? [defaultLicense?.licenseType[0]]
  //     : [];
  // const initialLicenseTypeState: (LicenseType & { _key: string })[] = [];

  // console.log(licenses);

  const [ready, setReady] = useState<boolean>(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState([]);
  const [cartObject, setCartObject] = useState(null);
  // console.log(products);
  const [licenseSizeProfil, setLicenseSizeProfil] = useState<
    LabelPrice | any | null
  >(defaultLicense);
  const [licenseTypeProfil, setLicenseTypeProfil] = useReducer(
    licenseTypeReducer,
    initialLicenseTypeState
  );
  // const [licenseTypeProfil, setLicenseTypeProfil] = useState<
  //   LicenseType[] | null
  // >([]);
  // if (licenseTypeProfil) console.log(licenseTypeProfil[0]);

  const [dataAttributes, setDataAttributes] = useState<Array<string>>([""]);
  const [isVip, setIsVip] = useState<boolean>(false);
  const [trials, setTrials] = useReducer(trialsReducer, []);
  const pathname = usePathname();
  // console.log("------------- ShopWrapper");
  // console.log(licenseTypeProfil);

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

  useEffect(() => {
    if (!ready) return;
    const { Snipcart } = window;
    // const snipcartModal: HTMLElement = document.querySelector(
    //   ".snipcart-modal__container"
    // ) as HTMLElement;
    const listenSnipcart = () => {
      const { cart } = Snipcart.store.getState();

      setCartObject(cart);

      Snipcart.events.on("item.adding", (item: any, items: any) => {
        // console.log("item.adding", item)
      });
      Snipcart.events.on("item.added", (cartItem: any) => {
        console.log("item.added", cartItem);
      });

      Snipcart.events.on("item.updated", (cartItem: any) => {
        console.log("item.updated");
        console.log(cartItem);
      });

      Snipcart.events.on("item.removed", (cartItem: any) => {
        console.log(cartItem);
      });

      Snipcart.events.on("cart.confirm.error", (confirmError: any) => {
        console.log(confirmError);
      });

      Snipcart.events.on("theme.routechanged", (routesChange: any) => {
        if (routesChange.from === "/" && routesChange.to !== "/") {
          // console.log("cart opened");
          document.body.classList.add("cart-opened");
          setTimeout(() => {
            _handleCart();
          }, 150);
          // publish("CART_OPENED", true);
          // publish("HEADER_TAB_CHANGE", {
          //   item: "CART",
          //   active: true,
          // });
          // document.body.addEventListener("click", _handleClickOutside);
        }

        if (routesChange.from !== "/" && routesChange.to === "/") {
          // console.log("cart closed");
          document.body.classList.remove("cart-opened");
          // publish("CART_OPENED", false);
          // publish("HEADER_TAB_CHANGE", {
          //   item: "CART",
          //   active: false,
          // });
        }
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

  const _handleCart = () => {
    console.log("_handleCart");

    const items = document.querySelectorAll(
      ".snipcart-item-custom-fields--checkbox"
    );
    if (items) {
      items.forEach((el) => {
        const input = el.querySelector("input");
        if (input?.checked) {
          // console.log(el);
          el.classList.add("has-input-checked");
        }
      });
    }
  };
  // const _handleClickOutside = (e: Event) => {
  //   // console.log("click oustide modal");
  //   const target = e.target as Element;
  //   // console.log(target.closest(".snipcart-modal__container"));
  //   if (!target.closest(".snipcart-modal__container")) {
  //     // blur();
  //     const cartClose: HTMLElement = document.querySelector(
  //       ".snipcart-modal__close"
  //     ) as HTMLElement;
  //     if (cartClose) {
  //       // cartClose.click();
  //       // publish("BUY_MODAL_ACTIVE", true);
  //     }
  //   }
  //   // const cartClose: HTMLElement = document.querySelector(
  //   //   ".snipcart-modal__close"
  //   // ) as HTMLElement;
  //   // if (cartClose) {
  //   //   // cartClose.click();
  //   // }
  // };
  // const _handleClickOutsideReset = (evt: Event) => {
  //   evt.stopPropagation();
  // };

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
