// import { Variants } from "@/app/types/schema";
// import clsx from "clsx";
// import React, { useEffect, useState } from "react";
// import useShop from "./ShopContext";
// import VariantOptions from "./VariantOptions";
// import { usePathname } from "next/navigation";

// type Props = {
//   typefaceTitle: string | any;
//   input: Variants;
//   variantsIndex: number;
// };

// type EmptyObj = Record<PropertyKey, never | any>;

// const VariantsUI = ({ typefaceTitle, input, variantsIndex }: Props) => {
//   const [price, setPrice] = useState<number>(input.basePrice || 0);
//   const { variant, setLicenceProfil } = useShop();
//   const pathname = usePathname();
//   const scope = input.title;

//   // console.log(input);
//   useEffect(() => {
//     if (!variant) return;
//     if (variant.scope !== scope) return;
//     if (input.basePrice && variant.value) {
//       console.log(variant.value.priceModifier);
//       const priceModifier = variant.value.priceModifier || 0;
//       const finalPrice = input.basePrice + priceModifier;
//       setPrice(finalPrice);
//     }
//   }, [variant]);

//   const _getVariants = () => {
//     if (!input.items || input.items.length === 0) return "";
//     let dataAttributes: EmptyObj = {};

//     dataAttributes[`data-item-custom${variantsIndex}-name`] = "Licence";

//     const values = input.items
//       .map((item, i) => {
//         const priceModifier =
//           item.priceModifier && item.priceModifier > 0
//             ? `[+${item.priceModifier}]`
//             : "";
//         return `${item.title}${priceModifier}`;
//       })
//       .toString()
//       .split(",")
//       .join("|");

//     dataAttributes[`data-item-custom${variantsIndex}-options`] = values;

//     // console.log(dataAttributes);
//     return dataAttributes;
//   };

//   const _productID = () => {
//     let id = typefaceTitle.replace(" ", "-").toLowerCase();
//     id += "-";
//     id += input.title?.replace(" ", "-").toLowerCase();
//     return id;
//   };

//   const _onClick = () => {
//     setLicenceProfil(input);
//   };

//   return (
//     <div className='variant grid grid-cols-3 py-md b-b'>
//       <div className='title'>{input.title}</div>

//       <VariantOptions
//         scope={scope}
//         title={input.variantsTitle}
//         items={input.items}
//       />
//       <div className='flex gap-md justify-end'>
//         <div className='price '>FROM {price}CHF</div>
//         <button onClick={_onClick}>SELECT</button>
//         {/* <button
//           className={clsx(
//             "snipcart-add-item"
//             // hasVariants && !variant ? "disabled" : ""
//           )}
//           data-item-id={_productID()}
//           data-item-url={pathname}
//           data-item-name={`${typefaceTitle} — ${input.title}`}
//           data-item-description={"desc"}
//           data-item-quantity='1'
//           data-item-min-quantity='1'
//           data-item-max-quantity='1'
//           data-item-price={input.basePrice}
//           // data-item-image={imageCover?.asset.url}
//           {..._getVariants()}>
//           <span className='pointer-events-none'>Add to cart</span>
//         </button> */}
//       </div>
//       {/*
//       <input
//         type='checkbox'
//         name='atc'
//         class='snipcart-add-item- checkbox pl-sm whitespace-nowrap ml-sm'
//         data-item-id='kern-type-instance-y-instance-Compressed-Thin'
//         data-item-price='45.00'
//         data-item-url='/type/kern'
//         data-item-description=''
//         data-item-name='Kern Compressed Thin'
//         data-item-min-quantity='1'
//         data-item-quantity='1'
//         data-item-max-quantity='1'
//         data-item-stackable='never'
//         data-item-custom1-placeholder='licence'
//         data-item-custom1-name='Print + Social Media'
//         data-item-custom1-type='checkbox'
//         data-item-custom1-options='true[+45]|false'
//         data-item-custom1-value='true'
//         data-item-custom2-placeholder='licence'
//         data-item-custom2-name='Web'
//         data-item-custom2-type='checkbox'
//         data-item-custom2-options='true[+45]|false'
//         data-item-custom2-value='false'
//         data-item-custom3-placeholder='licence'
//         data-item-custom3-name='App/Game'
//         data-item-custom3-type='checkbox'
//         data-item-custom3-options='true[+45]|false'
//         data-item-custom3-value='false'
//         data-item-custom4-placeholder='licence'
//         data-item-custom4-name='Video'
//         data-item-custom4-type='checkbox'
//         data-item-custom4-options='true[+45]|false'
//         data-item-custom4-value='false'
//         data-item-custom5-placeholder='licence'
//         data-item-custom5-name='Company Size'
//         data-item-custom5-type='checkbox'
//         data-item-custom5-options='1[+0]|3[+10]|5[+20]|10[+30]|25[+50]|50[+65]|100[+90]|150[+115]|250[+150]|500[+280]|750[+505]|1000[+635]|1250[+765]|1500[+905]|2000[+1255]|2500[+1455]|5000[+2955]|Unlimited[+9455]'
//         data-item-custom5-value='1'
//         data-item-metadata='{"slug":"kern","type":"instance","instance":"Compressed Thin"}'
//         readonly=''></input>
//       */}
//     </div>
//   );
// };

// export default VariantsUI;
