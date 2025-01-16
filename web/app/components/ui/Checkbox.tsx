import React, { BaseSyntheticEvent, useEffect, useState } from "react";

type Props = {
  name: string;
  checked?: boolean;
  onChange?: Function;
  onClick?: Function;
};

const Checkbox = ({ name, checked = false, onChange, onClick }: Props) => {
  const [active, setActive] = useState<boolean>(checked);

  useEffect(() => {
    // console.log(checked);
    if (checked) {
      setTimeout(() => {
        setActive(true);
      }, 150);
    }
  }, []);

  useEffect(() => {
    // console.log("----Checkbox", name, active);
    setActive(checked);
  }, [checked]);

  useEffect(() => {
    // console.log(name, active);
    if (typeof onChange === "function") onChange(active);
  }, [active]);

  const _handleChange = (e: BaseSyntheticEvent) => {
    setActive((prev) => !prev);
    setTimeout(() => {}, 150);
  };

  return (
    <div
      className='checkbox-ui'
      onClick={() => {
        if (typeof onClick === "function") {
          setTimeout(() => {
            onClick(active);
          }, 150);
        }
      }}>
      <label htmlFor={name}>
        <input
          type='checkbox'
          name={name}
          id={name}
          checked={active}
          onChange={_handleChange}
        />
        <span className='checkmark'></span>
        <span className='label'>{name}</span>
      </label>
    </div>
  );
};

export default Checkbox;
