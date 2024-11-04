import React, { useEffect, useState } from "react";
import useShop from "./ShopContext";
import { usePathname } from "next/navigation";
import {
  // LabelPrice,
  LicenseType,
  // Product,
  Typeface,
} from "@/app/types/schema";
import Price from "./Price";

type MetadataProps = {
  type: string;
  typefaces: Typeface[];
};
type Props = {
  id: string;
  price: number;
  priceCrossed?: number | undefined;
  priceDiscount?: number;
  title: string;
  fullTitle: string;
  blurb: string;
  categories?: string[];
  metadata: MetadataProps;
  defaultActive: boolean;
  // url: string;
  // description: string;
  // dataattributes: Array<string> | null;
};

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
//   categories: string;
// }

const AddToCart = (props: Props) => {
  const {
    price,
    priceCrossed,
    priceDiscount,
    title,
    fullTitle,
    blurb,
    categories,
    id,
    metadata,
    defaultActive,
  } = props;
  const {
    // dataAttributes,
    // currentProduct,
    // licenses,
    licenseSizeProfil,
    licenseTypeProfil,
    products,
    setProducts,
  } = useShop();
  const pathname = usePathname();
  // const productExistsInStore = products.filter((el) => el.id === id).length > 0;
  // console.log(title, defaultActive);
  // console.log(productExistsInStore, defaultActive);
  const [active, setActive] = useState<boolean>(false);
  // console.log(price);
  const isBundle = metadata.type === "bundle";

  const _getLicensePriceByLabel = (license: LicenseType) => {
    // console.log({ label, license });
    switch (title) {
      case "Full Family":
        return license.priceFamily;
      case "Essential":
        return license.priceEssentials;
      case "Regular + Italic":
        return license.priceRegIt;
    }
  };
  // console.log(title, isBundle);
  let finalPrice: number = price;
  if (licenseTypeProfil) {
    licenseTypeProfil.forEach((element) => {
      // console.log(price, finalPrice, element.price);
      const elementPrice = isBundle
        ? _getLicensePriceByLabel(element)
        : element.price;
      // console.log({ elementPrice });
      if (elementPrice) finalPrice += elementPrice;
    });
  }
  // console.log({ finalPrice });
  useEffect(() => {
    setActive(defaultActive);
  }, [defaultActive]);

  /**
   * LicenseProfil (company size > price web, price logo, ...)
   * Data is for add to card sdk, dataAttributes is for snipcart robot crawler
   */
  const _getDataAttributes = () => {
    if (!licenseSizeProfil || !licenseSizeProfil.licenseType) return;

    //for sdk api
    let data: any = [];
    //for html markup
    let dataAttributes: any = {};

    let index: number = 0;

    /**
     * FOR BOTS
     */
    // console.log(licenseSizeProfil);
    // dataAttributes[`data-item-custom${index}-placeholder`] = "Licence Size";
    dataAttributes[`data-item-custom${index}-name`] = "Licence Size";
    dataAttributes[`data-item-custom${index}-type`] = "readonly";
    dataAttributes[`data-item-custom${index}-value`] = licenseSizeProfil.title;
    // dataAttributes[`data-item-custom${i}-required`] = "true";
    dataAttributes[`data-item-custom${index}-shippable`] = "false";

    /**
     * FOR SDK
     */
    data.push({
      name: "Licence Size",
      type: "readonly",
      value: licenseSizeProfil.title,
    });

    licenseSizeProfil.licenseType.forEach((item, i) => {
      index = i + 1;
      const price = _getLicensePriceByLabel(item);
      const name = item.label
        ? item.label.replace(" ", "-").toLowerCase()
        : "no-label";

      /**
       * FOR BOTS
       */
      dataAttributes[`data-item-custom${index}-placeholder`] = "Licence";
      dataAttributes[`data-item-custom${index}-name`] = name;
      dataAttributes[`data-item-custom${index}-type`] = "checkbox";
      // dataAttributes[`data-item-custom${index}-required`] = "true";
      dataAttributes[`data-item-custom${index}-shippable`] = "false";

      dataAttributes[
        `data-item-custom${index}-options`
      ] = `true[+${price}]|false`;

      let exist;
      if (licenseTypeProfil) {
        exist = licenseTypeProfil.filter(
          (el: LicenseType) => el.label === item.label
        );
        if (exist && exist.length > 0) {
          dataAttributes[`data-item-custom${index}-value`] = "true";
        } else {
          dataAttributes[`data-item-custom${index}-value`] = "false";
        }
      }
      // console.log(exist);

      /**
       * FOR SDK
       */
      data.push({
        name: name,
        // required: true,
        type: "checkbox",
        options: `true[+${price}]|false`,
        // options: options.toString().split(",").join("|"),
        value: exist && exist.length > 0,
      });
    });
    return { data, dataAttributes };
  };

  useEffect(() => {
    // console.log(title, active);
    if (active) {
      const exist = products.filter((el) => el.id === productData.id);
      if (exist.length === 0)
        setProducts((prev: any) => [...prev, productData]);
    } else {
      const _productToRemove = products.filter(
        (item) => item.id !== productData.id
      );
      // console.log(_productToRemove);
      setProducts(_productToRemove);
    }
  }, [active]);

  const productData = {
    id: id || "",
    price: price.toFixed(2),
    alternatePrices: {
      // vip: 10.00
    },
    url: pathname,
    description: blurb || "",
    name: fullTitle || "",
    categories: categories,
    quantity: 1,
    stackable: "never",
    shippable: false,
    customFields: [..._getDataAttributes()?.data],
    // customFields: [
    //   ..._getDataAttributes(),
    //   // ...websiteData,
    // ],
    metadata: JSON.stringify(metadata),
  };
  // console.log(productData);

  const categoriesClean = categories
    ? categories.toString().replace(",", "|")
    : "";
  return (
    <div
      className='add-to-cart cursor-pointer'
      onClick={() => {
        setActive(!active);
      }}>
      <div className='flex justify-between'>
        <Price priceDiscount={priceDiscount} price={finalPrice} />

        <div className='checkbox-ui'>
          <input
            // onChange={_addToCart}
            checked={active}
            // defaultChecked={false}
            onChange={() => {}}
            type='checkbox'
            name='atc'
            className='snipcart-add-item- '
            data-item-categories={categoriesClean}
            data-item-id={id || ""}
            data-item-price={price}
            data-item-url={pathname}
            data-item-description={blurb || ""}
            data-item-name={fullTitle || ""}
            data-item-min-quantity='1'
            data-item-quantity='1'
            data-item-max-quantity='1'
            data-item-stackable='never'
            {..._getDataAttributes()?.dataAttributes}
            data-item-metadata={JSON.stringify(metadata)}></input>
          <span className='checkmark'></span>
        </div>
        {/* <pre>{JSON.stringify(_getDataAttributes(), null, 2)}</pre> */}
      </div>
    </div>
  );
};

export default AddToCart;
