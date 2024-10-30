"use client";
import React, { useRef } from "react";
import TesterSize from "./TesterSize";
import TesterHeight from "./TesterLeading";
import "./Tester.scss";
// import { Style } from "@/app/types/schema";

type Props = {
  title: string;
};

const Typetester = ({ title }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div className='type-tester'>
      <div
        className='contenteditable'
        contentEditable={true}
        suppressContentEditableWarning={true}
        spellCheck='false'
        autoCorrect='off'
        // autoCapitalize='off'
      >
        {title}
      </div>
    </div>
  );
};

export default Typetester;
