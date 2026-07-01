import type { Metadata } from "next";
import { JetBrains_Mono, Inter, Press_Start_2P } from "next/font/google";
import "./globals.css";
import { buildMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
});

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const display = Press_Start_2P({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = buildMetadata({
  title: `${site.name} — ${site.role}`,
  description: site.tagline,
  image: "/images/og-image.png"
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
    ],
  };

  return (
    <html
      lang="en"
      className={`${mono.variable} ${sans.variable} ${display.variable} h-full`}
    >
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-ink text-paper font-sans antialiased selection:bg-signal selection:text-ink">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
