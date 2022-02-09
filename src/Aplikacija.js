import { useState } from "react";
import ChangeImg from "./img/podesi.png";

function Aplikacija({ setActive }) {
  let Baza = JSON.parse(localStorage.getItem("baza"));
  let lager = localStorage.getItem("lager");
  const [art, setArt] = useState("");
  const [artName, setArtName] = useState("");
  const [artPrice, setArtPrice] = useState("");

  if (!Baza) setActive(0);
  const operacija = (
    <p className="operacija">Izmena parametara proizvoda: {`${art}`}</p>
  );
  const vrednost = (
    <p className="operacija">Knjigovodstveno stanje: {`${lager}`}</p>
  );

  function Search(a) {
    let ObjArt = Baza.filter((x) => {
      return x.id === parseInt(a);
    });
    if (ObjArt.length > 0) {
      setArt(ObjArt[0].id);
      setArtName(ObjArt[0].name);
      setArtPrice(ObjArt[0].price);
    } else {
      alert("Nemate takav proizvod u bazi!");
    }
  }

  function Promeni() {
    if (art) {
      let i = Baza.findIndex((e) => e.id === art);
      Baza[i].name = artName;
      Baza[i].price = artPrice;
      localStorage.setItem("baza", JSON.stringify(Baza));
      setActive(0);
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
              width: "400px",
              float: "left",
            }}
          >
            <input
              type="number"
              onFocus={(e) => (e.target.value = "")}
              style={{ paddingLeft: "10px" }}
              placeholder="Sifra artikla:"
              value={art}
              autoFocus={true}
              onChange={(e) => setArt(e.target.value)}
              onKeyDown={(x) => {
                if (x.key === "Enter") {
                  Search(x.target.value);
                }
              }}
            ></input>
            <input
              type="text"
              onFocus={(e) => (e.target.value = "")}
              style={{ paddingLeft: "10px" }}
              placeholder="Naziv artikla:"
              value={artName}
              onChange={(e) => setArtName(e.target.value)}
            ></input>
            <input
              type="number"
              onFocus={(e) => (e.target.value = "")}
              style={{ paddingLeft: "10px" }}
              placeholder="cena:"
              value={artPrice}
              onChange={(e) => setArtPrice(e.target.value)}
            ></input>
          </div>
          <div
            style={{
              display: "flex",
              width: "150px",
              float: "left",
              flexDirection: "column",
              marginLeft: "20px",
              alignItems: "center",
            }}
          >
            <img
              className="slikaP"
              src={ChangeImg}
              alt=""
              onClick={() => Promeni()}
            ></img>
            <span style={{ marginTop: "20px", fontWeight: "bold" }}>
              ZAMENI
            </span>
          </div>
        </div>
        <hr></hr>
        {vrednost}
      </div>
      <pre
        style={{
          display: "flex",
          flexDirection: "column",
          maxHeight: "800px",
          overflowY: "auto",
          marginLeft: "90px",
        }}
      >
        {Baza.map(({ id, name, price, stock }) => (
          <p key={id} style={{ margin: "0px" }}>
            {id} {name} {price} - {stock} kom
          </p>
        ))}
      </pre>
    </>
  );
}
export default Aplikacija;
