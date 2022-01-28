import "./App.css";
import { useState } from "react";
let pocetak = [];
let pokusaj = [];
let igrac = true;
let tekst = "";
let pobednik = null;
let igra = true;

function App() {
  const [dugme1, promeni1] = useState(".");
  const [dugme2, promeni2] = useState(".");
  const [dugme3, promeni3] = useState(".");
  const [dugme4, promeni4] = useState(".");
  const [dugme5, promeni5] = useState(".");
  const [dugme6, promeni6] = useState(".");
  const [dugme7, promeni7] = useState(".");
  const [dugme8, promeni8] = useState(".");
  const [dugme9, promeni9] = useState(".");
  pokusaj[0] = pocetak[0] + pocetak[1] + pocetak[2];
  pokusaj[1] = pocetak[3] + pocetak[4] + pocetak[5];
  pokusaj[2] = pocetak[6] + pocetak[7] + pocetak[8];
  pokusaj[3] = pocetak[0] + pocetak[3] + pocetak[6];
  pokusaj[4] = pocetak[1] + pocetak[4] + pocetak[7];
  pokusaj[5] = pocetak[2] + pocetak[5] + pocetak[8];
  pokusaj[6] = pocetak[0] + pocetak[4] + pocetak[8];
  pokusaj[7] = pocetak[2] + pocetak[4] + pocetak[6];
  if (igrac) {
    tekst = "Sledeci igrac: X";
  } else {
    tekst = "Sledeci igrac: O";
  }
  if (pokusaj.includes(3)) {
    pobednik = "Podedio je igrac X";
    igra = false;
  } else if (pokusaj.includes(0)) {
    pobednik = "Pobedio je igrac O";
    igra = false;
  }
  function Klik(a) {
    if (igra) {
      if (a === 1 && dugme1 === ".") {
        if (igrac) {
          promeni1("X");
          pocetak[0] = 1;
          igrac = !igrac;
        } else {
          promeni1("O");
          pocetak[0] = 0;
          igrac = !igrac;
        }
      } else if (a === 2 && dugme2 === ".") {
        if (igrac) {
          promeni2("X");
          igrac = !igrac;
          pocetak[1] = 1;
        } else {
          promeni2("O");
          igrac = !igrac;
          pocetak[1] = 0;
        }
      } else if (a === 3 && dugme3 === ".") {
        if (igrac) {
          promeni3("X");
          igrac = !igrac;
          pocetak[2] = 1;
        } else {
          promeni3("O");
          igrac = !igrac;
          pocetak[2] = 0;
        }
      } else if (a === 4 && dugme4 === ".") {
        if (igrac) {
          promeni4("X");
          igrac = !igrac;
          pocetak[3] = 1;
        } else {
          promeni4("O");
          igrac = !igrac;
          pocetak[3] = 0;
        }
      } else if (a === 5 && dugme5 === ".") {
        if (igrac) {
          promeni5("X");
          igrac = !igrac;
          pocetak[4] = 1;
        } else {
          promeni5("O");
          igrac = !igrac;
          pocetak[4] = 0;
        }
      } else if (a === 6 && dugme6 === ".") {
        if (igrac) {
          promeni6("X");
          igrac = !igrac;
          pocetak[5] = 1;
        } else {
          promeni6("O");
          igrac = !igrac;
          pocetak[5] = 0;
        }
      } else if (a === 7 && dugme7 === ".") {
        if (igrac) {
          promeni7("X");
          igrac = !igrac;
          pocetak[6] = 1;
        } else {
          promeni7("O");
          igrac = !igrac;
          pocetak[6] = 0;
        }
      } else if (a === 8 && dugme8 === ".") {
        if (igrac) {
          promeni8("X");
          igrac = !igrac;
          pocetak[7] = 1;
        } else {
          promeni8("O");
          igrac = !igrac;
          pocetak[7] = 0;
        }
      } else if (a === 9 && dugme9 === ".") {
        if (igrac) {
          promeni9("X");
          igrac = !igrac;
          pocetak[8] = 1;
        } else {
          promeni9("O");
          igrac = !igrac;
          pocetak[8] = 0;
        }
      }
    }
  }

  return (
    <div className="App">
      <div className="App-header">
        <div className="igra">
          <button onClick={() => Klik(1)}>{dugme1}</button>
          <button onClick={() => Klik(2)}>{dugme2}</button>
          <button onClick={() => Klik(3)}>{dugme3}</button>
          <button onClick={() => Klik(4)}>{dugme4}</button>
          <button onClick={() => Klik(5)}>{dugme5}</button>
          <button onClick={() => Klik(6)}>{dugme6}</button>
          <button onClick={() => Klik(7)}>{dugme7}</button>
          <button onClick={() => Klik(8)}>{dugme8}</button>
          <button onClick={() => Klik(9)}>{dugme9}</button>
        </div>
        {igra ? <p>{tekst}</p> : <p>{pobednik}</p>}
      </div>
    </div>
  );
}
export default App;
