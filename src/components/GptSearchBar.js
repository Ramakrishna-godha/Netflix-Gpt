import React from "react";
import { useSelector } from "react-redux";
import lang from "../utils/langConstants";

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  return (
    <>
      <div className="pt-[10%]  flex justify-center">
        <form className=" w-1/2 rounded-md bg-black grid grid-cols-12">
          <input
            type="text"
            placeholder={lang[langKey].gptSearchPlaceholder}
            className="p-4 m-4 col-span-8 rounded-md "
          />
          <button className="bg-red-600 m-4  py-4 px-4 text-white rounded-lg col-span-4">
            {lang[langKey].search}
          </button>
        </form>
      </div>
    </>
  );
};

export default GptSearchBar;
