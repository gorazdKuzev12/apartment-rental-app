// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA-8lM8mWGVMhlyAeOZdoCJ6AYPkyxltWU",
  authDomain: "apartment-novi-sad.firebaseapp.com",
  projectId: "apartment-novi-sad",
  storageBucket: "apartment-novi-sad.appspot.com",
  messagingSenderId: "759886064875",
  appId: "1:759886064875:web:859fee72d5627d9cd862ae",
  measurementId: "G-FF516FQTJ3",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
