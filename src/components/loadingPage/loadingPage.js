import { useState, useEffect } from "react";
export default function LoadingPage() {
  const [width, setWidth] = useState(100);

  useEffect(() => {
    setTimeout(() => {
      if (width == 100) {
        setWidth(0);
      }
    }, 2100);
  }, []);

  return (
    <div
      className="loadingPage"
      style={{ transition: "0.25s", width: width + "%" }}
    >
      <div className="colorful"></div>
    </div>
  );
}
