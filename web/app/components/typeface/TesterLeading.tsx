import React, { forwardRef, useEffect, useState } from "react";

type Props = {
  initialValue: string;
  target: HTMLDivElement;
};

const TesterLeading = ({ initialValue, target }: Props) => {
  const [height, setHeight] = useState<string>(initialValue);

  useEffect(() => {
    _update();
  }, []);

  useEffect(() => {
    _update();
  }, [height]);

  const _update = () => {
    // target.style.lineHeight = `${height}px`;
    target.style.setProperty("--type-textLineHeight", `${height}px`);
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
          value={height}
          min='14'
          max='150'
          step='1'
          onChange={(e) => setHeight(e.target.value)}
          className='mx-xs'
        />
        <div className='value'>{height}</div>
      </div>
    </div>
  );
};

export default TesterLeading;
