import { site } from "@/lib/site";
import Reveal from "./shared/Reveal";

const channels = [
  {
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    hint: "Best way to reach me",
    primary: true,
  },
  {
    label: "GitHub",
    value: `github.com/${site.handle}`,
    href: site.links.github,
    hint: "Code & repositories",
    primary: false,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/dskyle77",
    href: site.links.linkedin,
    hint: "Professional profile",
    primary: false,
  },
  {
    label: "X",
    value: `@${site.handle}`,
    href: site.links.twitter,
    hint: "Updates & thoughts",
    primary: false,
  },
];

export default function Contact() {
  return (
    <section className="mx-auto max-w-5xl overflow-hidden px-6 py-24 sm:py-32">
      <div className="relative">
        <Reveal>
          <div className="max-w-2xl">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-signal" />
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-signal">
                Contact
              </p>
            </div>

            <h2 className="text-4xl font-semibold leading-[1.1] tracking-tight text-paper sm:text-5xl lg:text-6xl">
              Let&apos;s build something
            </h2>

            <p className="mt-6 max-w-lg text-base leading-relaxed text-paper-dim sm:text-lg">
              Open to junior roles, freelance, and collabs. Prefer email for
              anything serious — I actually read it.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-3 sm:grid-cols-2">
          {channels.map((ch, i) => (
            <Reveal key={ch.label} delay={(i % 4) + 1}>
              <a
                href={ch.href}
                target={ch.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  ch.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className={`group block rounded-2xl border p-5 transition-all duration-300 ${
                  ch.primary
                    ? "border-signal/25 bg-signal/8 hover:border-signal/45 hover:bg-signal/12"
                    : "border-white/8 bg-white/[0.02] hover:border-signal/25 hover:bg-white/[0.04]"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.1em] text-paper-dim">
                      {ch.label}
                    </p>
                    <p className="mt-1.5 text-sm font-medium text-paper transition-colors group-hover:text-signal">
                      {ch.value}
                    </p>
                    <p className="mt-1 text-xs text-paper-dim/80">{ch.hint}</p>
                  </div>
                  <span className="text-signal opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100">
                    →
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
