import type { Metadata } from "next";
import Image from "next/image";
import { buildMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";
import Experience from "@/components/Experience";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description: `${site.name} — ${site.role} based in ${site.location}. My story, what I'm building, and what I'm learning.`,
  path: "/about",
});

const stats = [
  { value: "3+", label: "Years experience" },
  { value: "15+", label: "Projects shipped" },
  { value: "Lagos", label: "Based in Nigeria" },
];

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto max-w-5xl px-6 py-16">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-signal mb-3">
            About
          </p>
        </Reveal>

        <Reveal delay={1}>
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-10">
            <Image
              src="/images/me.png"
              alt={site.name}
              width={176}
              height={176}
              className="w-36 h-36 sm:w-44 sm:h-44 rounded-full object-cover border border-hairline"
              priority
            />
            <h1 className="font-mono font-bold text-3xl sm:text-4xl text-paper">
              {site.name}
            </h1>
          </div>
        </Reveal>

        <div className="space-y-6 text-paper-dim leading-relaxed text-base sm:text-lg">
          <Reveal delay={2}>
            <p>
              I&apos;m {site.name} — online I go by{" "}
              <span className="text-paper font-medium">{site.handle}</span>.
              Junior Web Developer based in Lagos. I&apos;ve spent the last
              few years building sites, full-stack apps, and internal tools
              with Next.js, React, TypeScript, and Firebase. Mostly just
              trying to make things that work well and don&apos;t fall apart
              later.
            </p>
          </Reveal>

          <Reveal delay={3}>
            <p>
              What I actually enjoy is taking a messy problem and turning it
              into something clean — company sites, content platforms, admin
              dashboards that non-technical people can actually use. The part
              where the UI finally feels right and the architecture doesn&apos;t
              fight you six months down the line.
            </p>
          </Reveal>

          <Reveal delay={4}>
            <p>
              Working with limited resources taught me to care about
              performance early. If it loads fast on a weak connection, it
              usually feels good everywhere else too. I carry that mindset
              into every project.
            </p>
          </Reveal>

          <Reveal delay={5}>
            <p>
              Outside of web work I build small games with Gdevelop, Godot,
              and Unity. Thinking about game state, feedback loops, and
              tight interactions has changed how I approach frontend. Same
              instinct, different medium — make it feel responsive.
            </p>
          </Reveal>
        </div>

        <Reveal>
          <div className="mt-12 grid grid-cols-3 gap-4 rounded-md border border-hairline bg-ink-raised p-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-mono text-2xl sm:text-3xl font-bold text-signal">
                  {stat.value}
                </p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-paper-dim">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-8 rounded-md border border-hairline p-6">
            <h2 className="font-mono text-xs uppercase tracking-widest text-signal mb-3">
              Currently
            </h2>
            <p className="font-mono text-sm text-paper-dim">
              {site.currentFocus}
            </p>
          </div>
        </Reveal>
      </section>

      <Experience />
    </>
  );
}
