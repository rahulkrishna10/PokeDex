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

  const handlePrevPokemon = () => {
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : currentIndex;
    setPokeData(filteredPokemons[prevIndex]);
  };

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
      <div className="w-full h-full md:max-w-[800px] md:h-[90%] p-5 md:p-0 md:border md:my-12 rounded-3xl shadow-xl bg-white overflow-scroll">
        <div
          className={
            "relative transition-all duration-300 ease-in-out rounded-3xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-2 h-[300px] " +
            bgColorClass +
            " bg-opacity-40"
          }
        >
          <img
            className="aspect-auto max-h-[150px] mx-auto md:mx-5"
            src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${pokeData.id}.svg`}
          />
          <div className="flex flex-col gap-5 md:items-end p-2 md:place-self-end">
            <div className="flex justify-between items-baseline">
              <h1 className="text-5xl font-light capitalize text-right custom-font">
                {pokeData.name}
              </h1>
              <p className="text-[65px] md:text-[100px] text-black opacity-20 bottom-2 md:top-5 md:right-5 right-[3%] absolute text-right custom-font">
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
          <AiOutlineClose
            className="absolute top-3 right-3 text-3xl cursor-pointer"
            onClick={close}
          />

          <AiOutlineLeft
            className={`absolute -bottom-[200%] left-7 md:top-[110%] md:left-10 text-3xl cursor-pointer z-20${
              isPrevDisabled ? " text-gray-300" : ""
            }`}
            onClick={isPrevDisabled ? null : handlePrevPokemon}
            title="Previous"
          />

          <AiOutlineRight
            className={`absolute -bottom-[200%] right-7 md:top-[110%] md:right-10 text-3xl cursor-pointer z-20${
              isNextDisabled ? " text-gray-300" : ""
            }`}
            onClick={isNextDisabled ? null : handleNextPokemon}
            title="Next"
          />
        </div>

        <div className="flex flex-col justify-center md:justify-around h-[50%] mt-24 md:mt-24 md:items-start gap-5 md:px-10 rounded-xl m-5">
          <div className="flex flex-col gap-5 md:gap-3 w-full">
            <p className="text-4xl custom-font mt-5 md:mt-0 md:hidden">
              BASE STATS
            </p>
            {pokeData.stats.map((stat, index) => (
              <div
                key={index}
                className="w-full capitalize flex flex-col md:flex-row items-center text-center gap-1 md:mt-2 font-semibold text-neutral-600"
              >
                <p className="hidden md:flex uppercase md:w-[30%] text-left">
                  {stat.stat.name}
                </p>
                <ProgressBar
                  percentage={stat.base_stat}
                  color={bgColorClass}
                  title={stat.stat.name}
                />
              </div>
            ))}
          </div>
          <div className="flex flex-col md:flex-row justify-between w-full uppercase font-semibold text-neutral-600 gap-3">
            <p className="text-4xl custom-font text-black md:hidden font-normal mt-5 md:mt-0">
              BASIC
            </p>
            <p>
              Height : <span className="font-bold">{pokeData.height}</span>
            </p>
            <p>
              Weight : <span className="font-bold">{pokeData.weight}</span>
            </p>
            <p>
              Base Experience :{" "}
              <span className="font-bold">{pokeData.base_experience}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
