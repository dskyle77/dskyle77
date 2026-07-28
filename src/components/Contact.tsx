import { site } from "@/lib/site";
import Reveal from "./Reveal";

const channels = [
  {
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    hint: "Best way to reach me",
  },
  {
    label: "GitHub",
    value: `github.com/${site.handle}`,
    href: site.links.github,
    hint: "Code & repos",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/dskyle77",
    href: site.links.linkedin,
    hint: "Professional profile",
  },
];

export default function Contact() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
      <Reveal>
        <div className="text-center sm:text-left">
          <p className="font-mono text-xs uppercase tracking-widest text-signal mb-3">
            Contact
          </p>
          <h1 className="font-mono font-bold text-3xl sm:text-4xl text-paper mb-4">
            Let&apos;s talk
          </h1>
          <p className="text-paper-dim leading-relaxed max-w-lg mb-12 mx-auto sm:mx-0">
            Got an idea, a role, or something you want built? Email is the
            fastest route — I actually check it.
          </p>
        </div>
      </Reveal>

      <div className="grid gap-4 sm:grid-cols-3">
        {channels.map((c, i) => (
          <Reveal key={c.label} delay={(Math.min(i + 1, 5) as 1 | 2 | 3 | 4 | 5)}>
            <a
              href={c.href}
              target={c.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={
                c.href.startsWith("mailto:") ? undefined : "noopener noreferrer"
              }
              className="group card-lift relative flex flex-col justify-between rounded-lg border border-hairline bg-ink-raised p-6 min-h-37 hover:border-signal"
            >
              <div className="flex items-center justify-between">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-signal">
                  {c.label}
                </p>
                <span
                  aria-hidden="true"
                  className="font-mono text-paper-dim group-hover:text-signal group-hover:translate-x-0.5 transition-all duration-300"
                >
                  →
                </span>
              </div>

              <div>
                <p className="font-mono text-sm sm:text-base text-paper wrap-break-word group-hover:text-signal transition-colors duration-300">
                  {c.value}
                </p>
                <p className="mt-1.5 font-mono text-[11px] text-paper-dim">
                  {c.hint}
                </p>
              </div>
            </a>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <p className="mt-10 text-center sm:text-left font-mono text-xs text-paper-dim">
          Based in {site.location} · Open to remote
        </p>
      </Reveal>
    </section>
  );
}
