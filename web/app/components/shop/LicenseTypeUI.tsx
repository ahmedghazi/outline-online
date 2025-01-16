import React, { useEffect, useState } from "react";
import Checkbox from "../ui/Checkbox";
import { LicenseType } from "@/app/types/schema";
import useShop from "./ShopContext";
import Radio from "../ui/Radio";

type Props = {
  input: LicenseType;
  index: number;
  ready: boolean;
};

const LicenseTypeUI = ({ input, index, ready }: Props) => {
  const { licenseTypeProfil, setLicenseTypeProfil } = useShop();
  const [isChecked, setIsChecked] = useState<boolean>(false);

  useEffect(() => {
    setIsChecked(index === 0);
  }, []);

  useEffect(() => {
    // const item = licenseTypeProfil?.filter((el) => el.label === input.label);
    // setIsChecked(item?.length === 1);
  }, [licenseTypeProfil]);

  // useEffect(() => {
  //   // console.log(isChecked, input.label);

  //   _updateLicenseType(isChecked, input);
  // }, [isChecked]);

  const _updateLicenseType = (checked: boolean, val: LicenseType) => {
    // const items = licenseTypeProfil?.filter((el) => el.label === val.label);
    console.log(licenseTypeProfil?.length, val.label, checked);
    if (checked) {
      //no dubplicate
      setLicenseTypeProfil([val]);
      // if (licenseTypeProfil?.length === 0) {
      //   setLicenseTypeProfil({ type: "ADD", payload: val });
      // } else {
      //   setLicenseTypeProfil({ type: "REPLACE", payload: val });
      // }
    }
    // else {
    //   setLicenseTypeProfil({ type: "REMOVE_ALL" });
    // }
  };
  return (
    <div className='input flex gap-sm'>
      <Radio
        name={input.label || ""}
        checked={isChecked}
        // checked={ready && index === 0}
        onChange={(checked: boolean) => {
          _updateLicenseType(checked, input);
          // setIsChecked(checked);
        }}
        // onClick={(val: boolean) => setIsChecked(val)}
      />
    </div>
  );
};

export default LicenseTypeUI;
