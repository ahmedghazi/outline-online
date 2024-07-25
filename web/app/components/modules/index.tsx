"use client";
import "./index.scss";
import React from "react";

import { SanityKeyed } from "sanity-codegen";

import { ImageUI, SliderUI, TextUI } from "@/app/types/schema";
import ModuleTextUI from "./TextUI";
import ModuleImageUI from "./ImageUI";
import ModuleSidebarUI from "./SidebarUI";
import ModuleSliderUI from "./SliderUI";

type ModulesProps =
  | Array<SanityKeyed<TextUI> | SanityKeyed<ImageUI> | SanityKeyed<SliderUI>>
  | any;

const Modules = ({ input }: any) => {
  // console.log(input);
  const _renderModules = () => {
    const _modules = input.map((module: ModulesProps, i: number) => {
      // console.log(module);
      switch (module._type) {
        case "textUI":
          return <ModuleTextUI key={module._key} input={module} />;
        case "sidebarUI":
          return <ModuleSidebarUI key={module._key} input={module} />;
        case "imageUI":
          return <ModuleImageUI key={module._key} input={module} />;
        case "sliderUI":
          return <ModuleSliderUI key={module._key} input={module} />;
        default:
          return null;
      }
    });
    return _modules;
  };

  return (
    <div className='modules grid md:grid-cols-16 gap-md'>
      {_renderModules()}
    </div>
  );
};

export default Modules;
