import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen absolute aspect-video pt-[20%] px-14 text-white bg-gradient-to-r from-black">
      <h1 className="text-4xl font-bold">{title}</h1>
      <p className="py-6 text-lg w-1/4">{overview}</p>
      <div>
        <button className="text-lg p-4 px-12  bg-white bg-gray-500  rounded-lg text-black hover:bg-opacity-90">
          ▷ Play
        </button>
        <button className="text-lg p-4 px-12 bg-gray-500 bg-opacity-50 rounded-lg text-white mx-2">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
