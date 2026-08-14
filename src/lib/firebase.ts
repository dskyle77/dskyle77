// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { env } from "@/config/env";

// Initialize Firebase
const app = initializeApp(env["firebase-client"]);
export const auth = getAuth(app);
export const db = getFirestore(app);
