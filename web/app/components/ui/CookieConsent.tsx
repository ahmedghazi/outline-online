"use client";
import React, { useEffect, useState } from "react";
import { hasCookie, setCookie } from "cookies-next";
import { BlockContent } from "@/app/types/schema";
import { PortableText } from "@portabletext/react";
import components from "@/app/sanity-api/portableTextComponents";
import Link from "next/link";

type Props = {
  message: BlockContent;
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
    <div className='z-50 cookie-consent flex justify-end'>
      <div className='inner '>
        <div className='flex buttons'>
          <button>
            <Link href={"/page/cookie-policy"}>Read more</Link>
          </button>
          <button className='bg-green' onClick={() => acceptCookie()}>
            Agree
          </button>
        </div>
        <div className='text'>
          <PortableText value={message} components={components} />
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
