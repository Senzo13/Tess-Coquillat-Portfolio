import Widget from "../src/components/index/widget/widget";
import Header from "../src/components/index/header";
import { GetAllImagesUrl } from "../src/services/panel/portfolio/functions.getImages";
import { useEffect, useState } from "react";
import Customer from "../src/components/index/customer/customer";
import Devis from "../src/components/index/devis/devis";
import ImageModal from "../src/components/modal/ImageModal";
import Image from "next/image";

export default function Galerie() {
  const [imgList, setImgList] = useState([]);
  const [filter, setFilter] = useState("*");
  const [filteredImgList, setFilteredImgList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const seoAlt = ["Tess Coquilhat", "Designer graphique", "Portfolio", "Graphiste Marseille", "Meilleur graphiste 2023", "Meilleur graphiste", "Designer graphique Marseille", "Graphiste freelance", "Graphiste indépendant", "Graphiste", "Designer graphique freelance", "Designer graphique indépendant"]

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const handleImageClick = (src) => {
    setWidth(window.screen.width);
    setHeight(window.screen.height);
    setImageSrc(src);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setImageSrc("");
  };

  const handleFilterClick = (filter) => {
    setFilter(filter);
    setFilteredImgList(
      imgList.filter((item) => {
        if (filter === "*") return true;
        return item.categorie === filter.toUpperCase();
      })
    );
  };

  useEffect(() => {
    GetAllImagesUrl(24).then((res) => {
      if (res != undefined) {
        setImgList([]);
        res.data.map((item) => {
          setFilteredImgList((prev) => [
            ...prev,
            {
              url: item.imgUrl,
              id: item.id,
              categorie: item.categorie,
            },
          ]);

          setImgList((prev) => [
            ...prev,
            { url: item.imgUrl, id: item.id, categorie: item.categorie },
          ]);
        });
      }
    });
  }, []);

  return (
    <>
      <Widget />
      <Header />
      <>
        <div
          className="formes-design-texte-rond"
          id="rotate"
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
          />
        </div>
      </>
      <div
        style={{
          position: "absolute",
          left: "-25%",
          right: "0",
        }}
      >
        <ImageModal
          isOpen={isModalOpen}
          onRequestClose={handleModalClose}
          imageSrc={imageSrc}
          size={{ width: width, height: height }}
        />
      </div>

      <div className="flex flex-col justify-center w-full m-auto">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h4></h4>
          </div>
        </div>

        <div className="portfolio-menu mb-4">
          <ul className="flex flex-row justify-center flex-wrap">
            <li
              className={`btn-filter ${
                filter === "*"
                  ? "btn-filter-active  ml-1 mr-2 mb-1"
                  : "ml-1 mr-2 mb-1"
              }`}
              data-filter="*"
              onClick={() => handleFilterClick("*")}
            >
              Toutes
            </li>
            <li
              className={`btn-filter ${
                filter === "logo" ? "btn-filter-active  mr-2 mb-1" : "mr-2 mb-1"
              }`}
              data-filter="logo"
              onClick={() => handleFilterClick("logo")}
            >
              Logo
            </li>
            <li
              className={`btn-filter ${
                filter === "flyer"
                  ? "btn-filter-active  mr-2 mb-1"
                  : "mr-2 mb-1"
              }`}
              data-filter="flyer"
              onClick={() => handleFilterClick("flyer")}
            >
              Flyer
            </li>
            <li
              className={`btn-filter ${
                filter === "carte_de_visite"
                  ? "btn-filter-active  mr-2 mb-1"
                  : "mr-2 mb-1"
              }`}
              data-filter="carte_de_visite"
              onClick={() => handleFilterClick("carte_de_visite")}
            >
              Carte de visite
            </li>
            <li
              className={`btn-filter ${
                filter === "packaging"
                  ? "btn-filter-active  mr-2 ml-1 mb-1"
                  : "mr-2 ml-1 mb-1"
              }`}
              data-filter="packaging"
              onClick={() => handleFilterClick("packaging")}
            >
              Packaging
            </li>
            <li
              className={`btn-filter ${
                filter === "dépliant"
                  ? "btn-filter-active  mr-2 ml-1 mb-1"
                  : "mr-2 ml-1 mb-1"
              }`}
              data-filter="dépliant"
              onClick={() => handleFilterClick("dépliant")}
            >
              Dépliant
            </li>
            <li
              className={`btn-filter ${
                filter === "brochure"
                  ? "btn-filter-active  mr-2 mb-1"
                  : "mr-2 mb-1"
              }`}
              data-filter="brochure"
              onClick={() => handleFilterClick("brochure")}
            >
              Brochure
            </li>
            <li
              className={`btn-filter ${
                filter === "catalogue"
                  ? "btn-filter-active  mr-2 mb-1"
                  : "mr-2 mb-1"
              }`}
              data-filter="catalogue"
              onClick={() => handleFilterClick("catalogue")}
            >
              Catalogue
            </li>
          </ul>
        </div>

        <div className="portfolio-item row w-[96%] m-auto">
          {filteredImgList.length > 0 ? (
            filteredImgList.map((item) => {
              const category = item.categorie
                .toLowerCase()
                .split("_")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");

              return (
                <div
                  className="item gts col-lg-3 col-md-4 col-6 mb-4 "
                  key={item.id + Math.random()}
                  onClick={() => handleImageClick(`${item.url}`)}
                >
                  <div className="img-fluid imgTest">
                    <Image
                      src={item.url}
                      alt={seoAlt[Math.floor(Math.random() * seoAlt.length)]}
                      width={400}
                      height={320}
                      layout="responsive"
                      loading="lazy"
                      blurDataURL="https://i.pinimg.com/originals/1f/2d/f8/1f2df8fad7e9bfcb18d9d553f8fc259b.gif"
                      placeholder="blur"
                    />
                  </div>

                  <div className="text absolute bottom-1 left-4 p-2 btn-filter-active">
                    {category}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="item gts col-lg-3 col-md-4 col-6 mb-4 col-sm">
              <h4></h4>
            </div>
          )}
        </div>
        <div className="mb-[4.5%]"></div>
      </div>

      <Customer />

      <Devis />
    </>
  );
}
