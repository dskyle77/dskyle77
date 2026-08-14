import type { Blog, BlogStatus } from "@/types/blogs";

export type AdminBlogInput = {
  title: string;
  slug?: string;
  description?: string;
  content?: string;
  tags?: string[];
  coverImage?: string | null;
  status?: BlogStatus;
  isFeatured?: boolean;
};

async function adminFetch<T>(
  path: string,
  token: string,
  init?: RequestInit,
): Promise<T> {
  const res = await fetch(`/api/admin${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(init?.headers || {}),
    },
  });

  const body = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(
      (body as { error?: string }).error || `Request failed (${res.status})`,
    );
  }

  return body as T;
}

export const adminBlogsApi = {
  list: async (token: string) => {
    const res = await adminFetch<{ success: boolean; data: Blog[] }>(
      "/blogs",
      token,
    );
    return res.data;
  },

  get: async (token: string, id: string) => {
    const res = await adminFetch<{ success: boolean; data: Blog }>(
      `/blogs/${encodeURIComponent(id)}`,
      token,
    );
    return res.data;
  },

  create: async (token: string, input: AdminBlogInput) => {
    const res = await adminFetch<{ success: boolean; data: Blog }>(
      "/blogs",
      token,
      { method: "POST", body: JSON.stringify(input) },
    );
    return res.data;
  },

  update: async (token: string, id: string, input: Partial<AdminBlogInput>) => {
    const res = await adminFetch<{ success: boolean; data: Blog }>(
      `/blogs/${encodeURIComponent(id)}`,
      token,
      { method: "PATCH", body: JSON.stringify(input) },
    );
    return res.data;
  },

  remove: async (token: string, id: string) => {
    await adminFetch<{ success: boolean }>(
      `/blogs/${encodeURIComponent(id)}`,
      token,
      { method: "DELETE" },
    );
  },
};
