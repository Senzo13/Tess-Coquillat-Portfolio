import STRING_PANEL from "../../../values/fr/panel/string.panel";
import { STRING_BUTTON } from "../../../values/fr/button/string.button";
import Alert from "../../alert/alert";
import { useState, useContext, useEffect } from "react";
import Loader from "../../loader/loader";
import { editUser } from "../../../services/panel/profil/functions.edit";
import { AuthContext } from "../../../context/auth/auth.context";

export default function Profil() {
  const [loading, setLoading] = useState(false);
  const { auth, setAuth } = useContext(AuthContext);
  const [type, setType] = useState(200);

  const [error, setError] = useState("");
  const [nomPrenom, setNomPrenom] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [cityName, setCityName] = useState("");
  const [description, setDescription] = useState("");
  const [adrMail, setAdrMail] = useState("");

  const editAuth = ({ newData }) => {
    const oldData = auth.user;
    const user = { ...oldData, ...newData };
    setAuth({ ...auth, user: user });
  };

  useEffect(() => {
    // console.log("Profil");
    // console.log(auth);

    setNomPrenom(auth.user.nomPrenom);
    setZipCode(auth.user.zipCode);
    setCityName(auth.user.cityName);
    setDescription(auth.user.description);
    setAdrMail(auth.user.adrMail);
  }, []);

  const handleClickSaveProfil = () => {
    setLoading(true);
    editUser(
      auth.token,
      auth.user.id,
      nomPrenom,
      adrMail,
      zipCode,
      cityName,
      description,
      auth.user.pwd,
      auth.user.sexe
    )
      .then((res) => {
        setLoading(false);
        setType(200);
        editAuth({
          newData: {
            nomPrenom: nomPrenom,
            zipCode: zipCode,
            cityName: cityName,
            description: description,
            adrMail: adrMail,
          },
        });
        setError(res.data);
      })
      .catch((err) => {
        setError(
          err.response.data != undefined
            ? err.response.data
            : "Erreur de connexion avec le serveur, contactez l'administrateur"
        );
        setType(400);
        setTimeout(() => {
          setLoading(false);
        }, 200);
      });
  };

  return (
    <>
      {error != "" && (
        <Alert
          props={{
            message: error,
            type: type,
            callback: () => setError(""),
            positionType: "absolute",
          }}
        />
      )}
      <div
        className="container mt-3"
        id="container"
        style={{ borderRadius: "25px" }}
      >
        <div
          className="card p-3 text-center "
          style={{ border: "0px", transform: "none" }}
        >
          <div className="d-flex flex-row justify-content-center mb-3">
            {/* <div className="image">
          
              <img
                src="https://i.imgur.com/hczKIze.jpg"
                className="rounded-circle"
              />{" "}
              <span>
                <i className="bx bxs-camera-plus" />
              </span>
            </div> */}
          </div>
          <label
            className="pointer-events-none"
            style={{
              fontFamily: "Made Tommy Bold",
              margin: "0px",
            }}
          >
            <p style={{ fontSize: "24px" }}>{STRING_PANEL.TEXT_EDIT_PROFIL}</p>
          </label>
          <div
            className="row p-10"
            style={{ paddingTop: "35px", paddingBottom: "35px" }}
          >
            <div
              className="col-md-6"
              style={{ paddingBottom: "22px", paddingTop: "22px" }}
            >
              <div className="inputs">
                {" "}
                <label>{STRING_PANEL.TEXT_NAME}</label>{" "}
                <input
                  className="form-control"
                  type="text"
                  placeholder={auth.user.nomPrenom}
                  onChange={(e) => setNomPrenom(e.target.value)}
                />{" "}
              </div>
            </div>
            <div
              className="col-md-6"
              style={{ paddingBottom: "22px", paddingTop: "22px" }}
            >
              <div className="inputs">
                {" "}
                <label>{STRING_PANEL.TEXT_EMAIL}</label>{" "}
                <input
                  className="form-control"
                  type="text"
                  placeholder={auth.user.adrMail}
                  onChange={(e) => setAdrMail(e.target.value)}
                />{" "}
              </div>
            </div>
            <div
              className="col-md-6"
              style={{ paddingBottom: "22px", paddingTop: "22px" }}
            >
              <div className="inputs">
                {" "}
                <label>{STRING_PANEL.TEXT_CITY}</label>{" "}
                <input
                  className="form-control"
                  type="text"
                  placeholder={auth.user.cityName}
                  onChange={(e) => setCityName(e.target.value)}
                />{" "}
              </div>
            </div>
            <div
              className="col-md-6"
              style={{ paddingBottom: "22px", paddingTop: "22px" }}
            >
              <div className="inputs">
                {" "}
                <label>{STRING_PANEL.TEXT_POSTAL_CODE}</label>{" "}
                <input
                  className="form-control"
                  type="number"
                  placeholder={auth.user.zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                />{" "}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="about-inputs p-10">
                {" "}
                <label>{STRING_PANEL.TEXT_DESCRIPTION}</label>{" "}
                <textarea
                  style={{ paddingBottom: "75px" }}
                  placeholder={auth.user.description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="form-control"
                  type="text"
                ></textarea>
              </div>
            </div>
          </div>
          <div className="mt-3 gap-2 d-flex justify-content-end">
            <button className="px-3 btn btn-sm btn-outline-primary">
              {STRING_BUTTON.BUTTON_CANCEL}
            </button>
            {loading ? (
              <Loader
                props={{
                  width: "65px",
                  height: "65px",
                }}
              />
            ) : (
              <button
                className="px-3 btn btn-sm btn-primary"
                onClick={handleClickSaveProfil}
              >
                {STRING_BUTTON.BUTTON_SAVE}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
