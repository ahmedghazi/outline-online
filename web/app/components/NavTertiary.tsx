"use client";
import React from "react";
import { usePageContext } from "../context/PageContext";
import Link from "next/link";
import { _linkResolver } from "../utils/utils";

type Props = {};

const NavTertiary = (props: Props) => {
  const { settings } = usePageContext();
  // console.log(settings);
  return (
    <nav id='nav-tertiary'>
      <ul className='grid md:grid-cols-4 gap-md'>
        {settings.navTertiary &&
          settings.navTertiary.map((item, i) => (
            <li key={i}>
              <Link
                href={_linkResolver(item.link)}
                className='button-ui button-ui--icon-arrow'>
                {item.label}
              </Link>
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default NavTertiary;
