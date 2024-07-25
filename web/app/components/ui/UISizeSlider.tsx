import React, { useState } from "react";

type Props = {
  label: string;
  min: number;
  max: number;
};

const UISizeSlider = ({ label, min, max }: Props) => {
  const [value, setValue] = useState<number>(min);
  const _update = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
  };
  return (
    <div className='ui-size-slider' onClick={_update}>
      <div className='label'>{label}</div>
      <div className='slider'></div>
      <div className='value'>{value}</div>
    </div>
  );
};

export default UISizeSlider;
