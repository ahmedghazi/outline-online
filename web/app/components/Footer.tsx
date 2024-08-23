import React from "react";
import { Settings } from "../types/schema";
import CookieWrapper from "./ui/CookieWrapper";

type Props = {
  settings: Settings;
};

const Footer = ({ settings }: Props) => {
  return (
    <footer id='site-footer'>
      <CookieWrapper settings={settings} />
      <nav id='nav-sacondary'>
        <ul>
          {settings.navSecondary &&
            settings.navSecondary?.map((item, i) => (
              <li key={i}>
                {item._type === "linkExternal" && (
                  <a href={item.link} target='_blank' rel='noopener noreferrer'>
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          <li>Newsletter</li>
          <li>©{new Date().getFullYear()} Copyright</li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
