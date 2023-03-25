import { useState, useRef, useContext, useEffect } from "react";
import { AuthContext } from "../../context/auth/auth.context";
import { AddProfileImagePanel } from "../../services/panel/sidebar/functions.addProfileImagePanel";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Image from "next/image";
import Clock from "./clocks";
export default function SideBar({ nav, setNav }) {
  const [isSelect, setIsSelect] = useState(false);
  const { auth, setAuth } = useContext(AuthContext);
  const inputRef = useRef(null);
  const router = useRouter();

  const selectNav = (name) => {
    // console.log("selectNav");
    // console.log(auth);
    const newNav = { ...nav };
    if (name === "Déconnexion") {
      if (Cookies.get("token") != undefined) {
        Cookies.remove("token");
        document.location.reload(); //
        // router.push("/");
        // console.log("Déconnexion");
      } else {
        // router.push("/");
        document.location.reload(); //
        // console.log("Déconnexion");
      }
    } else {
      for (const key in newNav) {
        if (newNav[key].text === name) {
          newNav[key].isSelect = true;
          setIsSelect(!isSelect);
        } else {
          newNav[key].isSelect = false;
        }
      }
      setNav(newNav);
    }
  };

  const uploadFile = (e) => {
    // console.log("upload file");
    // console.log(auth);
    AddProfileImagePanel(auth.user.id, e)
      .then((res) => {
        console.log(res.data);
        setAuth({
          ...auth,
          user: { ...auth.user, imgUrl: res.data },
        });
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  return (
    <>
      <div className="sidebar bg-[#1E293B]">
        <div className="sidebar__header bg-[#1E293B]">
          <Clock />
        </div>
        <div className="profile">
          <div className="profile-image" style={{ cursor: "pointer" }}>
            <input
              type="file"
              className="upload-input"
              ref={inputRef}
              style={{
                cursor: "pointer",
                margin: "0px",
                padding: "0px",
                width: "225px",
                backgroundColor: "red",
                height: "225px",
                left: 0,
                position: "absolute",
                zIndex: "4",
              }}
              onChange={(e) => uploadFile(e.target.files[0])}
            />
            {auth.user.imgUrl != "" || auth.user.imgUrl != undefined ? (
              // eslint-disable-next-line @next/next/no-img-element
              <Image
                src={auth.user.imgUrl}
                width={225}
                height={225}
                alt="Avatar"
                style={{ zIndex: 4, fit: "cover" }}
                onClick={() => inputRef.current.click()}
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src="https://mdbootstrap.com/img/Photos/Avatars/img%20(10).jpg"
                alt="Sample image"
                style={{ zIndex: 4 }}
                onClick={() => inputRef.current.click()}
              />
            )}
          </div>

          <div
            className="formes-design-texte-rond"
            id="rotate"
            style={{
              position: "absolute",
              filter: "brightness(0) invert(1)",
              colorAdjust: "exact",
              width: "71%",
              opacity: "0.4",
              top: "1%",
              right: "14.5%",
              zIndex: "0",
            }}
          >
            <div className="hidden md:block">
              <img
                src="/assets/formes/texte-rond-2.svg"
                type="image/svg+xml"
                width="100%"
              />
            </div>
          </div>

          <div className="profile-user-settings">
            <p
              className="mt-8"
              style={{
                cursor: "pointer",
                color: "white !important",
                fontFamily: "Made Tommy Bold",
                fontSize: "26px",
              }}
            >
              Administration
              {/* {auth.user.nomPrenom} */}
            </p>
          </div>
        </div>
        <hr className="hr" />
        <ul className="nav_items">
          {Object.keys(nav).map((key) => (
            <li
              className="nav-item_img"
              key={key}
              style={
                nav[key].isSelect
                  ? {
                      borderLeft: "5px solid #3f51b5",
                      paddingLeft: "10px",
                      paddingTop: "8px",
                    }
                  : {
                      paddingTop: "8px",
                    }
              }
              onClick={() => selectNav(nav[key].text)}
            >
              <img src={nav[key].src} alt="icon" crossOrigin="anonymous" />

              <p>{nav[key].text}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
