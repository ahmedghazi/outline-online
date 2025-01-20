import React, { BaseSyntheticEvent, useEffect, useRef, useState } from "react";
import useShop from "../shop/ShopContext";

type Props = {
  name: string;
  checked?: boolean;
  onChange?: Function;
};

const Radio = ({ name, checked = false, onChange }: Props) => {
  const [active, setActive] = useState<boolean>(checked);
  const ref = useRef<HTMLInputElement>(null);
  const { licenseTypeProfil } = useShop();
  // useEffect(() => {
  //   // console.log("----Checkbox", name, active);
  //   if (!ref.current) return;
  //   if (checked) {
  //     ref.current.checked = true;
  //     // setActive(checked);
  //   }
  // }, []);

  useEffect(() => {
    if (
      licenseTypeProfil &&
      licenseTypeProfil.length > 0 &&
      licenseTypeProfil[0].label !== name
    )
      setActive(false);
  }, [licenseTypeProfil]);

  // useEffect(() => {
  //   // console.log("----Checkbox", name, active);
  //   setActive(checked);
  // }, [checked]);

  useEffect(() => {
    // console.log("---Radio", name, active, checked);
    if (typeof onChange === "function") onChange(active);
  }, [active]);

  const _handleChange = (e: BaseSyntheticEvent) => {
    // console.log(e.target.id, e.target.checked);
    setActive(e.target.checked);
  };

  return (
    <div className='radio-ui'>
      <label htmlFor={name}>
        <input
          defaultChecked={checked ? true : false}
          type='radio'
          name={"licenseType"}
          id={name}
          value={name}
          onChange={_handleChange}
        />
        <span className='checkmark'></span>
        <span className='label'>{name}</span>
        {checked && "checked"}
      </label>
    </div>
  );
};

export default Radio;
