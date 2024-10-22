"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  LinkExternal,
  LinkInternal,
  MenuItem,
  SanityKeyed,
} from "../types/schema";
import Link from "next/link";
import { _linkResolver } from "../utils/utils";
import Buy from "./Buy";
import Cart from "./shop/Cart";
import { usePathname, useRouter } from "next/navigation";
import { subscribe, unsubscribe } from "pubsub-js";
import clsx from "clsx";
import NavLink from "./NavLink";

// type NavLinkProps = {
//   input: LinkInternal | LinkExternal;
//   depth: number;
// };

// const NavLink = ({ input, depth }: NavLinkProps) => {
//   const pathname = usePathname();

//   const href = _linkResolver(input.link);
//   const ariaCurrent = href === pathname ? "page" : undefined;
//   return (
//     <Link href={href} aria-current={ariaCurrent} className={`depth-${depth}`}>
//       {input.label}
//     </Link>
//   );
// };

type NavProps = {
  navPrimary: Array<MenuItem | LinkExternal> | undefined;
  productsCart: any;
};

const NavPrimaryDesktop = ({ navPrimary, productsCart }: NavProps) => {
  // const [y, setY] = useState<number | string | null>(null);
  const ref = useRef<HTMLElement | null>(null);
  // const pathname = usePathname();
  // const [isProduct, setIsProduct] = useState<boolean>(false);

  // useEffect(() => {
  //   if (window.innerWidth < 1080) return;

  //   const token = subscribe("IS_PRODUCT", (e, d) => {
  //     setIsProduct(d);
  //   });

  //   return () => {
  //     unsubscribe(token);
  //   };
  // }, []);

  // useEffect(() => {
  //   if (window.innerWidth < 1080) return;

  //   setIsProduct(false);
  //   if (pathname === "/") {
  //     document.body.addEventListener("scroll", _handleScroll);
  //   }
  //   if (pathname.indexOf("product") > -1) {
  //     setIsProduct(true);
  //   }

  //   return () => {
  //     document.body.removeEventListener("scroll", _handleScroll);
  //   };
  // }, [pathname]);

  // useEffect(() => {
  //   document.body.classList.toggle("is-product", isProduct);
  // }, [isProduct]);

  // const _handleScroll = () => {
  //   document.body.classList.toggle(
  //     "has-scrolled",
  //     document.body.scrollTop > 10
  //   );
  // };

  return (
    <nav ref={ref} id='nav-primary' className='hidden-sm'>
      <ul className='flex'>
        <li className=''>
          <NavLink href='/' label='Outline Online' depth={0} />{" "}
        </li>

        {navPrimary?.map((item, i) => (
          <li
            key={i}
            className={clsx(
              (item &&
                item._type === "menuItem" &&
                `menu-item--${item.link?.label?.toLowerCase()}`) ||
                "",
              item &&
                item._type === "menuItem" &&
                item.subMenu &&
                "has-children",
              item &&
                item._type === "menuItem" &&
                item.subMenu &&
                `len-${item.subMenu.length}`
            )}>
            {item && item._type === "menuItem" && (
              <>
                {item.link && (
                  <NavLink
                    href={_linkResolver(item.link.link)}
                    label={item.link.label || ""}
                    depth={0}
                    // input={item.link}
                  />
                )}
                {item.subMenu && item.subMenu?.length > 0 && (
                  <ul className='submenu'>
                    {item.subMenu?.length > 0 &&
                      item.subMenu.map((subItem, j) => (
                        <li
                          key={j}
                          className={
                            item.subMenu &&
                            j === Math.round(item.subMenu?.length / 2) - 1
                              ? "is-half"
                              : ""
                          }>
                          <NavLink
                            // input={subItem}
                            href={_linkResolver(subItem.link)}
                            label={subItem.label || ""}
                            depth={1}
                          />
                        </li>
                      ))}
                  </ul>
                )}
              </>
            )}
          </li>
        ))}

        <ul className='actions flex'>
          <li className='menu-item--buy'>
            <Buy productsCart={productsCart} />
          </li>
          <li className='menu-item--cart'>
            <Cart />
          </li>
        </ul>
      </ul>
    </nav>
  );
};

export default NavPrimaryDesktop;
