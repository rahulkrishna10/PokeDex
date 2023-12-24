import React, { useContext, useEffect, useState } from "react";
import PokemonCard from "./PokemonCard";
import { PokemonContext } from "../context/PokemonContext";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";

const MainPage = ({ search }) => {
  const {
    allPokemons,
    globalPokemons,
    setFilteredPokemons,
    filteredPokemons,
    onClickLoadMore,
    loading,
    setLoading,
  } = useContext(PokemonContext);

  const [showScrollButton, setShowScrollButton] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowScrollButton(scrollY > 200);
      if (
        window.innerHeight + document.documentElement.scrollTop ===
          document.documentElement.offsetHeight &&
        !search
      ) {
        onClickLoadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [onClickLoadMore]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    setLoading(true);
    if (!search) {
      setFilteredPokemons(allPokemons);
    } else {
      if (!isNaN(search)) {
        const filteredResults = globalPokemons.filter(
          (pokemon) => pokemon.id.toString() === search
        );
        setFilteredPokemons(filteredResults);
      } else {
        const filteredResults = globalPokemons.filter((pokemon) =>
          pokemon.name.startsWith(search)
        );
        setFilteredPokemons(filteredResults);
      }
    }
    setLoading(false);
  }, [search, allPokemons, globalPokemons, setFilteredPokemons]);

  useEffect(() => {
    if (!loading) {
      setDataFetched(true);
    }
  }, [loading]);

  return (
    <div className="my-5 mb-20 px-5">
      {dataFetched && (
        <div>
          <div className="flex flex-wrap justify-center gap-5">
            {filteredPokemons.map((result, index) => (
              <PokemonCard
                key={result.id}
                data={result}
                currentIndex={index}
                filteredPokemons={filteredPokemons}
              />
            ))}
          </div>
          {showScrollButton && (
            <button
              className="fixed bottom-8 right-8 bg-[#2e6db4] text-white p-4 rounded-full shadow-md"
              onClick={scrollToTop}
            >
              <MdKeyboardDoubleArrowUp />
            </button>
          )}
        </div>
      )}
      {loading && (
        <div className="text-center my-4">
          <p className="text-gray-500">Loading...</p>
        </div>
      )}
      {loading && <p className="text-center text-gray-500">Loading more...</p>}
    </div>
  );
};

export default MainPage;
