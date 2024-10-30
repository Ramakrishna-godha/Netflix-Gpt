import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen absolute aspect-video pt-[17%] px-6 md:px-24 text-white bg-gradient-to-r from-black">
      <h1 className=" text-2xl md:text-6xl font-bold">{title}</h1>
      <p className="hidden md:inline-block py-6 text-lg w-1/4">{overview}</p>
      <div className="my-2 md:m-0">
        <button className="text-lg py-1 md:py-4 px-3 md:px-12  bg-white   rounded-lg text-black hover:bg-opacity-90">
          ▷ Play
        </button>
        <button className=" hidden md:inline-block my-2 text-lg p-4 px-12 bg-gray-500 bg-opacity-50 rounded-lg text-white mx-2">
          ⓘ More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
