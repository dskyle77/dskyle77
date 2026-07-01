import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description: `Get in touch with ${site.name} (${site.handle}).`,
  path: "/contact",
});

const channels = [
  { label: "Email", value: site.email, href: `mailto:${site.email}` },
  { label: "GitHub", value: `github.com/${site.handle}`, href: site.links.github },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/david-onyema",
    href: site.links.linkedin,
  },
];

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-widest text-signal mb-3">
        Contact
      </p>
      <h1 className="font-mono font-bold text-3xl sm:text-4xl text-paper mb-4">
        Let&apos;s work together
      </h1>
      <p className="text-paper-dim leading-relaxed max-w-lg mb-10">
        Got an idea, a role, or a project? The fastest way to reach me is
        email — I check it daily.
      </p>

      <div className="space-y-3">
        {channels.map((c) => (
          <a
            key={c.label}
            href={c.href}
            target={c.href.startsWith("mailto:") ? undefined : "_blank"}
            rel={c.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
            className="group flex items-center justify-between rounded-md border border-hairline px-5 py-4 hover:border-signal transition-colors"
          >
            <div>
              <p className="font-mono text-[11px] uppercase tracking-widest text-paper-dim">
                {c.label}
              </p>
              <p className="font-mono text-sm text-paper group-hover:text-signal transition-colors">
                {c.value}
              </p>
            </div>
            <span
              aria-hidden="true"
              className="font-mono text-signal opacity-0 group-hover:opacity-100 transition-opacity"
            >
              →
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
