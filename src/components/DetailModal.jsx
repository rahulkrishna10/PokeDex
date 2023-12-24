// DetailModal.jsx
import React, { useContext } from "react";
import { AiOutlineClose, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { PokemonContext } from "../context/PokemonContext";
import ProgressBar from "./ProgressBar";

const DetailModal = ({ pokeData, close, setPokeData }) => {
  const { filteredPokemons } = useContext(PokemonContext);
  const currentIndex = filteredPokemons.findIndex(
    (pokemon) => pokemon.id === pokeData.id
  );

  const handlePrevPokemon = () => {
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : currentIndex;
    setPokeData(filteredPokemons[prevIndex]);
  };

  let bgColorClass;

  const colours = {
    normal: "bg-[#A8A77A]",
    fire: "bg-[#EE8130]",
    water: "bg-[#6390F0]",
    electric: "bg-[#F7D02C]",
    grass: "bg-[#7AC74C]",
    ice: "bg-[#96D9D6]",
    fighting: "bg-[#C22E28]",
    poison: "bg-[#A33EA1]",
    ground: "bg-[#E2BF65]",
    flying: "bg-[#A98FF3]",
    psychic: "bg-[#F95587]",
    bug: "bg-[#A6B91A]",
    rock: "bg-[#B6A136]",
    ghost: "bg-[#735797]",
    dragon: "bg-[#6F35FC]",
    dark: "bg-[#705746]",
    steel: "bg-[#B7B7CE]",
    fairy: "bg-[#D685AD]",
  };

  if (pokeData.types) {
    const type = pokeData.types ? pokeData.types[0].type.name : null;
    bgColorClass = type ? colours[type] : null;
  }

  const handleNextPokemon = () => {
    const nextIndex =
      currentIndex < filteredPokemons.length - 1
        ? currentIndex + 1
        : currentIndex;
    setPokeData(filteredPokemons[nextIndex]);
  };

  const isPrevDisabled = currentIndex === 0;
  const isNextDisabled = currentIndex === filteredPokemons.length - 1;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-neutral-100 bg-opacity-95 flex flex-col items-center justify-center z-50 cursor-auto">
      <div className="w-full h-full md:max-w-[1000px] p-5 md:p-0 md:border md:my-10 rounded-3xl shadow-xl bg-white">
        <div
          className={
            "relative transition-all duration-300 ease-in-out rounded-3xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-2 h-[300px] " +
            bgColorClass +
            " bg-opacity-40"
          }
        >
          <AiOutlineClose
            className="absolute top-3 right-3 text-3xl cursor-pointer w-fit"
            onClick={close}
          />

          <AiOutlineLeft
            className={`absolute top-[280%] left-7 md:top-[110%] md:left-10 text-3xl cursor-pointer  w-fit${
              isPrevDisabled ? " text-gray-300" : ""
            }`}
            onClick={isPrevDisabled ? null : handlePrevPokemon}
            title="Previous"
          />

          <AiOutlineRight
            className={`absolute top-[280%] right-7 md:top-[110%] md:right-10 text-3xl cursor-pointer w-fit${
              isNextDisabled ? " text-gray-300" : ""
            }`}
            onClick={isNextDisabled ? null : handleNextPokemon}
            title="Next"
          />
          <img
            className="aspect-auto max-h-[150px] mx-auto md:mx-5"
            src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${pokeData.id}.svg`}
          />
          <div className="flex flex-col gap-5 md:items-end p-2 md:place-self-end">
            <div className="flex justify-between items-baseline">
              <h1 className="text-5xl font-light capitalize text-right">
                {pokeData.name}
              </h1>
              <p className="text-[65px] md:text-[100px] text-black opacity-20 bottom-2 md:top-5 md:right-5 right-[3%] absolute text-right">
                <span className="text-3xl">no.</span>
                {pokeData.id}
              </p>
            </div>
            <div className="flex gap-2">
              {pokeData.types
                ? pokeData.types.map((pokeType) => {
                    const typeName = pokeType.type.name;
                    return (
                      <p
                        key={typeName}
                        className="text-base capitalize w-[80px] text-center p-1 rounded-3xl bg-black bg-opacity-5"
                      >
                        {typeName}
                      </p>
                    );
                  })
                : null}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between md:items-center mt-5 md:mt-32 gap-5 md:px-10 md:py-20 rounded-xl m-5">
          <div className="w-full flex flex-col gap-3">
            <p className="text-2xl font-light md:text-4xl">BASIC</p>
            <span className=" text-neutral-600 text-xl">
              Height : {pokeData.height}
            </span>
            <span className=" text-neutral-600 text-xl">
              Weight : {pokeData.weight}
            </span>
            <span className=" text-neutral-600 text-xl">
              Base Experience : {pokeData.base_experience}
            </span>
          </div>

          <div className="flex flex-col gap-3 w-full">
            <p className="text-2xl font-light md:text-4xl">BASE STATS</p>
            {pokeData.stats.map((stat, index) => (
              <div
                key={index}
                className="w-full flex items-center justify-between gap-3 font-semibold text-neutral-600"
              >
                <ProgressBar
                  percentage={stat.base_stat}
                  color={bgColorClass}
                  title={stat.stat.name}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
