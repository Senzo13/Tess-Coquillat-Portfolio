// Header.js
import "bootstrap/dist/css/bootstrap.css";
import Link from "next/link";
import Clock from "./clocks";
export default function Header() {
  const redirect = () => {
    window.location.href = "/";
  };

  const redirectg = () => {
    window.location.href = "/galerie";
  };
  return (
    <>
      <div
        className="header_panel bg-[#FFFFFF] flex flex-row items-center"
        onClick={redirect}
      >
        <img
          src="https://img.icons8.com/ios/50/000000/domain.png"
          style={{ opacity: "0.8", cursor: "pointer" }}
        />
        <label
          className="transition duration-600 hover:text-[#1E293B]"
          style={{ cursor: "pointer" }}
        >
          Tess Coquilhat
        </label>

        {/* <p
          className="mr-4 ml-0 mt-0 mb-2 textHover transition duration-300"
          style={{
            color: "#343A40",
            padding: "0px",
            fontFamily: "Made Tommy Bold",
            fontSize: "26px",
            cursor: "pointer",
            paddingTop: "8px",
          }}
          onClick={redirect}
        >
          ACCUEIL
        </p>

        <p
          className="mr-4 ml-0 mt-0 mb-2 textHover transition duration-300"
          style={{
            color: "#343A40",
            padding: "0px",
            fontFamily: "Made Tommy Bold",
            fontSize: "26px",
            cursor: "pointer",
            paddingTop: "8px",
          }}
          onClick={redirectg}
        >
          PORTFOLIO
        </p> */}
      </div>
    </>
  );
}
