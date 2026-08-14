"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAdminAuth } from "@/lib/auth/AdminAuthProvider";
import AdminLoginForm from "@/components/admin/AdminLoginForm";

export default function AdminHomePage() {
  const { admin, loading } = useAdminAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && admin) {
      router.replace("/admin/blogs");
    }
  }, [admin, loading, router]);

  if (loading || admin) {
    return (
      <div className="flex items-center justify-center gap-2 py-24 text-paper-dim">
        <Loader2 className="h-5 w-5 animate-spin" />
        <span className="font-mono text-xs">
          {admin ? "Redirecting…" : "Checking session…"}
        </span>
      </div>
    );
  }

  return <AdminLoginForm />;
}
