import React, { useEffect, useState } from "react";
import { LabelPrice, LicenseType, Product } from "@/app/types/schema";
import useShop from "./ShopContext";
import Price from "./Price";
import clsx from "clsx";

type LicenseProps = {
  input: LabelPrice;
};

const Item = ({ input }: LicenseProps) => {
  const [active, setActive] = useState(false);
  const { setLicenseSizeProfil } = useShop();

  useEffect(() => {
    if (active) setLicenseSizeProfil(input);
  }, [active]);

  return (
    <div
      className={clsx(
        "grid grid-cols-2 py-sm b-b cursor-pointer",
        active && "bg-black text-white px-md"
      )}
      onClick={() => setActive(!active)}>
      <div className='label'>{input.label}</div>
      <div className='flex justify-end gap-md'>
        {/* <Price price={input.price} /> */}
        <span>SELECT</span>
      </div>
    </div>
  );
};

type LicenseSizProps = {
  input: Product;
};

const LicenseSizeUI = ({ input }: LicenseSizProps) => {
  const { setLicenseSizeProfil } = useShop();

  const _onClick = (item: LabelPrice | any) => {
    setLicenseSizeProfil(item);
  };

  return (
    <div className='license-type-ui'>
      <h2>2. Select your company size</h2>
      <p className='infos'>{input.licenseSize?.infos}</p>
      <div className='b-t'>
        {input.licenseSize?.items?.map((item, i) => (
          <Item input={item} key={i} />
        ))}
      </div>
      {/* <pre>{JSON.stringify(input, null, 2)}</pre> */}
    </div>
  );
};

export default LicenseSizeUI;
