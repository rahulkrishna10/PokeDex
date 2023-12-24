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
    <div className="fixed top-0 left-0 w-full h-full flex flex-col bg-white bg-opacity-95 py-10 md:py-32 md:px-52 px-5 z-50 cursor-auto">
      <div
        className={`flex flex-col gap-3 w-full h-fit md:h-[300px] p-5 ${bgColorClass} bg-opacity-40 rounded-xl justify-between transition-all duration-300 ease-in-out`}
      >
        <img
          className="aspect-auto max-h-[150px] mx-auto"
          src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${pokeData.id}.svg`}
        />
        <div className="flex justify-between items-baseline">
          <h1 className="text-5xl font-light capitalize">{pokeData.name}</h1>
          <p className="text-[75px] md:text-[100px] text-black opacity-20 top-[21.5%] md:top-[28%] right-[6%] md:right-56 absolute -z-20 text-right">
            #{pokeData.id}
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

      <div className="flex flex-col md:flex-row justify-between w-full mt-24 gap-5">
        <div className="w-full flex flex-col gap-3">
          <span className="font-semibold text-neutral-600 text-lg">
            Height : {pokeData.height}
          </span>
          <span className="font-semibold text-neutral-600 text-lg">
            Weight : {pokeData.weight}
          </span>
          <span className="font-semibold text-neutral-600 text-lg">
            Base Experience : {pokeData.base_experience}
          </span>
        </div>

        <div className="flex flex-col gap-5 w-full">
          <span className="w-full flex items-center justify-between gap-3 font-semibold text-neutral-600">
            <span className="w-[30%] font-semibold text-neutral-600 text-lg">
              Speed
            </span>
            <ProgressBar
              percentage={pokeData.stats[0].base_stat}
              color={bgColorClass}
            />
          </span>
          <span className="w-full flex items-center justify-between gap-3 font-semibold text-neutral-600">
            <span className="w-[30%] font-semibold text-neutral-600 text-lg">
              Special Defence
            </span>
            <ProgressBar
              percentage={pokeData.stats[1].base_stat}
              color={bgColorClass}
            />
          </span>
          <span className="w-full flex items-center justify-between gap-3 font-semibold text-neutral-600">
            <span className="w-[30%] font-semibold text-neutral-600 text-lg">
              Special Attack
            </span>
            <ProgressBar
              percentage={pokeData.stats[2].base_stat}
              color={bgColorClass}
            />
          </span>
          <span className="w-full flex items-center justify-between gap-3 font-semibold text-neutral-600">
            <span className="w-[30%] font-semibold text-neutral-600 text-lg">
              Defence
            </span>
            <ProgressBar
              percentage={pokeData.stats[3].base_stat}
              color={bgColorClass}
            />
          </span>
          <span className="w-full flex items-center justify-between gap-3 font-semibold text-neutral-600">
            <span className="w-[30%] font-semibold text-neutral-600 text-lg">
              Attack
            </span>
            <ProgressBar
              percentage={pokeData.stats[4].base_stat}
              color={bgColorClass}
            />
          </span>
          <span className="w-full flex items-center justify-between gap-3 font-semibold text-neutral-600">
            <span className="w-[30%] font-semibold text-neutral-600 text-lg">
              HP
            </span>
            <ProgressBar
              percentage={pokeData.stats[5].base_stat}
              color={bgColorClass}
            />
          </span>
        </div>
      </div>

      <AiOutlineClose
        className="absolute top-12 right-7 md:top-10 md:right-10 text-3xl cursor-pointer w-fit"
        onClick={close}
      />

      <AiOutlineLeft
        className={`absolute bottom-[5%] left-7 md:top-[26%] md:left-56 text-3xl cursor-pointer  w-fit${
          isPrevDisabled ? " text-gray-300" : ""
        }`}
        onClick={isPrevDisabled ? null : handlePrevPokemon}
        title="Previous"
      />

      <AiOutlineRight
        className={`absolute bottom-[5%] right-7 md:top-[26%] md:right-56 text-3xl cursor-pointer w-fit${
          isNextDisabled ? " text-gray-300" : ""
        }`}
        onClick={isNextDisabled ? null : handleNextPokemon}
        title="Next"
      />
    </div>
  );
};

export default DetailModal;
