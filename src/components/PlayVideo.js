import { useParams } from "react-router";
import useMovieTrailer from "../hooks/MovieTrailer";
import { useEffect, useState } from "react";
import MovieTrailer from "../hooks/MovieTrailer";

const PlayVideo = () => {
  const { videoId } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log(videoId);

  // const trailer = useMovieTrailer(videoId);
  // console.log(trailer);

  const getData = async () => {
    const trailer = await MovieTrailer(videoId);
    setLoading(false);
    setData(trailer);
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(data);

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="w-screen h-screen overflow-hidden ">
          {data ? (
            <iframe
              className="w-screen -mt-20 aspect-video   "
              src={
                "https://www.youtube.com/embed/" +
                data?.key +
                "?autoplay=1&mute=0"
              }
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
          ) : (
            <div>Video Not Available</div>
          )}
        </div>
      )}
    </>
  );
};

export default PlayVideo;
