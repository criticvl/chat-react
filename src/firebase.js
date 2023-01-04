import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDkjhtK_vHHU0l-o5MPHZalcEObnMoKPts", //don't touch me :)
  authDomain: "chat-criticvl.firebaseapp.com",
  projectId: "chat-criticvl",
  storageBucket: "chat-criticvl.appspot.com",
  messagingSenderId: "405458326724",
  appId: "1:405458326724:web:ac8ea4720cc4be7f026591",
  measurementId: "G-TSFMHM60G4",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
