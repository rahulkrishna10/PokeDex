import { useEffect, useState } from "react";
import axios from "axios";
import { PokemonContext } from "./PokemonContext";

export const PokemonProvider = ({ children }) => {
  const [allPokemons, setAllPokemons] = useState([]);
  const [globalPokemons, setGlobalPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(false);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [filterType, setFilterType] = useState("");
  const [allTypes, setAllTypes] = useState([]);

  const baseURL = "https://pokeapi.co/api/v2/";

  const fetchData = async (url) => {
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  const fetchPokemonData = async (url) => {
    const data = await fetchData(url);
    return data;
  };

  const processResults = async (results) => {
    const data = await Promise.all(
      results.map(async (pokemon) => fetchPokemonData(pokemon.url))
    );
    return data;
  };

  const getAllPokemons = async (limit = 20) => {
    const res = await fetchData(
      `${baseURL}pokemon?limit=${limit}&offset=${offset}`
    );
    const results = res.results;

    const data = await processResults(results);

    setAllPokemons([...allPokemons, ...data]);
    setLoading(false);
  };

  const getGlobalPokemons = async () => {
    const res = await fetchData(`${baseURL}pokemon?limit=649&offset=0`);
    const results = res.results;

    const data = await processResults(results);

    setGlobalPokemons([...globalPokemons, ...data]);
    setLoading(false);
  };

  const getAllTypes = async () => {
    try {
      const response = await axios.get(`${baseURL}type`);
      const types = response.data.results;
      setAllTypes(types);
    } catch (error) {
      console.error("Error fetching types:", error);
    }
  };

  const applyFilter = () => {
    let filteredResults = allPokemons;

    if (filterType) {
      filteredResults = globalPokemons.filter((pokemon) =>
        pokemon.types?.some(
          (type) => type.type.name === filterType.toLowerCase()
        )
      );
    }

    setFilteredPokemons(filteredResults);
  };

  useEffect(() => {
    getAllPokemons();
    getAllTypes();
  }, [offset]);

  useEffect(() => {
    getGlobalPokemons();
  }, []);

  useEffect(() => {
    applyFilter();
  }, [allPokemons, filterType]);

  const onClickLoadMore = () => {
    setOffset(offset + 20);
  };

  return (
    <PokemonContext.Provider
      value={{
        allPokemons,
        globalPokemons,
        onClickLoadMore,
        loading,
        setLoading,
        active,
        setActive,
        filteredPokemons,
        setFilteredPokemons,
        filterType,
        setFilterType,
        allTypes,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};
