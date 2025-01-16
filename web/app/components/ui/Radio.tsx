import React, { BaseSyntheticEvent, useEffect, useState } from "react";

type Props = {
  name: string;
  checked?: boolean;
  onChange?: Function;
};

const Radio = ({ name, checked = false, onChange }: Props) => {
  const [active, setActive] = useState<boolean>(false);

  useEffect(() => {
    // console.log("----Checkbox", name, active);
    if (checked) setActive(checked);
  }, []);

  // useEffect(() => {
  //   // console.log("----Checkbox", name, active);
  //   setActive(checked);
  // }, [checked]);

  useEffect(() => {
    // console.log("---Radio", name, active);
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
          type='radio'
          name={"licenseType"}
          id={name}
          // checked={active}
          value={name}
          onChange={_handleChange}
        />
        <span className='checkmark'></span>
        <span className='label'>{name}</span>
        {/* {active && "active"} */}
      </label>
    </div>
  );
};

export default Radio;
