import React, { useEffect, useState } from "react";
// import update from "react-addons-update"
// import PubSub from "pubsub-js"
// import Variations from "./Variations"
// import { WrapperContext } from "../Layout";
import clsx from "clsx";
import styled from "styled-components";
import { _slugify } from "../../core/utils";
// import useVariations from "./VariationsContext"
import useShop from "./ShopContext";
// import {
//   _getVariationOptionPriceByProductType,
//   _getVariationPriceByProductType,
// } from "./shop-utils"

const Container = styled.div`
  padding: 0.3em var(--space-xs) 0.3em 0;
  &::before,
  &::after {
    /* background-color: currentColor; */
    background: var(--color-primary);
    height: 1px;
    width: 100%;
    position: absolute;
    left: 0;
  }

  &.is-first::before {
    content: "";
    top: 0;
  }

  &:after {
    content: "";
    bottom: 0;
  }
  &:hover,
  &.is-active {
    /* background: var(--color-primary); */
    /* background-color: var(--color-primary-400); */
    background: rgba(var(--color-primary-rgb), 0.2);
    /* border-color: rgba(var(--color-primary-rgb), 0); */
    &::before,
    &::after {
      background: rgba(var(--color-primary-rgb), 0.2);
    }
    /* color: var(--bg); */
    padding-left: var(--space-xs);
    padding-right: var(--space-xs);
  }
  &.is-active {
    background: var(--color-primary);
    color: white;
  }
  &:hover {
    .variations {
      opacity: 1;
    }
  }
  .left {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const AddToCart = ({
  // slug,
  isFirst,
  id,
  url,
  title,
  subtitle,
  description,
  price,
  productVariations,
  customMetaData = {},
  // priceAlt,
  disabled = false,
}) => {
  // console.log(id)
  const [variationPrice, setVariationPrice] = useState(price);
  const [active, setActive] = useState(false);
  const productDescription = description ? description : "";
  const { variations } = useVariations();

  const { cart, ready, products, setProducts } = useShop();
  const canBuy = variations.length >= 2;

  useEffect(() => {
    if (active) {
      setProducts((prev) => [...prev, productData]);
    } else {
      const _products = products.filter((item) => item.id !== productData.id);
      // console.log(_products)
      setProducts(_products);
    }
  }, [active]);

  /*
  On variations change
  */
  useEffect(() => {
    // console.log("modifiedPrice")

    if (active && products) {
      const index = products.findIndex((x) => x.id === id);
      let newProducts = [...products];
      newProducts[index].customFields = productData.customFields;
      setProducts(newProducts);
    }
    // console.log(price, variations)
    let modifiedPrice = price;
    // console.log({ price })
    variations.forEach((el, i) => {
      // if many licences, cumulate prices
      const variationPrice = _getVariationPriceByProductType(
        el,
        customMetaData.type
      );
      // console.log("--- type", customMetaData.type, el.value)
      // console.log({ variationPrice })
      modifiedPrice += variationPrice;
    });
    // console.log({ modifiedPrice })

    setVariationPrice(modifiedPrice);
  }, [variations]);

  const _getLicencesVariationsDataAttr = (startIndex) => {
    let data = [];
    let dataAttributes = {};
    let cacheStartIndex = 0;
    const variationsLicences = variations.filter(
      (el) => el.label === "Licences"
    );

    const _variations = productVariations.variations.filter(
      (el) => el.label === "Licences"
    )[0];

    _variations.options.forEach((el, i) => {
      // console.log(el);
      const index = i + startIndex;
      dataAttributes[`data-item-custom${index}-placeholder`] = "licence";
      dataAttributes[`data-item-custom${index}-name`] = el.option;
      dataAttributes[`data-item-custom${index}-type`] = "checkbox";

      // const price = priceAlt ? el.priceAlt : el.price
      const variationPrice = _getVariationOptionPriceByProductType(
        el,
        customMetaData.type
      );
      // console.log(customMetaData.type, { variationPrice })
      // const priceIncr = price - variationPrice
      // console.log(customMetaData.type, price, variationPrice)
      dataAttributes[
        `data-item-custom${index}-options`
      ] = `true[+${variationPrice}]|false`;
      dataAttributes[`data-item-custom${index}-value`] = "false";

      let value = "false";
      if (variationsLicences.length) {
        variationsLicences.forEach((_el, j) => {
          // console.log(el.option, _el.value.option)
          if (_el.value.option === el.option) {
            dataAttributes[`data-item-custom${index}-value`] = "true";
            value = "true";
          }
        });
      }

      data.push({
        name: _slugify(el.option),
        required: false,
        type: "checkbox",
        options: `true[+${variationPrice}]|false`,
        value: value,
      });

      cacheStartIndex = i;
    });

    return { data: data, dataAttributes, startIndex: cacheStartIndex };
  };

  const _getCompanySizeVariationsDataAttr = (startIndex) => {
    let data = [];
    let dataAttributes = {};
    let cacheStartIndex = 0;

    const variationsLicences = variations.filter(
      (el) => el.label === "Company Size"
    );

    const _variations = productVariations.variations.filter(
      (el) => el.label === "Company Size"
    );
    _variations.forEach((el, i) => {
      const index = i + startIndex;

      dataAttributes[`data-item-custom${index}-name`] = el.label;

      const options = el.options.map((_el) => {
        const _option = _el.option;
        // const _price = priceAlt ? _el.priceAlt : _el.price

        const variationPrice = _getVariationOptionPriceByProductType(
          _el,
          customMetaData.type
        );
        // console.log({ variationPrice })
        // let priceModifier = ""
        // if (_price) priceModifier = `[+${_price}]`
        // else priceModifier = `[+0]`

        return `${_option}[+${variationPrice}]`;
      });

      dataAttributes[`data-item-custom${index}-options`] = options
        .toString()
        .split(",")
        .join("|");

      let value = "";
      if (variationsLicences.length) {
        variationsLicences.forEach((_el, j) => {
          // console.log(_el.value, el.options)
          const option = el.options.filter(
            (option) => option._key === _el.value._key
          )[0];
          // console.log(option)
          if (option) {
            dataAttributes[`data-item-custom${index}-value`] = option.option;
            value = option.option;
          }
        });
      }

      data.push({
        name: el.label,
        required: true,
        type: "dropdown",
        options: options.toString().split(",").join("|"),
        value: value,
      });

      cacheStartIndex = index;
    });
    // console.log(cacheStartIndex)
    return { data: data, dataAttributes, startIndex: cacheStartIndex };
  };

  const _getWebsiteVariationsDataAttr = (startIndex) => {
    let data = [];
    let dataAttributes = {};
    let cacheStartIndex = startIndex;

    const hasWebLicence = variations.filter((el) => el.value.option === "Web");
    dataAttributes[`data-item-custom${startIndex}-name`] = "website";
    dataAttributes[`data-item-custom${startIndex}-placeholder`] = "Website";
    // dataAttributes[`data-item-custom${startIndex}-type`] = "textarea"
    //   hasWebLicence.length === 0 ? "hidden" : ""
    dataAttributes[`data-item-custom${startIndex}-value`] = "https://...";

    data.push({
      name: "website",
      placeholder: "Website",
      value: "https://...",
      // required: true,
      // type: hasWebLicence.length === 0 ? "hidden" : "",
    });
    return { data, dataAttributes, startIndex: cacheStartIndex };
  };

  const _getLicenceForVariationsDataAttr = (startIndex) => {
    let data = [];
    let dataAttributes = {};
    let cacheStartIndex = startIndex;

    dataAttributes[`data-item-custom${startIndex}-name`] = "licenceFor";
    dataAttributes[`data-item-custom${startIndex}-placeholder`] = "Licence for";
    // dataAttributes[`data-item-custom${startIndex}-type`] = ""
    // dataAttributes[`data-item-custom${startIndex}-value`] = ""

    data.push({
      name: "licenceFor",
      placeholder: "Licence for",
      type: "",
      value: "",
      // value: "sss",
      // required: true,
      // type: "",
      // type: hasWebLicence.length === 0 ? "hidden" : "",
    });
    return { data, dataAttributes, startIndex: cacheStartIndex };
  };

  const _getCustomFields = () => {
    let startIndex = 1;

    const licences = _getLicencesVariationsDataAttr(startIndex);
    startIndex = licences.startIndex + 1;

    const companySize = _getCompanySizeVariationsDataAttr(startIndex);
    startIndex = companySize.startIndex + 1;
    // console.table(companySize)

    const website = _getWebsiteVariationsDataAttr(startIndex);
    startIndex = website.startIndex + 1;
    const licenceFor = _getLicenceForVariationsDataAttr(startIndex);

    return {
      licences: licences.dataAttributes,
      licencesData: licences.data,
      companySize: companySize.dataAttributes,
      companySizeData: companySize.data,
      // website: website.dataAttributes,
      // websiteData: website.data,
      licenceFor: licenceFor.dataAttributes,
      licenceForData: licenceFor.data,
    };
  };

  const {
    licences,
    licencesData,
    companySize,
    companySizeData,
    // website,
    // websiteData,
    licenceFor,
    licenceForData,
  } = _getCustomFields();
  // console.log(licences)

  const productData = {
    id: id,
    // price: variationPrice.toFixed(2),
    price: price.toFixed(2),
    // price: 50,
    // priceAlt: priceAlt,
    url: url,
    description: productDescription,
    name: title,
    quantity: 1,
    stackable: "never",
    shippable: false,
    customFields: [
      ...licencesData,
      ...companySizeData,
      ...licenceForData,
      // ...websiteData,
    ],
    metadata: JSON.stringify(customMetaData),
  };
  // console.log(productData)

  return (
    <Container
      className={clsx(
        "add-to-cart cursor-pointer",
        isFirst ? "is-first" : "",
        active ? "is-active" : "",
        disabled ? "pointer-events-none" : ""
      )}
      onClick={() => {
        if (canBuy) setActive(!active);
      }}
      isFirst={isFirst}>
      <div className='flex justify-between items-baseline'>
        <div className='left pr-md flex items-baseline flex-nowrap'>
          <div className='title pr-sm capitalize'>{title}</div>
          {subtitle && (
            <div className='subtitle text-gray-100- text-primary-400'>
              ({subtitle})
            </div>
          )}
        </div>

        <div className='right'>
          <div className='flex items-center justify-end'>
            <div className='price whitespace-nowrap pl-md w-[85px]--- text-right'>
              <span>{variationPrice.toFixed(2)} EUR</span>
              {/* {id} */}
            </div>

            <input
              type='checkbox'
              name='atc'
              className={clsx(
                "snipcart-add-item- checkbox pl-sm whitespace-nowrap ml-sm"
                // !canBuy ? "pointer-events-none" : ""
              )}
              data-item-id={id}
              data-item-price={variationPrice.toFixed(2)}
              // data-item-price={50}
              data-item-url={url}
              data-item-description={productDescription}
              data-item-name={title}
              data-item-min-quantity={1}
              data-item-quantity={1}
              data-item-max-quantity={1}
              data-item-stackable='never'
              {...licences}
              {...companySize}
              // {...licenceFor}
              // {...website}
              data-item-metadata={JSON.stringify(customMetaData)}
              checked={active}
              disabled={disabled}
              readOnly
              // onChange={e => setActive(e.target.checked)}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AddToCart;
