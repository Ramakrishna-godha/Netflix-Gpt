import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/Validation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import { auth } from "../utils/firebase";

import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_URL } from "../utils/constants";

const Login = () => {
  const dispatch = useDispatch();

  const [isSignIn, SetIsSignIn] = useState(true);

  const [errorMessage, setErrorMessage] = useState(null);
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    // Check validation
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;

    if (!isSignIn) {
      // Sign Up Logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
          })
            .then(() => {
              const { uid, email, displayName } = auth.currentUser;
              dispatch(
                addUser({ uid: uid, email: email, displayName: displayName })
              );

              // Profile updated!
              // ...
            })
            .catch((error) => {
              setErrorMessage(error.message);
              // An error occurred
              // ...
            });

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
          // ..
        });
    } else {
      //Sign In logic

      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  const toggleSignInForm = () => {
    SetIsSignIn(!isSignIn);
  };
  return (
    <div>
      <Header />
      <div className="absolute h-screen w-full">
        <div className=" inset-0">
          <img
            src={BG_URL}
            alt="bg-img"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className=" absolute w-full md:w-3/12 p-12 bg-black mx-auto my-36 right-0 left-0 text-white sm:w-6/12  rounded-lg bg-opacity-85"
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignIn ? "Sign In" : "sign Up"}
        </h1>
        {!isSignIn && (
          <input
            ref={name}
            type="name "
            placeholder="Full Name"
            className="p-4 my-4  w-full bg-white text-black"
          />
        )}
        <input
          ref={email}
          type="text "
          placeholder="Email Address"
          className="p-4 my-4  w-full bg-white text-black"
        />

        <input
          ref={password}
          type="password "
          placeholder="password"
          className="p-4 my-4  w-full bg-white text-black"
        />
        <p className="text-red-500  font-bold py-2">{errorMessage}</p>

        <button
          onClick={handleButtonClick}
          type="button"
          className="p-4 my-6  bg-red-700 w-full rounded-lg "
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
