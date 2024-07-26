import React, { ReactNode, forwardRef, useEffect, useState } from "react";

type Props = {
  initialValue: string;
  target: HTMLDivElement;
};

export type Ref = HTMLDivElement;

const TesterSpacing = ({ initialValue, target }: Props) => {
  const [size, setSize] = useState<string>(initialValue);

  useEffect(() => {
    _update();
  }, []);

  useEffect(() => {
    _update();
  }, [size]);

  const _update = () => {
    target.style.letterSpacing = `${size}px`;
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
          value={size}
          min='0'
          max='14'
          step='1'
          onChange={(e) => setSize(e.target.value)}
          className='mx-xs'
        />
        <div className='value'>{size}</div>
      </div>
    </div>
  );
};

export default TesterSpacing;
