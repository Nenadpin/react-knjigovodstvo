import { useState, useRef } from "react";
import searchImg from "./img/search.png";
import okImg from "./img/ok.png";
import delImg from "./img/close.png";
import saveImg from "./img/change.png";

function Nivelacija({ setActive }) {
  let datum = new Date();
  let datumStr = `${datum.getDate()} - ${
    datum.getMonth() + 1
  }- ${datum.getFullYear()}`;
  const natpis = <p>Nivelacija na dan: {`${datumStr}`}</p>;
  let idNivelacije = "";
  let Baza = JSON.parse(localStorage.getItem("baza"));
  if (!Baza) setActive(0);

  if (!localStorage.getItem("Nivelacija")) {
    idNivelacije = "1";
  } else {
    idNivelacije = (
      JSON.parse(localStorage.getItem("Nivelacija")).length + 1
    ).toString();
  }
  const [level, setLevel] = useState();
  const [art, searchArt] = useState("");
  const [artP, setArt] = useState("-");
  const [newPrice, setNewPrice] = useState(0);
  const [ArtPrice, setArtPrice] = useState(0);
  const inputRef = useRef();
  const artRef = useRef();
  const [levelDetail, setlevelDetail] = useState([]);
  const [racun, setRacun] = useState(0);

  const operacija = (
    <p className="operacija">Nivelacija br: {`${idNivelacije}`}</p>
  );
  let racunP = (
    <p style={{ fontWeight: "bold" }}>Razlika u ceni: {`${racun}`}</p>
  );
  let artikl = <p>{`${artP}`}</p>;
  function Search(a) {
    let ObjArt = Baza.filter((x) => {
      return x.id === parseInt(a);
    });
    if (ObjArt.length > 0) {
      setArt(`${ObjArt[0].id} ${ObjArt[0].name} ${ObjArt[0].price}`);
      setArtPrice(ObjArt[0].price);
      setLevel({
        id: ObjArt[0].id,
        name: ObjArt[0].name,
        price: ObjArt[0].price,
        ammount: ObjArt[0].stock,
        nPrice: newPrice,
      });

      inputRef.current.focus();
      inputRef.current.value = ObjArt[0].price;
      inputRef.current.select();
    } else {
      alert("Nemate takav proizvod u bazi!");
      setArt("-");
      artRef.current.focus();
    }
  }
  function Nivelisi(a) {
    if (a > 0) {
      setRacun(racun + (a - ArtPrice) * level.ammount);
      setLevel((level.nPrice = parseFloat(newPrice)));
      setNewPrice(0);
      artRef.current.focus();
      setlevelDetail(levelDetail.concat(level));
    } else {
      alert("Neispravna cena!");
    }
  }

  function delArt(id) {
    if (levelDetail) {
      const list = levelDetail.filter((x) => x.id !== id);
      const delList = levelDetail.filter((x) => x.id === id);
      setRacun(
        racun - delList[0].ammount * (delList[0].nPrice - delList[0].price)
      );
      setlevelDetail(list);
    }
  }

  function LevelComplete() {
    if (levelDetail.length) {
      for (let i = 0; i < levelDetail.length; i++) {
        const tIndex = (e) => e.id === levelDetail[i].id;
        const sIndex = Baza.findIndex(tIndex);
        Baza[sIndex].price = levelDetail[i].nPrice;
      }
      localStorage.setItem("baza", JSON.stringify(Baza));
      let tempPrice = parseFloat(localStorage.getItem("lager"));
      tempPrice += racun;
      localStorage.setItem("lager", tempPrice);
      const levelTotall = (br, details) => {
        return { br: br, details: details };
      };
      if (!localStorage.getItem("Nivelacija")) {
        let NivelacijaDetails = [];
        NivelacijaDetails[0] = levelTotall(
          `Nivelacija br: ${idNivelacije} datum ${datumStr} Razlika u ceni ==> ${racun} din`,
          levelDetail
        );
        localStorage.setItem("Nivelacija", JSON.stringify(NivelacijaDetails));
      } else {
        let NivelacijaDetails = JSON.parse(localStorage.getItem("Nivelacija"));
        NivelacijaDetails[NivelacijaDetails.length] = levelTotall(
          `Nivelacija br: ${idNivelacije} datum ${datumStr} Razlika u ceni ==> ${racun} din`,
          levelDetail
        );
        localStorage.setItem("Nivelacija", JSON.stringify(NivelacijaDetails));
      }
      setActive(0);
    }
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
              placeholder="Nova cena:"
              ref={inputRef}
              onChange={(e) => setNewPrice(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  Nivelisi(e.target.value);
                  setNewPrice(0);
                }
              }}
            ></input>
            <button
              className="btn"
              style={{ position: "absolute", height: "45px" }}
              onClick={() => Nivelisi(newPrice)}
            >
              <img src={okImg} alt=""></img>
            </button>
          </div>
        </div>
        <div className="slika">
          <img src={saveImg} alt="" onClick={() => LevelComplete()}></img>
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
          {levelDetail.map(({ id, name, price, ammount, nPrice }) => (
            <p key={id}>
              <button
                className="btn"
                style={{ height: "30px" }}
                onClick={() => delArt(id)}
              >
                <img src={delImg} alt=""></img>
              </button>
              {id} {name} {price} {ammount} kom --- {nPrice}
            </p>
          ))}
        </div>
      </pre>
    </div>
  );
}
export default Nivelacija;
