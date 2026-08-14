"use client";

import RequireAdmin from "@/components/admin/RequireAdmin";
import BlogEditor from "@/components/admin/BlogEditor";

export default function AdminNewBlogPage() {
  return (
    <RequireAdmin>
      <BlogEditor mode="create" />
    </RequireAdmin>
  );
}
