import MainPage from "./components/MainPage";
import NavBar from "./components/NavBar";
import { useState } from "react";
import { PokemonProvider } from "./context/PokemonProvider";

function App() {
  const [onSearch, setOnSearch] = useState("");
  return (
    <PokemonProvider>
      <div className="sm:px-10">
        <NavBar setSearch={setOnSearch} />
        <MainPage search={onSearch} />
      </div>
    </PokemonProvider>
  );
}

export default App;
