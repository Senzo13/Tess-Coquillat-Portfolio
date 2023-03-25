import React, { useState, useEffect } from "react";

const Clock = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <p
      style={{
        fontSize: "30px",
        margin: "0px",
        padding: "0px",
        fontWeight: "bold",
        fontFamily: "Made Tommy Bold",
      }}
    >
      {time}
    </p>
  );
};

export default Clock;
