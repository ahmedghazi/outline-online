import React from "react";
import { Settings } from "../types/schema";
import CookieWrapper from "./ui/CookieWrapper";
import MailchimpDialog from "./ui/MailchimpDialog";

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
              <li key={i} className='hidden-sm'>
                {item._type === "linkExternal" && (
                  <a href={item.link} target='_blank' rel='noopener noreferrer'>
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          <li>
            <MailchimpDialog
              action='https://outline-online.us14.list-manage.com/subscribe/post?u=deed79621dad3f2cd97ac8f9e&amp;id=669ce7f7f2&amp;f_id=009fc2e1f0'
              fields={[
                {
                  name: "EMAIL",
                  placeholder: "E-mail",
                  type: "email",
                  required: true,
                },
                {
                  name: "NAME",
                  placeholder: "Name",
                  type: "text",
                  required: true,
                },
              ]}
            />
          </li>
          <li>©{new Date().getFullYear()} Copyright</li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
