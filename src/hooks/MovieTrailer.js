import { useEffect, useState } from "react";
import { API_OPTIONS } from "../utils/constants";

const MovieTrailer = async (idOfMovie) => {
  // const [trailer, setTrailer] = useState(null);
  // const [loading, setLoading] = useState(true);

  // const getMovieVideos = async () => {

  // };

  try {
    // Fetch trailer data
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" +
        idOfMovie +
        "/videos?language=en-US",
      API_OPTIONS
    );
    const json = await data.json();
    console.log(json);

    // if (json) setLoading(false);

    // Filter data where trailer is available
    const filterData = json.results.filter((video) => video.type === "Trailer");
    const trailer = filterData.length ? filterData[0] : json.results[0];
    console.log(trailer);

    return trailer;
    // setTrailer(trailer);
  } catch (error) {
    return error;
  }

  // return trailer;
};

export default MovieTrailer;
