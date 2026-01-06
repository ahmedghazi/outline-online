"use client";
import { Product, Typeface } from "@/app/types/schema";
import React, { useEffect } from "react";
import { _linkResolver } from "@/app/utils-old/utils";
import Typetester from "../typeface/TypeTester";
import ContentProduct from "../ContentProduct";

type Props = {
  items: Product[];
};

const ListProductUI = ({ items }: Props) => {
  // const { view, setIsListOrGrid } = usePageContext();

  return (
    <section className='module module--liste-product-ui'>
      {items.length > 0 &&
        items.map((item, i) => <ContentProduct key={i} input={item} />)}
    </section>
  );
};

export default ListProductUI;
