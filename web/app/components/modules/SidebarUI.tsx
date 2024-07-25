import React from "react";
import { PortableText } from "@portabletext/react";
import portableTextComponents from "@/app/utils/portableTextComponents";
import { SidebarUI, TextUI } from "@/app/types/schema";
import clsx from "clsx";

type Props = {
  input: SidebarUI;
};

const ModuleSidebarUI = ({ input }: Props) => {
  return (
    <div className={clsx("module module--sidebar-ui md:col-span-4")}>
      {input.text && (
        <div className='text'>
          <PortableText
            value={input.text}
            components={portableTextComponents}
          />
        </div>
      )}
    </div>
  );
};

export default ModuleSidebarUI;
