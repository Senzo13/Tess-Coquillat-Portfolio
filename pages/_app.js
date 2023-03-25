import "bootstrap/dist/css/bootstrap.css";
import "../styles/global/global.css";
import "../styles/slider/swiper.css";
import "../global.css";
import PanelProvider from "../src/context/panel/panel.context";
import Head from "next/head";
import { useEffect } from "react";
import AuthProvider from "../src/context/auth/auth.context";
import { config } from "@fortawesome/fontawesome-svg-core";
import "../node_modules/@fortawesome/fontawesome-svg-core/styles.css";
import { initGA, logPageView } from "../ga";
import CookieConsent from "../src/components/cookie/cookieConsent";

config.autoAddCss = false;

// config.autoAddCss = false;

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
    initGA("G-9S8FYX660V");
    logPageView();
  }, []);

  return (
    <>
      <AuthProvider>
        <PanelProvider>
          <Head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link
              href="https://fonts.googleapis.com/css2?family=Raleway:wght@300&family=Roboto:ital,wght@1,300&display=swap"
              rel="stylesheet"
            />

            <link
              href="https://fonts.googleapis.com/css2?family=Comforter+Brush&family=Nanum+Brush+Script&family=Roboto:wght@100&family=Water+Brush&display=swap"
              rel="stylesheet"
            />
            <link
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.css"
              integrity="sha512-UTNP5BXLIptsaj5WdKFrkFov94lDx+eBvbKyoe1YAfjeRPC+gT5kyZ10kOHCfNZqEui1sxmqvodNUx3KbuYI/A=="
              crossorigin="anonymous"
              referrerpolicy="no-referrer"
            />
            <link
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.theme.default.css"
              integrity="sha512-OTcub78R3msOCtY3Tc6FzeDJ8N9qvQn1Ph49ou13xgA9VsH9+LRxoFU6EqLhW4+PKRfU+/HReXmSZXHEkpYoOA=="
              crossorigin="anonymous"
              referrerpolicy="no-referrer"
            />

            {/* <script src="https://codepen.io/shshaw/pen/QmZYMG.js"></script> */}
          </Head>
          <CookieConsent />
          <Component {...pageProps} />
        </PanelProvider>
      </AuthProvider>
    </>
  );
}

export default MyApp;
