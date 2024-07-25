"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import clsx from "clsx";

type Props = {
  summary: string;
  detail: ReactNode;
};
const SummaryDetailFramer = ({ summary, detail }: Props) => {
  const [expand, setExpand] = useState(false);

  const controls = useAnimation();
  const variants = {
    expanded: { opacity: 1, height: "auto" },
    collapsed: { opacity: 0, height: 0 },
  };

  useEffect(() => {
    if (expand) {
      controls.start("expanded");
    } else {
      controls.start("collapsed");
    }
  }, [expand, controls]);

  // useEffect(() => {
  //   onOpen(expand)
  // }, [expand, onOpen])

  return (
    <div className='summary-detail grid md:grid-cols-5 gap-md'>
      <div
        className={clsx("summary md:col-span-2")}
        onClick={() => setExpand(!expand)}
        onKeyUp={() => setExpand(!expand)}
        tabIndex={-1}
        role='button'>
        <div className='pointer-events-none flex items-center gap-05e'>
          <div
            className={clsx(
              "icon-arrow transition-transform origin-center",
              expand && "rotate-90"
            )}>
            <svg
              width='6'
              height='7'
              viewBox='0 0 6 7'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M2.14186e-06 0L0 7L6 3.5L2.14186e-06 0Z'
                fill='#000'></path>
            </svg>
          </div>
          <div className='title'>{summary}</div>
        </div>
      </div>
      <div className='detail md:col-span-3 pb-md'>
        <motion.div
          initial='collapsed'
          className='z-0 overflow-hidden'
          animate={controls}
          variants={variants}
          transition={{ duration: 0.3 }}>
          {detail}
        </motion.div>
      </div>
    </div>
  );
};

export default SummaryDetailFramer;
