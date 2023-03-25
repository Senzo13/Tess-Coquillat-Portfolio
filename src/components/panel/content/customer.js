import { useState, useEffect, useContext } from "react";
import { GetCustomer } from "../../../services/panel/customer/functions.getCustomer";
import { AuthContext } from "../../../context/auth/auth.context";
import { AddCustomer } from "../../../services/panel/customer/functions.addCustomer";
import { STRING_BUTTON } from "../../../values/fr/button/string.button";
import { DeleteCustomer } from "../../../services/panel/customer/functions.deleteCustomer";
import Button from "../../button/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faCheck, faClose } from "@fortawesome/free-solid-svg-icons";
import { EditCustomer } from "../../../services/panel/customer/functions.editCustomer";
import Image from "next/image";
import Cookies from "js-cookie";

export default function Customer() {
  const [nomPrenom, setNomPrenom] = useState("Nom / Prénom");
  const [entreprise, setEntreprise] = useState("Entreprise/Travail");
  const [description, setDescription] = useState(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamcolaboris nisi ut aliquip ex ea commodo consequat."
  );
  const [imgList, setImgList] = useState([]);
  const [stars, setStars] = useState(5);
  const [imgUrl, setImgUrl] = useState([]);
  const { auth, setAuth } = useContext(AuthContext);
  const [reload, setReload] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [idEdited, setIdEdited] = useState(-1);

  const getCustomer = () => {
    if (auth.user.id != undefined) {
      GetCustomer(auth.user.id).then((res) => {
        if (res != undefined) {
          setImgList([]);
          res.data.map((item) => {
            setImgList((prev) => [...prev, item]);
          });
        }
      });
    }
  };

  const DeleteCustomerById = (id) => {
    const cookieToken = Cookies.get("token");
    const confirm = window.confirm("Voulez-vous vraiment supprimer ?");
    if (confirm && cookieToken != "") {
      DeleteCustomer(id, cookieToken)
        .then((res) => {
          if (res != undefined) {
            getCustomer();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const EditCustomerById = (id) => {
    const cookieToken = Cookies.get("token");

    if (!isEdit) {
      setIsEdit(true);
      setIdEdited(id);
      let customer = imgList.find((item) => item.id == id);
      setNomPrenom(customer.nomPrenom);
      setEntreprise(customer.entreprise);
      setDescription(customer.description);
      setStars(customer.stars);
    } else {
      let customer = imgList.find((item) => item.id == id);
      console.log("url : " + customer.imgUrl);
      const confirm = window.confirm(
        "Voulez-vous vraiment confirmer la modification ?"
      );
      if (confirm && cookieToken != "") {
        EditCustomer(
          id,
          customer.userId,
          nomPrenom != customer.nomPrenom ? nomPrenom : customer.nomPrenom,
          entreprise != customer.entreprise ? entreprise : customer.entreprise,
          description != customer.description
            ? description
            : customer.description,
          customer.imgUrl,
          stars != customer.stars ? stars : customer.stars,
          cookieToken
        )
          .then((res) => {
            if (res != undefined) {
              // console.log("edited");
              // console.log(res);
              getCustomer();
            }
          })

          .catch((err) => {
            // console.log(err);
          });
        setIsEdit(false);
        setIdEdited(-1);
      }
    }
  };

  useEffect(() => {
    getCustomer();
  }, [auth.user.id]);

  const handleClickAddCustomer = () => {
    const cookieToken = Cookies.get("token");

    if (imgUrl.name != undefined && cookieToken != "") {
      AddCustomer(
        auth.user.id,
        nomPrenom,
        entreprise,
        description,
        imgUrl,
        stars,
        cookieToken
      )
        .then((res) => {
          if (res != undefined) {
            getCustomer();
          }
        })
        .catch((err) => {
          // console.log(err);
        });
    } else {
      alert("Veuillez ajouter une image");
    }
  };

  const handleClickButtonToInputFile = () => {
    inputRef.current.click();
  };

  return (
    <>
      <div className="customerWrapper">
        <div className="container-customer">
          <div
            id="col-test"
            className="card p-3 text-center px-4"
            style={{
              border: "dashed 2px #e0e0e0",
            }}
          >
            <div className="user-image" style={{ height: "105px" }}>
              <Image
                // add src img random not from imgur
                src="/assets/camera.png"
                className="rounded-circle"
                width={95}
                height={95}
                style={{ cursor: "pointer" }}
              />
              <input
                type="file"
                className="upload-input"
                style={{
                  cursor: "pointer",
                  padding: "0px",
                }}
                onChange={(e) => setImgUrl(e.target.files[0])}
              />
            </div>
            <div className="user-content">
              <h5 className="mb-0">
                <input
                  type="input"
                  className="form__field"
                  placeholder="Name"
                  id="name"
                  value={nomPrenom}
                  onChange={(e) => setNomPrenom(e.target.value)}
                  style={{
                    marginTop: "-50px",
                    width: "100%",
                    marginBottom: "10px",
                  }}
                  required
                />
                <input
                  type="input"
                  className="form__field"
                  placeholder="Name"
                  id="name"
                  value={entreprise}
                  onChange={(e) => setEntreprise(e.target.value)}
                  style={{
                    marginTop: "-50px",
                    width: "100%",
                    marginBottom: "10px",
                  }}
                  required
                />
              </h5>
              {/* <span>Software Architect</span> */}
              <p> </p>
              <div className="md-form mb-4 pink-textarea active-pink-textarea-2">
                <i className="fas fa-angle-double-right prefix"></i>
                <textarea
                  id="form23"
                  className="md-textarea form-control"
                  rows="3"
                  style={{ height: "75px", marginTop: "-25px" }}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
            </div>
            <ul className="list-unstyled d-flex justify-content-center text-warning mb-0">
              <li style={{ marginRight: "4px" }}>
                <i className="fas fa-star fa-sm">
                  <Image
                    src={"/assets/formes/stars/star.png"}
                    width={38}
                    height={38}
                    blurDataURL="/assets/formes/stars/star.png"
                  />
                </i>
              </li>
              <li style={{ marginRight: "4px" }}>
                <i className="fas fa-star fa-sm">
                  <Image
                    src={"/assets/formes/stars/star.png"}
                    width={38}
                    height={38}
                    blurDataURL="/assets/formes/stars/star.png"
                  />
                </i>
              </li>
              <li style={{ marginRight: "4px" }}>
                <i className="fas fa-star fa-sm">
                  <Image
                    src={"/assets/formes/stars/star.png"}
                    width={38}
                    height={38}
                    blurDataURL="/assets/formes/stars/star.png"
                  />
                </i>
              </li>
              <li style={{ marginRight: "4px" }}>
                <i className="fas fa-star fa-sm">
                  <Image
                    src={"/assets/formes/stars/star.png"}
                    width={38}
                    height={38}
                    blurDataURL="/assets/formes/stars/star.png"
                  />
                </i>
              </li>
              <li>
                <i className="fas fa-star fa-sm">
                  <Image
                    src={"/assets/formes/stars/star.png"}
                    width={38}
                    height={38}
                    blurDataURL="/assets/formes/stars/star.png"
                  />
                </i>
              </li>
            </ul>
            <div className="text-center" style={{ marginTop: "22px" }}>
              <Button
                props={{
                  text: STRING_BUTTON.BUTTON_ADD,
                  width: "200px",
                  callback: () => handleClickAddCustomer,
                }}
              />
            </div>
          </div>

          {imgList.map((data, index) => (
            <div
              id="col-test"
              className="card p-5 text-center px-4"
              style={{
                boxShadow: "0 0 6px 0 rgba(0, 0, 0, 0.179)",
              }}
              key={index}
            >
              <div
                className="img-wrap"
                onClick={() => {
                  EditCustomerById(data.id);
                }}
              >
                <FontAwesomeIcon
                  icon={isEdit && idEdited == data.id ? faCheck : faEdit}
                  className="close"
                  style={{
                    right: 20,
                    color: isEdit && idEdited == data.id ? "green" : "",
                    top: -30,
                    widht: 40,
                    height: 30,
                  }}
                />
              </div>
              <div
                className="img-wrap"
                onClick={() => {
                  DeleteCustomerById(data.id);
                }}
              >
                <FontAwesomeIcon
                  icon={faClose}
                  className="close"
                  style={{ right: -20, top: -30, widht: 50, height: 30 }}
                />
              </div>
              <div className="user-image" style={{ height: "105px" }}>
                <Image
                  src={data.imgUrl}
                  width={95}
                  height={95}
                  className="rounded-circle"
                  crossOrigin="anonymous"
                />
              </div>
              <div className="user-content">
                {isEdit && idEdited == data.id ? (
                  <input
                    type="input"
                    className="form__field"
                    placeholder={data.nomPrenom}
                    id="name"
                    defaultValue={data.nomPrenom}
                    onChange={(e) => setNomPrenom(e.target.value)}
                    style={{
                      marginTop: "-50px",
                      width: "100%",
                      marginBottom: "10px",
                    }}
                    required
                  />
                ) : (
                  <h5 className="mb-0">{data.nomPrenom}</h5>
                )}

                {isEdit && idEdited == data.id ? (
                  <input
                    type="input"
                    className="form__field"
                    placeholder={data.entreprise}
                    defaultValue={data.entreprise}
                    id="name"
                    onChange={(e) => setEntreprise(e.target.value)}
                    style={{
                      marginTop: "-50px",
                      width: "100%",
                      marginBottom: "10px",
                    }}
                    required
                  />
                ) : (
                  <h6 className="mb-0">{data.entreprise}</h6>
                )}

                {/* <span>Software Developer</span> */}
                {isEdit && idEdited == data.id ? (
                  <textarea
                    className="md-textarea form-control"
                    onChange={(e) => setDescription(e.target.value)}
                  >
                    {data.description}
                  </textarea>
                ) : (
                  <p>{data.description}</p>
                )}
              </div>

              <ul className="list-unstyled d-flex justify-content-center text-warning mb-0">
                <li style={{ marginRight: "4px" }}>
                  <i className="fas fa-star fa-sm">
                    <Image
                      src={"/assets/formes/stars/star.png"}
                      width={38}
                      height={38}
                      blurDataURL="/assets/formes/stars/star.png"
                    />
                  </i>
                </li>
                <li style={{ marginRight: "4px" }}>
                  <i className="fas fa-star fa-sm">
                    <Image
                      src={"/assets/formes/stars/star.png"}
                      width={38}
                      height={38}
                      blurDataURL="/assets/formes/stars/star.png"
                    />
                  </i>
                </li>
                <li style={{ marginRight: "4px" }}>
                  <i className="fas fa-star fa-sm">
                    <Image
                      src={"/assets/formes/stars/star.png"}
                      width={38}
                      height={38}
                      blurDataURL="/assets/formes/stars/star.png"
                    />
                  </i>
                </li>
                <li style={{ marginRight: "4px" }}>
                  <i className="fas fa-star fa-sm">
                    <Image
                      src={"/assets/formes/stars/star.png"}
                      width={38}
                      height={38}
                      blurDataURL="/assets/formes/stars/star.png"
                    />
                  </i>
                </li>
                <li>
                  <i className="fas fa-star fa-sm">
                    <Image
                      src={"/assets/formes/stars/star.png"}
                      width={38}
                      height={38}
                      blurDataURL="/assets/formes/stars/star.png"
                    />
                  </i>
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
