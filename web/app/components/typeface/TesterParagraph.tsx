import React, { forwardRef, useEffect, useState } from "react";
import TesterAlign from "./TesterAlign";
import TesterColumns from "./TesterColumns";
import TesterTextTransform from "./TesterTextTransform";

type Props = {
  target: HTMLDivElement;
};

const TesterParagraph = ({ target }: Props) => {
  const [textTransform, setTextTransform] = useState<string>("none");

  useEffect(() => {
    _update();
  }, []);

  useEffect(() => {
    _update();
  }, [textTransform]);

  const _update = () => {
    target.style.setProperty("--type-transform", textTransform);
    // target.style.textTransform = textTransform;
  };

  return (
    <div className='paragraph-ui type-paragraph controls'>
      <div className='flex items-center gap-md'>
        <TesterAlign target={target} />
        <TesterTextTransform target={target} />
        <TesterColumns target={target} />
      </div>
    </div>
  );
};

export default TesterParagraph;
