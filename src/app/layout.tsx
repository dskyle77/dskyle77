import type { Metadata } from "next";
import { JetBrains_Mono, Geist } from "next/font/google";
import "./globals.css";
import { buildMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";
import SiteChrome from "@/components/SiteChrome";
import { cn } from "@/lib/utils";

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = buildMetadata({
  title: `${site.name} — Junior Full-Stack Developer · Founder of SiteNix`,
  description: site.tagline,
  image: "/images/og.png",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    alternateName: site.handle,
    jobTitle: site.role,
    url: site.links.portfolio,
    image: `${site.links.portfolio}/images/david-onyema-studio-portrait-dap-shirt.jpg`,
    description: `${site.name} — ${site.role}. Founder of SiteNix. Based in ${site.location}`,
    email: site.email,
    sameAs: [
      site.links.github,
      site.links.linkedin,
      site.links.itch,
      site.links.twitter,
      site.links.facebook,
    ].filter(Boolean),
    address: {
      "@type": "PostalAddress",
      addressLocality: site.location,
      addressCountry: "NG",
    },
    knowsAbout: [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "Express.js",
      "Firebase",
      "SQLite",
      "Tailwind CSS",
      "Game Development",
      "SiteNix",
      "Ziva",
    ],
    founder: {
      "@type": "Organization",
      name: "SiteNix",
      url: "https://sitenix.app",
    },
  };

  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "scroll-smooth",
        mono.variable,
        "font-sans",
        geist.variable,
      )}
    >
      <head>
        <meta
          name="google-site-verification"
          content="VSfQNrDzaWkb5dBYeBDV5NBTXhBMJGBGzZR4V1jSt5o"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-ink text-paper font-sans antialiased selection:bg-signal selection:text-ink overflow-x-hidden">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
