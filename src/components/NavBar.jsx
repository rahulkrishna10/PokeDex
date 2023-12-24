import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import Filter from "./Filter";

const NavBar = ({ setSearch }) => {
  const [searchInput, setSearchInput] = useState("");
  const [validate, setValidate] = useState(true);

  const handleInputChange = (e) => {
    setValidate(true);
    let inputValue = e.target.value.toLowerCase();
    if (
      /^\d+$/.test(inputValue) ||
      /^[a-zA-Z]+$/.test(inputValue) ||
      inputValue === ""
    ) {
      setSearchInput(inputValue);
    } else {
      setValidate(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate) {
      setSearch(searchInput);
    }
  };

  return (
    <div className="flex flex-col items-center justify-between sm:flex-row gap-3 px-5 my-5">
      <h1 className="text-3xl text-center font-semibold text-[#2e6db4]">
        Pokédex
      </h1>
      <div className="flex items-center md:justify-end gap-2 w-full">
        <form
          className={
            "flex justify-evenly gap-2 bg-white w-[300px] border-2 rounded-xl" +
            (validate ? " border-white" : " border-red-500")
          }
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="search"
            placeholder="Type Name or Id"
            onChange={handleInputChange}
            autoComplete="false"
            className={`w-[85%] h-[45px] p-2 bg-transparent outline-none rounded-xl`}
          />
          <button type="submit" className="">
            <FiSearch className={!validate ? " text-red-500" : ""} />
          </button>
        </form>
        <Filter />
      </div>
    </div>
  );
};

export default NavBar;
