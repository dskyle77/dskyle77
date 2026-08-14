// server/firebase-admin.ts

import { cert, getApp, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { env } from "@/config/env";

const app = getApps().length
  ? getApp()
  : initializeApp({
      credential: cert(env["firebase-admin"]),
    });

export const db = getFirestore(app);
export const adminAuth = getAuth(app);
