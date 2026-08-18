import "server-only";
import {
  cert,
  getApps,
  initializeApp,
  type App,
  type ServiceAccount,
} from "firebase-admin/app";
import { getAuth, type Auth } from "firebase-admin/auth";
import { getFirestore, type Firestore } from "firebase-admin/firestore";
import { env } from "@/config/env";

let app: App | null = null;

function getAdminApp(): App {
  if (app) return app;

  const existing = getApps();
  if (existing.length > 0) {
    app = existing[0]!;
    return app;
  }

  const cfg = env.requireFirebaseAdmin();

  const serviceAccount: ServiceAccount = {
    projectId: cfg.projectId,
    clientEmail: cfg.clientEmail,
    privateKey: cfg.privateKey,
  };

  app = initializeApp({
    credential: cert(serviceAccount),
    projectId: cfg.projectId,
  });

  return app;
}

export function getDb(): Firestore {
  return getFirestore(getAdminApp());
}

export function getAdminAuth(): Auth {
  return getAuth(getAdminApp());
}
