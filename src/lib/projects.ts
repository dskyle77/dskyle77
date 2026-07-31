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
    slug: "sitenix",
    title: "SiteNix",
    summary:
      "A visual website builder with AI-assisted content generation, reusable components, and a responsive editing experience for creating and publishing modern websites.",

    problem:
      "Traditional website builders often trade flexibility for simplicity or overwhelm users with complex editing interfaces. I wanted to build a visual editor that feels approachable while still giving users precise control over their websites.",

    approach:
      "Built a component-based visual editor where every website is represented as a JSON node tree. The editor supports reusable components, responsive layouts, live editing, and AI-assisted content generation while keeping rendering and state management predictable.",

    decisions:
      "Designed the editor around a JSON node architecture instead of HTML templates, making serialization, rendering, undo/redo, reusable components, and future features like expressions and dynamic data much easier to implement. Chose Firebase to simplify authentication and persistence while focusing development effort on the editor experience.",

    result:
      "SiteNix provides a scalable visual editing platform with reusable components, responsive editing, live previews, AI-assisted content generation, and one-click publishing. The underlying architecture allows new components and editor features to be introduced without redesigning the core system.",

    stack: [
      "TypeScript",
      "React",
      "Next.js",
      "Firebase",
      "Tailwind CSS",
      "Zustand",
      "Groq AI",
      "Cloudinary",
    ],

    liveUrl: "https://sitenix.app",
    image: "/image-previews/sitenix.png",
    featured: true,
  },
  {
    slug: "shortcut-manager",
    title: "Shortcut Manager",
    summary:
      "A context-aware keyboard shortcut manager for React and Next.js that enables scoped shortcuts, automatic conflict resolution, and SSR-safe registration.",

    problem:
      "Modern web applications often contain multiple interfaces—such as modals, side panels, and editors—that reuse the same keyboard shortcuts. Coordinating these shortcuts manually leads to conflicting behavior, unnecessary state management, and difficult-to-maintain code.",

    approach:
      "Built a lightweight shortcut system that introduces scoped keyboard shortcuts. Developers register shortcuts declaratively with React hooks while a central manager automatically resolves conflicts by prioritizing the most recently activated scope. The library also exposes a framework-agnostic core for use outside React.",

    decisions:
      "Separated the shortcut engine from the React integration to keep the core reusable and framework-independent. The React API was designed around hooks instead of imperative event listeners, allowing automatic registration, cleanup, SSR compatibility, configurable priorities, and safe handling of form inputs without additional boilerplate.",

    result:
      "Published as an npm package under @dskyle77/shortcut-manager. The library provides context-aware shortcut management, scoped priority resolution, automatic cleanup, and a developer-friendly API for building keyboard-driven React and Next.js applications.",

    stack: ["TypeScript", "React", "Next.js", "npm", "tsup"],

    repoUrl: "https://github.com/dskyle77/smart-shortcut-manager",
    liveUrl: "https://www.npmjs.com/package/@dskyle77/shortcut-manager",
    image: "/image-previews/shortcut-manager.png",
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
