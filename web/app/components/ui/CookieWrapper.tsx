import React from "react";
import CookieConsent from "./CookieConsent";
import { getSettings } from "@/app/utils/sanity-queries";
// import { _localizeField } from "@/app/utils/utils";

const CookieWrapper = (props: any) => {
  // const settings = await getSettings();
  // console.log(settings);
  return (
    <>
      {props.settings.messageCookie && (
        <CookieConsent message={props.settings.messageCookie} />
      )}
    </>
  );
};

export default CookieWrapper;
