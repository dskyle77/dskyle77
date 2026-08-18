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
  const imageUrl = image
    ? image.startsWith("http")
      ? image
      : `${baseUrl}${image.startsWith("/") ? "" : "/"}${image}`
    : `${baseUrl}/images/david-onyema-studio-portrait-dap-shirt.jpg`;

  const ogImages = [
    {
      url: imageUrl,
      width: 1200,
      height: 630,
      alt: `${site.name} — ${site.role} based in ${site.location}`,
    },
  ];

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
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [imageUrl],
    },
  };
}