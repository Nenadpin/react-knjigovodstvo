import { useState } from "react";
import ChangeImg from "./img/podesi.png";

function Aplikacija({ setActive }) {
  let Baza = JSON.parse(localStorage.getItem("baza"));
  let lager = localStorage.getItem("lager");
  const [art, setArt] = useState("");
  const [artName, setArtName] = useState("");
  const [artPrice, setArtPrice] = useState("");

  if (!Baza) setActive(0);
  const operacija = <p className="operacija">Pretraga proizvoda</p>;

  const vrednost = (
    <p className="operacija">Knjigovodstveno stanje: {`${lager}`}</p>
  );

  function Promeni() {
    if (art && artName) {
      let i = Baza.findIndex((e) => e.id === parseInt(art));
      if (i !== -1) {
        if (window.confirm(`Sigurni ste da menjamo naziv artikla ${art}?`)) {
          Baza[i].name = artName.toUpperCase();
          localStorage.setItem("baza", JSON.stringify(Baza));
          setActive(0);
        }
      } else {
        alert("nemate  takav proizvod u bazi");
      }
    }
  }

  return (
    <>
      <div className="fixed forma">
        {operacija}
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "330px",
              float: "left",
            }}
          >
            <input
              type="number"
              onFocus={(e) => {
                e.target.value = "";
                setArt("");
              }}
              style={{ paddingLeft: "10px" }}
              placeholder="Sifra artikla:"
              value={art}
              autoFocus={true}
              onChange={(e) => setArt(e.target.value)}
            ></input>
            <input
              type="text"
              style={{ paddingLeft: "10px" }}
              placeholder="Naziv artikla:"
              value={artName}
              onChange={(e) => setArtName(e.target.value)}
            ></input>
            <input
              type="number"
              style={{ paddingLeft: "10px" }}
              placeholder="cena:"
              value={artPrice}
              onChange={(e) => setArtPrice(e.target.value)}
            ></input>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "250px",
              float: "left",
              marginLeft: "20px",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <figure>
                <img
                  className="slikaP"
                  src={ChangeImg}
                  alt=""
                  onClick={() => Promeni()}
                ></img>
                <figcaption>Promeni</figcaption>
              </figure>
              {/* <figure>
                <img
                  className="slikaP"
                  src={SearchIcon}
                  alt=""
                  // onClick={() => filterArt()}
                ></img>
                <figcaption>Trazi</figcaption>
              </figure> */}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "240px",
                justifyContent: "space-evenly",
              }}
            ></div>
          </div>
        </div>
        <hr></hr>
        {vrednost}
      </div>
      <pre
        style={{
          display: "flex",
          flexDirection: "column",
          maxHeight: "630px",
          overflowY: "auto",
          marginLeft: "90px",
        }}
      >
        <div className="tabela">
          {Baza.filter((i) => {
            return (
              i.name.toUpperCase().includes(artName.toUpperCase()) &&
              i.id >= art &&
              i.price >= artPrice
            );
          }).map(({ id, name, price, stock }) => (
            <>
              <span key={id}>{id}</span>
              <span> {name}</span>
              <span> {price}</span> <span>{stock} </span>
              <span>kom</span>
            </>
          ))}
        </div>
      </pre>
    </>
  );
}
export default Aplikacija;
