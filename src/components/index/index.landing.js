import Header from "./header";
import Footer from "./footer";
import React, { useEffect, useState } from "react";
import Widget from "./widget/widget";
import Formes from "./formes/formes";
import Customer from "./customer/customer";
import Devis from "./devis/devis";
import { AddVisitor } from "../../services/panel/visitor/add.visitor";
import SectionCarousel from "./carroussel/slider";
import ImageTextContainer from "../cards/ImageTextContainer";
import PortfolioImageContainer from "../cards/PortfolioImageContainer";
import PrestaContainer from "../cards/PrestaContainer";
export default function Index() {
  const seoAlt = [
    "Tess Coquilhat",
    "Designer graphique",
    "Portfolio",
    "Graphiste Marseille",
    "Meilleur graphiste 2023",
    "Meilleur graphiste",
    "Designer graphique Marseille",
    "Graphiste freelance",
    "Graphiste indépendant",
    "Graphiste",
    "Designer graphique freelance",
    "Designer graphique indépendant",
  ];

  return (
    <>
      <Widget />

      <Header />
      <>
        <div
          className="formes-design-texte-rond"
          id="rotate"
          alt={seoAlt[Math.floor(Math.random() * seoAlt.length)]}
          style={{
            position: "absolute",
            width: "40%",
            opacity: "0.4",
            top: "0%",
            left: "-25%",
            zIndex: "-999999999",
          }}
        >
          <img
            src="/assets/formes/texte-rond-2.svg"
            type="image/svg+xml"
            width="100%"
            alt={seoAlt[Math.floor(Math.random() * seoAlt.length)]}
          />
        </div>
      </>
      <SectionCarousel />

      <ImageTextContainer />

      <PortfolioImageContainer />

      <PrestaContainer />
      {/* 
      <div
        className="formes-design"
        style={{
          position: "absolute",
          width: "15%",
          marginLeft: "-0%",
          zIndex: "-999999999",
          marginTop: "-9%",
          transform: "rotate(-50deg)",
        }}
      >
        <object
          data="/assets/formes/design.svg"
          type="image/svg+xml"
          width="100%"
          style={{
            position: "absolute",
            zIndex: "-999999999",
          }}
        />
      </div> */}

      {/* <Formes /> */}

      <div>
        <Customer />

        <Devis />
        {/* <Footer /> */}
      </div>
    </>
  );
}
