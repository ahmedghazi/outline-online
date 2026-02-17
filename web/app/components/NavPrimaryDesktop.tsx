"use client";
import React, { useEffect, useRef, useState } from "react";
import { LinkExternal, MenuItem } from "../types/schema";
import Buy from "./Buy";
import clsx from "clsx";
import NavLink from "./NavLink";
import CartBtn from "./shop/CartBtn";
import { _linkResolver } from "../sanity-api/utils";

type NavProps = {
  siteName: string;
  navPrimary: Array<MenuItem | LinkExternal> | undefined;
  productsCart: any;
};

const NavPrimaryDesktop = ({
  siteName,
  navPrimary,
  productsCart,
}: NavProps) => {
  const ref = useRef<HTMLElement | null>(null);

  return (
    <nav ref={ref} id='nav-primary' className={clsx("hidden-sm")}>
      <ul className='flex'>
        <li className=''>
          <NavLink href='/' label={siteName} depth={0} />{" "}
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
                `len-${item.subMenu.length}`,
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
            <CartBtn />
          </li>
        </ul>
      </ul>
    </nav>
  );
};

export default NavPrimaryDesktop;
