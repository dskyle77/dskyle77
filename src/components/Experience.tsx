import Link from "next/link";
import { experience, type ExperienceEntry } from "@/lib/experience";
import Reveal from "./shared/Reveal";
import Aurora from "./shared/Aurora";

const typeLabel: Record<string, string> = {
  work: "Employment",
  founder: "Founder",
  freelance: "Freelance",
  gamedev: "Game Dev",
};

function TechTags({
  stack,
  align = "left",
}: {
  stack?: readonly string[];
  align?: "left" | "right";
}) {
  if (!stack?.length) return null;

  return (
    <ul
      className={`mt-5 flex flex-wrap gap-1.5 ${
        align === "right" ? "sm:justify-end" : ""
      }`}
    >
      {stack.map((tech) => (
        <li
          key={tech}
          className="rounded border border-white/10 bg-white/2 px-2 py-1 font-mono text-[9px] uppercase tracking-wide text-paper-dim transition-colors hover:border-signal/30 hover:text-paper"
        >
          {tech}
        </li>
      ))}
    </ul>
  );
}

function Card({
  item,
  compact,
  align,
}: {
  item: ExperienceEntry;
  compact: boolean;
  align: "left" | "right";
}) {
  const right = align === "right";

  return (
    <div className={right ? "sm:text-right" : ""}>
      {/* Metadata */}
      <div
        className={`mb-3 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-signal ${
          right ? "sm:justify-end" : ""
        }`}
      >
        <span>{item.period}</span>
        <span className="text-paper-dim/30">/</span>
        <span className="text-paper-dim">{typeLabel[item.type]}</span>
      </div>

      {/* Role */}
      <h3 className="font-display text-xl leading-tight text-paper sm:text-2xl">
        {item.role}
      </h3>

      {/* Organization */}
      <p className="mt-1 font-mono text-xs text-paper-dim">{item.org}</p>

      {/* Description */}
      <p
        className={`mt-4 max-w-xl text-sm leading-7 text-paper-dim ${
          right ? "sm:ml-auto" : ""
        }`}
      >
        {item.summary}
      </p>

      {/* Highlights */}
      {!compact && item.highlights?.length > 0 && (
        <ul className={`mt-5 space-y-2 max-w-xl ${right ? "sm:ml-auto" : ""}`}>
          {item.highlights.map((highlight) => (
            <li
              key={highlight}
              className={`flex gap-2.5 text-xs leading-6 text-paper-dim ${
                right ? "sm:flex-row-reverse" : ""
              }`}
            >
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-signal" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      )}

      <TechTags stack={item.stack} align={align} />
    </div>
  );
}

export default function Experience({ compact = false }: { compact?: boolean }) {
  const entries = compact ? experience.slice(0, 3) : experience;

  return (
    <section id="experience" className="relative mx-auto max-w-5xl px-6 py-20">
      {/* Header */}
      <Reveal>
        <div className="mb-14 flex items-end  justify-between gap-6">
          <div>
            <div className="flex justify-between items-center mb-6 md:mb-0">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-signal">
                Experience
              </p>
              <Link
                href="/about#experience"
                className="inline font-mono text-xs text-signal link-underline md:hidden"
              >
                Full history →
              </Link>
            </div>

            <h2 className="font-display text-3xl leading-tight text-paper sm:text-4xl">
              Where I&apos;ve been
            </h2>
          </div>

          {compact && (
            <Link
              href="/about#experience"
              className="hidden font-mono text-xs text-signal link-underline md:block"
            >
              Full history →
            </Link>
          )}
        </div>
      </Reveal>

      {/* Timeline */}
      <ol className="relative">
        {/* Timeline rail */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-1.25 top-0 w-px bg-linear-to-b from-signal/0 via-signal/30 to-signal/0 sm:left-1/2 sm:-translate-x-1/2"
        />

        {entries.map((item, i) => {
          const isRight = i % 2 === 1;

          return (
            <li key={item.id} className="relative mb-14 last:mb-0 sm:mb-20">
              {/* Timeline node */}
              <div
                aria-hidden="true"
                className="absolute left-0 top-1 z-20 flex h-3 w-3 items-center justify-center rounded-full border border-signal bg-ink shadow-[0_0_14px_rgba(46,158,255,0.5)] sm:left-1/2 sm:-translate-x-1/2"
              >
                <span className="h-1 w-1 rounded-full bg-signal" />
              </div>

              <Reveal direction={isRight ? "right" : "left"} delay={i + 1}>
                <div className="pl-8 sm:grid sm:grid-cols-2 sm:gap-16 sm:pl-0">
                  {isRight ? (
                    <>
                      {/* Aurora side */}
                      <div className="relative hidden min-h-full sm:block">
                        <Aurora
                          intensity={0.18}
                          className=" left-0 top-1/2 -translate-x-1/4 -translate-y-1/2 scale-75 opacity-60 animate-aurora-breathe [animation-delay:-8s]"
                        />
                      </div>

                      {/* Card */}
                      <div className="relative z-10 sm:pl-8">
                        <div className="rounded-lg border border-white/6 bg-white/1.5 p-6 transition-colors duration-300 hover:border-signal/20">
                          <Card item={item} compact={compact} align="left" />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Card */}
                      <div className="relative z-10 sm:pr-8">
                        <div className="rounded-lg border border-white/6 bg-white/1.5 p-6 transition-colors duration-300 hover:border-signal/20">
                          <Card item={item} compact={compact} align="left" />
                        </div>
                      </div>

                      {/* Aurora side */}
                      <div className="relative hidden min-h-full sm:block">
                        <Aurora
                          intensity={0.18}
                          className="
                    right-0 top-1/2
                    translate-x-1/4 -translate-y-1/2
                    scale-75
                    opacity-60
                    animate-aurora-breathe
                    [animation-delay:-17s]
                  "
                        />
                      </div>
                    </>
                  )}
                </div>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
