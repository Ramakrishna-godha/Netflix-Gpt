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
      <div className="relative w-full h-screen overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={BG_URL}
            alt="Background"
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 flex justify-center items-center">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="bg-black bg-opacity-85 p-16 w-[450px] md:w-3/12 sm:w-6/12 rounded-md text-white"
          >
            <h1 className="text-white text-3xl font-bold pb-6">
              {isSignIn ? "Sign In" : "Sign Up"}
            </h1>
            {!isSignIn && (
              <input
                ref={name}
                type="text"
                placeholder="Full Name"
                className="mb-4 bg-[#0f0f0f] p-4 text-white w-full rounded border-gray-500 border-[1px]"
              />
            )}
            <input
              ref={email}
              type="text"
              placeholder="Email ID"
              className="mb-4 bg-[#0f0f0f] p-4 text-white w-full rounded border-gray-500 border-[1px]"
            />
            <div className="relative">
              <input
                ref={password}
                type="password"
                placeholder="Password"
                className="mb-4 bg-[#0f0f0f] p-4 text-white w-full rounded border-gray-500 border-[1px]"
              />

              <p className="text-red-500 pb-4">{errorMessage}</p>
            </div>
            <div className="flex justify-center">
              <button
                onClick={handleButtonClick}
                type="button"
                className="bg-red-700 font-medium border-red-700 border-[3px] w-full text-white px-4 py-2 rounded"
              >
                {isSignIn ? "Sign In" : "Sign Up"}
              </button>
            </div>
            <p
              className="text-white mt-4 pt-4 cursor-pointer"
              onClick={toggleSignInForm}
            >
              {isSignIn
                ? "New to Netflix? Sign Up now"
                : "Already registered? Sign In"}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
