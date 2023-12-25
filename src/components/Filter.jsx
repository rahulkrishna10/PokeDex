import React, { useContext, useEffect, useState } from "react";
import { PokemonContext } from "../context/PokemonContext";

const Filter = () => {
  const { setFilterType, allTypes } = useContext(PokemonContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(!allTypes.length);
  }, [allTypes]);

  const handleFilterChange = (event) => {
    const selectedValue = event.target.value;
    setFilterType(selectedValue);
  };

  return (
    <div className="my-5">
      {loading ? (
        <p>Loading types...</p>
      ) : (
        <form className="flex items-center gap-">
          <select
            name="filter"
            className="w-[120px] h-[48px] p-2 bg-white border border-[#f4f4f5] rounded-full text-left outline-none hover:shadow-md"
            onChange={handleFilterChange}
          >
            <option value="">All</option>
            {allTypes.map((type) => (
              <option key={type.name} value={type.name}>
                {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
              </option>
            ))}
          </select>
        </form>
      )}
    </div>
  );
};

export default Filter;
