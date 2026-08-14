"use client";

import { Loader2 } from "lucide-react";
import { useAdminAuth } from "@/lib/auth/AdminAuthProvider";
import AdminLoginForm from "@/components/admin/AdminLoginForm";

/** Gates admin pages: loading → login form → authenticated children. */
export default function RequireAdmin({
  children,
}: {
  children: React.ReactNode;
}) {
  const { admin, loading } = useAdminAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2 py-24 text-paper-dim">
        <Loader2 className="h-5 w-5 animate-spin" />
        <span className="font-mono text-xs">Checking session…</span>
      </div>
    );
  }

  if (!admin) {
    return <AdminLoginForm />;
  }

  return <>{children}</>;
}
