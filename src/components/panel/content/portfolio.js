import { useState, useContext, useEffect, useRef } from "react";
import { UploadImage } from "../../../services/panel/portfolio/functions.upload";
import { AuthContext } from "../../../context/auth/auth.context";
import { GetAllImagesUrl } from "../../../services/panel/portfolio/functions.getImages";
import { DeletePortfolio } from "../../../services/panel/portfolio/functions.deletePortfolio";
import Image from "next/image";
export default function Portfolio() {
  const [img, setImg] = useState([]);
  const { auth, setAuth } = useContext(AuthContext);
  const [imgList, setImgList] = useState([]);
  const inputRef = useRef(null);
  const [selectedValue, setSelectedValue] = useState("LOGO");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  useEffect(() => {
    getAllPortfolio();
  }, []);

  const getAllPortfolio = () => {
    if (auth.user.id != undefined) {
      GetAllImagesUrl(auth.user.id).then((res) => {
        if (res != undefined) {
          setImgList([]);
          // console.log(res.data);
          res.data.map((item) => {
            setImgList((prev) => [
              ...prev,
              { url: item.imgUrl, id: item.id, categorie: item.categorie },
            ]);
          });
        }
      });
    }
  };
  const uploadFile = (e) => {
    setImg(e);
    UploadImage(auth.user.id, e, selectedValue)
      .then((res) => {
        // console.log(res);
        getAllPortfolio();
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  const handleClickButtonToInputFile = () => {
    inputRef.current.click();
  };

  const DeletePortfolioById = (id) => {
    const confirm = window.confirm("Voulez-vous vraiment supprimer ?");
    if (confirm) {
      DeletePortfolio(id)
        .then((res) => {
          if (res != undefined) {
            getAllPortfolio();
          }
        })
        .catch((err) => {
          // console.log(err);
        });
    }
  };

  return (
    <>
      <div className="alignCards">
        <div className="parent-center">
          <div className="img-wrap-portfolio" />
          <div className="center">
            <div className="dropzone">
              <img
                src="http://100dayscss.com/codepen/upload.svg"
                className="upload-icon"
              />
              <input
                type="file"
                ref={inputRef}
                className="upload-input"
                onChange={(e) => uploadFile(e.target.files[0])}
              />
            </div>
            <div className="form-group w-full pl-2 pr-2">
              <select
                className="form-select"
                name="categorie"
                style={{ border: "1px solid grey" }}
                value={selectedValue}
                onChange={handleChange}
              >
                <option value="LOGO">Logo</option>
                <option value="CARTE_DE_VISITE">Carte de visite</option>
                <option value="PACKAGING">Packaging</option>
                <option value="DÉPLIANT">Dépliant</option>
                <option value="BROCHURE">Brochure</option>
                <option value="FLYER">Flyer</option>
                <option value="CATALOGUE">Catalogue</option>
              </select>
            </div>
            <button
              type="button"
              className="btn btn-primary btn-lg"
              style={{ height: "auto" }}
              name="uploadbutton"
              onClick={handleClickButtonToInputFile}
            >
              Ajouter une image
            </button>
          </div>
        </div>

        {imgList.map((item, index) => (
          <div className="imgCard" key={index}>
            <div
              className="img-wrap-portfolio"
              onClick={() => {
                DeletePortfolioById(item.id);
              }}
              key={index + 3}
            >
              <span key={index + 4}>&times;</span>
            </div>
            <p
              className=""
              style={{
                position: "relative",
                padding: "0px",
                margin: "0px",
                color: "white",
                zIndex: 1,
                paddingLeft: "4px",
                backgroundColor: "rgba(141, 148, 148, 0.681)",
                marginBottom: "-23px",
                boxShadow: "0 1px 2px rgba(141, 148, 148, 0.681)",
                textShadow:
                  "0.5px 0 grey, -0.5px 0 grey, 0 0.5px grey, 0 -0.5px grey,0.5px 0.5px black, -0.5px -0.5px black, 0.5px -0.5px black, -0.5px 0.5px black",
              }}
            >
              {item.categorie}
            </p>
            <div key={index + 1}>
              <Image
                src={item.url}
                width={230}
                height={210}
                alt="Image"
                crossOrigin="anonymous"
                blurDataURL={item.url}
                placeholder="blur"
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
