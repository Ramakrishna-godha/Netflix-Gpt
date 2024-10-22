import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  return (
    movies.nowPlayingMovies && (
      <div className="bg-black">
        <div className="-mt-52 pl-12 relative z-20">
          <MovieList
            title={"Now Playing Movies"}
            movies={movies.nowPlayingMovies}
          />
          <MovieList
            title={"Trending"}
            movies={movies.TrendingMovies}
          />
          <MovieList
            title={"Top Rated"}
            movies={movies.TopRatedMovies}
          />
          <MovieList
            title={"Upcoming Movies"}
            movies={movies.UpcomingMovies}
          />
          <MovieList
            title={"Popular"}
            movies={movies.PopularMovies}
          />
        </div>
      </div>
    )
  );
};

export default SecondaryContainer;
