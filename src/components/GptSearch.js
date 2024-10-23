import React from "react";
import GptSearchBar from "./GptSearchBar";
import GptMovieSuggestions from "./GptMovieSuggestions";
import { BG_URL } from "../utils/constants";

const GptSearch = () => {
  return (
    <div>
      <div className="absolute object-cover sm:w-full sm:h-full -z-10">
        <img
          src={BG_URL}
          alt="bg-img"
          className=""
        />
      </div>
      <GptSearchBar />
      <GptMovieSuggestions />
      GPT Search
    </div>
  );
};

export default GptSearch;
