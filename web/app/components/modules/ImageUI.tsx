import React from "react";
import clsx from "clsx";
import { ImageUI } from "@/app/types/schema";
import Figure from "../ui/Figure";
// import PreJson from "../ui/PreJson";
// import portableTextComponents from "@/app/utils/portableTextComponents";
// import { PortableText } from "@portabletext/react";

type Props = {
  input: ImageUI;
};

const ModuleImageUI = ({ input }: Props): JSX.Element => {
  // console.log(input);

  return (
    <div
      className={clsx(
        "module module--image",
        input.size && `md:col-span-${input.size}`
      )}>
      {input.image && <Figure asset={input.image?.image?.asset} width={1000} />}
      <figcaption className='py-2'>{input.image?.caption}</figcaption>
    </div>
  );
};

export default ModuleImageUI;
