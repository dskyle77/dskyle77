import type { Metadata } from "next";
import { JetBrains_Mono, Press_Start_2P, Geist } from "next/font/google";
import "./globals.css";
import { buildMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
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

const display = Press_Start_2P({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = buildMetadata({
  title: `${site.name} — Founder of SiteNix · Full-Stack Developer`,
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
    image: `${site.links.portfolio}/images/me.png`,
    description: `${site.name} — Founder & sole developer of SiteNix. ${site.role} based in ${site.location}`,
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
      "React",
      "Next.js",
      "TypeScript",
      "Firebase",
      "Tailwind CSS",
      "Node.js",
      "JavaScript",
      "Web Development",
      "Game Development",
      "SiteNix",
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
      className={cn("h-full", "scroll-smooth", mono.variable, display.variable, "font-sans", geist.variable)}
    >
      <head>
        <meta name="google-site-verification" content="VSfQNrDzaWkb5dBYeBDV5NBTXhBMJGBGzZR4V1jSt5o" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-ink text-paper font-sans antialiased selection:bg-signal selection:text-ink overflow-x-hidden">
        <Nav />
        <main className="flex-1 relative">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
