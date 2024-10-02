import "./styles/tailwind.css";
import "./styles/index.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";
import website from "./config/website";
import { getProductsCart, getSettings } from "./utils/sanity-queries";
import { PageContextProvider } from "./context/PageContext";
import Script from "next/script";
import { ShopWrapper } from "./components/shop/ShopContext";
import BuyModal from "./components/shop/BuyModal";
import Loading3dots from "./components/Loading3dots";

export const metadata = {
  metadataBase: new URL(website.url),
  title: {
    template: `%s — ${website.title}`,
  },
  description: website.description,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();
  const productsCart = await getProductsCart();

  return (
    <html lang='en'>
      <meta
        name='viewport'
        content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
      />
      <Script id='snipcart-sources'>{`
        window.SnipcartSettings = {
          publicApiKey: '${process.env.NEXT_PUBLIC_SNIPCART_API_KEY}',
          loadStrategy: "on-user-interaction",
          version: "3.5.0",
          templatesUrl: '/snipcart-templates.html'
          // modalStyle: "side",
        };
        (function(){var c,d;(d=(c=window.SnipcartSettings).version)!=null||(c.version="3.0");var s,S;(S=(s=window.SnipcartSettings).timeoutDuration)!=null||(s.timeoutDuration=2750);var l,p;(p=(l=window.SnipcartSettings).domain)!=null||(l.domain="cdn.snipcart.com");var w,u;(u=(w=window.SnipcartSettings).protocol)!=null||(w.protocol="https");var m,g;(g=(m=window.SnipcartSettings).loadCSS)!=null||(m.loadCSS=!0);var y=window.SnipcartSettings.version.includes("v3.0.0-ci")||window.SnipcartSettings.version!="3.0"&&window.SnipcartSettings.version.localeCompare("3.4.0",void 0,{numeric:!0,sensitivity:"base"})===-1,f=["focus","mouseover","touchmove","scroll","keydown"];window.LoadSnipcart=o;document.readyState==="loading"?document.addEventListener("DOMContentLoaded",r):r();function r(){window.SnipcartSettings.loadStrategy?window.SnipcartSettings.loadStrategy==="on-user-interaction"&&(f.forEach(function(t){return document.addEventListener(t,o)}),setTimeout(o,window.SnipcartSettings.timeoutDuration)):o()}var a=!1;function o(){if(a)return;a=!0;let t=document.getElementsByTagName("head")[0],n=document.querySelector("#snipcart"),i=document.querySelector('src[src^="'.concat(window.SnipcartSettings.protocol,"://").concat(window.SnipcartSettings.domain,'"][src$="snipcart.js"]')),e=document.querySelector('link[href^="'.concat(window.SnipcartSettings.protocol,"://").concat(window.SnipcartSettings.domain,'"][href$="snipcart.css"]'));n||(n=document.createElement("div"),n.id="snipcart",n.setAttribute("hidden","true"),document.body.appendChild(n)),h(n),i||(i=document.createElement("script"),i.src="".concat(window.SnipcartSettings.protocol,"://").concat(window.SnipcartSettings.domain,"/themes/v").concat(window.SnipcartSettings.version,"/default/snipcart.js"),i.async=!0,t.appendChild(i)),!e&&window.SnipcartSettings.loadCSS&&(e=document.createElement("link"),e.rel="stylesheet",e.type="text/css",e.href="".concat(window.SnipcartSettings.protocol,"://").concat(window.SnipcartSettings.domain,"/themes/v").concat(window.SnipcartSettings.version,"/default/snipcart.css"),t.prepend(e)),f.forEach(function(v){return document.removeEventListener(v,o)})}function h(t){!y||(t.dataset.apiKey=window.SnipcartSettings.publicApiKey,window.SnipcartSettings.addProductBehavior&&(t.dataset.configAddProductBehavior=window.SnipcartSettings.addProductBehavior),window.SnipcartSettings.modalStyle&&(t.dataset.configModalStyle=window.SnipcartSettings.modalStyle),window.SnipcartSettings.currency&&(t.dataset.currency=window.SnipcartSettings.currency),window.SnipcartSettings.templatesUrl&&(t.dataset.templatesUrl=window.SnipcartSettings.templatesUrl))}})();
      `}</Script>
      <body className='is-loading snipcart-overwrite is-landing'>
        <div id='page'>
          <PageContextProvider>
            <ShopWrapper licenses={settings.licenseSizes}>
              <div className='dashes dashes--left'>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
              <Header settings={settings} productsCart={productsCart} />
              {/* <BuyModal productsCart={productsCart} /> */}
              {/* <main>{children}</main> */}
              <main>
                <Loading3dots />
              </main>
              <div className='dashes dashes--right'>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
              <Footer settings={settings} />
            </ShopWrapper>
          </PageContextProvider>
        </div>
      </body>
    </html>
  );
}
