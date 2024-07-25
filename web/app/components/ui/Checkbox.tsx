import React, { useEffect, useState } from "react";

type Props = {
  name: string;
  checked?: boolean;
  onChange: Function;
};

const Checkbox = ({ name, checked, onChange }: Props) => {
  const [active, setActive] = useState<boolean>(false);

  useEffect(() => {
    if (checked) setActive(true);
  }, []);

  useEffect(() => {
    // console.log(name, active);
    onChange(active);
  }, [active]);

  return (
    <div className='checkbox-ui'>
      <label htmlFor={name}>
        <input
          type='checkbox'
          checked={active}
          name={name}
          id={name}
          onChange={(e) => setActive(!active)}
        />
        <span className='checkmark'></span>
        <span className='label'>{name}</span>
      </label>
    </div>
  );
};

export default Checkbox;
