import { cert, getApp, getApps, initializeApp, type App } from "firebase-admin/app";
import { getAuth, type Auth } from "firebase-admin/auth";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

let app: App | undefined;
let db: Firestore | undefined;
let auth: Auth | undefined;

function initApp(): App {
  if (app) return app;
  if (getApps().length) {
    app = getApp();
    return app;
  }

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      "Missing Firebase Admin credentials. Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY.",
    );
  }

  app = initializeApp({
    credential: cert({ projectId, clientEmail, privateKey }),
  });

  return app;
}

/** Server-only Firestore instance (lazy). */
export function getDb(): Firestore {
  if (!db) db = getFirestore(initApp());
  return db;
}

/** Server-only Auth instance (lazy). */
export function getAdminAuth(): Auth {
  if (!auth) auth = getAuth(initApp());
  return auth;
}
