import React from "react";
import MovieCards from "./MovieCards";

const MovieList = ({ title, movies }) => {
  // console.log(movies);

  return (
    <div className="px-6 ">
      <h1 className="text-3xl py-4 text-white">{title}</h1>

      <div className="flex movie overflow-x-scroll scrollbar-hide">
        <div className="flex">
          {movies?.map((movie) => (
            <MovieCards
              key={movie.id}
              posterPath={movie.poster_path}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
