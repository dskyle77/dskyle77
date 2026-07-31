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
    id: "sitenix",
    role: "Founder & Developer",
    org: "Sitenix",
    period: "2026 — Present",
    type: "founder",
    summary:
      "Built a mini-site platform for small businesses from scratch — idea to live product with real users. Still iterating on it.",
    highlights: [
      "Reusable-section editor instead of rigid templates",
      "Undo/redo + live editing baked in from day one",
      "Own the whole thing: product calls, code, and deploys",
    ],
    stack: ["Next.js", "TypeScript", "Firebase", "Tailwind CSS"],
  },
  {
    id: "topibro",
    role: "Junior Web Developer",
    org: "Topibro Technologies",
    period: "2026 — Present",
    type: "work",
    summary:
      "Building and shipping features across the stack — internal tools, client-facing UI, and the glue that holds them together. Real production code, real reviews, real deadlines.",
    highlights: [
      "Shipped frontend and backend features under senior review",
      "Got comfortable with production Git, code review, and deploy flows",
      "Contributed to internal tools the rest of the team actually uses",
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
      "Shipped production sites and dashboards for independent clients. Handled the full loop — requirements, build, launch, and the occasional late-night fix.",
    highlights: [
      "Marketing sites + admin dashboards for real businesses",
      "Client communication, scope, and delivery on my own",
      "Built content systems clients can update without touching code",
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
      "Side project territory. Small games in Gdevelop, Godot, and Unity. The state machines and feedback loops from games keep showing up in how I write frontend.",
    highlights: [
      "Shipped playable prototypes to itch.io",
      "Game-state thinking bleeds into regular UI work in a good way",
    ],
    stack: ["Gdevelop", "Godot", "Unity"],
  },
];
