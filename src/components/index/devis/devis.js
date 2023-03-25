import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";
import Alert from "../../alert/alert";
import Loading from "../../loader/loader";

function Devis() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [type, setType] = useState(200);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [delaySend, setDelaySend] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Bouche à oreille");
  const [nameOfProject, setNameOfProject] = useState("");
  const [tel, setTel] = useState("");
  const form = useRef();

  const sendEmail = (e) => {
    setLoading(true);
    e.preventDefault(); // prevents the page from reloading when you hit “Send”
    if (email != "" && tel != "" && message != "" && !delaySend) {
      emailjs
        .sendForm(
          "service_9ysky0o",
          "template_h62hagu",
          form.current,
          "3JU_Cj3OmBmVSF22x"
        )
        .then((res) => {
          setType(200);
          setDelaySend(true);
          setEmail("");
          setName("");
          setMessage("");
          setTel("");
          setNameOfProject("");
          setSelectedOption("Bouche à oreille");
          // console.log("Envoyé");
          setError("Votre message a bien été envoyé");
          setLoading(false);
          // console.log("message envoyé !");
          // wait 1 minute before sending another message for stop the spam
          setTimeout(() => {
            setDelaySend(false);
          }, 60000);
        })
        .catch((err) => {
          // console.log(err);
          setError(err);
        });
    } else if (email != "" && name != "" && message != "" && delaySend) {
      setType(400);
      setError("Vous devez attendre 1 minute avant de renvoyer un message");
      setLoading(false);
    } else {
      setType(400);
      setError("Veuillez remplir tous les champs");
      setLoading(false);
    }
    // need stop spam formulaire with recaptcha
  };

  return (
    <>
      {error != "" && (
        <Alert
          props={{
            message: error,
            type: type,
            callback: () => setError(""),
            positionType: "fixed",
          }}
        />
      )}
      <div
        className="container2"
        id="container2"
        style={{
          position: "absolute",
          top: "100%",
          width: "100%",
          backgroundColor: "#ff931e",
          display: "flex",
          justifyContent: "center",
          color: "white",
          alignItems: "center",
          fontFamily: "Roboto",
          height: "auto",
          marginTop: "10%",
          margin: 0,
          padding: 0,
        }}
      >
        <div className="row" style={{ margin: 0, padding: "35px" }}>
          <div
            className="col-md-4"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <img
              id="rotate"
              src="/assets/formes/texte-rond-1.svg"
              type="image/svg+xml"
              width="70%"
            />
          </div>
          <div
            className="col-md-8"
            style={{
              padding: 12,
              marginTop: "2%",
              marginBottom: "2%",
              display: "flex",
              justifyContent: "center",
              marginTop: "42px",
            }}
          >
            <div className="d-flex pt-3 pr-2"></div>

            <form className="information" ref={form} style={{ margin: 0 }}>
              <h2 className="form-heading" style={{ fontWeight: "740" }} title="Formulaire de contact pour devis gratuit Marseille">
                Formulaire de contact pour devis gratuit
              </h2>
              <p className="form-para">
                Pour toute demande de création graphique, merci de remplir le formulaire
                ci-dessous, je réponds généralement dans la journée.
              </p><br/>
              <h2 className="form-heading" style={{ fontWeight: "740" }}>
                <a href="mailto:tesscoquilhat@hotmail.fr">Email : tesscoquilhat@hotmail.fr</a>
              </h2>
              <h2 className="form-heading" style={{ fontWeight: "740" }}>
                <a href="tel:+33664407509">Tel : 06 64 40 75 09</a>
              </h2><br/>
              <div className="field" style={{ display: "none" }}>
                <input
                  type="text"
                  name="to_name"
                  id="to_name"
                  // defaultValue={Tess Coquilhat}
                />
              </div>
              <div className="form-group">
                <label className="form-control-placeholder" htmlFor="email">
                  Votre email (*)
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="reply_to"
                  // defaultValue={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{ marginBottom: 12 }}
                />
              </div>

              <div className="form-group">
                <label className="form-control-placeholder" htmlFor="name">
                  Nom/prénom
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="from_name"
                  // value={name}
                  onChange={(e) => setName(e.target.value)}
                  id="name"
                  style={{ marginBottom: 12, border: "none" }}
                />
              </div>

              <div className="form-group">
                <label className="form-control-placeholder" htmlFor="name">
                  Nom de votre entreprise / projet
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="enterprise"
                  // value={nameOfProject}
                  onChange={(e) => setNameOfProject(e.target.value)}
                  id="name"
                  style={{ marginBottom: 12, border: "none" }}
                />
              </div>

              <div className="form-group">
                <label className="form-control-placeholder" htmlFor="name">
                  Numéro de téléphone (*)
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="phone_number"
                  // value={tel}
                  onChange={(e) => setTel(e.target.value)}
                  id="name"
                  style={{ marginBottom: 12, border: "none" }}
                  required
                />
              </div>

              <div className="form-group">
                <label className="exampleFormControlSelect1" htmlFor="name">
                  Comment m&apos;avez vous connu ?
                </label>
                <select
                  className="form-select"
                  name="user_selected"
                  style={{ marginBottom: 12, border: "none" }}
                >
                  <option value="Bouche à oreilles">Bouche à oreilles</option>
                  <option value="Réseaux sociaux">Réseaux sociaux</option>
                  <option value="Site de freelance">Site de freelance</option>
                  <option value="Moteur de recherche">
                    Moteur de recherche
                  </option>
                  <option value="Autre">Autre</option>
                </select>
              </div>

              <div className="form-group">
                <label className="exampleFormControlSelect1" htmlFor="name">
                  Quel pack avez vous choisi ?
                </label>
                <select
                  className="form-select"
                  name="user_selected_pack"
                  style={{ marginBottom: 12, border: "none" }}
                >
                  <option value="Aucun pour l'instant">
                    Aucun pour l&apos;instant
                  </option>
                  <option value="PACK SOLO">Pack Solo</option>
                  <option value="PACK MIXTE">Pack Mixte</option>
                  <option value="PACK HYBRIDE">Pack Hybride</option>
                  <option value="SUPPORT BONUS">Support Bonus</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-control-placeholder" htmlFor="number">
                  Votre demande (*)
                </label>
                <textarea
                  type="text"
                  className="form-control"
                  id="text"
                  name="message"
                  // value={message}
                  style={{ marginBottom: 12, border: "none" }}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>

              <div className="form-group mt-3">
                {loading ? (
                  <Loading
                    props={{
                      width: "50px",
                      height: "50px",
                    }}
                  />
                ) : (
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={sendEmail}
                    style={{
                      backgroundColor: "white",
                      border: "none",
                      color: "black",
                    }}
                    // add hover effect
                  >
                    <span>
                      Envoyer &nbsp;<i className="fas fa-arrow-right"></i>
                    </span>
                  </button>
                )}
              </div>

              <label className="terms mt-4">
                En cliquant sur &quot;Envoyer&quot;, vous acceptez que vos
                informations soit communiquer à Tess Coquilhat et seront
                utilisées pour vous contacter. Vos informations ne seront jamais
                transmises à des tiers à des fin personnelles ou commerciales et
                ne seront jamais sauvegarder.
                <br />
                <b> Numéro de SIRET :</b> 91854009700014
              </label>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Devis;
