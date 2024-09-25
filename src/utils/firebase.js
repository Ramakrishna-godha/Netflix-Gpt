// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCfnYRB69JwniuxiIA3qe8Q5PIChdDqxzY",
  authDomain: "netflix-gpt-aad98.firebaseapp.com",
  projectId: "netflix-gpt-aad98",
  storageBucket: "netflix-gpt-aad98.appspot.com",
  messagingSenderId: "122247655544",
  appId: "1:122247655544:web:b1b5465b14bac8ba23bd8d",
  measurementId: "G-ZDCWF42RZ6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
