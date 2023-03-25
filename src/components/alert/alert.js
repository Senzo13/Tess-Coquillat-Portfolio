import { useEffect, useState } from "react";

export default function Alert({ props }) {
  const { message, type, callback, positionType } = props;
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (height == 50) {
      setHeight(0);
    } else {
      setTimeout(() => {
        setHeight(50);
      }, 100);
      setTimeout(() => {
        setHeight(0);
      }, 2500);
      setTimeout(() => {
        return callback();
      }, 3000);
    }
  }, []);

  return (
    <>
      {type == 200 ? (
        <div
          className="alert_success"
          role="alert"
          id="alerterror"
          style={{
            height: height + "px",
            position: positionType,
            zIndex: "8000 !important",
            paddingTop: "10px",
            fontFamily: "Made Tommy Light",
            fontSize: "12px",
          }}
        >
          <label className="mb-2" style={{ color: "white" }}>
            {message}
          </label>
        </div>
      ) : (
        <div
          className="alert_danger"
          role="alert"
          id="alerterror"
          style={{
            height: height + "px",
            position: positionType,
            zIndex: "8000 !important",
            paddingTop: "10px",
            fontFamily: "Made Tommy Light",
          }}
        >
          <label className="mb-2" style={{ color: "white" }}>
            {message}
          </label>
        </div>
      )}
    </>
  );
}
