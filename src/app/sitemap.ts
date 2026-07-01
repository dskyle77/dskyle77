import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.links.portfolio;

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), priority: 1 },
    { url: `${base}/projects`, lastModified: new Date(), priority: 0.8 },
    { url: `${base}/about`, lastModified: new Date(), priority: 0.6 },
    { url: `${base}/contact`, lastModified: new Date(), priority: 0.5 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${base}/projects/${p.slug}`,
    lastModified: new Date(),
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes];
}
