"use client";
import React, { useEffect, useRef, useState } from "react";
import { Figure } from "../types/schema";
import FigureUI from "./ui/Figure";

type Props = {
  input: Figure[];
};

const SectionInUse = ({ input }: Props) => {
  const [image, setImage] = useState<Figure | null>(null);
  const [x, setX] = useState<number>(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.innerWidth > 1080)
      ref.current?.addEventListener("mousemove", _update);
    return () => {
      if (window.innerWidth > 1080)
        ref.current?.removeEventListener("mousemove", _update);
    };
  }, []);

  const _update = (e: MouseEvent) => {
    const percentWindow = _getPagePercX(e);
    const scrollWidth = ref.current?.scrollWidth;
    if (!scrollWidth) return;
    const scrollableWidth = scrollWidth - window.innerWidth;
    const scroll = (percentWindow * scrollableWidth) / 100;
    ref.current.scrollLeft = scroll;
  };

  const _getPagePercX = (e: MouseEvent) => {
    const { pageX } = e;
    return (pageX * 100) / window.innerWidth;
  };

  return (
    <section className='section--in-use'>
      <div className='modal'>
        {image && (
          <div className=''>
            <FigureUI asset={image.image?.asset} width={2000} />
            <figcaption>{image.caption}</figcaption>
          </div>
        )}
      </div>
      <div className='thumbnails hide-sb' ref={ref}>
        <div className='inner'>
          {input.map((item, i) => (
            <div
              className='thumbnail'
              key={i}
              onMouseEnter={() => setImage(item)}
              onClick={() => setImage(item)}>
              <FigureUI asset={item.image?.asset} width={100} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SectionInUse;
