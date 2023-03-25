import React, { useEffect } from "react";
import { useState } from "react";

export default function Screen() {
  const [screenWidth, setScreenWidth] = useState(0);
  const [screenHeight, setScreenHeight] = useState(0);
  const [screenRatio, setScreenRatio] = useState(0, 5);
  const [userAgent, setUserAgent] = useState("");

  useEffect(() => {
    // console.log("screen width : " + screen.width);
    setScreenWidth(screen.width);
    // console.log("screen height : " + screen.height);
    setScreenHeight(screen.height);
    setScreenRatio(screen.width / screen.height);
    // console.log("screen ratio : " + screen.width / screen.height);
    setUserAgent(navigator.userAgent);
    // console.log(navigator.userAgent);
  }, []);

  return (
    <div>
      <h1>Screen</h1>
      <p>screen width : {screenWidth}</p>
      <p>screen height : {screenHeight}</p>
      <p>screen ratio : {screenRatio}</p>
      <p>user agent : {userAgent}</p>
    </div>
  );
}
