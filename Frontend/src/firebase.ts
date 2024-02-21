import { getFirestore } from "@firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  // Paste the configuration object you copied from Firebase Console here
  apiKey: "AIzaSyBafypfE6ljHUk_QmfEp2KO3q4sdRedIyk",
  authDomain: "culturalxchange-80950.firebaseapp.com",
  projectId: "culturalxchange-80950",
  storageBucket: "culturalxchange-80950.appspot.com",
  messagingSenderId: "7607692588",
  appId: "1:7607692588:web:ab66e67cd92874c12bd089",
  measurementId: "G-WLWENQP5CP",
};

const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const firestore = getFirestore(firebaseApp);
