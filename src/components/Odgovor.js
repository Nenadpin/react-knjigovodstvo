import ok from "../img/ok.png";
import bad from "../img/bad.png";
import { useRef } from "react";

let pitanje = [];
let temp = [];

function Odgovor(props) {
  let t = 0,
    n = 0;
  let slike = [];
  const iconOK = useRef(slike);
  for (let z = 0; z < 4; z++) {
    temp[z] = props.zadatak[z];
  }

  pitanje = props.proba.slice(0, 4);
  for (let j = 0; j < 4; j++) {
    if (pitanje[j] === temp[j]) {
      iconOK.current.push(ok);
      t = t + 1;
      pitanje[j] = 0;
      temp[j] = 0;
      if(t===4){
        props.endOfGame(24)
      }
    }
  }

  for (let k = 0; k < 4; k++) {
    for (let m = 0; m < 4; m++) {
      if (pitanje[k] === temp[m] && pitanje[k] !== 0) {
        iconOK.current.push(bad);
        n = n + 1;
        pitanje[k] = 0;
        temp[m] = 0;
      }
    }
  }

  return (
    <div className="prviRed">
      {t + n > 0 ? (
        <button>
          <img src={iconOK.current[0]} alt="" />
        </button>
      ) : null}
      {t + n > 1 ? (
        <button>
          <img src={iconOK.current[1]} alt="" />
        </button>
      ) : null}
      {t + n > 2 ? (
        <button>
          <img src={iconOK.current[2]} alt="" />
        </button>
      ) : null}
      {t + n > 3 ? (
        <button>
          <img src={iconOK.current[3]} alt="" />
        </button>
      ) : null}
    </div>
  );
}
export default Odgovor;
