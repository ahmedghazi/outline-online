import { SliderUI } from "@/app/types/schema";
import React from "react";
import Figure from "../ui/Figure";
import Slider from "../ui/slick-slider";
import clsx from "clsx";

type Props = {
  input: SliderUI;
};

const ModuleSliderUI = ({ input }: Props) => {
  return (
    <div
      className={clsx(
        "module module--slider-ui",
        input.size && `md:col-span-${input.size}`
      )}>
      <Slider settingsOverride={{ adaptiveHeight: true }}>
        {input.items?.map((item, i) => (
          <div className='slide' key={i}>
            <Figure asset={item.image?.asset} width={600} />
            <figcaption className='py-2 pr-md'>{item.caption}</figcaption>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ModuleSliderUI;
