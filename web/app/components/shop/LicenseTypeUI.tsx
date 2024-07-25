// import React, { useEffect, useState } from "react";
// import { Product, LabelPrice } from "@/app/types/schema";

// import useShop from "./ShopContext";
// import Price from "./Price";
// import clsx from "clsx";

// type LicenseProps = {
//   input: LabelPrice;
// };

// const Item = ({ input }: LicenseProps) => {
//   const [active, setActive] = useState(false);
//   const { licenseTypeProfil, setLicenseTypeProfil } = useShop();

//   // const _onClick = (item: LicenseType | any) => {
//   //   setLicenseTypeProfil(item);
//   // };

//   useEffect(() => {
//     if (active) {
//       const exist = licenseTypeProfil?.filter((el) => el.label === input.label);
//       // console.log({ exist });
//       if (exist && exist?.length > 0) {
//         setLicenseTypeProfil({ type: "REMOVE", payload: input });
//       } else {
//         setLicenseTypeProfil({ type: "ADD", payload: input });
//       }
//     } else {
//       setLicenseTypeProfil({ type: "REMOVE", payload: input });
//     }
//   }, [active]);

//   return (
//     <div
//       className={clsx(
//         "grid grid-cols-2 py-sm b-b cursor-pointer",
//         active && "bg-black text-white px-md"
//       )}
//       onClick={() => setActive(!active)}>
//       <div className='label'>{input.label}</div>
//       <div className='flex justify-end gap-md'>
//         <Price price={input.price} />
//         <span>SELECT</span>
//       </div>
//     </div>
//   );
// };

// type LicenseTypeUIProps = {
//   input: Product;
// };
// const LicenseTypeUI = ({ input }: LicenseTypeUIProps) => {
//   return (
//     <div className='license-typui'>
//       <h2>1. Select your Licence</h2>
//       <div className='b-t'>
//         {input.licenseType?.items?.map((item, i) => (
//           <Item input={item} key={i} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default LicenseTypeUI;
