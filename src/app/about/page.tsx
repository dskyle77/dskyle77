import type { Metadata } from "next";
import Image from "next/image";
import { buildMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

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
    <section className="mx-auto max-w-3xl px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-widest text-signal mb-3">
        About
      </p>

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

      <div className="space-y-6 text-paper-dim leading-relaxed text-base sm:text-lg">
        <p>
          I&apos;m {site.name}, also known online as{" "}
          <span className="text-paper font-medium">{site.handle}</span> — a{" "}
          {site.role.toLowerCase()} based in {site.location}. I&apos;ve spent
          the last three-plus years building websites, full-stack web applications, 
          and internal tools using Next.js, React, TypeScript, and Firebase. 
          My focus is always on creating clean, practical tools that solve real problems, 
          turning complex requirements into interfaces that feel simple to use.
        </p>
        <p>
          What I actually care about is building things people can interact with
          without thinking too hard—company sites, custom content platforms, 
          and functional admin dashboards like the ones I design for managing 
          live metrics and dynamic content. I like the part of the job where 
          messy problems turn into clean UI and solid code architectures that don&apos;t 
          fight you six months down the line.
        </p>
        <p>
          Working within resource-constrained environments has naturally taught me to 
          prioritize extreme performance and optimization from day one. When you learn 
          to keep development environments lean, you carry that mindset over into the 
          production code—making sure the apps load fast and hold up smoothly even if the 
          end-user is on a weak connection or an older device. 
        </p>
        <p>
          Beyond standard web applications, I enjoy building small games using engines like 
          Gdevelop, Godot, or Unity. Breaking down mechanics, logic states, and tight 
          feedback loops in game development directly influences how I approach frontend engineering. 
          Different medium, same core instinct: make the interaction feel incredibly responsive.
        </p>
      </div>

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

      <div className="mt-8 rounded-md border border-hairline p-6">
        <h2 className="font-mono text-xs uppercase tracking-widest text-signal mb-3">
          Currently
        </h2>
        <p className="font-mono text-sm text-paper-dim">{site.currentFocus}</p>
      </div>
    </section>
  );
}