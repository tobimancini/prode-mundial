// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {  getAuth, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration


const firebaseConfig = {
  apiKey: process.env.API_URL,
  authDomain: "prode-la-jaula.firebaseapp.com",
  projectId: "prode-la-jaula",
  storageBucket: "prode-la-jaula.appspot.com",
  messagingSenderId: "702412984009",
  appId: "1:702412984009:web:b8ec347a9f53287b148718"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);