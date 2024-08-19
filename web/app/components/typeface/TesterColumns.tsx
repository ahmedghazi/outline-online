import React, { forwardRef, useEffect, useState } from "react";
import TesterAlign from "./TesterAlign";

type Props = {
  target: HTMLDivElement;
};

const TesterColumns = ({ target }: Props) => {
  const [val, setVal] = useState<number>(1);

  useEffect(() => {
    _update();
  }, []);

  useEffect(() => {
    _update();
  }, [val]);

  const _onClick = () => {
    const newVal = val + 1 < 4 ? val + 1 : 1;
    setVal(newVal);
  };

  const _update = () => {
    // target.style.columnCount = `${val}`;
    target.style.setProperty("--type-columnCount", `${val}`);
  };

  return (
    <div className='type-columns controls'>
      <button className='flex items-center gap-02e' onClick={_onClick}>
        <svg
          width='11'
          height='11'
          viewBox='0 0 11 11'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'>
          <line x1='0.5' y1='10.1074' x2='0.5' y2='0.261416' stroke='black' />
          <line x1='5.5' y1='10.1074' x2='5.5' y2='0.261416' stroke='black' />
          <line x1='10.5' y1='10.1074' x2='10.5' y2='0.261416' stroke='black' />
        </svg>

        <div className='val'>{val}</div>
      </button>
    </div>
  );
};

export default TesterColumns;
