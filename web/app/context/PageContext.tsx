"use client";
import React, { createContext, useContext, ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Settings } from "../types/schema";
import useDeviceDetect from "../hooks/useDeviceDetect";

// const PageContext = createContext({});

type ContextProps = {
  settings: Settings;
};

const PageContext = createContext<ContextProps>({} as ContextProps);

interface PageContextProps {
  children: ReactNode;
  settings: Settings;
}

export const PageContextProvider = (props: PageContextProps) => {
  const { children, settings } = props;
  const pathname = usePathname();
  const { browser } = useDeviceDetect();

  useEffect(() => {
    // console.log(browser);
    _format();
    _handlePageTemplate();
    window.addEventListener("resize", _format);

    return () => {
      window.removeEventListener("resize", _format);
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.add(`is-${browser}`);
  }, [browser]);

  useEffect(() => {
    _handlePageTemplate();
    document.body.classList.remove("has-scrolled");
  }, [pathname]);

  const _format = () => {
    // const wh = window.innerHeight;

    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);

    let vw = window.innerWidth * 0.01;
    document.documentElement.style.setProperty("--vw", `${vw}px`);

    const header = document.querySelector("header");
    let headerBounding = { height: 50 };
    if (header) {
      headerBounding = header.getBoundingClientRect();

      document.documentElement.style.setProperty(
        "--header-height",
        headerBounding.height + "px"
      );
    }
    const footer = document.querySelector("footer");
    let footerBoundig = { height: 50 };
    if (footer) {
      footerBoundig = footer.getBoundingClientRect();

      document.documentElement.style.setProperty(
        "--footer-height",
        footerBoundig.height + "px"
      );
    }
  };

  const _handlePageTemplate = () => {
    const mainDiv: HTMLElement = document.querySelector(
      "main [data-template]"
    ) as HTMLElement;
    // console.log(mainDiv);
    if (mainDiv) {
      const template = mainDiv.dataset.template;
      // console.log(template);

      document.body.dataset.template = `is-${template}`;
    }
  };

  return (
    <PageContext.Provider value={{ settings }}>{children}</PageContext.Provider>
  );
};

export const usePageContext = () => useContext(PageContext);
