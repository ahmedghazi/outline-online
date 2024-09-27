"use client";
import React, {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import useDeviceDetect from "../hooks/useDeviceDetect";
// import { getSettings } from "../utils/sanity-queries";

const PageContext = createContext({});

interface PageContextProps {
  // location?: object;
  children: ReactNode;
  // pageContext: object;
}

export const PageContextProvider = (props: PageContextProps) => {
  const { children } = props;
  const pathname = usePathname();
  // console.log(pathname);
  const [isInfos, setIsInfos] = useState<boolean>(false);
  const settings = {
    pathname,
  };
  const { browser } = useDeviceDetect();

  useEffect(() => {
    console.log(browser);
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
    // document.documentElement.style.setProperty("--app-height", wh + "px");

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
      // document.body.classList.remove("is-loading");
      // setTimeout(() => {}, 1000);
    }
  };

  return (
    <PageContext.Provider value={{ settings, isInfos, setIsInfos }}>
      {children}
    </PageContext.Provider>
  );
};

// export default PageContext;
// export { PageContext, PageContextProvider };

export const usePageContext = () => useContext(PageContext);
