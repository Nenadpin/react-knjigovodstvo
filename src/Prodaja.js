import { useState, useRef } from "react";
import searchImg from "./img/search.png";
import okImg from "./img/ok.png";
import delImg from "./img/close.png";
import saveImg from "./img/save.png";

function Prodaja({ setActive }) {
  let datum = new Date();
  let datumStr = `${datum.getDate()} - ${
    datum.getMonth() + 1
  }- ${datum.getFullYear()}`;
  const natpis = <p>Prodaja na dan: {`${datumStr}`}</p>;
  let idProdaje = "";
  let Baza = JSON.parse(localStorage.getItem("baza"));
  if (!Baza) setActive(0);

  if (!localStorage.getItem("prodaja")) {
    idProdaje = "1";
  } else {
    idProdaje = (
      JSON.parse(localStorage.getItem("prodaja")).length + 1
    ).toString();
  }
  const [sell, setSell] = useState();
  const [art, searchArt] = useState("");
  const [artP, setArt] = useState("-");
  const [kol, setKol] = useState(0);
  const [ArtPrice, setArtPrice] = useState(0);
  const inputRef = useRef();
  const artRef = useRef();
  const [sellDetail, setsellDetail] = useState([]);
  const [racun, setRacun] = useState(0);

  const operacija = <p className="operacija">Prodaja br: {`${idProdaje}`}</p>;
  let racunP = (
    <p style={{ fontWeight: "bold" }}>Vrednost prodate robe: {`${racun}`}</p>
  );
  let artikl = <p>{`${artP}`}</p>;
  function Search(a) {
    let ObjArt = Baza.filter((x) => {
      return x.id === parseInt(a);
    });
    if (ObjArt.length > 0) {
      setArt(`${ObjArt[0].id} ${ObjArt[0].name} ${ObjArt[0].price}`);
      setArtPrice(ObjArt[0].price);
      setSell({
        id: ObjArt[0].id,
        name: ObjArt[0].name,
        price: ObjArt[0].price,
        ammount: kol,
      });

      inputRef.current.focus();
      inputRef.current.select();
    } else {
      alert("Nemate takav proizvod u bazi!");
      setArt("-");
      artRef.current.focus();
    }
  }
  function Prodaj(a) {
    if (a > 0) {
      setRacun(racun + a * ArtPrice);
      setSell((sell.ammount = parseFloat(kol)));
      setKol(0);
      artRef.current.focus();
      setsellDetail(sellDetail.concat(sell));
    } else {
      alert("Neispravna kolicina!");
    }
  }

  function delArt(id) {
    if (sellDetail) {
      const list = sellDetail.filter((x) => x.id !== id);
      const delList = sellDetail.filter((x) => x.id === id);
      setRacun(racun - delList[0].ammount * delList[0].price);
      setsellDetail(list);
    }
  }

  function SellComplete() {
    for (let i = 0; i < sellDetail.length; i++) {
      const tIndex = (e) => e.id === sellDetail[i].id;
      const sIndex = Baza.findIndex(tIndex);
      Baza[sIndex].stock -= sellDetail[i].ammount;
    }
    localStorage.setItem("baza", JSON.stringify(Baza));
    let tempPrice = parseFloat | localStorage.getItem("lager");
    tempPrice -= racun;
    localStorage.setItem("lager", tempPrice.toString());
    const sellTotall = (br, details) => {
      return { br: br, details: details };
    };
    if (!localStorage.getItem("prodaja")) {
      let prodajaDetails = [];
      prodajaDetails[0] = sellTotall(
        `Prodaja br: ${idProdaje} datum ${datumStr} Ukupan iznos ==> ${racun} din`,
        sellDetail
      );
      localStorage.setItem("prodaja", JSON.stringify(prodajaDetails));
    } else {
      let prodajaDetails = JSON.parse(localStorage.getItem("prodaja"));
      prodajaDetails[prodajaDetails.length] = sellTotall(
        `Prodaja br: ${idProdaje} datum ${datumStr} Ukupan iznos ==> ${racun} din`,
        sellDetail
      );
      localStorage.setItem("prodaja", JSON.stringify(prodajaDetails));
    }
    setActive(0);
  }

  return (
    <div>
      <div className="fixed forma">
        <div className="unos" style={{ width: "270px" }}>
          {operacija}
          <div style={{ marginBottom: "2px" }}>
            <input
              type="number"
              onFocus={(e) => (e.target.value = "")}
              style={{ paddingLeft: "10px" }}
              placeholder="Sifra artikla:"
              value={art}
              autoFocus={true}
              ref={artRef}
              onChange={(e) => searchArt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  Search(e.target.value);
                  searchArt("");
                }
              }}
            ></input>
            <button
              className="btn"
              style={{ position: "absolute", height: "45px" }}
              onClick={() => Search(art)}
            >
              <img src={searchImg} alt=""></img>
            </button>
          </div>
          <div style={{ marginBottom: "2px" }}>
            <input
              type="number"
              style={{ paddingLeft: "10px" }}
              placeholder="Kolicina:"
              value={kol}
              ref={inputRef}
              onChange={(e) => setKol(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  Prodaj(e.target.value);
                  setKol(0);
                }
              }}
            ></input>
            <button
              className="btn"
              style={{ position: "absolute", height: "45px" }}
              onClick={() => Prodaj(kol)}
            >
              <img src={okImg} alt=""></img>
            </button>
          </div>
        </div>
        <div className="slika">
          <img src={saveImg} alt="" onClick={() => SellComplete()}></img>
        </div>
        {artikl}
        <hr></hr>
        {racunP}
      </div>
      <pre
        style={{
          display: "flex",
          flexDirection: "column",
          maxHeight: "1000px",
          overflowY: "auto",
        }}
      >
        {natpis}
        <div
          style={{ marginLeft: "90px", maxHeight: "800px", overflowY: "auto" }}
        >
          {sellDetail.map(({ id, name, price, ammount }) => (
            <p key={id} style={{ margin: "0px" }}>
              <button
                className="btn"
                style={{ height: "30px" }}
                onClick={() => delArt(id)}
              >
                <img src={delImg} alt=""></img>
              </button>
              {id} {name} {price} - {ammount} kom
            </p>
          ))}
        </div>
      </pre>
    </div>
  );
}
export default Prodaja;
