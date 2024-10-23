import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES, USER_AVATAR } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGtpSearch = useSelector((store) => store.gpt.showGtpSearch);
  const dispatch = useDispatch();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
        navigate("/browse");
        // ...
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);
  const handleGptSearchClick = () => {
    // Toggle Gpt Search
    dispatch(toggleGptSearchView());
  };

  const handleLangChange = (e) => {
    // console.log(e.target.value);
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className=" w-screen absolute px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <img
        className="w-44"
        src={LOGO}
        alt="NetflixLogo"
      />
      {user && (
        <div
          className="flex justify-center items-center
      "
        >
          {showGtpSearch && (
            <select
              className="p-1.5 rounded-md px-2"
              onChange={handleLangChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option
                  key={lang.identifier}
                  value={lang.identifier}
                >
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            className="py-2 bg-red-600 text-white px-4 mx-4 rounded-lg"
            onClick={handleGptSearchClick}
          >
            {showGtpSearch ? "Home Page" : "GPT Search"}
          </button>
          <img
            className="size-10 mr-2 "
            src={USER_AVATAR}
            alt="user image"
          />
          <button
            onClick={handleSignOut}
            type="button"
            className="text-white font-bold  p-1 rounded-lg items-center "
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
