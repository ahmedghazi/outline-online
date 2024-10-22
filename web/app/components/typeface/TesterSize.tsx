import React, { ReactNode, forwardRef, useEffect, useState } from "react";

type Props = {
  initialValue: string;
  target: HTMLDivElement;
};

export type Ref = HTMLDivElement;

// const TesterSize = forwardRef<Ref, Props>(({ initialValue }, ref) => {
const TesterSize = ({ initialValue, target }: Props) => {
  // const { initialValue } = props;
  // console.log(ref);
  const [value, setValue] = useState<string>(initialValue);

  useEffect(() => {
    _update();
  }, []);

  useEffect(() => {
    // console.debug({ target })
    _update();
  }, [value]);

  const _update = () => {
    target.style.setProperty("--type-textFontSize", `${value}px`);
  };

  return (
    <div className='range-ui type-size  controls'>
      <div className='flex items-center'>
        <label htmlFor='size' className=''>
          Size
        </label>
        <input
          type='range'
          name='size'
          value={value}
          min='14'
          max='300'
          step='1'
          onChange={(e) => setValue(e.target.value)}
          className='mx-xs'
        />
        {/* <div className='value'>{size}</div> */}
        {/* <input type='number' value={size} /> */}
        <input
          type='number'
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </div>
  );
};

export default TesterSize;
