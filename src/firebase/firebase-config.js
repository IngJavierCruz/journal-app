import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAuwzQIipYV6mqH6oUOty_0LJrMbgepx_s",
  authDomain: "journal-app-6a21b.firebaseapp.com",
  projectId: "journal-app-6a21b",
  storageBucket: "journal-app-6a21b.appspot.com",
  messagingSenderId: "789255495275",
  appId: "1:789255495275:web:35a8097372f5bd0bdb5b2e",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();


export {
    db,
    googleAuthProvider,
    firebase
}
