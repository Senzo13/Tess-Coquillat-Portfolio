function Formes() {
  return (
    <>
      <div
        style={{
          display: "flex",
          // backgroundColor: "black",
          width: "100%",
        }}
      >
        <div
          className="formes-custom"
          style={{
            // backgroundColor: "green",
            marginLeft: "-25%",
            marginTop: "17%",
            width: "100%",
          }}
        >
          <object
            data="/assets/formes/forme-organique-2.svg"
            type="image/svg+xml"
            width="100%"
          />
        </div>

        <div
          className="formes-design"
          style={{ width: "45%", marginLeft: "-35%", marginTop: "4.5%" }}
        >
          <object
            data="/assets/formes/design.svg"
            type="image/svg+xml"
            width="100%"
          />
        </div>

        <div
          className="formes-design-texte-rond"
          id="rotate"
          style={{ width: "45%", marginLeft: "-60%", marginTop: "14.5%" }}
        >
          <img
            src="/assets/formes/texte-rond-2.svg"
            type="image/svg+xml"
            width="100%"
          />
        </div>
      </div>

      <div
        className="prestations"
        style={{ width: "60%", marginLeft: "35%", marginTop: "-45%" }}
      >
        <object
          data="/assets/prestations/titre-prestations.svg"
          type="image/svg+xml"
          width="40%"
          style={{ marginBottom: "2%" }}
        />
        <object
          data="/assets/prestations/mes prestations-JAN23.svg"
          type="image/svg+xml"
          id="form-mes-prestations"
        />
      </div>
    </>
  );
}

export default Formes;
