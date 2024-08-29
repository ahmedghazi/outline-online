// import { Bundle, Product } from "@/app/types/schema";
// import React from "react";
// import AddToCart from "./AddToCart";

// type Props = {
//   input: Bundle;
//   title: string | any;
// };

// const BundleUI = ({ input, title }: Props) => {
//   return (
//     <div className='bundle-ui b-t py-sm'>
//       <div className='grid grid-cols-3 '>
//         <div className='title'>{input.title}</div>
//         <div></div>
//         <div className='flex justify-end gap-md'>
//           {/* <div className='price'>FROM {input.price}CHF</div> */}
//           {input.price && (
//             <AddToCart
//               price={input.price}
//               title={`Bundle ${title} — ${input.title}` || ""}
//               category='bundle'
//               id='eeeeee'
//               blurb='blurb'
//             />
//           )}
//         </div>
//       </div>
//       {/* <pre>{JSON.stringify(input, null, 2)}</pre> */}
//     </div>
//   );
// };

// export default BundleUI;
