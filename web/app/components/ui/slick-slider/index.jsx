"use client";
import React, { useEffect, useState, useRef } from "react";
import ReactSlick from "react-slick";
// import SliderCursorPrevNextText from "./SliderCursorPrevNextText";
import PubSub from "pubsub-js";
import useDeviceDetect from "@/app/hooks/useDeviceDetect";
import "./slick.scss"; //impossible de l'importer direct ici à cause de purge-css
// import { afterImage } from "three/webgpu";

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}>
      ◂
    </div>
  );
}
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}>
      ▸
    </div>
  );
}

const Slider = ({ children, settingsOverride }) => {
  // console.log(settingsOverride);
  const sliderRef = useRef();
  const { isMobile } = useDeviceDetect();

  const [index, setIndex] = useState(0);

  const _sliderBeforeChange = (oldIndex, newIndex) => {
    setIndex(newIndex);
  };
  const _sliderAfterChange = (oldIndex, newIndex) => {
    // setIndex(newIndex);
  };

  useEffect(() => {
    // console.log(sliderRef)
    const token = PubSub.subscribe("SLIDER_INDEX", (e, d) => {
      console.log(d);
      sliderRef.current.slickGoTo(d);
    });

    return () => PubSub.unsubscribe(token);
  }, []);

  useEffect(() => {
    PubSub.publish("SLIDER_CHANGE", index);
  }, [index]);

  const settingsDefault = {
    // autoplay: !isMobile,
    autoplaySpeed: 3000,
    autoplay: false,
    dots: false,
    speed: isMobile ? 250 : 500,
    // speed: 500,
    swipeToSlide: true,
    slidesToScroll: 1,
    cssEase: "cubic-bezier(0.53, 0, 0.36, 1)",
    beforeChange: _sliderBeforeChange,
    afterChange: _sliderAfterChange,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    // prevArrow: <SliderCursorPrevNextText label="prev" left="0%" />,
    // nextArrow: <SliderCursorPrevNextText label="next" left="50%" />,
  };
  const settings = {
    ...settingsDefault,
    ...settingsOverride,
  };
  // console.log(settings);

  return (
    <ReactSlick {...settings} ref={sliderRef}>
      {children}
    </ReactSlick>
  );
};

export default Slider;
