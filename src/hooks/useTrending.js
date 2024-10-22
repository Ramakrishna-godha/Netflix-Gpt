import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { useEffect } from "react";
import { addTrendingMovies } from "../utils/moviesSlice";
const useTrending = () => {
  const dispatch = useDispatch();
  const getTrendingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/trending/tv/day?language=en-US",
      API_OPTIONS
    );

    const json = await data.json();
    // console.log(json.results);
    dispatch(addTrendingMovies(json.results));
  };
  useEffect(() => {
    getTrendingMovies();
  }, []);
};

export default useTrending;
