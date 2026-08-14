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
  const token = await user.getIdToken();
  const res = await fetch("/api/admin/me", {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(
      (body as { error?: string }).error ||
        "You are signed in but not authorized as admin.",
    );
  }

  const json = (await res.json()) as {
    data: { uid: string; email: string | null; name: string | null };
  };

  return json.data;
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
          err instanceof Error
            ? err.message
            : "Not authorized as admin.",
        );
        // Keep Firebase session so they can see the error; force sign-out of non-admins
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
      // onAuthStateChanged handles verifyAdmin
    } catch (err) {
      setLoading(false);
      const message =
        err instanceof Error ? err.message : "Sign in failed.";
      // Friendly Firebase auth codes
      if (message.includes("auth/invalid-credential") || message.includes("auth/wrong-password")) {
        throw new Error("Invalid email or password.");
      }
      if (message.includes("auth/user-not-found")) {
        throw new Error("No account found for that email.");
      }
      if (message.includes("auth/too-many-requests")) {
        throw new Error("Too many attempts. Try again later.");
      }
      throw new Error(message.replace(/^Firebase:\s*/i, "").replace(/\s*\(.*\)$/, ""));
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
    return auth.currentUser.getIdToken();
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
