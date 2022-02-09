import React from "react";

function Details({ singleItem, detalji, setDetalji }) {
  function Promeni() {
    setDetalji(!detalji);
  }
  return (
    <>
      <div
        className="fixed"
        onClick={() => Promeni()}
        style={{
          marginTop: "250px",
          border: "0",
          height: "800px",
          width: "600px",
          opacity: "0.5",
          boxShadow: "none",
        }}
      ></div>
      <div
        className="fixed"
        style={{
          marginTop: "225px",
          border: "2px solid black",
          MaxHeight: "300px",
          width: "600px",
          borderRadius: "5px",
          overflowY: "auto",
        }}
      >
        <p style={{ fontWeight: "bold" }}>{singleItem[0].br}</p>
        <div
          style={{ marginLeft: "90px", maxHeight: "300px", overflowY: "auto" }}
        >
          {singleItem[0].details.map(({ id, name, price, ammount }) => (
            <p key={id} style={{ margin: "0px" }}>
              {id} {name} {price} - {ammount} kom
            </p>
          ))}
        </div>
      </div>
    </>
  );
}

export default Details;
