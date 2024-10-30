import { Link } from "react-router-dom";

import MovieCards from "./MovieCards";

const MovieList = ({ title, movies }) => {
  return (
    <div className="overflow-x-hidden px-6  text-white ">
      <h1 className="text-3xl font-bold py-6">{title}</h1>
      <div className="flex movie overflow-x-scroll overflow-y-hidden scrollbar-none">
        <div className="flex">
          {movies?.map((movie) => (
            <Link
              key={movie.id}
              to={"/browse/" + movie.id}
            >
              <MovieCards posterPath={movie.poster_path} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
