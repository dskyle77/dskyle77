export type Project = {
  slug: string;
  title: string;
  summary: string;
  problem: string;
  approach: string;
  decisions: string;
  result: string;
  stack: string[];
  liveUrl?: string;
  repoUrl?: string;
  image?: string;
  featured: boolean;
};

// NOTE: `problem` / `approach` / `decisions` / `result` below are drafted from
// the short descriptions on your old site. Replace with your real specifics —
// actual numbers, actual tradeoffs, actual things that went wrong — wherever
// you can. Specific beats polished every time.

export const projects: Project[] = [
  {
    slug: "quicksite",
    title: "Quicksite",
    summary:
      "A platform for creating and managing business mini-sites with reusable sections, live editing, and custom branding.",
    problem:
      "Small businesses need a web presence fast, but most site builders are either too rigid (fixed templates) or too complex (full CMS platforms) for someone without technical skills to use confidently.",
    approach:
      "Built an editor around reusable, swappable sections rather than fixed page templates — so a business owner can assemble a site from components (hero, gallery, contact, pricing) and see changes live, without touching code.",
    decisions:
      "Chose Firebase over a custom backend to move fast on auth, storage, and realtime sync for the live-editing experience — trading some backend flexibility for a much shorter path to a working product. Built the editor state management to support undo/redo from day one, since non-technical users make a lot of exploratory edits.",
    result:
      "Live and in use. The reusable-section architecture turned out to be the right call — adding new section types is now fast because they all share the same editing and rendering contract.",
    stack: ["Next.js", "TypeScript", "Firebase", "Tailwind CSS"],
    liveUrl: "https://quicksiteio.vercel.app/",
    image: "/image-previews/quicksite.png",
    featured: true,
  },
  {
    slug: "legal-baby-distribution",
    title: "Legal Baby Distribution",
    summary:
      "Music distribution platform for independent artists, with a modern frontend and scalable content structure.",
    problem:
      "Independent artists need a professional, trustworthy platform to present their catalog and distribution services — first impressions matter a lot when artists are deciding who to trust with their music.",
    approach:
      "Focused on a clean, fast-loading marketing site backed by a content structure that scales as the catalog and service pages grow, rather than a one-off static build.",
    decisions:
      "Used shadcn/ui components on top of Tailwind to get a polished, consistent UI quickly without building a design system from scratch — a deliberate tradeoff of some visual uniqueness for speed and consistency on a client timeline.",
    result:
      "Shipped and live. Working within an existing component system meant the site could go from design to production noticeably faster than building every component from scratch.",
    stack: ["Next.js", "Tailwind CSS", "shadcn/ui"],
    liveUrl: "https://legalbabydistribution.com/",
    image: "/image-previews/legalbaby.png",
    featured: true,
  },
  {
    slug: "blog-dashboard",
    title: "Blog Dashboard",
    summary:
      "Content management dashboard with live editing, post management, and a responsive UI for smooth publishing workflows.",
    problem:
      "Writers and editors need a dashboard that doesn't get in the way — most CMS admin panels are either bloated or too basic to support a real editorial workflow.",
    approach:
      "Built a focused dashboard around the core publishing loop: draft, preview, edit, publish — with state kept predictable so the UI never lags behind what's actually saved.",
    decisions:
      "Chose Zustand over Redux for state management — the app didn't need Redux's middleware ecosystem, and Zustand's smaller API meant less boilerplate and faster iteration on the editing UI.",
    result:
      "A responsive, working dashboard that handles the full publishing workflow. The lighter state management choice paid off in how quickly new features could be added without fighting the store.",
    stack: ["React", "Zustand", "Tailwind CSS"],
    liveUrl: "https://blogsitegxu.vercel.app/",
    repoUrl: "https://github.com/dskyle77",
    featured: false,
  },
  {
    slug: "max-games-maker",
    title: "Max Games Maker",
    summary:
      "Experimental platform for creating and testing mini games with editable templates and mobile-friendly tools.",
    problem:
      "I wanted a sandbox to combine my game development background with web tooling — a place to test how far a browser-based, mobile-friendly game editor could go without a heavy game engine.",
    approach:
      "Started with editable game templates rather than a from-scratch editor, so the project could prove out the core interaction model — pick a template, customize it, play it on mobile — before investing in more general tooling.",
    decisions:
      "Kept the stack deliberately lightweight (React + Material UI) instead of reaching for a canvas/game-engine library, since the goal was fast iteration on the editing experience, not engine-level performance.",
    result:
      "A working experimental platform that validated the template-first approach. It also fed directly back into my day-to-day web work — some of the state and UI patterns from this project show up in later projects like Blog Dashboard.",
    stack: ["React", "Material UI"],
    liveUrl: "https://max-games-maker-site.vercel.app",
    repoUrl: "https://github.com/dskyle77",
    image: "",
    featured: false,
  },
  {
    slug: "benzene-plus-academy",
    title: "Benzene Plus Academy",
    summary:
      "A full-stack enrollment platform and content management system for a prominent JAMB, WAEC & NECO tutorial academy in Lagos, engineered to convert visiting parents into registered students.",
    problem:
      "An educational academy competing for trust needs a credible, high-converting web presence with visible proof of results, clear program tracking, and a seamless onboarding system, alongside an internal tool for staff to update student records without editing source code.",
    approach:
      "Structured the platform into a high-converting public storefront and a secure admin dashboard. The user-facing site focuses on trust signals: localized stats, testimonials, and structured exam breakdowns (JAMB, Post-UTME, WAEC). Built a secure content management dashboard that allows administrators to dynamically publish educational blogs and update top-scorer metrics per exam cycle.",
    decisions:
      "Integrated a secure admin dashboard using Firebase to allow non-technical staff to update results every academic year. For the consumer side, I routed registrations through WhatsApp deep links instead of complex data forms, drastically reducing friction since Nigerian parents prefer direct instant messaging for high-trust decisions like education.",
    result:
      "Fully operational and deployed. The academy now independently publishes weekly blogs and updates top-scoring student profiles each JAMB cycle via their private dashboard, resulting in self-sustaining data management and an active pipeline of student inquiries.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Firebase"],
    liveUrl: "https://benzene-plus-academy.vercel.app/",
    image: "/image-previews/benzene-plus-academy.png",
    featured: true,
  },
];

export function getFeaturedProjects() {
  return projects.filter((p) => p.featured);
}

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}
