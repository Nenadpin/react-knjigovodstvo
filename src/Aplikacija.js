import { useState } from "react";
import ChangeImg from "./img/podesi.png";
import SearchIcon from "./img/search_icon.png";

function Aplikacija({ setActive }) {
  let Baza = JSON.parse(localStorage.getItem("baza"));
  const [filteredBaza, setFilteredBaza] = useState([]);
  let lager = localStorage.getItem("lager");
  const [art, setArt] = useState("");
  const [artName, setArtName] = useState("");
  const [artPrice, setArtPrice] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  if (!Baza) setActive(0);
  const operacija = isDisabled ? (
    <p className="operacija">Izmena parametara proizvoda: {`${art}`}</p>
  ) : (
    <p className="operacija">Pretraga proizvoda</p>
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
      Baza[i].name = artName.toUpperCase();
      localStorage.setItem("baza", JSON.stringify(Baza));
      setActive(0);
    } else {
      setIsDisabled(true);
      setFilteredBaza([]);
    }
  }

  function filterArt() {
    setIsDisabled(false);
    if (art) {
      setFilteredBaza(
        Baza.filter((x) => {
          return x.id >= art;
        })
      );
    } else if (artName) {
      setFilteredBaza(
        Baza.filter((x) => {
          return x.name.includes(artName.toUpperCase());
        })
      );
    } else if (artPrice) {
      setFilteredBaza(
        Baza.filter((x) => {
          return x.price >= parseInt(artPrice);
        })
      );
    }
    setArt("");
    setArtName("");
    setArtPrice("");
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
              onKeyDown={(x) => {
                if (x.key === "Enter") {
                  Search(x.target.value);
                }
              }}
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
              disabled={isDisabled}
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
                <figcaption>Izmeni</figcaption>
              </figure>
              <figure>
                <img
                  className="slikaP"
                  src={SearchIcon}
                  alt=""
                  onClick={() => filterArt()}
                ></img>
                <figcaption>Trazi</figcaption>
              </figure>
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
        {isDisabled
          ? Baza.map(({ id, name, price, stock }) => (
              <p key={id} style={{ margin: "0px" }}>
                {id} {name} {price} - {stock} kom
              </p>
            ))
          : filteredBaza.map(({ id, name, price, stock }) => (
              <p key={id} style={{ margin: "0px" }}>
                {id} {name} {price} - {stock} kom
              </p>
            ))}
      </pre>
    </>
  );
}
export default Aplikacija;
