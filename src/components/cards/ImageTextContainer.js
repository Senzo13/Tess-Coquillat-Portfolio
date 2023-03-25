import React, { useState, useEffect, useRef } from "react";

const ImageTextContainer = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const reduceButtonRef = useRef(null);

  const handleExpand = () => {
    if (!expanded) {
      window.scrollBy(0, 200);
    }
    setExpanded(!expanded);
    // reduceButtonRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex w-[100%] mt-[5%] items-center justify-center">
      <div className="flex w-[96%] h-auto items-center p-14 rounded-[3vw] justify-center bg-[#FF7BAC]">
        <div className="responsivetext flex flex-col w-[95%] xl:flex-row h-auto items-center justify-center ">
          <div className="flex items-center justify-center w-full mr-8" title="graphiste marseille tess coquilhat">
            <img
              src="assets/container/tess.png"
              alt="graphiste marseille tess coquilhat"
              style={{ width: "90%" }}
              className="w-full object-cover mb-12"
            />
          </div>
          <div className="w-full ">
            <p
              className="text-adjust font-light text-white mb-4"
              style={{
                fontFamily: "MADE Tommy Light",
                fontSize: "1.3vw",
              }}
            >
              Je suis Tess, une Designer Graphique freelance expérimentée et
              passionnée, basée sur Marseille.
            </p>
            {isMobile && (
              <>
                <div
                  className={`${expanded ? "h-auto" : "h-16 overflow-hidden"}`}
                >
                  <p
                    className="text-adjust font-light text-white mb-4"
                    style={{
                      fontFamily: "MADE Tommy Light, sans-serif",
                      fontSize: "1.3vw",
                    }}
                  >
                    Diplômée d&apos;un Master en Design de Communication
                    Graphique et Digitale, j&apos;ai une solide expérience en
                    tant que designer pour des entreprises de différents
                    secteurs.
                  </p>
                  <p
                    className=" text-adjust font-light text-white	mb-4  "
                    style={{
                      fontFamily: "MADE Tommy Light, sans-serif",
                      fontSize: "1.3vw",
                    }}
                  >
                    Je suis convaincue que mon expérience et ma passion pour le
                    design me permettent de comprendre parfaitement vos besoins
                    et de vous proposer des solutions créatives, uniques et
                    adaptées à votre entreprise en France ou à l&apos;étranger.
                  </p>
                  <p
                    className="text-adjust font-light text-white mb-4 "
                    style={{
                      fontFamily: "MADE Tommy Light, sans-serif",
                      fontSize: "1.3vw",
                    }}
                  >
                    Je me tiens à votre disposition pour discuter de votre
                    projet.
                  </p>
                </div>
                <button
                  className="block mx-auto mt-4 px-4 py-2 text-white font-medium transition-all duration-300 ease-out transform-gpu border border-blue-500 rounded-full hover:bg-[#3fa9f5] hover:text-white hover:scale-105"
                  id="VoirPlus"
                  onClick={() => handleExpand()}
                >
                  {expanded ? "Réduire" : "Voir plus"}
                </button>
              </>
            )}
            {!isMobile && (
              <>
                <p
                  className="text-adjust font-light text-white mb-4 "
                  style={{
                    fontFamily: "MADE Tommy Light, sans-serif",
                    fontSize: "1.3vw",
                  }}
                >
                  Diplômée d&apos;un Master en Design de Communication Graphique
                  et Digitale, j&apos;ai une solide expérience en tant que
                  designer pour des entreprises de différents secteurs.
                </p>
                <p
                  className="text-adjust font-light text-white mb-4"
                  style={{
                    fontFamily: "MADE Tommy Light, sans-serif",
                    fontSize: "1.3vw",
                  }}
                >
                  Je suis convaincue que mon expérience et ma passion pour le
                  design me permettent de comprendre parfaitement vos besoins et
                  de vous proposer des solutions créatives, uniques et adaptées
                  à votre entreprise en France ou à l&apos;étranger.
                </p>
                <p
                  className="text-adjust font-light text-white mb-4"
                  style={{
                    fontFamily: "MADE Tommy Light, sans-serif",
                    fontSize: "1.3vw",
                  }}
                >
                  Je me tiens à votre disposition pour discuter de votre projet.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageTextContainer;
