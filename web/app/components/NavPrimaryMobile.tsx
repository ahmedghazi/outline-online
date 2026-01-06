"use client";
import React, { useEffect, useRef } from "react";
import { LinkExternal, MenuItem } from "../types/schema";
import { _linkResolver } from "../utils-old/utils";
import Buy from "./Buy";
import { usePathname } from "next/navigation";
import { publish } from "pubsub-js";
import clsx from "clsx";
import NavLink from "./NavLink";
import CartBtn from "./shop/CartBtn";

type NavProps = {
  siteName: string;
  navPrimary: Array<MenuItem | LinkExternal> | undefined;
  productsCart: any;
};
const NavPrimaryMobile = ({ siteName, navPrimary, productsCart }: NavProps) => {
  const ref = useRef<HTMLElement | null>(null);
  const pathname = usePathname();
  useEffect(() => {
    if (window.innerWidth > 1080) return;

    const itemsWithChildren = ref.current?.querySelectorAll(".has-children");
    if (itemsWithChildren) {
      itemsWithChildren.forEach((el) => {
        el.addEventListener("click", _toggleSubmenu);
      });
    }

    return () => {
      if (itemsWithChildren) {
        itemsWithChildren.forEach((el) => {
          el.removeEventListener("click", _toggleSubmenu);
        });
      }
    };
  }, []);

  useEffect(() => {
    const submenus = document.querySelectorAll(".submenu");
    submenus.forEach((el) => {
      el.classList.remove("is-active");
    });
  }, [pathname]);

  const _toggleSubmenu = (evt: Event) => {
    evt.preventDefault();
    const element = evt.target as HTMLElement;
    // const submenu = element.nextSibling as HTMLElement;
    const submenu = element.querySelector(".submenu");
    submenu?.classList.toggle("is-active");
    publish("FORMAT");
  };

  return (
    <nav ref={ref} id='nav-primary' className='sm-only'>
      <ul className='flex flex-wrap !justify-between '>
        <li className='flex-2- nav-item--home'>
          <NavLink href='/' label={siteName} depth={0} />
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
                "has-children"
            )}>
            {item && item._type === "menuItem" && (
              <>
                {item.link && (
                  <NavLink
                    href={_linkResolver(item.link.link)}
                    label={item.link.label || ""}
                    depth={0}
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

        <li className='flex-2 nav-shop'>
          <ul className='flex'>
            <li className='menu-item--buy'>
              <Buy productsCart={productsCart} />
            </li>
            <li className='menu-item--cart'>
              <CartBtn />
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default NavPrimaryMobile;
