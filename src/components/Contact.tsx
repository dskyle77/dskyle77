import { site } from "@/lib/site";
import Reveal from "./shared/Reveal";
import BackgroundGrid from "./shared/BackgroundGrid";

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
];

export default function Contact() {
  return (
    <div className="relative">
      <BackgroundGrid size={{ x: "32px", y: "32px" }} />
      <section className="mx-auto max-w-5xl overflow-hidden px-6 py-24 sm:py-32">
        {/* Content */}
        <div className="relative">
        <Reveal>
          <div className="max-w-2xl">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-signal" />
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-signal">
                Contact
              </p>
            </div>

            <h2 className="font-display text-4xl leading-[1.05] tracking-tight text-paper sm:text-6xl">
              Have something
              <br />
              <span className="text-paper-dim">worth building?</span>
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-7 text-paper-dim sm:text-base">
              Got an idea, a role, or something that needs to be built? Send me
              a message. I&apos;m always interested in good problems and
              interesting projects.
            </p>
          </div>
        </Reveal>

        {/* Contact links */}
        <div className="mt-12 grid gap-3 sm:grid-cols-3">
          {channels.map((channel, i) => (
            <Reveal
              key={channel.label}
              delay={Math.min(i + 1, 5) as 1 | 2 | 3 | 4 | 5}
            >
              <a
                href={channel.href}
                target={
                  channel.href.startsWith("mailto:") ? undefined : "_blank"
                }
                rel={
                  channel.href.startsWith("mailto:")
                    ? undefined
                    : "noopener noreferrer"
                }
                className={`group relative flex min-h-36 flex-col justify-between overflow-hidden rounded-lg border p-5 transition-all duration-300 ${
                  channel.primary
                    ? "border-signal/30 bg-signal/5 hover:border-signal/60 hover:bg-signal/8"
                    : "border-white/8 bg-white/2 hover:border-signal/30 hover:bg-white/4"
                }`}
              >
                {/* Hover glow */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-12 -top-12 h-24 w-24 rounded-full bg-blue-500/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />

                <div className="relative flex items-center justify-between">
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-signal">
                    {channel.label}
                  </span>

                  <span className="font-mono text-sm text-paper-dim transition-all duration-300 group-hover:translate-x-1 group-hover:text-signal">
                    ↗
                  </span>
                </div>

                <div className="relative mt-8">
                  <p className="break-all font-mono text-sm text-paper transition-colors duration-300 group-hover:text-signal">
                    {channel.value}
                  </p>

                  <p className="mt-1.5 font-mono text-[10px] text-paper-dim/70">
                    {channel.hint}
                  </p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        {/* Footer status */}
        <Reveal>
          <div className="mt-10 flex flex-col gap-3 border-t border-white/[0.07] pt-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-40" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
              </span>

              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-paper-dim">
                Open to remote opportunities
              </span>
            </div>

            <span className="font-mono text-[10px] text-paper-dim/60">
              {site.location}
            </span>
          </div>
        </Reveal>
      </div>
      </section>
    </div>
  );
}
