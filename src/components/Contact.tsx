import { site } from "@/lib/site";

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
      <div className="text-center sm:text-left">
        <p className="font-mono text-xs uppercase tracking-widest text-signal mb-3">
          Contact
        </p>
        <h1 className="font-mono font-bold text-3xl sm:text-4xl text-paper mb-4">
          Let&apos;s work together
        </h1>
        <p className="text-paper-dim leading-relaxed max-w-lg mb-12 mx-auto sm:mx-0">
          Got an idea, a role, or a project? The fastest way to reach me is
          email — I check it daily.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {channels.map((c, i) => (
          <a
            key={c.label}
            href={c.href}
            target={c.href.startsWith("mailto:") ? undefined : "_blank"}
            rel={
              c.href.startsWith("mailto:") ? undefined : "noopener noreferrer"
            }
            className={`group relative flex flex-col justify-between rounded-lg border border-hairline bg-ink-raised p-6 min-h-37 transition-all hover:border-signal hover:shadow-[0_0_28px_-10px_rgba(46,158,255,0.5)] ${
              i === 0 ? "sm:col-span-1" : ""
            }`}
          >
            <div className="flex items-center justify-between">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-signal">
                {c.label}
              </p>
              <span
                aria-hidden="true"
                className="font-mono text-paper-dim group-hover:text-signal group-hover:translate-x-0.5 transition-all"
              >
                →
              </span>
            </div>

            <div>
              <p className="font-mono text-sm sm:text-base text-paper wrap-break-word group-hover:text-signal transition-colors">
                {c.value}
              </p>
              <p className="mt-1.5 font-mono text-[11px] text-paper-dim">
                {c.hint}
              </p>
            </div>
          </a>
        ))}
      </div>

      <p className="mt-10 text-center sm:text-left font-mono text-xs text-paper-dim">
        Based in {site.location} · Open to remote work
      </p>
    </section>
  );
}
