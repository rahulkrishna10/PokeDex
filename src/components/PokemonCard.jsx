import React, { useState, useEffect } from "react";
import DetailModal from "./DetailModal";

const PokemonCard = ({ data }) => {
  const [onHover, setOnHover] = useState(false);
  const [pokeData, setPokeData] = useState({});
  const [modal, setModal] = useState(false);

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

  //Get the color based on the type of pokemon
  if (data.types) {
    const type = data.types ? data.types[0].type.name : null;
    bgColorClass = type ? colours[type] : null;
  }

  const openModal = () => {
    setModal(true);
    setPokeData(data);
  };

  const closeModal = () => {
    setModal(false);
    setOnHover(false);
  };

  //useEffect used for scroll-hidden when using modal
  useEffect(() => {
    if (modal) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [modal]);

  //JSX Component
  return (
    <div
      className={
        "bg-white w-full sm:w-[350px] h-[350px] shadow-sm hover:shadow-lg rounded-lg relative transition-all duration-300 ease-in-out cursor-pointer"
      }
      onMouseEnter={() => {
        setOnHover(true);
      }}
      onMouseLeave={() => {
        setOnHover(false);
      }}
    >
      <div
        className={`flex flex-col justify-between gap-3 w-full h-full p-5 ${bgColorClass} bg-opacity-60 rounded-xl transition-all duration-300 ease-in-out -z-0`}
        onClick={() => {
          openModal();
        }}
      >
        <img
          className={
            `aspect-auto mx-auto transition-all duration-500 ease-in-out` +
            (!onHover ? ` max-h-[180px]` : ` max-h-[240px]`)
          }
          src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${data.id}.svg`}
        />

        {!onHover ? (
          <>
            <div className="flex justify-between items-baseline">
              <h1 className="text-4xl font-light capitalize custom-font tracking-wide">
                {data.name}
              </h1>
              <p className="text-2xl text-white custom-font absolute top-2 right-2 bg-[#2e6db4] bg-opacity-80 rounded-full p-2 h-10 w-10 text-center flex justify-center items-center">
                {data.id}
              </p>
            </div>

            <div
              className={`flex gap-2 transition-all duration-300 ease-in-out`}
            >
              {data.types
                ? data.types.map((pokeType) => {
                    const typeName = pokeType.type.name;
                    return (
                      <p
                        key={typeName}
                        className="text-lg capitalize w-[80px] text-center p-1 rounded-3xl bg-black bg-opacity-10 text-white body-font"
                      >
                        {typeName}
                      </p>
                    );
                  })
                : null}
            </div>
          </>
        ) : (
          <p className="text-neutral-600 text-center text-xl capitalize body-font">
            View Details for {data.name}
          </p>
        )}
      </div>

      {modal && Object.keys(data).length > 0 && (
        <DetailModal
          pokeData={pokeData}
          bgColor={bgColorClass}
          close={closeModal}
          setPokeData={setPokeData}
        />
      )}
    </div>
  );
};

export default PokemonCard;
