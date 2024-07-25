"use client";
import i18n from "@/app/config/i18n";
import useLocale from "@/app/context/LocaleContext";
import clsx from "clsx";
import React from "react";
// import useLocale from '../../contexts/LocaleWrapper'
// import { _localizeText } from '../../core/utils'
// const locales = require('../../../config/i18n')

const LocalesSwitcher = ({ buttonSize = "regular" }) => {
  const { locale, dispatch } = useLocale();

  return (
    <div className='locale-switcher '>
      <ul className='flex'>
        {Object.values(i18n).map((item, i) => (
          <li
            key={`locale-${i.toString()}`}
            // className={i < Object.values(i18n).length - 1 ? 'mr-1' : ''}
            className={clsx(locale === item.locale ? "is-current" : "")}>
            <button
              onClick={() => dispatch(item.locale)}
              className={clsx(
                `btn btn--${buttonSize}`
                // locale === item.locale ? "is-active" : ""
              )}>
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LocalesSwitcher;
