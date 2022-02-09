const Meni = ({ active, setActive }) => {
  function Izbor(a) {
    if (!localStorage.getItem("baza")) {
      setActive(6);
    } else setActive(a);
  }
  return (
    <div>
      <button
        className="meniBtn"
        onClick={() => Izbor(1)}
        style={active === 1 ? { color: "white" } : { color: "silver" }}
      >
        {"Prodaja"}
      </button>
      <button
        className="meniBtn"
        onClick={() => Izbor(2)}
        style={active === 2 ? { color: "white" } : { color: "silver" }}
      >
        {"Nabavka"}
      </button>
      <button
        className="meniBtn"
        onClick={() => Izbor(3)}
        style={active === 3 ? { color: "white" } : { color: "silver" }}
      >
        {"Nivelacija"}
      </button>
      <button
        className="meniBtn"
        onClick={() => Izbor(4)}
        style={active === 4 ? { color: "white" } : { color: "silver" }}
      >
        {"Pregled"}
      </button>
      <button
        className="meniBtn"
        onClick={() => Izbor(5)}
        style={active === 5 ? { color: "white" } : { color: "silver" }}
      >
        {"Aplikacija"}
      </button>
    </div>
  );
};
export default Meni;
