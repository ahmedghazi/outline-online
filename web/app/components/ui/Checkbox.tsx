import React, { BaseSyntheticEvent, useEffect, useState } from "react";

type Props = {
  name: string;
  checked?: boolean;
  onChange: Function;
};

const Checkbox = ({ name, checked = false, onChange }: Props) => {
  // const defaultChecked = checked ? checked : false;
  const [active, setActive] = useState<boolean>(checked);
  // const [checked, setChecked] = useState<boolean>(false);
  // console.log(name, checked);
  useEffect(() => {
    // console.log(checked);
    if (checked) {
      setTimeout(() => {
        setActive(true);
      }, 150);
    }
  }, []);

  useEffect(() => {
    // console.log(name, active);
    onChange(active);
  }, [active]);

  const _handleChange = (e: BaseSyntheticEvent) => {
    console.log(name, e.target.value);
    // const val = e.target.value === "on" ? true : false;
    // setActive(val);
    setTimeout(() => {
      setActive((prev) => !prev);
    }, 150);
  };

  return (
    <div className='checkbox-ui'>
      <label htmlFor={name}>
        {checked && name + " is checked"}
        <input
          type='checkbox'
          name={name}
          id={name}
          // defaultChecked={checked ? checked : active}
          checked={active}
          onChange={_handleChange}
          // onChange={(e) => {
          // console.log(e, checked);
          // setActive(checked ? checked : !active);
          // }}
        />
        <span className='checkmark'></span>
        <span className='label'>{name}</span>
      </label>
    </div>
  );
};

export default Checkbox;
