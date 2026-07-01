export type ExperienceEntry = {
  id: string;
  role: string;
  org: string;
  period: string;
  type: "work" | "founder" | "freelance" | "gamedev";
  summary: string;
  highlights: string[];
  stack?: string[];
};

// NOTE: periods and highlight specifics are placeholders — swap in your
// actual dates and real outcomes (numbers, client names if shareable, etc.)
// wherever you can. Specific beats generic every time.

export const experience: ExperienceEntry[] = [
  {
    id: "quicksite",
    role: "Founder & Developer",
    org: "Quicksite",
    period: "2026 — Present",
    type: "founder",
    summary:
      "Designed and built a mini-site platform for small businesses, from initial concept through to a live product with real users.",
    highlights: [
      "Architected a reusable-section editor system instead of fixed templates",
      "Built undo/redo and live-editing state from the ground up",
      "Owns the full lifecycle: product decisions, engineering, and deployment",
    ],
    stack: ["Next.js", "TypeScript", "Firebase", "Tailwind CSS"],
  },
  {
    id: "topibro",
    role: "Intern Full-Stack Developer",
    org: "Topibro Technologies",
    period: "2026 - Present",
    type: "work",
    summary:
      "Worked across the stack on internal tools and client-facing features, getting first real exposure to production codebases and team workflows.",
    highlights: [
      "Built and shipped features across frontend and backend under senior review",
      "Learned production Git workflows, code review, and deployment practices",
      "Contributed to internal tooling used by the wider team",
    ],
    stack: ["JavaScript", "React", "Node.js"],
  },
  {
    id: "freelance",
    role: "Freelance Web Developer",
    org: "Self-employed",
    period: "2023 — Present",
    type: "freelance",
    summary:
      "Delivered production websites and internal dashboards for independent clients, handling everything from requirements to launch.",
    highlights: [
      "Shipped marketing sites and admin dashboards for real client businesses",
      "Managed client communication, scope, and delivery independently",
      "Built content systems non-technical clients can update themselves",
    ],
    stack: ["Next.js", "Firebase", "Tailwind CSS"],
  },
  {
    id: "gamedev",
    role: "Game Developer",
    org: "Independent / itch.io",
    period: "Ongoing",
    type: "gamedev",
    summary:
      "Builds small games on the side using Gdevelop, Godot, and Unity — a hobby that directly shapes how I think about state, feedback loops, and interaction design in web UI.",
    highlights: [
      "Prototyped and shipped small playable games to itch.io",
      "Applied game-state thinking to frontend architecture on client work",
    ],
    stack: ["Gdevelop", "Godot", "Unity"],
  },
];
