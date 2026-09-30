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
  images?: Array<{ src: string; alt: string }>;
  featured: boolean;
};

export const projects: Project[] = [
  {
    slug: "sitenix",
    title: "SiteNix",
    summary:
      "A visual website builder with AI-assisted content generation, reusable components, and a responsive editing experience. Conceived, designed, and solo-built by David Onyema — Founder of SiteNix.",

    problem:
      "Traditional website builders often trade flexibility for simplicity or overwhelm users with complex editing interfaces. I wanted to build a visual editor that feels approachable while still giving users precise control over their websites.",

    approach:
      "Built a component-based visual editor where every website is represented as a JSON node tree. The editor supports reusable components, responsive layouts, live editing, and AI-assisted content generation while keeping rendering and state management predictable.",

    decisions:
      "Designed the editor around a JSON node architecture instead of HTML templates, making serialization, rendering, undo/redo, reusable components, and future features like expressions and dynamic data much easier to implement. Chose Firebase to simplify authentication and persistence while focusing development effort on the editor experience.",

    result:
      "SiteNix is live at sitenix.app and used by real Nigerian businesses. I am the sole founder and full-stack engineer — every product decision, line of code, architecture, and deployment was shipped by me.",

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
    images: [
      { src: "/image-previews/sitenix.png", alt: "Sitenix Home page" },
      {
        src: "/image-previews/sitenix-editor.png",
        alt: "Sitenix website builder editor",
      },
      {
        src: "/image-previews/sitenix-editor-2.png",
        alt: "Portfolio built with Sitenix",
      },
      {
        src: "/image-previews/sitenix-dashboard.png",
        alt: "Sitenix dashboard",
      },
    ],
    featured: true,
  },
  {
    slug: "ziva",
    title: "Ziva",
    summary:
      "Campus commerce marketplace for university students. Connects customers, vendors, riders, and admins so students can order products and services without scattered WhatsApp groups. Originally built for an Osun State University client.",

    problem:
      "University students rely on fragmented WhatsApp groups to buy and sell. No reliable orders, payments, delivery tracking, or vendor settlements — just chaos and dropped conversations.",

    approach:
      "Building a multi-role platform: customers place orders, vendors manage inventory and fulfill, riders handle delivery zones, admins oversee the system. Payments via Paystack, OTP authentication, WhatsApp notifications through a GXU service, and a PWA with Firebase Cloud Messaging for push.",

    decisions:
      "Chose Paystack for local payment reliability and settlements. OTP + WhatsApp keeps onboarding familiar for students. PWA + FCM so the app feels native without forcing an app-store install. Delivery zones and rider assignment modeled for campus-scale logistics rather than city-wide complexity.",

    result:
      "In active development after SiteNix. Core flows for orders, payments, vendor settlements, riders, OTP, and push notifications are being shipped iteratively. Designed to replace WhatsApp-group commerce on campus.",

    stack: [
      "Next.js",
      "TypeScript",
      "Firebase",
      "Paystack",
      "Node.js",
      "PWA",
      "FCM",
      "OTP Auth",
    ],

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
    images: [
      { src: "/image-previews/shortcut-manager.png", alt: "Shortcut Manager" },
    ],
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
    images: [
      { src: "/image-previews/legalbaby.png", alt: "Legal Baby Distribution" },
    ],
    featured: true,
  },
  {
  slug: "naija66",
  title: "Naija 66",
  summary:
    "A visually immersive Independence Day experience designed to bring Nigeria's history and identity together through expressive typography, motion, and interactive storytelling.",

  problem:
    "Independence-themed websites often rely on generic patriotic visuals and static information layouts, creating experiences that feel more like announcements than something people want to explore.",

  approach:
    "Designed Naija 66 as a modern editorial experience built around strong typography, Nigerian-inspired visual details, generous whitespace, and subtle motion. The interface combines historical storytelling with interactive elements such as timelines, state exploration, comparisons, and quizzes while keeping the visual system consistent throughout.",

  decisions:
    "Used an understated off-white and charcoal foundation with Nigerian green as the primary accent, allowing the content and imagery to remain the focus. Established reusable design tokens, responsive layouts, shared components, and a small motion system to create consistent transitions and micro-interactions across the experience.",

  result:
    "Created a polished, responsive visual experience that presents Nigerian history and culture in a contemporary way while establishing a flexible design system that can support future interactive stories and features.",

  stack: [
    "TypeScript",
    "React",
    "Next.js",
    "Tailwind CSS",
    "Motion",
    "Vercel",
  ],

  repoUrl: "https://github.com/dskyle77/naija66",
  liveUrl: "https://naija66.vercel.app/",

  images: [
    {
      src: "/image-previews/naija66.png",
      alt: "Naija 66",
    },
  ],

  featured: true,
},
];

export function getFeaturedProjects() {
  return projects.filter((p) => p.featured);
}

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}
