export type BlogStatus = "published" | "draft" | "archived" | string;

export interface Blog {
  id: string;
  title: string;
  slug: string;
  description: string;
  /** Markdown body. Present on detail fetches; may be omitted on list endpoints. */
  content?: string;
  tags: string[];
  /** Unix timestamp in milliseconds */
  publishedAt: number;
  /** Unix timestamp in milliseconds */
  updatedAt: number;
  status: BlogStatus;
  heroImageUrl?: string;
  coverImage?: string;
  wordCount?: number;
  readingTimeMinutes?: number;
  isFeatured?: boolean;
}

/** Shape returned by list endpoints (content intentionally excluded for payload size). */
export type BlogSummary = Omit<Blog, "content">;

export interface BlogsListResponse {
  success: boolean;
  data: Blog[];
}

export interface BlogDetailResponse {
  success: boolean;
  data: Blog;
}
