import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { AddVisitor } from "../../services/panel/visitor/add.visitor";

const CookieConsent = () => {
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    if (Cookies.get("cookie_consent") === "true") {
      setAccepted(true);
      const ipCookie = Cookies.get("visitor_ip");
      if (!ipCookie) {
        getIpVisitor();
      }
    }
  }, []);

  const handleAccept = () => {
    Cookies.set("cookie_consent", "true", { expires: 3 });
    setAccepted(true);
    const ipCookie = Cookies.get("visitor_ip");
    if (!ipCookie) {
      getIpVisitor();
    }
  };

  function httpGetAsync(url, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
      if (xmlHttp.readyState === 4 && xmlHttp.status === 200)
        callback(xmlHttp.responseText);
    };
    xmlHttp.open("GET", url, true); // true for asynchronous
    xmlHttp.send(null);
  }

  function getIpVisitor() {
    var url =
      "https://ipgeolocation.abstractapi.com/v1/?api_key=28d1dd664e0542228dabe5a21a2d89ba";
    httpGetAsync(url, function (ip) {
      AddVisitor(
        JSON.parse(ip).ip_address,
        JSON.parse(ip).city,
        JSON.parse(ip).country
      )
        .then((res) => {
          Cookies.set("visitor_ip", JSON.parse(ip).ip_address, {
            expires: 3,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }

  if (accepted) {
    return null;
  }

  return (
    <div
      className="fixed bottom-0 w-full bg-[#3fa9f5] text-white p-4 text-sm"
      style={{ zIndex: 87878787 }}
    >
      <p>
        Nous utilisons des cookies pour collecter des informations statistiques
        sur les visiteurs de notre site. En continuant à naviguer sur ce site,
        vous acceptez l&apos;utilisation de cookies.
      </p>
      <button
        className="bg-white text-gray-800 px-4 py-2 rounded-md ml-4 mt-4"
        onClick={handleAccept}
      >
        Accepter
      </button>
    </div>
  );
};

export default CookieConsent;
