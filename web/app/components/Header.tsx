import React from "react";
import website from "../config/website";
import Cart from "./shop/Cart";
import Clock from "./ui/Clock";
import { Product, Settings } from "../types/schema";
import { _linkResolver } from "../utils/utils";
import Link from "next/link";
import ScreenTime from "./ui/ScreenTime";
import Buy from "./Buy";
import NavPrimary from "./NavPrimary";

type Props = {
  settings: Settings;
  productsCart: Product[];
};

const Header = ({ settings, productsCart }: Props) => {
  // console.log(settings);
  return (
    <header>
      <div className='sup-header'>
        <div className='flex justify-between'>
          <div className='item'>Metadata</div>
          <div className='item'>Operation: Switzerland (CH)</div>
          <div className='item'>
            <Clock />
          </div>
          <div className='item'>Global: UTC+1, EST+5, CST+6, PST+8</div>
          <div className='item'>
            <ScreenTime />
          </div>
        </div>
      </div>
      <NavPrimary
        navPrimary={settings.navPrimary}
        productsCart={productsCart}
      />
    </header>
  );
};

export default Header;
