import { Style } from "@/app/types/schema";
import React from "react";
import Price from "./Price";
import AddToCart from "./AddToCart";

type Props = {
  input: Style;
  title: string | any;
};

const StylesUI = ({ input, title }: Props) => {
  return (
    <div className='styles-ui b-t py-md'>
      <div className='grid grid-cols-3 '>
        <div className='title'>{input.title}</div>
        <div></div>
        <div className='flex justify-end'>
          {/* <Price price={input.price} /> */}
          {input.price && (
            <AddToCart
              price={input.price}
              // name={input.title || ""}
              name={`${title} — ${input.title}` || ""}
              category='style'
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default StylesUI;
