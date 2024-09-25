import { useState, useEffect } from "react";

export default function useDeviceDetect() {
  const [isMobile, setMobile] = useState<boolean>(false);
  const [browser, setBrowser] = useState<string | undefined>("");

  useEffect(() => {
    const browser = _getBrowser();
    setBrowser(browser);

    _detectMobile();
    window.addEventListener("resize", _detectMobile);

    return () => window.removeEventListener("resize", _detectMobile);
  }, [setMobile, setBrowser]);

  useEffect(() => {
    if (browser) document.documentElement.classList.add(`is-${browser}`);
  }, [browser]);

  const _detectMobile = () => {
    const userAgent =
      typeof window.navigator === "undefined"
        ? ""
        : navigator.userAgent.toLowerCase();
    // console.log(userAgent);
    const mobileUA = Boolean(
      userAgent.match(
        /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
      )
    );
    const isSmallDevice = window.innerWidth <= 1080;
    setMobile(isSmallDevice ? true : mobileUA);
  };

  const _getBrowser = () => {
    let userAgent = navigator.userAgent;
    let browser;
    console.log(userAgent);
    // Detect Chrome
    if (/Chrome/.test(userAgent) && !/Chromium/.test(userAgent)) {
      browser = "chrome";
    }
    // Detect Chromium-based Edge
    else if (/Edg/.test(userAgent)) {
      browser = "mse";
    }
    // Detect Firefox
    else if (/Firefox/.test(userAgent)) {
      browser = "ff";
    }
    // Detect Safari
    else if (/Safari/.test(userAgent)) {
      browser = "safari";
    }
    // Detect Internet Explorer
    else if (/Trident/.test(userAgent)) {
      browser = "ie";
    }
    // console.log(browser);
    return browser;
  };
  // console.log(isMobile)
  return { isMobile, browser };
}
