"use client";
import React, {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import { Settings } from "../types/schema";
import useDeviceDetect from "../hooks/useDeviceDetect";
import { subscribe, unsubscribe } from "pubsub-js";

// const PageContext = createContext({});

const defaultTab = {
  name: "",
  active: false,
};
type TabProps = {
  name: string;
  active: boolean;
};
type ContextProps = {
  settings: Settings;
  tab: TabProps;
  setTab: Function;
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
  const [tab, setTab] = useState<TabProps>(defaultTab);

  useEffect(() => {
    // console.log(browser);
    _format();
    _handlePageTemplate();
    window.addEventListener("resize", _format);

    const token = subscribe("HEADER_TAB_CHANGE", (e, d) => {
      if (pathname === "/") {
        document.body.classList.toggle("has-scrolled", d.active);
      } else {
        document.body.classList.remove("has-scrolled");
      }
    });

    return () => {
      window.removeEventListener("resize", _format);
      unsubscribe(token);
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.add(`is-${browser}`);
  }, [browser]);

  useEffect(() => {
    _handlePageTemplate();
    document.body.classList.remove("has-scrolled");

    setTab({
      name: "",
      active: false,
    });
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
  console.log(pathname);
  console.log(tab);
  return (
    <PageContext.Provider value={{ settings, tab, setTab }}>
      {children}
    </PageContext.Provider>
  );
};

export const usePageContext = () => useContext(PageContext);
