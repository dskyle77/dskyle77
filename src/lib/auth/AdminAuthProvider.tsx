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
import { auth } from "@/lib/firebase";

type AdminUser = {
  uid: string;
  email: string | null;
  name: string | null;
};

type AdminAuthState = {
  user: User | null;
  admin: AdminUser | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  getIdToken: () => Promise<string | null>;
};

const AdminAuthContext = createContext<AdminAuthState | null>(null);

async function verifyAdmin(user: User): Promise<AdminUser> {
  // Force refresh so we don't send a stale token after deploy / claim changes.
  const token = await user.getIdToken(true);
  const res = await fetch("/api/admin/me", {
    headers: { Authorization: `Bearer ${token}` },
  });

  const body = (await res.json().catch(() => ({}))) as {
    error?: string;
    data?: { uid: string; email: string | null; name: string | null };
  };

  if (!res.ok) {
    throw new Error(
      body.error || "You are signed in but not authorized as admin.",
    );
  }

  if (!body.data) {
    throw new Error("Invalid admin profile response.");
  }

  return body.data;
}

function friendlyAuthError(err: unknown): string {
  const message = err instanceof Error ? err.message : "Sign in failed.";

  if (
    message.includes("auth/invalid-credential") ||
    message.includes("auth/wrong-password") ||
    message.includes("auth/invalid-login-credentials")
  ) {
    return "Invalid email or password.";
  }
  if (message.includes("auth/user-not-found")) {
    return "No account found for that email.";
  }
  if (message.includes("auth/too-many-requests")) {
    return "Too many attempts. Try again later.";
  }
  if (message.includes("auth/network-request-failed")) {
    return "Network error. Check your connection and try again.";
  }

  return message
    .replace(/^Firebase:\s*/i, "")
    .replace(/\s*\(.*\)$/, "")
    .trim() || "Sign in failed.";
}

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (next) => {
      setLoading(true);
      setError(null);
      setUser(next);

      if (!next) {
        setAdmin(null);
        setLoading(false);
        return;
      }

      try {
        const profile = await verifyAdmin(next);
        setAdmin(profile);
      } catch (err) {
        setAdmin(null);
        setError(
          err instanceof Error ? err.message : "Not authorized as admin.",
        );
        // Drop the Firebase session for non-admins so the login form stays usable.
        await firebaseSignOut(auth).catch(() => undefined);
        setUser(null);
      } finally {
        setLoading(false);
      }
    });

    return () => unsub();
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    setError(null);
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      // onAuthStateChanged → verifyAdmin
    } catch (err) {
      setLoading(false);
      throw new Error(friendlyAuthError(err));
    }
  }, []);

  const signOut = useCallback(async () => {
    setError(null);
    await firebaseSignOut(auth);
    setAdmin(null);
    setUser(null);
  }, []);

  const getIdToken = useCallback(async () => {
    if (!auth.currentUser) return null;
    return auth.currentUser.getIdToken(true);
  }, []);

  const value = useMemo(
    () => ({
      user,
      admin,
      loading,
      error,
      signIn,
      signOut,
      getIdToken,
    }),
    [user, admin, loading, error, signIn, signOut, getIdToken],
  );

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) {
    throw new Error("useAdminAuth must be used within AdminAuthProvider");
  }
  return ctx;
}
