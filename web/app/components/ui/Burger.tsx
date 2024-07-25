"use client";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { publish, subscribe, unsubscribe } from "pubsub-js";
import React, { useEffect, useState } from "react";

type Props = {};

const Burger = (props: Props) => {
  const [active, setActive] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    const tokenA = subscribe("BURGER.CLOSE", (e, d) => {
      console.log(e);
      setActive(false);
    });

    return () => {
      unsubscribe(tokenA);
    };
  }, []);

  useEffect(() => {
    publish("BURGER", active);
  }, [active]);

  useEffect(() => {
    setActive(false);
  }, [pathname]);

  const _onClick = (e: React.MouseEvent) => {
    setActive(!active);
  };

  return (
    <div
      className={clsx("burger-wrapper sm-only ", active ? "is-active" : "")}
      onClick={_onClick}
      // onKeyDown={_onClick}
      role='button'
      tabIndex={0}>
      <div className='burger'>
        <i></i>
      </div>
    </div>
  );
};

export default Burger;
