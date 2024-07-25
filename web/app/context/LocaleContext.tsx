"use client";
import React, { createContext, useContext, ReactNode } from "react";
import { useState } from "react";

// const LocaleContext = createContext({});

interface LocaleContextProps {
  // location?: object;
  children: ReactNode;
  // pageContext: object;
}

type ContextProps = {
  locale: string;
  dispatch: Function;
};

const LocaleContext = createContext<ContextProps>({} as ContextProps);
// const LocaleContext = createContext({});

export const LocaleContextProvider = ({ children }: LocaleContextProps) => {
  const [locale, dispatch] = useState<string>("en");

  //detect user lang
  // useEffect(() => {
  //   const userLang = _detectUserLang()
  //   // console.log("userLang:", userLang);
  //   if (userLang === 'es') {
  //     dispatch(userLang)
  //   } else {
  //     dispatch('en')
  //   }
  // }, [])

  // const _detectUserLang = () => {
  //   const userLang = navigator.language || navigator.userLanguage
  //   return userLang.toLowerCase()
  // }

  return (
    <LocaleContext.Provider value={{ locale, dispatch }}>
      {children}
    </LocaleContext.Provider>
  );
};

export default function useLocale() {
  return useContext(LocaleContext);
}
