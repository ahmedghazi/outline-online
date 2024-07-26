"use client";
import React, { useEffect, useRef, useState } from "react";
import { LinkExternal, LinkInternal } from "../types/schema";
import Link from "next/link";
import { _linkResolver } from "../utils/utils";
import Buy from "./Buy";
import Cart from "./shop/Cart";
import { usePathname } from "next/navigation";

type Props = {
  navPrimary: Array<LinkInternal | LinkExternal> | undefined;
  productsCart: any;
};

const NavPrimary = ({ navPrimary, productsCart }: Props) => {
  const [y, setY] = useState<number | string | null>(null);
  const ref = useRef<HTMLElement | null>(null);
  const pathname = usePathname();
  useEffect(() => {
    console.log(pathname);
    if (pathname === "/") {
      document.body.addEventListener("scroll", _handleScroll);
    }

    return () => {
      document.body.removeEventListener("scroll", _handleScroll);
    };
  }, [pathname]);

  const _handleScroll = () => {
    // console.log(document.body.scrollTop);
    document.body.classList.toggle("has-scrolled", document.body.scrollTop > 0);
  };

  // useEffect(() => {
  //   if (!ref.current) return;
  //   if (pathname === "/") {
  //     // const initialY = window.getComputedStyle(ref.current).transform;
  //     const initialY =
  //       "calc(var(--vh) * 50 - var(--header-height) / 2 - 0.5em)";
  //     setY(initialY);
  //     console.log(initialY);
  //     _handleNavAnimation();
  //   }
  // }, []);

  const _handleNavAnimation = () => {
    // console.log(document.body.scrollTop);
    // setY(500);
  };

  return (
    <nav
      ref={ref}
      id='nav-primary'
      style={
        {
          // transform: y !== null ? `translateY(${y}px)` : "",
        }
      }>
      <ul className='flex'>
        {navPrimary?.map((item, i) => (
          <li key={i}>
            {item && <Link href={_linkResolver(item.link)}>{item.label}</Link>}
          </li>
        ))}

        <li>
          <Buy productsCart={productsCart} />
        </li>
        <li className=''>
          <Cart />
        </li>
      </ul>
    </nav>
  );
};

export default NavPrimary;
