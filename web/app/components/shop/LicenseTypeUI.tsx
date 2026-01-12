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
    // setIsChecked(index === 0);
    if (index === 0 && !_exist()) {
      setLicenseTypeProfil({ type: "ADD", payload: input });
    }
  }, []);

  useEffect(() => {
    // console.log("licenseTypeProfil length", index, licenseTypeProfil?.length);
    if (licenseTypeProfil?.length === 0 && index === 0) {
      setTimeout(() => {
        setLicenseTypeProfil({ type: "ADD", payload: input });
      }, 150);
    }
  }, [licenseTypeProfil]);

  const _exist = () => {
    return licenseTypeProfil?.some((el) => el.label === input.label);
  };
  const _updateLicenseType = (checked: boolean, val: LicenseType) => {
    // const exist = licenseTypeProfil?.some((el) => el.label === val.label);
    const exist = _exist();
    if (checked) {
      if (exist) {
        setLicenseTypeProfil({ type: "REPLACE", payload: val });
      } else {
        setLicenseTypeProfil({ type: "ADD", payload: val });
      }
    } else {
      setLicenseTypeProfil({ type: "REMOVE", payload: val });
    }
  };
  return (
    <div className='input flex gap-sm'>
      {ready && (
        <Checkbox
          name={input.label || ""}
          // checked={index === 0}
          checked={_exist()}
          onChange={(checked: boolean) => {
            // console.log(checked, input);
            _updateLicenseType(checked, input);
            // setIsChecked(checked);
          }}
        />
      )}
    </div>
  );
};

export default LicenseTypeUI;
