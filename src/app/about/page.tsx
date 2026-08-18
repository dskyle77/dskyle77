import type { Metadata } from "next";
import Image from "next/image";
import { buildMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";
import Experience from "@/components/Experience";
import Reveal from "@/components/shared/Reveal";
import BackgroundGrid from "@/components/shared/BackgroundGrid";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description: `${site.name} — ${site.role} based in ${site.location}. My story, what I'm building, and what I'm learning.`,
  path: "/about",
  image: "/images/david-onyema-studio-portrait-dap-shirt.jpg",
});

const stats = [
  { value: "2+", label: "Years experience" },
  { value: "5+", label: "Projects shipped" },
  { value: "Lagos", label: "Based in Nigeria" },
];

export default function AboutPage() {
  const profileImageFullUrl = `${site.links.portfolio}/images/david-onyema-studio-portrait-dap-shirt.jpg`;
  const jsonLdAbout = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: `About ${site.name}`,
    description: `${site.name} — ${site.role} based in ${site.location}.`,
    url: `${site.links.portfolio}/about`,
    mainEntity: {
      "@type": "Person",
      name: site.name,
      alternateName: site.handle,
      jobTitle: site.role,
      image: {
        "@type": "ImageObject",
        "@id": `${profileImageFullUrl}#profile-image`,
        url: profileImageFullUrl,
        contentUrl: profileImageFullUrl,
        caption: `${site.name} — ${site.role} based in ${site.location}`,
        description: `Official studio portrait of ${site.name} (dskyle77), full-stack developer and founder of SiteNix based in ${site.location}.`,
        width: "800",
        height: "800",
        name: `${site.name} studio portrait`,
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdAbout) }}
      />
      <div className="relative" itemScope itemType="https://schema.org/Person">
        <BackgroundGrid size={{ x: "32px", y: "32px" }} />
        <section className="mx-auto max-w-5xl px-6 pt-12 pb-20 sm:pt-16 sm:pb-24">
          <Reveal>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-7 bg-signal" />
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-signal">
                About · Profile
              </p>
            </div>
          </Reveal>

          <Reveal delay={1}>
            <div className="flex flex-col sm:flex-row sm:items-center gap-8 mb-12 border-b border-white/[0.07] pb-10">
              <div className="relative shrink-0">
                <Image
                  src="/images/david-onyema-studio-portrait-dap-shirt.jpg"
                  alt={`David Onyema — full-stack developer and founder of SiteNix, studio portrait`}
                  title={`${site.name} - ${site.role}`}
                  itemProp="image"
                  width={176}
                  height={176}
                  className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-2 border-signal/30 p-1 bg-ink-raised shadow-[0_0_40px_-10px_rgba(46,158,255,0.4)]"
                  priority
                />
                <span className="absolute bottom-2 right-2 h-4 w-4 rounded-full border-2 border-ink bg-signal" />
              </div>

              <div>
                <h1 className="font-display text-4xl leading-[1.05] tracking-tight text-paper sm:text-6xl">
                  {site.name}
                </h1>
                <p className="mt-3 font-mono text-sm uppercase tracking-widest text-signal">
                  {site.role} · {site.location}
                </p>
              </div>
            </div>
          </Reveal>

          <div className="space-y-6 text-paper-dim leading-relaxed text-base sm:text-lg max-w-3xl">
            <Reveal delay={2}>
              <p className="rounded-lg border border-white/8 bg-ink-raised/60 p-6 backdrop-blur-xs">
                I&apos;m {site.name} — online I go by{" "}
                <span className="text-paper font-semibold">{site.handle}</span>.
                Full-Stack Developer based in Lagos, Nigeria. I build responsive
                web applications, APIs, content systems, and internal tools with
                Next.js, TypeScript, Node.js, and Firebase.
              </p>
            </Reveal>

            <Reveal delay={3}>
              <p>
                What I actually enjoy is taking a messy problem and turning it
                into something clean — company sites, content platforms, admin
                dashboards that non-technical people can actually use. The part
                where the UI finally feels right and the architecture
                doesn&apos;t fight you six months down the line.
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
                and Unity. Thinking about game state, feedback loops, and tight
                interactions has changed how I approach frontend. Same instinct,
                different medium — make it feel responsive.
              </p>
            </Reveal>
          </div>

          <Reveal delay={3}>
            <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4 rounded-xl border border-white/10 bg-ink-raised/80 p-6 backdrop-blur-md shadow-[0_10px_40px_-15px_rgba(0,0,0,0.5)]">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="group flex flex-col items-center justify-center p-4 rounded-lg transition-colors hover:bg-white/2 border border-transparent hover:border-signal/20"
                >
                  <p className="font-mono text-3xl sm:text-4xl font-bold text-signal tabular-nums group-hover:scale-105 transition-transform duration-300">
                    {stat.value}
                  </p>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-paper-dim/80 text-center">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={4}>
            <div className="mt-8 rounded-xl border border-signal/30 bg-signal/5 p-6 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
                </span>
                <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-signal">
                  Current Focus
                </h2>
              </div>
              <p className="font-mono text-sm text-paper leading-relaxed">
                {site.currentFocus}
              </p>
            </div>
          </Reveal>
        </section>
        <Experience />
      </div>
    </>
  );
}
