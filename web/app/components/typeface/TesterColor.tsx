import React, { useEffect, useState } from "react";

type Props = {
  onChange: Function;
};

const TesterColor = ({ onChange }: Props) => {
  const [hex, setHex] = useState<string>("");

  useEffect(() => {
    onChange(hex);
  }, [hex]);

  return (
    <div className='color-ui'>
      <div className='flex items-center'>
        <label htmlFor='type-color'>Color:</label>
        <input
          type='color'
          id='type-color'
          name='type-color'
          value='#000'
          onChange={(e) => setHex(e.target.value)}
        />
        {hex !== "" && <span className='value'>{hex}</span>}
      </div>
    </div>
  );
};

export default TesterColor;
