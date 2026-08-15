import { getAuth, type Auth } from "firebase-admin/auth";
import { getAdminApp } from "@/server/firebase-admin";

let auth: Auth | undefined;

/**
 * Server-only Auth (lazy).
 * Import only from admin/auth code paths so public routes never pull jose.
 */
export function getAdminAuth(): Auth {
  if (!auth) auth = getAuth(getAdminApp());
  return auth;
}
