import type { Metadata } from "next";
import { AdminAuthProvider } from "@/lib/auth/AdminAuthProvider";
import AdminShell from "@/components/admin/AdminShell";

export const metadata: Metadata = {
  title: "Admin",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAuthProvider>
      <AdminShell>{children}</AdminShell>
    </AdminAuthProvider>
  );
}
