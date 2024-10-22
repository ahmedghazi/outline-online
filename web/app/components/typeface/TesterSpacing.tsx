import React, { ReactNode, forwardRef, useEffect, useState } from "react";

type Props = {
  initialValue: string;
  target: HTMLDivElement;
};

export type Ref = HTMLDivElement;

const TesterSpacing = ({ initialValue, target }: Props) => {
  const [value, setValue] = useState<string>(initialValue);

  useEffect(() => {
    _update();
  }, []);

  useEffect(() => {
    _update();
  }, [value]);

  const _update = () => {
    // target.style.letterSpacing = `${value}px`;
    target.style.setProperty("--type-textLetterSpacing", `${value}px`);
  };

  return (
    <div className='range-ui type-size  controls'>
      <div className='flex items-center'>
        <label htmlFor='size' className=''>
          Spacing
        </label>
        <input
          type='range'
          name='size'
          value={value}
          min='-50'
          max='100'
          step='1'
          onChange={(e) => setValue(e.target.value)}
          className='mx-xs'
        />
        {/* <div className='value'>{value}</div> */}
        <input
          type='number'
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </div>
  );
};

export default TesterSpacing;
