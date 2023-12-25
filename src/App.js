import MainPage from "./components/MainPage";
import NavBar from "./components/NavBar";
import { useState } from "react";
import { PokemonProvider } from "./context/PokemonProvider";
import logo from "./assets/pokeball.svg";

function App() {
  const [onSearch, setOnSearch] = useState("");
  return (
    <PokemonProvider>
      <div className="sm:px-10">
        <img src={logo} className="opacity-20 fixed -z-50" />
        <NavBar setSearch={setOnSearch} />
        <MainPage search={onSearch} />
      </div>
    </PokemonProvider>
  );
}

export default App;
