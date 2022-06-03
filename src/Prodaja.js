import { useState, useRef } from "react";
import searchImg from "./img/search.png";
import okImg from "./img/ok.png";
import delImg from "./img/close.png";
import saveImg from "./img/save.png";
import openImg from "./img/open.png";

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
  const selector = useRef();
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
  const showFile = (e) => {
    e.preventDefault();
    if (e.target.files[0].name.split(".").pop().toLowerCase() === "json") {
      let count = 0;
      let tempLager = 0;
      const reader = new FileReader();
      reader.onload = (e) => {
        const sellData = JSON.parse(e.target.result);

        let prodajaDetails = [];
        if (localStorage.getItem("prodaja")) {
          prodajaDetails = JSON.parse(localStorage.getItem("prodaja"));
        }
        tempLager = parseFloat(JSON.parse(localStorage.getItem("lager")));
        if (!sellData[0]) {
          alert("Ucitali ste pogresan fajl");
          return;
        }
        let currentDate = sellData[
          sellData.length - 1
        ].SDCTime_ServerTimeZone.substring(0, 11);

        prodajaDetails.push({
          br: "",
          details: [],
        });

        for (let i = sellData.length - 1; i > -1; i--) {
          if (
            sellData[i].SDCTime_ServerTimeZone.substring(0, 11) !== currentDate
          ) {
            currentDate = sellData[i].SDCTime_ServerTimeZone.substring(0, 11);
            prodajaDetails.push({
              br: "",
              details: [],
            });
            tempLager -= count;
            count = 0;
          }
          count += sellData[i].TotalAmount;

          prodajaDetails[prodajaDetails.length - 1].br = `Prodaja br: ${
            prodajaDetails.length
          } datum ${sellData[i].SDCTime_ServerTimeZone.substring(
            0,
            11
          )} Ukupan iznos ==> ${count} din`;

          for (let j = 0; j < sellData[i].Items.length; j++) {
            prodajaDetails[prodajaDetails.length - 1].details.push({
              id: `${
                prodajaDetails[prodajaDetails.length - 1].details.length + 1
              }`,
              name: `${sellData[i].Items[j].Name}`,
              price: `${sellData[i].Items[j].UnitPrice}`,
              ammount: `${sellData[i].Items[j].Quantity}`,
            });
          }
        }
        if (sellData[0].Cashier !== "Nenad") {
          alert("Ucitali ste pogresan fajl");
          return;
        }
        localStorage.setItem("prodaja", JSON.stringify(prodajaDetails));
        localStorage.setItem("lager", JSON.stringify(tempLager - count));

        alert(`Podaci prodaje su ucitani`);
      };

      reader.readAsText(e.target.files[0]);
    } else alert("Ucitali ste pogresan fajl");
  };

  function SellComplete() {
    if (sellDetail.length) {
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
  }

  return (
    <div>
      <input
        type="file"
        onChange={showFile}
        ref={selector}
        style={{ display: "none" }}
      />
      <div className="fixed forma">
        <div style={{ display: "flex" }}>
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
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div className="slikaP" style={{ marginLeft: "80px" }}>
              <img src={saveImg} alt="" onClick={() => SellComplete()}></img>
            </div>
            <div className="slikaP">
              <img
                src={openImg}
                alt=""
                onClick={() => selector.current.click()}
              ></img>
            </div>
          </div>
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
