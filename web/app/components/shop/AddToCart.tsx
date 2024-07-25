import React, { useEffect, useState } from "react";
import useShop from "./ShopContext";
import { usePathname } from "next/navigation";
import { LabelPrice, LicenseType, Product } from "@/app/types/schema";
import Price from "./Price";

type Props = {
  id: string;
  price: number;
  title: string;
  blurb: string;
  category?: string;
  // url: string;
  // description: string;
  // dataattributes: Array<string> | null;
};

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

const AddToCart = (props: Props) => {
  const { price, title, blurb, category, id } = props;
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
  const productExistsInStore = products.filter((el) => el.id === id).length > 0;
  const [active, setActive] = useState<boolean>(productExistsInStore);

  let finalPrice: number = price;
  if (licenseTypeProfil) {
    licenseTypeProfil.forEach((element) => {
      if (element.price) finalPrice += element.price;
    });
  }

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

    data.push({
      name: "Licence Size",
      type: "readonly",
      value: licenseSizeProfil.title,
    });

    // dataAttributes[`data-item-custom${index}-placeholder`] = "Licence Size";
    dataAttributes[`data-item-custom${index}-name`] = "Licence Size";
    dataAttributes[`data-item-custom${index}-type`] = "readonly";
    dataAttributes[`data-item-custom${index}-value`] = licenseSizeProfil.title;
    // dataAttributes[`data-item-custom${i}-required`] = "true";
    dataAttributes[`data-item-custom${index}-shippable`] = "false";
    licenseSizeProfil.licenseType.forEach((item, i) => {
      index = i + 1;
      dataAttributes[`data-item-custom${index}-placeholder`] = "Licence";
      dataAttributes[`data-item-custom${index}-name`] = item.label;
      dataAttributes[`data-item-custom${index}-type`] = "checkbox";
      // dataAttributes[`data-item-custom${index}-required`] = "true";
      dataAttributes[`data-item-custom${index}-shippable`] = "false";

      dataAttributes[
        `data-item-custom${index}-options`
      ] = `true[+${item.price}]|false`;

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
      // console.log(dataAttributes);

      data.push({
        name: item.label,
        // required: true,
        type: "checkbox",
        options: `true[+${item.price}]|false`,
        // options: options.toString().split(",").join("|"),
        value: exist && exist.length > 0,
      });
    });
    return { data, dataAttributes };
  };

  useEffect(() => {
    if (active) {
      const exist = products.filter((el) => el.id === productData.id);
      if (exist.length === 0)
        setProducts((prev: any) => [...prev, productData]);
    } else {
      const _productToRemove = products.filter(
        (item) => item.id !== productData.id
      );
      console.log(_productToRemove);
      setProducts(_productToRemove);
    }
  }, [active]);

  // const _theProductID = () => {
  //   if (!currentProduct) return "xxx";
  //   const title = currentProduct.slug ? currentProduct.slug.current : "xxx";
  //   let id = title.replace(" ", "-").toLowerCase();
  //   id += "-";
  //   id += currentProduct.title?.replace(" ", "-").toLowerCase();
  //   return id;
  // };

  // const _addToCart = async () => {
  //   //https://docs.snipcart.com/v3/sdk/api#cart
  //   // console.log(products)
  //   setButtonStatus("Adding...");
  //   try {
  //     // const productsToAdd = ''
  //     // await Snipcart.api.cart.items.add(products)
  //     await Promise.all(
  //       products.map(async (product) => {
  //         console.log(product);
  //         await window.Snipcart.api.cart.items.add(product);
  //       })
  //     );
  //     // products.forEach(product => {})

  //     // console.log(products.toString())
  //     await window.Snipcart.api.theme.cart.open();
  //     setButtonStatus("Add");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // console.log(dataAttributes);
  const productData = {
    id: id || "",
    price: price.toFixed(2),
    alternatePrices: {
      // vip: 10.00
    },
    url: pathname,
    description: blurb || "",
    name: `Tupeface name ${title}` || "",
    quantity: 1,
    stackable: "never",
    shippable: false,
    customFields: [..._getDataAttributes()?.data],
    // customFields: [
    //   ..._getDataAttributes(),
    //   // ...websiteData,
    // ],
    metadata: JSON.stringify(licenseSizeProfil),
  };

  return (
    <div
      className='add-to-cart'
      onClick={() => {
        setActive(!active);
      }}>
      <div className='flex justify-between'>
        <Price priceCrossed={price} price={finalPrice} />

        <div className='checkbox-ui'>
          <input
            // onChange={_addToCart}
            checked={active}
            // defaultChecked={false}
            onChange={() => {}}
            type='checkbox'
            name='atc'
            className='snipcart-add-item- '
            data-item-id={id || ""}
            data-item-price={price}
            data-item-url={pathname}
            data-item-description={blurb || ""}
            data-item-name={`Tupeface name ${title}` || ""}
            data-item-min-quantity='1'
            data-item-quantity='1'
            data-item-max-quantity='1'
            data-item-stackable='never'
            {..._getDataAttributes()?.dataAttributes}
            data-item-metadata={JSON.stringify(licenseSizeProfil)}></input>
          <span className='checkmark'></span>
        </div>
        {/* <pre>{JSON.stringify(_getDataAttributes(), null, 2)}</pre> */}
      </div>
    </div>
  );
};

export default AddToCart;
