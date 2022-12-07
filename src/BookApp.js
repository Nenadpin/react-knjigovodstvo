import "./App.css";
import Novi from "./Novi";
import Meni from "./meni";
import Prodaja from "./Prodaja";
import Nabavka from "./Nabavka";
import Nivelacija from "./Nivelacija";
import Pregled from "./Pregled";
import Aplikacija from "./Aplikacija";
import { useState } from "react";

function BookApp() {
  const [active, setActive] = useState(0);

  return (
    <header className="meni">
      <Meni active={active} setActive={setActive} />
      {active === 6 ? <Novi setActive={setActive} /> : null}
      {active === 1 ? <Prodaja setActive={setActive} /> : null}
      {active === 2 ? <Nabavka setActive={setActive} /> : null}
      {active === 3 ? <Nivelacija setActive={setActive} /> : null}
      {active === 4 ? <Pregled setActive={setActive} /> : null}
      {active === 5 ? <Aplikacija setActive={setActive} /> : null}
    </header>
  );
}
export default BookApp;
