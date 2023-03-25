import Header from "./header";
import Content from "./content";
import SideBar from "./sidebar";
import PanelLogin from "./panel.login";
import { useState, useContext } from "react";
import { PanelContext } from "../../context/panel/panel.context";
export default function PanelAdmin() {
  const [isLoged, setIsLoged] = useState(false);
  const { nav, setNav } = useContext(PanelContext);

  // useEffect(() => {
  //   document.body.style.overflow = "auto";
  //   if (document.cookie.includes(auth.token)) {
  //     userWithCookie();
  //   }
  // }, []);

  // const userWithCookie = () => {
  //   const getCookies = document.cookie;
  //   return getCookies != "" ? setIsLoged(true) : setIsLoged(false);
  // };

  return (
    <>
      {isLoged ? (
        <div>
          <Header />

          <SideBar nav={nav} setNav={setNav} />

          <Content props={nav} />
        </div>
      ) : (
        <div>
          <PanelLogin authOk={setIsLoged} />
        </div>
      )}
    </>
  );
}
