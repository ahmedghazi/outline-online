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

  const _updateLicenseType = (checked: boolean, val: LicenseType) => {
    // const items = licenseTypeProfil?.filter((el) => el.label === val.label);
    if (checked) {
      console.log(licenseTypeProfil?.length, val.label, checked);

      setLicenseTypeProfil({ type: "SET", payload: [val] });
    }
  };
  return (
    <div className='input flex gap-sm'>
      {ready && (
        <Radio
          name={input.label || ""}
          checked={index === 0}
          // checked={ready && index === 0}
          onChange={(checked: boolean) => {
            _updateLicenseType(checked, input);
            // setIsChecked(checked);
          }}
        />
      )}
    </div>
  );
};

export default LicenseTypeUI;
