import { SliderUI } from "@/app/types/schema";
import React, { useEffect, useRef, useState } from "react";
import Figure from "../ui/Figure";
import Slider from "../ui/slick-slider";
import clsx from "clsx";

type Props = {
  input: SliderUI;
};

const ModuleSliderUI = ({ input }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [currentBounding, setCurrentBounding] = useState<DOMRect | undefined>(
    undefined
  );

  useEffect(() => {
    setTimeout(() => {
      _handleBoundingByIndex(0);
      setTimeout(() => {
        _handleBoundingByIndex(0);
      }, 1000);
    }, 150);
  }, []);

  const _onInit = () => {
    setTimeout(() => {
      _handleBoundingByIndex(0);
    }, 200);
  };

  const _sliderAfterChange = (current: number) => {
    // console.log(current);
    // console.log(ref);

    _handleBoundingByIndex(current);
  };

  const _handleBoundingByIndex = (index: number) => {
    if (!ref.current) return;

    const currentSlide = ref.current?.querySelector(
      `.slick-slide[data-index='${index}']`
    );
    // console.log(currentSlide);

    if (currentSlide) {
      const bounding = currentSlide
        .querySelector("figure")
        ?.getBoundingClientRect();
      // console.log(bounding);
      setCurrentBounding(bounding);
    }
  };

  const settingsOverride = {
    adaptiveHeight: true,
    onInit: _onInit,
    beforeChange: (oldIndex: number, newIndex: number) => {
      _sliderAfterChange(newIndex);
    },
    afterChange: _sliderAfterChange,
  };
  // console.log(settingsOverride);

  return (
    <div
      ref={ref}
      className={clsx(
        "module module--slider-ui",
        input.size && `md:col-span-${input.size}`,
        currentBounding && "has-bounding"
      )}
      style={
        {
          "--current-slide-h": currentBounding
            ? currentBounding.height + "px"
            : 0,
        } as React.CSSProperties
      }>
      <Slider settingsOverride={settingsOverride}>
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
