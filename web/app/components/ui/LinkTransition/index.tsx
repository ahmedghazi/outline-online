"use client";
import Link, { LinkProps } from "next/link";
import React, { ReactNode } from "react";
import { useTransitionRouter } from "next-view-transitions";
import { slideInOutX } from "./slideInOutX";
import { fadeInOut } from "./fadeInOut";
import "./index.scss";
// import { slideInOutV2 } from "./slideInOutV2";

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

interface LinkTransitionProps extends LinkProps {
  children: ReactNode;
  href: string;
  className?: string;
  direction?: string;
  duration?: number;
}

const LinkTransition = ({
  href,
  children,
  className = "",
  direction = "e",
  duration = 300,
  ...props
}: LinkTransitionProps) => {
  const router = useTransitionRouter();

  const _handleTransition = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();

    try {
      router.push(href, {
        onTransitionReady: () => {
          // console.log("onTransitionReady");
          fadeInOut(duration);
          // slideInOutX(direction, duration);
        },
      });
    } catch (error) {
      console.error("Transition error:", error);
      router.push(href);
    }
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
