import React, { useContext, useEffect, useState } from "react";
import { PokemonContext } from "../context/PokemonContext";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import PokemonCard from "./PokemonCard";

const MainPage = ({ search }) => {
  const {
    allPokemons,
    globalPokemons,
    setFilteredPokemons,
    filteredPokemons,
    onClickLoadMore,
    loading,
    setLoading,
    filterType,
  } = useContext(PokemonContext);

  const [showScrollButton, setShowScrollButton] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (!dataFetched) {
      setLoading(true);
      setLoading(true);
    }

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
        setDataFetched(true);
      }
    }

    setLoading(false);
    setLoadingMore(false);
  }, [
    search,
    allPokemons,
    globalPokemons,
    setFilteredPokemons,
    dataFetched,
    setLoading,
  ]);

  // Load more when reaching the bottom
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowScrollButton(scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [onClickLoadMore, search]);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (!loading) {
      setDataFetched(true);
    }
  }, [loading]);

  return (
    <div className="my-5 mb-20 px-5">
      {loading && (
        <div className="text-center my-4 text-black text-5xl">
          <p className="text-gray-500">Loading...</p>
        </div>
      )}
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
          {!loading &&
            filteredPokemons.length > 0 &&
            !search &&
            !filterType && (
              <div className="text-center my-4">
                <button
                  className="bg-[#2e6db4] text-white px-4 py-2 rounded-md"
                  onClick={() => {
                    setLoadingMore(true);
                    onClickLoadMore();
                  }}
                >
                  Load More
                </button>
              </div>
            )}
        </div>
      )}
      {loadingMore && (
        <p className="text-center text-gray-500">Loading more...</p>
      )}
    </div>
  );
};

export default MainPage;
