import { site } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();

  const socials = [
    { label: "GitHub", href: site.links.github },
    { label: "LinkedIn", href: site.links.linkedin },
    { label: "X", href: site.links.twitter },
    { label: "itch.io", href: site.links.itch },
    { label: "Facebook", href: site.links.facebook },
  ].filter((s) => s.href);

  return (
    <footer className="mt-auto border-t border-hairline/80">
      <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-5 px-6 py-10 sm:flex-row sm:items-center">
        <p className="text-sm text-paper-dim">
          © {year} {site.name} · @{site.handle}
        </p>
        <div className="flex flex-wrap items-center gap-5 text-sm">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-paper-dim transition-colors duration-200 hover:text-signal"
            >
              {s.label}
            </a>
          ))}
          <a
            href={`mailto:${site.email}`}
            className="text-paper-dim transition-colors duration-200 hover:text-signal"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
