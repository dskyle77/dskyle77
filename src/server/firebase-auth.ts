import { getAuth, type Auth } from "firebase-admin/auth";
import { getAdminApp } from "@/server/firebase-admin";

let auth: Auth | undefined;

/** Server-only Auth (lazy). Only import from admin/auth routes. */
export function getAdminAuth(): Auth {
  if (!auth) auth = getAuth(getAdminApp());
  return auth;
}
