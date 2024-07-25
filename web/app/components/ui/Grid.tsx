import clsx from "clsx";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  columns: number;
};

const Grid = ({ children, columns }: Props) => {
  const gridClass = `grid-cols-1 md:grid-cols-${columns}`;
  return <div className={clsx("grid gap-md", gridClass)}>{children}</div>;
};

export default Grid;
