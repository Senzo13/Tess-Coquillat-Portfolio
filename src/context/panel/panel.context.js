import React, { useState, createContext, useContext } from "react";

export const PanelContext = createContext();

export default function PanelProvider({ children }) {
  const objectNav = {
    nav_1: {
      text: "Profil",
      src: "https://img.icons8.com/ios/50/000000/contract-job.png",
      isSelect: true,
      element: 1,
      size: { width: "auto", height: "auto" },
    },
    nav_2: {
      text: "Portfolio",
      src: "https://img.icons8.com/ios/50/000000/portfolio--v1.png",
      isSelect: false,
      element: 1,
      // listTitle: ["Logo", "Charte graphique", "Édition"],
      size: { width: "auto", height: "auto" },
    },
    nav_3: {
      text: "Avis",
      src: "https://img.icons8.com/ios/50/000000/star--v1.png",
      isSelect: false,
      element: 1,
      size: { width: "auto", height: "auto" },
    },
    nav_4: {
      text: "Analytics",
      src: "https://img.icons8.com/ios/50/000000/web-analystics.png",
      isSelect: false,
      element: 1,
      size: { width: "100vh", height: "auto" },
    },
    nav_5: {
      text: "Paramètres",
      src: "https://img.icons8.com/ios/50/000000/settings.png",
      isSelect: false,
      element: 1,
      size: { width: "auto", height: "auto" },
    },
    nav_6: {
      text: "Déconnexion",
      src: "https://img.icons8.com/ios/50/000000/logout-rounded-up.png",
      isSelect: false,
      element: 1,
      size: { width: "350px", height: "35vh" },
    },
  };

  const [nav, setNav] = useState(objectNav);

  return (
    <PanelContext.Provider value={{ nav, setNav }}>
      {children}
    </PanelContext.Provider>
  );
}
