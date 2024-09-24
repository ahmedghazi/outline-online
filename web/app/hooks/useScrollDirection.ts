import { useState, useEffect, useRef } from "react";

export function useScrollDirection() {
  // const [lastScrollTop, setLastScrollTop] = useState(0)

  const [scrollY, setScrollY] = useState<number>(0);
  const [scrollDirection, setScrollDirection] = useState<string>("");
  const scrollParentRef = useRef<HTMLElement>(null);
  const lastScrollTopRef = useRef<number>(0);
  const lastScrollTop: number = lastScrollTopRef.current;

  function getScrollingElement() {
    var d = document;
    return d.documentElement.scrollHeight > d.body.scrollHeight &&
      d.compatMode.indexOf("CSS1") == 0
      ? d.documentElement
      : d.body;
  }

  const listener = (e: Event) => {
    const scrollParent: Element = getScrollingElement();
    setScrollY(scrollParent.scrollTop);

    setScrollDirection(lastScrollTop > scrollParent.scrollTop ? "down" : "up");
    // lastScrollTopRef.current = -bodyOffset.top
    // console.log(scrollParent.scrollTop, lastScrollTop);

    lastScrollTopRef.current = scrollParent.scrollTop;
  };

  useEffect(() => {
    const scrollParent = getScrollingElement();

    scrollParent.addEventListener("scroll", listener);
    return () => {
      scrollParent.removeEventListener("scroll", listener);
    };
  });

  return {
    scrollY,
    scrollDirection,
  };
}
