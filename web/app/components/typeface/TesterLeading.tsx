import React, { forwardRef, useEffect, useState } from "react";

type Props = {
  initialValue: string;
  target: HTMLDivElement;
};

const TesterLeading = ({ initialValue, target }: Props) => {
  const [value, setValue] = useState<string>(initialValue);

  useEffect(() => {
    _update();
  }, []);

  useEffect(() => {
    _update();
  }, [value]);

  const _update = () => {
    // target.style.lineHeight = `${height}px`;
    target.style.setProperty("--type-textLineHeight", `${value}px`);
  };

  return (
    <div className='range-ui type-height controls'>
      <div className='flex items-center'>
        <label htmlFor='height' className=''>
          Leading
        </label>
        <input
          type='range'
          name='height'
          value={value}
          min='10'
          max='400'
          step='1'
          onChange={(e) => setValue(e.target.value)}
          className='mx-xs'
        />
        {/* <input type='number' value={height} /> */}
        {/* <div className='value'>{height}</div> */}
        <input
          type='number'
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </div>
  );
};

export default TesterLeading;
