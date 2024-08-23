import React from "react";
import CookieConsent from "./CookieConsent";
import { getSettings } from "@/app/utils/sanity-queries";
// import { _localizeField } from "@/app/utils/utils";

const CookieWrapper = (props: any) => {
  // const settings = await getSettings();
  // console.log(settings);
  return (
    <div>
      {props.settings.messageCookie && props.settings.messageCookie.en && (
        <CookieConsent message={props.settings.messageCookie} />
      )}
    </div>
  );
};

export default CookieWrapper;
