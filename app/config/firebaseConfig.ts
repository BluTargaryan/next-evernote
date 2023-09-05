// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDWfwr6bmFl_cczbRQ3Nlqb0h1fsQFuTMY",
  authDomain: "evernote-clone-48b36.firebaseapp.com",
  projectId: "evernote-clone-48b36",
  storageBucket: "evernote-clone-48b36.appspot.com",
  messagingSenderId: "958471384104",
  appId: "1:958471384104:web:f988c881e8fd5d59ab991d",
  measurementId: "G-Z2S6JB9366"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db= getFirestore(app);
const analytics = getAnalytics(app);