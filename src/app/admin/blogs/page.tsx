"use client";

import RequireAdmin from "@/components/admin/RequireAdmin";
import BlogAdminList from "@/components/admin/BlogAdminList";

export default function AdminBlogsPage() {
  return (
    <RequireAdmin>
      <BlogAdminList />
    </RequireAdmin>
  );
}
