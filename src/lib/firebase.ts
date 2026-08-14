// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDZ1HUnqgvFy12dAQvx6VqgTOg9FxZ07j0",
  authDomain: "dskyle77gxu.firebaseapp.com",
  projectId: "dskyle77gxu",
  storageBucket: "dskyle77gxu.firebasestorage.app",
  messagingSenderId: "440161332848",
  appId: "1:440161332848:web:0c0dae56f806dd6cbf8eb5",
  measurementId: "G-Q3VH7P1VC2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
