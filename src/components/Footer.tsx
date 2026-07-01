import { site } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();

  const socials = [
    { label: "GitHub", href: site.links.github },
    { label: "LinkedIn", href: site.links.linkedin },
    { label: "itch.io", href: site.links.itch },
    { label: "Twitter", href: site.links.twitter },
  ].filter((s) => s.href);

  return (
    <footer className="border-t border-hairline">
      <div className="mx-auto max-w-5xl px-6 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="font-mono text-xs text-paper-dim">
          © {year} {site.name}. Built with Next.js, shipped on Vercel.
        </p>
        <div className="flex flex-wrap items-center gap-5 font-mono text-xs uppercase tracking-wider">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-paper-dim hover:text-signal transition-colors"
            >
              {s.label}
            </a>
          ))}
          <a
            href={`mailto:${site.email}`}
            className="text-paper-dim hover:text-signal transition-colors"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
