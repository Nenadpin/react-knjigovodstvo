import React from "react";
import openImg from "./img/open.png";
import { useRef } from "react";

function Novi({ setActive }) {
  let Baza = [];
  let cenaLager = 0;
  const selector = useRef();
  const showFile = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      let a = text.split("\r\n");

      function parseRecord(csvRecord) {
        let record = csvRecord.split(",");
        return {
          id: parseInt(record[0]),
          name: record[1],
          price: parseFloat(record[4]),
          stock: parseFloat(record[7]),
        };
      }
      for (let i = 0; i < a.length; i++) {
        Baza[i] = parseRecord(a[i]);
        cenaLager += Baza[i].price * Baza[i].stock;
      }
      localStorage.setItem("baza", JSON.stringify(Baza));
      localStorage.setItem("lager", JSON.stringify(cenaLager));
    };
    reader.readAsText(e.target.files[0]);
    setActive(0);
    alert("Baza je ucitana");
  };

  return (
    <div>
      <div className="fixed" style={{ height: "210px" }}>
        <div>
          <div style={{ width: "270px" }}>
            <p className="operacija">Izaberite bazu</p>
          </div>
          <p style={{ fontSize: "large" }}>
            Nema baze podataka <br />
            na ovom uredjaju...
            <br />
            <br />
            Sifarnik mora biti u .csv formatu <br />
            sa 8 kolona u obliku: <br />
            <br />
            sifra,naziv,,,cena,,,kol
          </p>
          <div className="slika">
            <figure>
              <img
                src={openImg}
                alt=""
                onClick={() => selector.current.click()}
              />
              <figcaption>Ucitaj CSV</figcaption>
            </figure>
            <div>
              <input
                type="file"
                onChange={showFile}
                ref={selector}
                style={{ display: "none" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Novi;
