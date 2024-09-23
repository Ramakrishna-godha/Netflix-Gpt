import React, { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [isSignIn, SetIsSignIn] = useState(true);
  const toggleSignInForm = () => {
    SetIsSignIn(!isSignIn);
  };
  return (
    <div>
      <Header />
      <div className="absolute object-cover sm:w-full sm:h-full">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/47c2bc92-5a2a-4f33-8f91-4314e9e62ef1/web/IN-en-20240916-TRIFECTA-perspective_72df5d07-cf3f-4530-9afd-8f1d92d7f1a8_large.jpg"
          alt="bg-img"
          className=""
        />
      </div>
      <form className=" absolute lg:w-3/12 p-12 bg-black mx-auto my-36 right-0 left-0 text-white sm:w-6/12  rounded-lg bg-opacity-85">
        <h1 className="font-bold text-3xl py-4">
          {isSignIn ? "Sign In" : "sign Up"}
        </h1>
        {!isSignIn && (
          <input
            type="Name "
            placeholder="Full Name"
            className="p-4 my-4  w-full bg-white"
          />
        )}
        <input
          type="text "
          placeholder="Email Address"
          className="p-4 my-4  w-full bg-white"
        />
        <input
          type="password "
          placeholder="password"
          className="p-4 my-4  w-full bg-white"
        />

        <button
          type="button"
          className="p-4 my-6  bg-red-700 w-full rounded-lg"
        >
          {isSignIn ? "Sign In" : "sign Up"}
        </button>
        <p
          className="p-4  items-center cursor-pointer text-bold text-xl"
          onClick={toggleSignInForm}
        >
          {isSignIn
            ? "New to NetFlix ? Sign Up"
            : "Already registered? sign In"}
        </p>
      </form>
    </div>
  );
};

export default Login;
