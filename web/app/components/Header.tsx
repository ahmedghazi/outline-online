"use client";
import React, { useEffect, useState } from "react";
import Clock from "./ui/Clock";
import { Product, Settings } from "../types/schema";
import { _linkResolver } from "../utils/utils";
import ScreenTime from "./ui/ScreenTime";
import NavPrimaryDesktop from "./NavPrimaryDesktop";
import NavPrimaryMobile from "./NavPrimaryMobile";
import { subscribe, unsubscribe } from "pubsub-js";
import { usePathname } from "next/navigation";
import { useScrollDirection } from "../hooks/useScrollDirection";
import { usePageContext } from "../context/PageContext";
import clsx from "clsx";

type Props = {
  settings: Settings;
  productsCart: Product[];
};

const Header = ({ settings, productsCart }: Props) => {
  // console.log(settings);
  const [isProduct, setIsProduct] = useState<boolean>(false);
  const pathname = usePathname();
  const { scrollDirection } = useScrollDirection();
  const { tab } = usePageContext();

  const [isHome, setIsHome] = useState<boolean>(false);
  const [headerCentered, setHeaderCentered] = useState<boolean>(false);

  useEffect(() => {
    setIsHome(pathname === "/");
  }, [pathname]);

  useEffect(() => {
    if (!isHome) return;
    setHeaderCentered(true);

    const events = ["click", "scroll", "wheel"];
    events.forEach((event) => {
      window.addEventListener(event, _handleAnyInteraction);
    });

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, _handleAnyInteraction);
      });
    };
  }, [isHome]);

  const _handleAnyInteraction = () => {
    setHeaderCentered(false);
  };

  useEffect(() => {
    const token = subscribe("IS_PRODUCT", (e, d) => {
      setIsProduct(d);
    });

    return () => {
      unsubscribe(token);
    };
  }, []);

  useEffect(() => {
    setIsProduct(false);
    if (pathname === "/") {
      document.body.addEventListener("scroll", _handleScroll);
    }
    if (pathname.indexOf("product") > -1) {
      setIsProduct(true);
    }

    return () => {
      document.body.removeEventListener("scroll", _handleScroll);
    };
  }, [pathname, scrollDirection]);

  useEffect(() => {
    document.body.classList.toggle("is-product", isProduct);
  }, [isProduct]);

  useEffect(() => {
    const { active } = tab;
    document.body.classList.toggle("has-scrolled", active);
    window.scroll(0, 1);
  }, [tab]);

  const _handleScroll = () => {
    let hasScrolled = document.body.scrollTop > 10;
    if (
      scrollDirection === "down" &&
      document.body.scrollTop < window.innerHeight
    )
      hasScrolled = false;
    document.body.classList.toggle("has-scrolled", hasScrolled);
  };

  return (
    <header id='main-header' className={clsx(headerCentered && "is-centered")}>
      <div className='sup-header'>
        <div className='flex justify-between'>
          <div className='item'>Metadata</div>
          <div className='item hidden-sm'>Operation: Switzerland (CH)</div>
          <div className='item hidden-sm'>
            <Clock />
          </div>
          <div className='item hidden-sm'>
            Global: UTC+1, EST+5, CST+6, PST+8
          </div>
          <div className='item'>
            <ScreenTime />
          </div>
        </div>
      </div>
      <NavPrimaryDesktop
        navPrimary={settings.navPrimary}
        productsCart={productsCart}
      />
      <NavPrimaryMobile
        navPrimary={settings.navPrimary}
        productsCart={productsCart}
      />
    </header>
  );
};

export default Header;
