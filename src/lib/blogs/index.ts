import { db } from "@/server/firebase-admin";
import type { Blog, BlogStatus } from "@/types/blogs";
import { slugify } from "./slug-client";

export { slugify } from "./slug-client";

const COLLECTION = "published_blogs";
const WORDS_PER_MINUTE = 200;

/** Convert Firestore Timestamp | number | string → ms epoch. */
function toMillis(value: unknown): number {
  if (value == null) return Date.now();
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Date.parse(value);
    return Number.isNaN(parsed) ? Date.now() : parsed;
  }
  if (
    typeof value === "object" &&
    value !== null &&
    "toMillis" in value &&
    typeof (value as { toMillis: () => number }).toMillis === "function"
  ) {
    return (value as { toMillis: () => number }).toMillis();
  }
  if (
    typeof value === "object" &&
    value !== null &&
    "seconds" in value &&
    typeof (value as { seconds: number }).seconds === "number"
  ) {
    return (value as { seconds: number }).seconds * 1000;
  }
  return Date.now();
}

export function estimateReadingTime(markdown: string): number {
  const words = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/[#>*_\-\[\]\(\)!]/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

export function estimateWordCount(markdown: string): number {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

function isPublishedStatus(status: unknown): boolean {
  if (status == null || status === "") return true; // legacy docs
  return status === "published";
}

/** Normalize a raw Firestore document into a Blog. */
export function normalizeBlog(
  id: string,
  raw: Record<string, unknown>,
  options: { includeContent?: boolean } = {},
): Blog {
  const includeContent = options.includeContent ?? true;
  const content =
    typeof raw.content === "string"
      ? raw.content
      : typeof raw.body === "string"
        ? raw.body
        : typeof raw.markdown === "string"
          ? raw.markdown
          : undefined;

  const tags = Array.isArray(raw.tags)
    ? (raw.tags as unknown[]).filter((t): t is string => typeof t === "string")
    : [];

  const publishedAt = toMillis(raw.publishedAt ?? raw.createdAt);
  const updatedAt = toMillis(raw.updatedAt ?? raw.publishedAt ?? publishedAt);

  const wordCount =
    typeof raw.wordCount === "number"
      ? raw.wordCount
      : content
        ? estimateWordCount(content)
        : undefined;

  const readingTimeMinutes =
    typeof raw.readingTimeMinutes === "number"
      ? raw.readingTimeMinutes
      : content
        ? estimateReadingTime(content)
        : undefined;

  const coverImage =
    (typeof raw.coverImage === "string" && raw.coverImage) ||
    (typeof raw.heroImageUrl === "string" && raw.heroImageUrl) ||
    undefined;

  const heroImageUrl =
    (typeof raw.heroImageUrl === "string" && raw.heroImageUrl) ||
    coverImage ||
    undefined;

  const blog: Blog = {
    id,
    title: typeof raw.title === "string" ? raw.title : "Untitled",
    slug:
      typeof raw.slug === "string" && raw.slug.trim()
        ? raw.slug.trim()
        : id,
    description:
      typeof raw.description === "string"
        ? raw.description
        : typeof raw.excerpt === "string"
          ? raw.excerpt
          : "",
    tags,
    publishedAt,
    updatedAt,
    status: (typeof raw.status === "string"
      ? raw.status
      : "published") as BlogStatus,
    heroImageUrl,
    coverImage,
    wordCount,
    readingTimeMinutes,
    isFeatured: Boolean(raw.isFeatured),
  };

  if (includeContent && content) {
    blog.content = content;
  }

  return blog;
}

/**
 * Public: published blogs only, ordered by publishedAt desc.
 * Content omitted by default.
 */
export async function getPublishedBlogs(
  limit = 50,
  options: { includeContent?: boolean } = {},
): Promise<Blog[]> {
  const snapshot = await db
    .collection(COLLECTION)
    .orderBy("publishedAt", "desc")
    .limit(Math.min(limit * 2, 100))
    .get();

  const blogs = snapshot.docs
    .map((doc) =>
      normalizeBlog(doc.id, doc.data() as Record<string, unknown>, {
        includeContent: options.includeContent ?? false,
      }),
    )
    .filter((b) => isPublishedStatus(b.status))
    .slice(0, limit);

  return blogs;
}

/**
 * Public: single published blog by slug (or doc id).
 */
export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  if (!slug?.trim()) return null;

  const bySlug = await db
    .collection(COLLECTION)
    .where("slug", "==", slug)
    .limit(1)
    .get();

  if (!bySlug.empty) {
    const doc = bySlug.docs[0];
    const blog = normalizeBlog(doc.id, doc.data() as Record<string, unknown>, {
      includeContent: true,
    });
    if (!isPublishedStatus(blog.status)) return null;
    return blog;
  }

  const byId = await db.collection(COLLECTION).doc(slug).get();
  if (byId.exists) {
    const blog = normalizeBlog(byId.id, byId.data() as Record<string, unknown>, {
      includeContent: true,
    });
    if (!isPublishedStatus(blog.status)) return null;
    return blog;
  }

  return null;
}

export async function getPublishedSlugs(): Promise<string[]> {
  const blogs = await getPublishedBlogs(100, { includeContent: false });
  return blogs.map((b) => b.slug).filter(Boolean);
}

// ─── Admin operations ───────────────────────────────────────────────────────

/** All blogs (draft + published + archived) for admin. */
export async function getAllBlogsAdmin(limit = 100): Promise<Blog[]> {
  // Unordered fetch + in-memory sort so legacy docs without updatedAt still appear
  const snapshot = await db.collection(COLLECTION).limit(limit).get();
  return snapshot.docs
    .map((doc) =>
      normalizeBlog(doc.id, doc.data() as Record<string, unknown>, {
        includeContent: false,
      }),
    )
    .sort((a, b) => b.updatedAt - a.updatedAt);
}

export async function getBlogByIdAdmin(id: string): Promise<Blog | null> {
  if (!id?.trim()) return null;
  const doc = await db.collection(COLLECTION).doc(id).get();
  if (!doc.exists) return null;
  return normalizeBlog(doc.id, doc.data() as Record<string, unknown>, {
    includeContent: true,
  });
}

async function ensureUniqueSlug(base: string, excludeId?: string): Promise<string> {
  let slug = slugify(base) || `post-${Date.now()}`;
  let attempt = 0;

  while (attempt < 20) {
    const snap = await db
      .collection(COLLECTION)
      .where("slug", "==", slug)
      .limit(1)
      .get();

    const conflict = snap.docs.find((d) => d.id !== excludeId);
    if (!conflict) return slug;

    attempt += 1;
    slug = `${slugify(base)}-${attempt + 1}`;
  }

  return `${slugify(base)}-${Date.now()}`;
}

export type BlogWriteInput = {
  title: string;
  slug?: string;
  description?: string;
  content?: string;
  tags?: string[];
  coverImage?: string | null;
  heroImageUrl?: string | null;
  status?: BlogStatus;
  isFeatured?: boolean;
};

function buildDocPayload(
  input: BlogWriteInput,
  existing?: Blog | null,
): Record<string, unknown> {
  const now = Date.now();
  const content = input.content ?? existing?.content ?? "";
  const status = (input.status ?? existing?.status ?? "draft") as BlogStatus;
  const wasPublished = existing ? isPublishedStatus(existing.status) : false;
  const willPublish = status === "published";

  let publishedAt = existing?.publishedAt ?? now;
  if (willPublish && !wasPublished) {
    publishedAt = now;
  }
  if (!willPublish && !wasPublished) {
    publishedAt = existing?.publishedAt ?? now;
  }

  const cover =
    input.coverImage === null
      ? null
      : (input.coverImage ??
        input.heroImageUrl ??
        existing?.coverImage ??
        existing?.heroImageUrl ??
        null);

  const payload: Record<string, unknown> = {
    title: (input.title ?? existing?.title ?? "Untitled").trim(),
    description: (input.description ?? existing?.description ?? "").trim(),
    content,
    tags: Array.isArray(input.tags)
      ? input.tags.map((t) => t.trim()).filter(Boolean)
      : (existing?.tags ?? []),
    status,
    isFeatured: Boolean(
      input.isFeatured ?? existing?.isFeatured ?? false,
    ),
    wordCount: content ? estimateWordCount(content) : 0,
    readingTimeMinutes: content ? estimateReadingTime(content) : 1,
    publishedAt,
    updatedAt: now,
  };

  if (cover) {
    payload.coverImage = cover;
    payload.heroImageUrl = cover;
  } else if (input.coverImage === null || input.heroImageUrl === null) {
    payload.coverImage = null;
    payload.heroImageUrl = null;
  }

  return payload;
}

export async function createBlog(input: BlogWriteInput): Promise<Blog> {
  const title = input.title?.trim();
  if (!title) {
    throw new Error("Title is required.");
  }

  const slug = await ensureUniqueSlug(input.slug?.trim() || title);
  const payload = buildDocPayload({ ...input, title });
  payload.slug = slug;

  // Prefer slug as document id when available and unused
  const preferredId = slug;
  const existingId = await db.collection(COLLECTION).doc(preferredId).get();
  const ref = existingId.exists
    ? db.collection(COLLECTION).doc()
    : db.collection(COLLECTION).doc(preferredId);

  await ref.set(payload);

  return normalizeBlog(ref.id, payload, { includeContent: true });
}

export async function updateBlog(
  id: string,
  input: BlogWriteInput,
): Promise<Blog> {
  const existing = await getBlogByIdAdmin(id);
  if (!existing) {
    throw new Error("Blog not found.");
  }

  const title = (input.title ?? existing.title).trim();
  if (!title) {
    throw new Error("Title is required.");
  }

  let slug = existing.slug;
  if (input.slug !== undefined && input.slug.trim()) {
    slug = await ensureUniqueSlug(input.slug.trim(), id);
  }

  const payload = buildDocPayload({ ...input, title }, existing);
  payload.slug = slug;

  await db.collection(COLLECTION).doc(id).set(payload, { merge: true });

  const updated = await getBlogByIdAdmin(id);
  if (!updated) throw new Error("Failed to load updated blog.");
  return updated;
}

export async function deleteBlog(id: string): Promise<void> {
  const ref = db.collection(COLLECTION).doc(id);
  const doc = await ref.get();
  if (!doc.exists) {
    throw new Error("Blog not found.");
  }
  await ref.delete();
}
