"use client";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

type Props = {};

const Loading3dots = (props: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const dots = "...".split("");

  return (
    <div className='loading-3-dots' ref={ref}>
      Uploading{""}
      {dots.map((el, i) => (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.5,
            delay: i / 7,
            repeat: Infinity,
            repeatType: "mirror",
          }}
          key={i}>
          {el}
        </motion.span>
      ))}
    </div>
  );
};

export default Loading3dots;
