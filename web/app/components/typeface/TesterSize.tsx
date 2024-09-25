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
  const [size, setSize] = useState<string>(initialValue);

  useEffect(() => {
    _update();
  }, []);

  useEffect(() => {
    // console.debug({ target })
    _update();
  }, [size]);

  const _update = () => {
    // target.style.fontSize = `${size}px`;
    // target.style.lineHeight = `${size}px`;
    target.style.setProperty("--type-textFontSize", `${size}px`);
    target.style.setProperty("--type-textLineHeight", `${size}px`);
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
          value={size}
          min='14'
          max='150'
          step='1'
          onChange={(e) => setSize(e.target.value)}
          className='mx-xs'
        />
        <div className='value'>{size}</div>
      </div>
    </div>
  );
};

export default TesterSize;
