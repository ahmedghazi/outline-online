import "./styles/tailwind.css";
import "./styles/index.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Script from "next/script";
import website from "./config/website";
import { PageContextProvider } from "./context/PageContext";
import { ShopWrapper } from "./components/shop/ShopContext";
import BuyModal from "./components/shop/BuyModal";
import { Viewport } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { PaddleProvider } from "./components/shop/Paddle/PaddleProvider";
import CartModal from "./components/shop/CartModal";
import { getProductsCart, getSettings } from "./sanity-api/sanity-queries";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity";
import { ViewTransitions } from "next-view-transitions";

export const metadata = {
  metadataBase: new URL(website.url),
  title: {
    template: `%s — ${website.title}`,
  },
  description: website.description,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  // Also supported by less commonly used
  // interactiveWidget: 'resizes-visual',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isEnabled } = await draftMode();
  const settings = await getSettings();
  const productsCart = await getProductsCart();
  // console.log(settings.buyModalNotices);
  // console.log(productsCart);
  return (
    <ViewTransitions>
      <html lang='en'>
        <body className='is-loading'>
          <div id='page'>
            <PageContextProvider settings={settings}>
              <ShopWrapper
                licenses={settings.licenseSizes}
                licenseTypes={settings.licenseTypes}
                licenseSizes={settings.licenseSizes}>
                <PaddleProvider>
                  <div className='dashes dashes--left'>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <Header settings={settings} productsCart={productsCart} />
                  <BuyModal
                    productsCart={productsCart}
                    buyModalNotices={settings.buyModalNotices}
                  />
                  <CartModal />
                  <main>{children}</main>
                  <div className='dashes dashes--right'>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <Footer settings={settings} />
                  {isEnabled && (
                    <VisualEditing
                      zIndex={1000} // Optional
                    />
                  )}
                </PaddleProvider>
              </ShopWrapper>
            </PageContextProvider>
          </div>
          <GoogleAnalytics gaId='G-57LHXDXJH4' />
        </body>
      </html>
    </ViewTransitions>
  );
}
