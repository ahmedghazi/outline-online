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
      {/* {input.obj3ds && <section className='obj3ds'>obj3ds</section>} */}
      {/* <section className='obj3ds'>obj3ds</section> */}
      {/* {input.obj3ds && <Obj3dsAll input={input.obj3ds} />} */}
      {input.trinkets && <SectionTrinkets input={input.trinkets} />}
      {/* {input.trinkets && <TrinketsFromGPT input={input.trinkets} />} */}
      {input.typefaces && <SectionTypeFaces input={input.typefaces} />}
      {input.inUse && <SectionInUse input={input.inUse} />}
    </div>
  );
};

export default ContentHome;
