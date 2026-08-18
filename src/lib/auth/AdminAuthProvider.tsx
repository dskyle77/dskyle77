"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  type User,
} from "firebase/auth";
import { getClientAuth } from "@/lib/firebase/client";

type AdminAuthContextValue = {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  getIdToken: (forceRefresh?: boolean) => Promise<string | null>;
};

const AdminAuthContext = createContext<AdminAuthContextValue | null>(null);

function isAllowedAdmin(user: User | null): boolean {
  if (!user?.email) return false;
  // Client-side check must use NEXT_PUBLIC_ADMIN_EMAIL / NEXT_PUBLIC_ADMIN_EMAILS.
  // Server still enforces the real allow-list via ADMIN_EMAIL / ADMIN_EMAILS.
  // Never default to true — that caused "looks logged in as admin" + API 403s.
  const publicList = (
    process.env.NEXT_PUBLIC_ADMIN_EMAIL ||
    process.env.NEXT_PUBLIC_ADMIN_EMAILS ||
    ""
  )
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  if (publicList.length === 0) {
    // No client allow-list configured → do not claim admin status in the UI.
    return false;
  }

  return publicList.includes(user.email.trim().toLowerCase());
}

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let unsub: (() => void) | undefined;
    try {
      const auth = getClientAuth();
      unsub = onAuthStateChanged(
        auth,
        (next) => {
          setUser(next);
          setLoading(false);
          setError(null);
        },
        (err) => {
          console.error("Auth state error:", err);
          setUser(null);
          setLoading(false);
          setError(err.message || "Auth error");
        },
      );
    } catch (err) {
      console.error("Firebase client init failed:", err);
      setUser(null);
      setLoading(false);
      setError(
        err instanceof Error
          ? err.message
          : "Firebase is not configured correctly.",
      );
    }
    return () => unsub?.();
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    setError(null);
    const trimmed = email.trim().toLowerCase();

    // Fast client-side gate when public admin email is configured
    const publicList = (
      process.env.NEXT_PUBLIC_ADMIN_EMAIL ||
      process.env.NEXT_PUBLIC_ADMIN_EMAILS ||
      ""
    )
      .split(",")
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean);

    if (publicList.length > 0 && !publicList.includes(trimmed)) {
      const message = "This account is not authorized for admin access.";
      setError(message);
      throw new Error(message);
    }

    try {
      const auth = getClientAuth();
      const cred = await signInWithEmailAndPassword(auth, trimmed, password);
      if (!isAllowedAdmin(cred.user)) {
        await firebaseSignOut(auth);
        const message = "This account is not authorized for admin access.";
        setError(message);
        throw new Error(message);
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Sign in failed.";
      // Map common Firebase codes to friendlier text
      let friendly = message;
      if (/auth\/invalid-credential|auth\/wrong-password|auth\/user-not-found/i.test(message)) {
        friendly = "Invalid email or password.";
      } else if (/auth\/too-many-requests/i.test(message)) {
        friendly = "Too many attempts. Try again later.";
      } else if (/auth\/invalid-email/i.test(message)) {
        friendly = "Invalid email address.";
      }
      setError(friendly);
      throw new Error(friendly);
    }
  }, []);

  const signOut = useCallback(async () => {
    setError(null);
    try {
      await firebaseSignOut(getClientAuth());
    } catch (err) {
      console.error("Sign out failed:", err);
    }
  }, []);

  const getIdToken = useCallback(
    async (forceRefresh = false): Promise<string | null> => {
      if (!user) return null;
      try {
        return await user.getIdToken(forceRefresh);
      } catch (err) {
        console.error("getIdToken failed:", err);
        return null;
      }
    },
    [user],
  );

  const isAdmin = useMemo(() => isAllowedAdmin(user), [user]);

  const value = useMemo<AdminAuthContextValue>(
    () => ({
      user,
      loading,
      error,
      isAdmin,
      signIn,
      signOut,
      getIdToken,
    }),
    [user, loading, error, isAdmin, signIn, signOut, getIdToken],
  );

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth(): AdminAuthContextValue {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) {
    throw new Error("useAdminAuth must be used within AdminAuthProvider");
  }
  return ctx;
}
