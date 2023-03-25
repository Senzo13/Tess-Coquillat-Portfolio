import { useEffect, useContext } from "react";
import STRING_PANEL from "../../values/fr/panel/string.panel";
import Modal from "../modal/modal";
import { useState } from "react";
import { login } from "../../services/panel/login/functions.login";
import Loader from "../loader/loader";
import Image from "next/image";
import Alert from "../alert/alert";
import { AuthContext } from "../../context/auth/auth.context";
import { decodeJWT } from "../../utils/utils.jwtDecode";
import { getOneUser } from "../../services/panel/login/functions.getOneUser";
import Cookies from "js-cookie";

export default function PanelLogin({ authOk }) {
  const [showModal, setShowModal] = useState(false);
  const [opacity, setOpacity] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState(200);
  const { auth, setAuth } = useContext(AuthContext);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    if (showModal) {
      setOpacity(4);
    } else {
      setOpacity(0);
    }
  }, [showModal]);

  const callBackPopup = (bool) => {
    setShowModal(bool);
  };

  useEffect(() => {
    const cookieMail = Cookies.get("email");
    const cookiePassword = Cookies.get("password");
    if (cookieMail != undefined && cookiePassword != undefined) {
      setEmail(cookieMail);
      setPassword(cookiePassword);
    }
  }, []);

  useEffect(() => {
    const cookieToken = Cookies.get("token");
    if (cookieToken != undefined) {
      getOneUser(cookieToken).then((res) => {
        setAuth({
          ...auth,
          token: cookieToken,
          user: res.data[0],
        });
        authOk(true);
      });
    }
  }, []);

  const createCookieWithToken = (token) => {
    Cookies.set("token", token);
    const cookieToken = Cookies.get("token");
    // console.log("Cookie Token : " + cookieToken);
  };

  const loginUser = () => {
    setLoading(true);
    login(email, password)
      .then((res) => {
        setLoading(false);
        getOneUser(res.data.token)
          .then((ras) => {
            setAuth({
              ...auth,
              token: res.data.token,
              user: ras.data[0],
            });
            if (rememberMe) {
              const expirationDate = new Date();
              expirationDate.setDate(expirationDate.getDate() + 60); // durée de conservation d'une semaine

              Cookies.set("email", email, {
                expires: expirationDate,
              });

              Cookies.set("password", password, {
                expires: expirationDate,
              });
            }
            authOk(true);
            createCookieWithToken(res.data.token);
          })
          .catch((err) => {
            // console.log(err);
            setError(err);
          });
      })
      .catch((err) => {
        // console.log(err);
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
      {showModal ? (
        <Modal
          props={{
            title: STRING_PANEL.MODAL_TITLE,
            description: STRING_PANEL.MODAL_BODY,
            callback: callBackPopup,
          }}
        />
      ) : null}

      <div
        className="modalOpacity"
        style={{
          filter: `blur(${opacity}px)`,
          tabIndex: "1",
        }}
      >
        <section className="vh-100" style={{ tabIndex: "0" }}>
          <div className="container">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-md-9 col-lg-6 col-xl-5">
                <img
                  src="/assets/login.png"
                  width="100%"
                  className="img-fluid"
                  alt="Sample image"
                />
              </div>
              <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                <form style={{ margin: "25px" }}>
                  <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                    <h2 className="lead fw-normal mb-0 me-3">
                      {STRING_PANEL.TITLE_REGISTRATION}
                    </h2>
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="email"
                      id="form3Example3"
                      maxLength={35}
                      className="form-control form-control-lg"
                      placeholder={STRING_PANEL.TEXT_EMAIL_VALID}
                      defaultValue={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label className="form-label" htmlFor="form3Example3">
                      {STRING_PANEL.TEXT_EMAIL}
                    </label>
                  </div>

                  <div className="form-outline mb-3">
                    <input
                      type="password"
                      id="form3Example4"
                      className="form-control form-control-lg"
                      placeholder={STRING_PANEL.TEXT_PASSWORD_VALID}
                      defaultValue={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label className="form-label" htmlFor="form3Example4">
                      {STRING_PANEL.TEXT_PASSWORD}
                    </label>
                  </div>

                  <div className="d-flex justify-content-between align-items-center">
                    <div className="form-check mb-0">
                      <input
                        className="form-check-input me-2"
                        type="checkbox"
                        id="form2Example3"
                        value={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="form2Example3"
                      >
                        {STRING_PANEL.TEXT_REMEMBER_ME}
                      </label>
                    </div>
                    <a
                      style={{ cursor: "pointer" }}
                      className="text-body"
                      value={showModal}
                      onClick={() => setShowModal(!showModal)}
                    >
                      {STRING_PANEL.TEXT_FORGOT_PASSWORD}
                    </a>
                  </div>

                  <div className="text-center text-lg-start mt-4 pt-2">
                    {loading ? (
                      <Loader
                        props={{
                          width: "65px",
                          height: "65px",
                        }}
                      />
                    ) : (
                      <button
                        type="button"
                        className="btn btn-primary btn-lg"
                        style={{
                          paddingLeft: "2.5rem",
                          paddingRight: "2.5rem",
                          position: "relative",
                          zIndex: "5",
                        }}
                        onClick={loginUser}
                      >
                        {STRING_PANEL.TEXT_LOGIN}
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
          <footer className="footer">
            Tess Coquilhat © {new Date().getFullYear().toString()}
          </footer>
        </section>
      </div>
    </>
  );
}
