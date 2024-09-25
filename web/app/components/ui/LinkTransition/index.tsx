"use client";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import React, { ReactNode } from "react";
import "./index.scss";

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

interface LinkTransitionProps extends LinkProps {
  children: ReactNode;
  href: string;
  className: string;
}

const LinkTransition = ({
  href,
  children,
  className,
  ...props
}: LinkTransitionProps) => {
  const router = useRouter();

  const _handleTransition = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();

    const main = document.querySelector("main");
    // TO DO
    // run anime out
    main?.classList.add("page-transition");
    // sleep
    await sleep(500);
    router.push(href);
    await sleep(500);

    // run anime in
    main?.classList.remove("page-transition");
  };
  return (
    <Link
      onClick={_handleTransition}
      href={href}
      className={className}
      {...props}>
      {children}
    </Link>
  );
};

export default LinkTransition;
