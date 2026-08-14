import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";
import { getPublishedBlogs } from "@/lib/blogs";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = site.links.portfolio;

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), priority: 1 },
    { url: `${base}/projects`, lastModified: new Date(), priority: 0.8 },
    { url: `${base}/blogs`, lastModified: new Date(), priority: 0.8 },
    { url: `${base}/about`, lastModified: new Date(), priority: 0.6 },
    { url: `${base}/resume`, lastModified: new Date(), priority: 0.7 },
    { url: `${base}/contact`, lastModified: new Date(), priority: 0.5 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${base}/projects/${p.slug}`,
    lastModified: new Date(),
    priority: 0.7,
  }));

  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const blogs = await getPublishedBlogs(100, { includeContent: false });
    blogRoutes = blogs.map((b) => ({
      url: `${base}/blogs/${b.slug}`,
      lastModified: new Date(b.updatedAt || b.publishedAt),
      priority: 0.7,
    }));
  } catch {
    // Sitemap still works without blogs if Firebase is unavailable at build time
  }

  return [...staticRoutes, ...projectRoutes, ...blogRoutes];
}
