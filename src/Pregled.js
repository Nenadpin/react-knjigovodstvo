import { useState } from "react";
import buyImg from "./img/input.png";
import changeImg from "./img/change.png";
import artImg from "./img/menu.png";
import saveImg from "./img/save.png";
import delImg from "./img/detail.png";
import Details from "./Details";

function Pregled({ setActive }) {
  const [idPregled, setIdPregled] = useState("PROIZVODI");
  const [detalji, setDetalji] = useState(false);
  const [singleItem, setSingleItem] = useState([]);
  let Baza = JSON.parse(localStorage.getItem("baza"));
  let prikaz = Baza;
  if (idPregled === "prodaja") {
    prikaz = JSON.parse(localStorage.getItem("prodaja"));
  } else if (idPregled === "nabavka") {
    prikaz = JSON.parse(localStorage.getItem("Nabavka"));
  } else if (idPregled === "nivelacija") {
    prikaz = JSON.parse(localStorage.getItem("Nivelacija"));
  } else prikaz = Baza;
  if (!Baza) setActive(0);
  if (!prikaz) prikaz = [];
  const operacija = (
    <p className="operacija">Knjigovodstveni pregled: {`${idPregled}`}</p>
  );
  function Prikazi(e) {
    setDetalji(true);
    setSingleItem(prikaz.filter((x) => x.br === e));
  }

  return (
    <div>
      {detalji ? (
        <Details
          singleItem={singleItem}
          detalji={detalji}
          setDetalji={setDetalji}
        />
      ) : null}
      <div className="fixed forma">
        <div className="unos" style={{ width: "600px" }}>
          {operacija}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <div
              style={{
                width: "150px",
                display: "flex",
                flexDirection: "column",
                marginTop: "20px",
                marginBottom: "10px",
                alignItems: "center",
                fontWeight: "bold",
              }}
            >
              <img
                className="slikaP"
                src={saveImg}
                alt=""
                onClick={() => {
                  setIdPregled("prodaja");
                  setDetalji(false);
                }}
              ></img>
              <span style={{ marginTop: "20px" }}>PRODAJA</span>
            </div>
            <div
              style={{
                width: "150px",
                display: "flex",
                flexDirection: "column",
                marginTop: "20px",
                marginBottom: "10px",
                alignItems: "center",
                fontWeight: "bold",
              }}
            >
              <img
                className="slikaP"
                src={buyImg}
                alt=""
                onClick={() => {
                  setIdPregled("nabavka");
                  setDetalji(false);
                }}
              ></img>
              <span style={{ marginTop: "20px" }}>NABAVKA</span>
            </div>
            <div
              style={{
                width: "150px",
                display: "flex",
                flexDirection: "column",
                marginTop: "20px",
                marginBottom: "10px",
                alignItems: "center",
                fontWeight: "bold",
              }}
            >
              <img
                className="slikaP"
                src={changeImg}
                alt=""
                onClick={() => {
                  setIdPregled("nivelacija");
                  setDetalji(false);
                }}
              ></img>
              <span style={{ marginTop: "20px" }}>NIVELACIJA</span>
            </div>
            <div
              style={{
                width: "150px",
                display: "flex",
                flexDirection: "column",
                marginTop: "20px",
                marginBottom: "10px",
                alignItems: "center",
                fontWeight: "bold",
              }}
            >
              <img
                className="slikaP"
                src={artImg}
                alt=""
                onClick={() => {
                  setIdPregled("PROIZVODI");
                  setDetalji(false);
                }}
              ></img>
              <span style={{ marginTop: "20px" }}>PROIZVODI</span>
            </div>
          </div>
        </div>
      </div>
      <pre
        style={{
          display: "flex",
          flexDirection: "column",
          maxHeight: "800px",
          overflowY: "auto",
          marginLeft: "90px",
          marginTop: "250px",
        }}
      >
        {idPregled === "PROIZVODI" ? (
          <div className="tabela">
            {prikaz
              .filter((x) => x.stock !== 0)
              .map(({ id, name, price, stock }) => (
                <>
                  <span key={id}>{id}</span>
                  <span>{name} </span>
                  <span>{price}</span>
                  <span>{stock}</span>
                  <span> kom</span>
                </>
              ))}
          </div>
        ) : (
          prikaz.map(({ br }) => (
            <p key={br} style={{ margin: "0px" }}>
              <button
                className="btn"
                style={{ height: "30px" }}
                onClick={() => Prikazi(br)}
              >
                <img src={delImg} alt=""></img>
              </button>
              {br}{" "}
            </p>
          ))
        )}
      </pre>
    </div>
  );
}
export default Pregled;
