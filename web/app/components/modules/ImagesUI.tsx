// import React from "react";
// import clsx from "clsx";
// import Image from "next/image";
// // import { _localizeField } from "@/app/utils/utils";
// // import { ModuleImagesUI } from "@/app/types/schema";
// // import PreJson from "../ui/PreJson";
// // import portableTextComponents from "@/app/utils/portableTextComponents";
// // import { PortableText } from "@portabletext/react";

// type Props = {
//   input: ModuleImagesUI;
// };

// const ImageUI = ({ input }: Props): JSX.Element => {
//   // console.log(input);
//   const _getCellSize = (size: string | any) => {
//     // console.log(size);

//     switch (size) {
//       case "1":
//         return "col-span-1 row-span-1- w-full- md:w-1/3-";
//       case "2":
//         return "col-span-2 row-span-2 w-full- md:w-2/3-";
//       case "3":
//         return "col-span-3 row-span-3 w-full";
//       default:
//         return "col-span-1 row-span-1";
//     }
//   };
//   return (
//     <section className={clsx("module module--images mb-xl bg-red-")}>
//       <div className='flex- flex-wrap- flex-col- md:flex-row  grid grid-cols-2 md:grid-cols-3 gap-sm md:gap-md grid-flow-dense-'>
//         {/* {input.images &&
//           input.images.map((item, i) => (
//             <div
//               key={i}
//               className={clsx(
//                 "inline-block ",
//                 item._type === "moduleImage" && item.size
//                   ? _getCellSize(item.size)
//                   : "col-span-1 row-span-1 w-full- md:w-1/3- hidden-sm"
//               )}>
//               {item._type === "moduleImage" && item.image && (
//                 <figure
//                   className={clsx(
//                     "image rounded-md overflow-hidden",
//                     item.size === "2" && "h-full"
//                   )}>
//                   <Image
//                     src={item.image.asset.url}
//                     width={item?.image.asset.metadata?.dimensions.width}
//                     height={item?.image.asset.metadata?.dimensions.height}
//                     alt={"alt"}
//                     sizes='100vw'
//                     style={{
//                       width: "100%",
//                       height: item.size === "2" ? "100%" : "auto",
//                       // aspectRatio: "300 / 200",
//                       objectFit: item.size === "2" ? "cover" : "unset",
//                     }}
//                     blurDataURL={item?.image.asset.metadata?.lqip} //automatically provided
//                     placeholder='blur' // Optional blur-up while loading
//                   />
//                 </figure>
//               )}
//               {item._type === "mosaicEspaceBlanc" && (
//                 <div
//                   className='espace-blanc '
//                   style={{
//                     aspectRatio: "300 / 200",
//                   }}></div>
//               )}
//             </div>
//           ))} */}
//       </div>
//     </section>
//   );
// };

// export default ImageUI;
