// import React, { useEffect, useRef, useState } from "react";
// import { Variant } from "@/app/types/schema";
// import { publish } from "pubsub-js";
// import useShop from "./ShopContext";
// import clsx from "clsx";

// type Props = {
//   // input: ProductVariants;
//   scope: string | any;
//   items: Variant[] | any;
//   title: string | any;
// };

// const VariantOptions = ({ items, title, scope }: Props) => {
//   const [value, setValue] = useState<Variant | any>(null);
//   const { setVariant } = useShop();
//   useEffect(() => {
//     // publish("VARIANT_CHANGE", variant);
//     setVariant({
//       scope: scope,
//       value: value,
//     });
//   }, [value]);

//   const _onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     // dispatch(e.target.value);
//     const variant = items.filter((el: any) => el.title === e.target.value);
//     if (variant) setValue(variant[0]);
//   };
//   // console.log(items);
//   return (
//     <div className='variants-options'>
//       {items && items.length > 0 && (
//         <select
//           name='variants'
//           id=''
//           onChange={_onChange}
//           defaultValue={""}
//           className='cartouche uppercase'>
//           <option disabled={true} value=''>
//             SELECT {title}
//           </option>
//           {items.map((item: Variant, i: number) => (
//             <option value={item.title} key={i}>
//               {item.title}
//             </option>
//           ))}
//         </select>
//       )}
//     </div>
//   );
// };

// export default VariantOptions;
