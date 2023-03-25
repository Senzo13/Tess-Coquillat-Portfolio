import { useState, useEffect } from "react";
import "react-multi-carousel/lib/styles.css";
import { GetAllImagesUrl } from "../../../services/panel/portfolio/functions.getImages";
import dynamic from "next/dynamic";
import { config } from "react-spring";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function SectionCarousel() {
  const Carousel = dynamic(() => import("react-spring-3d-carousel"), {
    ssr: false,
  });

  const [state, setState] = useState({
    goToSlide: 0,
    offsetRadius: 4,
    showNavigation: true,
    config: config.gentle,
  });

  const [slides, setSlides] = useState([]);
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

  useEffect(() => {
    GetAllImagesUrl(24).then((res) => {
      if (res != undefined) {
        const latestImages = res.data.slice(-12).reverse(); // extraire les 12 derniers éléments du tableau
        latestImages.forEach(async (item) => {
          setSlides((prevState) => {
            return [
              ...prevState,
              {
                key: item.id,
                content: (
                  <div
                    style={{
                      position: "relative",
                      zIndex: -5555555555555,
                      width: "1162px",
                      height: "976px",
                    }}
                  >
                    <Image
                      src={item.imgUrl}
                      alt={seoAlt[Math.floor(Math.random() * seoAlt.length)]}
                      layout="fill"
                      objectFit="cover"
                      style={{ zIndex: -5654545454 }}
                      blurDataURL={"/assets/carroussel_header/test.jpg"}
                      placeholder="blur"
                    />
                  </div>
                ),
              },
            ];
          });
        });
      }
    });
  }, []);

  return (
    <>
      <div
        className="slider"
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          width: "100%",
          height: "976px",
        }}
      >
        <div
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Carousel
            slides={slides}
            goToSlide={state.goToSlide}
            offsetRadius={state.offsetRadius}
            showNavigation={state.showNavigation}
            animationConfig={state.config}
          />
        </div>
      </div>
    </>
  );
}
