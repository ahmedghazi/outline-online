import React, { useEffect, useRef, useState } from "react";

type Props = {
  base64: string | any;
  fontName: string | any;
};
const TypeCard = ({ fontName, base64 }: Props) => {
  const ref = useRef<HTMLDivElement | any>(null);
  const [ready, setReady] = useState<boolean>(false);

  // useEffect(() => {
  //   _loadFonts();
  // }, []);

  // const _loadFonts = async () => {
  //   if (!ref.current) return;

  //   const font = new FontFace(fontName, `url(${base64})`, {
  //     // style: "normal",
  //     // weight: "400",
  //     // stretch: "condensed",
  //   });
  //   // wait for font to be loaded
  //   await font.load();
  //   // add font to document
  //   document.fonts.add(font);
  //   // console.log(font)
  //   ref.current.classList.add("is-ready");
  //   setReady(true);
  // };

  return (
    <div
      ref={ref}
      style={{
        fontFamily: fontName,
        opacity: ready ? 1 : 0,
      }}>
      {fontName}
    </div>
  );
};

export default TypeCard;
