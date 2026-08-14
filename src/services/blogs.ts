import { api } from "./axios";
import type { Blog, BlogDetailResponse, BlogsListResponse } from "@/types/blogs";

export const blogsApi = {
  getPublishedBlogs: async (): Promise<BlogsListResponse> => {
    const response = await api.get<BlogsListResponse>("/blogs");
    return response.data;
  },

  getBlogBySlug: async (slug: string): Promise<Blog> => {
    const response = await api.get<BlogDetailResponse>(
      `/blogs/${encodeURIComponent(slug)}`,
    );
    if (!response.data?.success || !response.data.data) {
      throw new Error("Blog not found");
    }
    return response.data.data;
  },
};
