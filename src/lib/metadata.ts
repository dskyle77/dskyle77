import type { Metadata } from "next";
import { site } from "./site";

const baseUrl = site.links.portfolio;

export function buildMetadata({
  title,
  description,
  path = "",
  image,
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
}): Metadata {
  const url = `${baseUrl}${path}`;
  const fullTitle = title === site.name ? title : `${title} · ${site.name}`;
  const images = image ? [{ url: image }] : undefined;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(baseUrl),
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: site.name,
      type: "website",
      locale: "en_NG",
      ...(images && { images }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      ...(images && { images }),
    },
  };
}