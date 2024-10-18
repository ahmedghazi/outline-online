import React, { useEffect, useState } from "react";

type Props = {
  onChange: Function;
};

const TesterColor = ({ onChange }: Props) => {
  const [hex, setHex] = useState<string>("#000000");

  useEffect(() => {
    console.log(hex);
    onChange(hex);
  }, [hex]);

  return (
    <div className='color-ui'>
      <div className='flex items-center'>
        <label htmlFor='type-color' className='pointer-events-none- '>
          Color:
        </label>
        <input
          type='color'
          id='type-color'
          name='type-color'
          value='#000'
          onChange={(e) => setHex(e.target.value)}
        />
        {hex !== "" && <span className='value pointer-events-none'>{hex}</span>}
      </div>
    </div>
  );
};

export default TesterColor;
