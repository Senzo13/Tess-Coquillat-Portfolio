import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function Header() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Vérifie si la largeur de la fenêtre est inférieure à 768px (taille mobile)
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize(); // Appel initial pour définir l'état mobile/non-mobile
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getTextXPosition = (isMobile, position) => {
    return isMobile ? position.mobile : position.desktop;
  };

  return (
    <>
        
      <div className="index_header mb-[4%] sm:mb-[4%]  max-w-full relative">
      <header>
        <div className="scale-180 sm:scale-100  mt-[3.9%] sm:mt-0">
          <svg
            viewBox="0 0 1000 99"
            width="100%"
            style={{ transformBox: "view-box" }}
          >
            <image href="/assets/bandeau-menu.svg" width="100%" height="100%" />

            <Link href="#container2">
            <text
               className="cursor-pointer"
                x={getTextXPosition(isMobile, {
                  desktop: 20,
                  mobile: 240,
                })}
                y="34">
              <a
              target="_blank"
             
                fontFamily="Made Tommy LIGHT, sans-serif"
                fill="white"
                title="Contact"
              >
                CONTACT
              </a>
              </text>
            </Link>
            <Link href="/">
            <text
              className="cursor-pointer"
                x={getTextXPosition(isMobile, {
                  desktop: 780,
                  mobile: 590,
                })}
                y="34">
            <a
              target="_blank"
              
                fontFamily="Made Tommy LIGHT, sans-serif"
                fill="white"
                title="Accueil"
              >
                ACCUEIL
              </a>
              </text>
            </Link>
            <Link href="/portfolio">
            <text
              className="cursor-pointer"
                x={getTextXPosition(isMobile, {
                  desktop: 880,
                  mobile: 670,
                })}
                y="34">
            <a
              target="_blank"
              
                fontFamily="Made Tommy LIGHT, sans-serif"
                fill="white"
                title="Portfolio"
              >
                PORTFOLIO
              </a>
              </text>
            </Link>
            <Link href="/">
              <circle
                cx="501"
                cy="49"
                r="30"
                stroke-width="3"
                style={{ cursor: "pointer", opacity: 0 }}
                fill="red"
              />
            </Link>
          </svg>
        </div>
        <div className="index_parent_artistName mt-[3%] mb-[2%] sm:mt-0">
          <div className="index_resize_artistName">
            <object data="/assets/nom-prenom.svg"></object>
          </div>
        </div>
        </header>
      </div>
   
    </>
  );
}
