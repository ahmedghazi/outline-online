import React from "react";
import { Product } from "@/app/types/schema";

import Variants from "./Variants";

type Props = {
  input: Product;
};

const Licences = ({ input }: Props) => {
  return (
    <div className='licences mb-lg'>
      <h2>1. Select your Licence</h2>
      <div className='b-t'>
        {input.variants?.map((item, i) => (
          <Variants
            key={i}
            input={item}
            typefaceTitle={input.title}
            variantsIndex={i}
          />
        ))}
      </div>
      {/* <pre>{JSON.stringify(input, null, 2)}</pre> */}
    </div>
  );
};

export default Licences;
