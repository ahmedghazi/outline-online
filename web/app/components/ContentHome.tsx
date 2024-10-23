import React, { useRef } from "react";
import { Home } from "../types/schema";
import SectionInUse from "./SectionInUse";
import SectionTypeFaces from "./SectionTypeFaces";
// import Obj3ds from "./Obj3ds";
import SectionTrinkets from "./SectionTrinkets";
import TrinketsFromGPT from "./trinkets/TrinketsFromGPT";
import useInViewPort from "../hooks/useInViewport";

type Props = {
  input: Home;
};

const ContentHome = ({ input }: Props) => {
  return (
    <div className='content--home'>
      {/* {input.trinkets && <SectionTrinkets input={input.trinkets} />}
      {input.typefaces && <SectionTypeFaces input={input.typefaces} />} */}
      {input.inUse && <SectionInUse input={input.inUse} />}
    </div>
  );
};

export default ContentHome;
