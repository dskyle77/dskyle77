"use client";

import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { env } from "@/config/env";

let app: FirebaseApp | null = null;
let auth: Auth | null = null;

function getClientConfig() {
  const c = env.firebasePublic;
  if (
    !c.apiKey ||
    !c.authDomain ||
    !c.projectId ||
    !c.appId
  ) {
    throw new Error(
      "Firebase client config is incomplete. Set NEXT_PUBLIC_FIREBASE_API_KEY, NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN, NEXT_PUBLIC_FIREBASE_PROJECT_ID, and NEXT_PUBLIC_FIREBASE_APP_ID.",
    );
  }
  return {
    apiKey: c.apiKey,
    authDomain: c.authDomain,
    projectId: c.projectId,
    storageBucket: c.storageBucket,
    messagingSenderId: c.messagingSenderId,
    appId: c.appId,
  };
}

export function getFirebaseApp(): FirebaseApp {
  if (app) return app;
  if (getApps().length > 0) {
    app = getApps()[0]!;
    return app;
  }
  app = initializeApp(getClientConfig());
  return app;
}

export function getClientAuth(): Auth {
  if (auth) return auth;
  auth = getAuth(getFirebaseApp());
  return auth;
}
