import React from "react";
import website from "../config/website";
import Cart from "./shop/Cart";
import Clock from "./ui/Clock";
import { Product, Settings } from "../types/schema";
import { _linkResolver } from "../utils/utils";
import Link from "next/link";
import ScreenTime from "./ui/ScreenTime";
import Buy from "./Buy";

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
          <div className='item'>Location: Switzerland (CH)</div>
          <div className='item'>
            <Clock />
          </div>
          <div className='item'>
            <ScreenTime />
          </div>
        </div>
      </div>
      <nav id='nav-primary'>
        <ul className='flex'>
          {settings.navPrimary?.map((item, i) => (
            <li key={i}>
              <Link href={_linkResolver(item.link)}>{item.label}</Link>
            </li>
          ))}

          <li>
            <Buy productsCart={productsCart} />
          </li>
          <li className=''>
            <Cart />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
