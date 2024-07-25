import React from "react";
import { PortableText } from "@portabletext/react";
import portableTextComponents from "@/app/utils/portableTextComponents";
import { TextUI } from "@/app/types/schema";
import clsx from "clsx";

type Props = {
  input: TextUI;
};

const ModuleTextUI = ({ input }: Props) => {
  return (
    <div
      className={clsx(
        "module module--text-ui ",
        input.size && `col-span-${input.size}`
      )}>
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

export default ModuleTextUI;
