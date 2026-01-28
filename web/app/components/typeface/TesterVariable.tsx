import React, { ReactNode, forwardRef, useEffect, useState } from "react";

type Props = {
  axe: string;
  initialValue: string;
  target: HTMLDivElement;
  min?: string;
  max?: string;
};

export type Ref = HTMLDivElement;

const TesterVariable = ({ axe, initialValue, target, min, max }: Props) => {
  const [value, setValue] = useState<string>(initialValue);

  useEffect(() => {
    _update();
  }, []);

  useEffect(() => {
    // console.debug({ target })
    _update();
  }, [value]);

  const _update = () => {
    //font-variation-settings: "wght" 100, "ital" 0;
    target.style.setProperty("--font-variation-settings", `"${axe}" ${value}`);
  };

  return (
    <div className='range-ui type-variable  controls'>
      <div className='flex items-center'>
        <label htmlFor='variable' className=''>
          variable
        </label>
        <input
          type='range'
          name='variable'
          value={value}
          min={min || "60"}
          max={max || "1250"}
          step='1'
          onChange={(e) => setValue(e.target.value)}
          className='mx-xs'
        />

        <input
          type='number'
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </div>
  );
};

export default TesterVariable;
