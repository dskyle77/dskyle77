import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

import Contact from "@/components/Contact";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description: `Get in touch with ${site.name} (${site.handle}).`,
  path: "/contact",
});

export default function ContactPage() {
  return <Contact />;
}
