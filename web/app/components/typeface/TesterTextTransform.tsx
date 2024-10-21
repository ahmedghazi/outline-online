import React, { CSSProperties, forwardRef, useEffect, useState } from "react";
import TesterAlign from "./TesterAlign";
import clsx from "clsx";

type Props = {
  target: HTMLDivElement;
};

const TesterTextTransform = ({ target }: Props) => {
  const [val, setVal] = useState<number>(0);
  const values = ["none", "capitalize", "uppercase", "lowercase"];
  useEffect(() => {
    _update();
  }, []);

  useEffect(() => {
    _update();
  }, [val]);

  const _onClick = () => {
    const newVal = val + 1 < values.length ? val + 1 : 0;
    setVal(newVal);
  };

  const _update = () => {
    // target.style.textTransform = `${values[val]}`;
    target.style.setProperty("--type-textTransform", `${values[val]}`);
  };
  const style: CSSProperties = {
    textTransform: values[val] as
      | "none"
      | "capitalize"
      | "uppercase"
      | "lowercase",
  };
  return (
    <div className='type-text-transform controls'>
      <button className='case-toggle' onClick={_onClick} style={style}>
        {values[val] === "capitalize" ? "Aa" : "aA"}
      </button>
    </div>
  );
};

export default TesterTextTransform;
