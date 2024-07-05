// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBkfdRmedWt_QSr0SWX4xxQj8eRy1a-R7c",
  authDomain: "social-media-project-2f565.firebaseapp.com",
  projectId: "social-media-project-2f565",
  storageBucket: "social-media-project-2f565.appspot.com",
  messagingSenderId: "1037430016008",
  appId: "1:1037430016008:web:f5432b5bd6667a16fca9bd",
  measurementId: "G-5QM9RBEPHW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()