import React, { useState, useEffect } from "react";
import Modal from "react-modal";

const ImageModal = ({ isOpen, onRequestClose, imageSrc, size }) => {
  Modal.setAppElement("#__next");

  const { width, height } = size;
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        content: {
          width: `${width}px`,
          height: `${height}px`,
          position: "absolute",
          left: "0%",
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          top: "0%",
        },
      }}
    >
      <div
        style={{
          width: "100%",
          height: "auto",
          backgroundColor: "rgba(0, 0, 0, 0.0)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
          justifyItems: "center",
        }}
        onClick={onRequestClose}
      >
        <div
          style={{
            position: "absolute",
            top: "0.5%",
            right: "7.9%",
            zIndex: 2,
            color: "white",
            fontSize: "2rem",
            cursor: "pointer",
          }}
          onClick={onRequestClose}
        >
          <div
            style={{
              border: "2px solid #3FA9F5",
              fontWeight: "bold",
              color: "#3FA9F5",
              backgroundColor: "rgba(255, 255, 255, 0.935)",
              borderRadius: "10px",
              width: "35px",
              height: "35px",
              display: "flex",
              fontSize: "1rem",
              fontFamily: "Made Tommy LIGHT, sans-serif",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            X
          </div>
        </div>
        <img
          crossorigin="anonymous"
          src={imageSrc}
          width="85%"
          height="100%"
          style={{
            objectFit: "cover",
          }}
        />
      </div>
    </Modal>
  );
};

export default ImageModal;
