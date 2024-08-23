"use client";
import React, { useEffect, useState } from "react";
import { hasCookie, setCookie } from "cookies-next";
import { BlockContent, LocaleBlockContent } from "@/app/types/schema";
import { PortableText } from "@portabletext/react";
import components from "@/app/utils/portableTextComponents";
import { _localizeField, _localizeText } from "@/app/utils/utils";

type Props = {
  message: LocaleBlockContent;
};

const CookieConsent = ({ message }: Props) => {
  const [showConsent, setShowConsent] = useState<boolean>(true);

  useEffect(() => {
    setShowConsent(hasCookie("localConsent"));
  }, []);

  const acceptCookie = () => {
    setShowConsent(true);
    setCookie("localConsent", "true", {});
  };

  if (showConsent) {
    return null;
  }

  return (
    <div className='cartouche cartouche--box z-50 cookie-consent'>
      <div className='inner flex flex-col place-items-end justify-end w-full'>
        <PortableText value={message} components={components} />
        <button
          className=' py-2 px-8  underline- uppercase cartouche cartouche--gray'
          onClick={() => acceptCookie()}>
          {_localizeText("accept")}
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
