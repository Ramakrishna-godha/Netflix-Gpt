import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/langConstants";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResults } from "../utils/gptSlice";

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const dispatch = useDispatch();
  // const searchText = useRef(null);
  const [userInput, SetUserInput] = useState("");
  const [loading, setLoading] = useState(false);

  const genAI = new GoogleGenerativeAI(process.env.REACT_APP_API_KEY);

  // console.log(genAI);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash", // Make sure this model exists in your API setup
  });

  // Search Movie in TMBD

  const handleUserInput = (e) => {
    SetUserInput(e.target.value);
  };

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };

  const sendMessage = async () => {
    try {
      setLoading(true);
      const query = `Give me a list of movies in the format "Movie 1, Movie 2 ...." based on the following criteria: ${userInput}.\n\nThe list should only contain the names of the movies, separated by commas, without any additional text or information. And give only 10 movie names.`;

      const result = await model.generateContent(query);
      SetUserInput("");
      const response = result.response;
      const text = response.text();

      const gptMovies = text.split(",");
      console.log(gptMovies);

      const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
      const tmdbResults = await Promise.all(promiseArray);
      console.log(tmdbResults);
      dispatch(
        addGptMovieResults({ movieNames: gptMovies, movieResults: tmdbResults })
      );
      setLoading(false);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setLoading(false);
    }
  };

  return (
    <div className="pt-[38%] md:pt-[10%]  flex justify-center">
      <form
        className=" sm:w-full md:w-1/2 rounded-md bg-black grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          value={userInput}
          type="text"
          placeholder={lang[langKey].gptSearchPlaceholder}
          className="p-4 m-4 col-span-8 rounded-md "
          onChange={handleUserInput}
        />
        <button
          className="bg-red-600 m-4  py-4 px-4 text-white rounded-lg col-span-4"
          onClick={sendMessage}
        >
          {lang[langKey].search}
        </button>
        {loading ? (
          <p className="text-center pb-3 text-white col-span-12">Loading...</p>
        ) : (
          <p className="text-center text-white col-span-12"></p>
        )}
      </form>
    </div>
  );
};

export default GptSearchBar;
