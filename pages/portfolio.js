import Widget from "../src/components/index/widget/widget";
import Header from "../src/components/index/header";
import { GetAllImagesUrl } from "../src/services/panel/portfolio/functions.getImages";
import { useEffect, useState } from "react";
import Customer from "../src/components/index/customer/customer";
import Devis from "../src/components/index/devis/devis";
import ImageModal from "../src/components/modal/ImageModal";
import Image from "next/image";
import Head from "next/head";
export default function Galerie() {
  const [imgList, setImgList] = useState([]);
  const [filter, setFilter] = useState("*");
  const [filteredImgList, setFilteredImgList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
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
          setFilteredImgList((prev) => {
            const newSlides = [
              ...prev,
              {
                url: item.imgUrl,
                id: item.id,
                categorie: item.categorie,
              },
            ];
            return newSlides.reverse();
          });

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
        <Head>
            <title>
            Designer Graphique | Création graphique  | Création de logo, identités visuelles et supports de communication portfolio - Tess Coquilhat
            </title>
            <meta
              property="og:title"
              content="Designer Graphique | Création graphique  | Création de logo, identités visuelles et supports de communication portfolio - Tess Coquilhat"
            />
            <meta
              name="keywords"
              content="Designer graphique, Création graphique, logo, identité visuelle, communication visuelle, Marseille, Tess Coquilhat, Designer graphique marseille, designer graphique marseille"
            />
            <meta
              name="description"
              content="Tess Coquilhat, designer graphique indépendante basée à Marseille spécialisée dans la création de logos, de cartes de visite, de flyers, de packagings, de dépliants, de brochures et de catalogues, ainsi que dans la conception d'identités visuelles pour les entreprises. Contactez-moi pour vos projets de communication visuelle."
            />
            <meta
              property="og:description"
              content="Tess Coquilhat designer graphique indépendante basée à Marseille spécialisée dans la création de logos, de cartes de visite, de flyers, de packagings, de dépliants, de brochures et de catalogues, ainsi que dans la conception d'identités visuelles pour les entreprises. Contactez-moi pour vos projets de communication visuelle."
            />
            <meta name="author" content="Lorenzo GIRALT" />
            <meta name="canonical" content="https://tess-coquilhat.fr/" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <meta name="robots" content="index, follow" />

            <meta
              name="google-site-verification"
              content="Upk0qT1hWONBm7mJ9ahLqGufa4WiaYwa67cBCVyRWNE"
            />
            </Head>
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
              title="Toutes création graphiques"
            >
              Toutes
            </li>
            <li
              className={`btn-filter ${
                filter === "logo" ? "btn-filter-active  mr-2 mb-1" : "mr-2 mb-1"
              }`}
              data-filter="logo"
              title="Logo Marseille"
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
              title="Flyer Marseille"
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
              title="Carte de visite Marseille"
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
              title="Packaging Marseille"
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
              title="Dépliant Marseille"
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
              title="Brochure Marseille"
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
              title="Catalogue Marseille"
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
