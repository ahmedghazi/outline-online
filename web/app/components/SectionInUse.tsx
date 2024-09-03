"use client";
import React, { useState } from "react";
import { Figure } from "../types/schema";
import FigureUI from "./ui/Figure";

type Props = {
  input: Figure[];
};

const SectionInUse = ({ input }: Props) => {
  const [image, setImage] = useState<Figure | null>(null);
  return (
    <section className='section--in-use'>
      <div className='modal'>
        {image && (
          <div>
            <FigureUI asset={image.image?.asset} width={2000} />
            <figcaption>{image.caption}</figcaption>
          </div>
        )}
      </div>
      <div className='thumbnails hide-sb'>
        <div className='inner'>
          {input.map((item, i) => (
            <div
              className='thumbnail'
              key={i}
              onMouseEnter={() => setImage(item)}>
              <FigureUI asset={item.image?.asset} width={200} />
            </div>
          ))}
          {input.map((item, i) => (
            <div
              className='thumbnail'
              key={i}
              onMouseEnter={() => setImage(item)}>
              <FigureUI asset={item.image?.asset} width={200} />
            </div>
          ))}
          {input.map((item, i) => (
            <div
              className='thumbnail'
              key={i}
              onMouseEnter={() => setImage(item)}>
              <FigureUI asset={item.image?.asset} width={200} />
            </div>
          ))}
          {input.map((item, i) => (
            <div
              className='thumbnail'
              key={i}
              onMouseEnter={() => setImage(item)}>
              <FigureUI asset={item.image?.asset} width={200} />
            </div>
          ))}
          {input.map((item, i) => (
            <div
              className='thumbnail'
              key={i}
              onMouseEnter={() => setImage(item)}>
              <FigureUI asset={item.image?.asset} width={200} />
            </div>
          ))}
          {input.map((item, i) => (
            <div
              className='thumbnail'
              key={i}
              onMouseEnter={() => setImage(item)}>
              <FigureUI asset={item.image?.asset} width={200} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SectionInUse;
