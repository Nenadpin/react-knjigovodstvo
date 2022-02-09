import { useState, useRef } from "react";
import searchImg from "./img/search.png";
import okImg from "./img/ok.png";
import delImg from "./img/close.png";
import delImgN from "./img/closeN.png";
import saveImg from "./img/input.png";

function Nabavka({ setActive }) {
  let datum = new Date();
  let datumStr = `${datum.getDate()} - ${
    datum.getMonth() + 1
  }- ${datum.getFullYear()}`;
  let idNabavke = "";
  let Baza = JSON.parse(localStorage.getItem("baza"));
  if (!Baza) setActive(0);

  if (!localStorage.getItem("Nabavka")) {
    idNabavke = "1";
  } else {
    idNabavke = (
      JSON.parse(localStorage.getItem("Nabavka")).length + 1
    ).toString();
  }
  const [buy, setbuy] = useState();
  const [art, searchArt] = useState("");
  const [artP, setArt] = useState("-");
  const [kol, setKol] = useState(0);
  const [ArtPrice, setArtPrice] = useState(0);
  const inputRef = useRef();
  const artRef = useRef();
  const newArtName = useRef();
  const newItem = useRef();
  const newArtPrice = useRef();
  const [buyDetail, setbuyDetail] = useState([]);
  const [racun, setRacun] = useState(0);
  const [newArt, setNewArt] = useState(false);
  const natpis = <p>Nabavka na dan: {`${datumStr}`}</p>;
  const NewArtikl = (
    <div>
      <span
        style={{
          fontWeight: "bolder",
          fontSize: "large",
          marginTop: "10px",
          marginLeft: "2px",
          width: "50px",
        }}
      >
        {art}
      </span>
      <input
        type={"text"}
        autoFocus
        ref={newArtName}
        onBlur={() => {
          if (!newArtName.current.value) newArtName.current.focus();
        }}
        onKeyPress={(e) => {
          if (e.key === "Enter") newArtPrice.current.focus();
        }}
        style={{
          width: "300px",
          left: "90px",
          paddingLeft: "10px",
          marginLeft: "10px",
        }}
      ></input>
      <input
        type={"number"}
        ref={newArtPrice}
        style={{
          width: "50px",
          left: "490px",
          paddingLeft: "10px",
          marginLeft: "10px",
          required: true,
        }}
        onBlur={() => {
          if (!newArtPrice.current.value) newArtPrice.current.focus();
        }}
        onKeyPress={(e) => {
          if (e.key === "Enter") newItem.current.click();
        }}
      ></input>
      <button
        className="btn"
        ref={newItem}
        style={{ position: "relative", left: "4px", top: "14px" }}
        onClick={() => {
          Baza[Baza.length] = {
            id: parseInt(art),
            name: newArtName.current.value,
            price: newArtPrice.current.value,
          };
          setNewArt(false);
          localStorage.setItem("baza", JSON.stringify(Baza));
          searchArt(art);
          artRef.current.focus();
        }}
      >
        <img src={okImg} alt=""></img>
      </button>
      <button
        className="btn"
        style={{ position: "relative", left: "4px", top: "14px" }}
        onClick={() => {
          setNewArt(false);
          searchArt(art);
        }}
      >
        <img src={delImgN} alt=""></img>
      </button>
    </div>
  );
  const operacija = <p className="operacija">Nabavka br: {`${idNabavke}`}</p>;
  let racunP = (
    <p style={{ fontWeight: "bold" }}>Vrednost nabavljene robe: {`${racun}`}</p>
  );
  let artikl = <p>{`${artP}`}</p>;
  function Search(a) {
    let ObjArt = Baza.filter((x) => {
      return x.id === parseInt(a);
    });
    if (ObjArt.length > 0) {
      setArt(`${ObjArt[0].id} ${ObjArt[0].name} ${ObjArt[0].price}`);
      setArtPrice(ObjArt[0].price);
      setbuy({
        id: ObjArt[0].id,
        name: ObjArt[0].name,
        price: ObjArt[0].price,
        ammount: kol,
      });
      searchArt("");
      inputRef.current.focus();
      inputRef.current.select();
    } else {
      alert("Nemate takav proizvod u bazi!");
      setNewArt(true);
    }
  }
  function Buy(a) {
    if (a > 0) {
      setRacun(racun + a * ArtPrice);
      setbuy((buy.ammount = parseFloat(kol)));
      setKol(0);
      artRef.current.focus();
      setbuyDetail(buyDetail.concat(buy));
    } else {
      alert("Neispravna kolicina!");
    }
  }

  function delArt(id) {
    if (buyDetail) {
      const list = buyDetail.filter((x) => x.id !== id);
      const delList = buyDetail.filter((x) => x.id === id);
      setRacun(racun - delList[0].ammount * delList[0].price);
      setbuyDetail(list);
    }
  }

  function buyComplete() {
    for (let i = 0; i < buyDetail.length; i++) {
      const tIndex = (e) => e.id === buyDetail[i].id;
      const sIndex = Baza.findIndex(tIndex);
      Baza[sIndex].stock += buyDetail[i].ammount;
    }
    localStorage.setItem("baza", JSON.stringify(Baza));
    let tempPrice = parseFloat(localStorage.getItem("lager"));
    tempPrice += racun;
    localStorage.setItem("lager", tempPrice.toString());
    const buyTotall = (br, details) => {
      return { br: br, details: details };
    };
    if (!localStorage.getItem("Nabavka")) {
      let NabavkaDetails = [];

      NabavkaDetails[0] = buyTotall(
        `Nabavka br: ${idNabavke} datum ${datumStr} Ukupan iznos ==> ${racun} din`,
        buyDetail
      );
      localStorage.setItem("Nabavka", JSON.stringify(NabavkaDetails));
    } else {
      let NabavkaDetails = JSON.parse(localStorage.getItem("Nabavka"));
      NabavkaDetails[NabavkaDetails.length] = buyTotall(
        `Nabavka br: ${idNabavke} datum ${datumStr} Ukupan iznos ==> ${racun} din`,
        buyDetail
      );
      localStorage.setItem("Nabavka", JSON.stringify(NabavkaDetails));
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
                  Buy(e.target.value);
                  setKol(0);
                }
              }}
            ></input>
            <button
              className="btn"
              style={{ position: "absolute", height: "45px" }}
              onClick={() => Buy(kol)}
            >
              <img src={okImg} alt=""></img>
            </button>
          </div>
        </div>
        <div className="slika">
          <img src={saveImg} alt="" onClick={() => buyComplete()}></img>
        </div>
        {newArt ? NewArtikl : artikl}
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
          {buyDetail.map(({ id, name, price, ammount }) => (
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
export default Nabavka;
