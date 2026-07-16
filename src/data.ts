export const profile = {
  name: "Nausheen Noor Zaidi",
  roles: [
    "Software Engineer",
    "Backend & Distributed Systems",
    "AI Infrastructure Builder",
  ],
  location: "Bengaluru, India",
  email: "nausheennoorz16@gmail.com",
  linkedin: "https://www.linkedin.com/in/nausheen-noor-zaidi/",
  github: "https://github.com/Naush-zd",
  blurb:
    "Software Engineer with production backend experience at Warner Bros. Discovery, specializing in backend systems, developer platforms, and AI infrastructure. I take ideas from proof-of-concept to production and independently build large-scale systems in my own time: a distributed multi-agent engineering platform, an AI-augmented API virtualization platform, and a full-stack AI career copilot.",
  resumeFiles: {
    "Backend / SDE": "/resume/Resume_SDE.pdf",
    "AI Engineer": "/resume/Resume_AI.pdf",
  },
};

export const education = [
  {
    school: "Dr. B. R. Ambedkar National Institute of Technology, Jalandhar",
    degree: "M.Tech, Machine Intelligence & Automation",
    meta: "CGPA 8.68",
    period: "2024 - 2026",
  },
  {
    school: "Shri Ramswaroop Memorial College of Engineering and Management, Lucknow",
    degree: "B.Tech, Computer Science and Engineering",
    meta: "CGPA 8.21",
    period: "2020 - 2024",
  },
];

export const achievements = [
  {
    label: "GATE (CS) 2024",
    value: "AIR 8399",
    detail: "All India Rank, Computer Science",
  },
  {
    label: "CGPA",
    value: "8.68",
    detail: "M.Tech, NIT Jalandhar",
  },
  {
    label: "Publication",
    value: "SoCTA 2025",
    detail: "Springer Nature",
  },
];

export const publication = {
  title:
    "Drone Detection using Noise Suppressed Acoustic Features in Low SNR Environments",
  venue: "SoCTA 2025 · Springer Nature",
  repo: "https://github.com/Naush-zd/Drone-Detection-Using-Acoustic-Features",
};

export const experience = [
  {
    org: "Warner Bros. Discovery",
    role: "Software Engineering Intern",
    period: "Sep 2025 - July 2026",
    location: "Bengaluru, India",
    bullets: [
      "Designed, developed, and tested GraphQL and REST backend services using JavaScript and Node.js across production microservices.",
      "Took consumer-driven contract testing from proof-of-concept to production implementation across 15+ API endpoints as well as authored the design (ADR) and drove leadership alignment meetings to ensure one team's API changes couldn't silently break another's.",
      "Drove the legacy JSON Blob-to-GraphQL migration from proof-of-concept through production rollout, improving query efficiency and maintainability.",
    ],
  },
  {
    org: "The Digital Geek",
    role: "Frontend Developer Intern",
    period: "Sep 2023 - Dec 2023",
    location: "Remote",
    bullets: [
      "Built responsive, reusable React interfaces for multiple client-facing applications, improving cross-browser compatibility and consistency.",
    ],
  },
];

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  stack: string[];
  bullets: string[];
  repo: string | null;
  repoLabel?: string;
  demo?: string;
  featured: boolean;
  accent: string; // tailwind gradient classes
};

export const projects: Project[] = [
  {
    slug: "rudra-ai",
    name: "Rudra AI",
    tagline: "Autonomous Multi-Agent Software Engineering Platform",
    description:
      "A self-hostable autonomous engineering platform where eight specialized AI engineering roles (Planner, Architect, Backend, Frontend, QA, Security, Docs, DevOps) collaborate through an event-driven orchestration engine with human approval workflows.",
    stack: [
      "Node.js",
      "TypeScript",
      "Python",
      "FastAPI",
      "PostgreSQL",
      "Neo4j",
      "Redis",
      "Bedrock/OpenAI/Anthropic",
    ],
    bullets: [
      "Architected a self-hostable autonomous software engineering platform where eight specialized AI engineering roles collaborate through an event-driven orchestration engine with human approval workflows.",
      "Built a provider-agnostic model gateway (OpenAI / Anthropic / Bedrock + deterministic offline mock) and a text-directive tool-calling loop, backed by a permissioned MCP runtime giving agents safe, audited filesystem and GitHub access.",
      "Integrated a Neo4j code knowledge graph and pgvector semantic memory for code-aware reasoning, plus an LLM-as-judge evaluation pipeline scoring agent output against weighted rubrics on every run.",
    ],
    repo: null,
    repoLabel: "Private repository",
    featured: true,
    accent: "from-rose-300 to-orange-300",
  },
  {
    slug: "career-twin",
    name: "Career Twin",
    tagline: "AI Career Copilot",
    description:
      "A full-stack AI career copilot that unifies GitHub, LeetCode, and resume data into a skills profile driving job matching, resume tailoring, and learning-roadmap generation, grounded in real data via RAG, never fabricated.",
    stack: ["FastAPI", "React", "TypeScript", "AWS Bedrock", "LangGraph", "sqlite-vec"],
    bullets: [
      "Developed a full-stack AI career copilot that unifies GitHub, LeetCode, and resume data into a skills profile driving job matching, resume tailoring, and learning-roadmap generation.",
      "Engineered a RAG pipeline (AWS Bedrock Titan embeddings + vector search) with a source-diversity re-ranking step to ground chatbot answers in user-specific career data with inline citations, preventing hallucination.",
      "Built a LangGraph ReAct agent with human-in-the-loop approval (interrupt/resume) for cover-letter drafting, and an ATS resume-tailoring pipeline rendering LLM output into a fixed LaTeX template with keyword-coverage scoring.",
    ],
    repo: "https://github.com/Naush-zd/Career-Twin",
    featured: true,
    accent: "from-amber-200 to-rose-300",
  },
  {
    slug: "unified-mockserver",
    name: "Unified Mockserver",
    tagline: "AI-Augmented API Virtualization Platform",
    description:
      "An AI-augmented API virtualization platform that mocks GraphQL, REST, and AsyncAPI directly from their specs, with a flagship AI contract-test generator and a genuine 'chaos engineering for API contracts' system.",
    stack: ["Next.js", "Express", "Microcks", "Groq LLM", "Okta SAML", "Docker"],
    bullets: [
      "Built an AI-augmented API virtualization platform (Next.js, Express, Microcks) that mocks GraphQL, REST, and AsyncAPI directly from their specs, with a deterministic-first design (faker/schema-mock fallback) so core features work with zero API keys.",
      "Shipped an AI contract-test generator and a \u201cchaos engineering for API contracts\u201d system: 12 injectable failure scenarios plus auto-generated resilience tests sharing one field validator, proving the suite catches injected breaking changes pre-production.",
      "Implemented multi-tenant workspace isolation with a namespace-guarded Microcks integration, plus Okta SAML SSO and rate-limited API-key authentication for human and CI/CD access.",
    ],
    repo: "https://github.com/Naush-zd/Mockserver",
    featured: true,
    accent: "from-orange-200 to-rose-200",
  },
  {
    slug: "drone-detection",
    name: "Drone Detection using Acoustic Features",
    tagline: "Published Research · SoCTA 2025, Springer Nature",
    description:
      "Research project on detecting drones from noise-suppressed acoustic features in low signal-to-noise-ratio environments, published at SoCTA 2025 (Springer Nature).",
    stack: ["MATLAB", "Signal Processing", "Acoustic Feature Extraction"],
    bullets: [
      "Designed a noise-suppression and acoustic feature-extraction pipeline for detecting drones in low-SNR environments.",
      "Published the results at SoCTA 2025 (Springer Nature).",
    ],
    repo: "https://github.com/Naush-zd/Drone-Detection-Using-Acoustic-Features",
    featured: false,
    accent: "from-rose-200 to-stone-300",
  },
];

export type MiniProject = {
  name: string;
  description: string;
  lang: string;
  repo: string;
  homepage?: string | null;
};

export const miniProjects: MiniProject[] = [
  {
    name: "Weather Project",
    description: "A weather forecast web app consuming a public weather API.",
    lang: "JavaScript",
    repo: "https://github.com/Naush-zd/Weather-project",
  },
  {
    name: "Assigned Weather App",
    description: "A weather app assignment, deployed live on Vercel.",
    lang: "TypeScript",
    repo: "https://github.com/Naush-zd/Assigned-weather-app",
    homepage: "https://weather-app-self-nine-77.vercel.app",
  },
  {
    name: "Yum Eats",
    description: "A food-ordering web app front end.",
    lang: "JavaScript",
    repo: "https://github.com/Naush-zd/Yum-Eats",
  },
  {
    name: "E-commerce",
    description: "A full-stack e-commerce storefront practice build.",
    lang: "JavaScript",
    repo: "https://github.com/Naush-zd/E-commerce",
  },
  {
    name: "Notes App",
    description: "A simple note-taking application.",
    lang: "JavaScript",
    repo: "https://github.com/Naush-zd/Notes-app",
  },
  {
    name: "Yoga Friend Website",
    description: "A yoga studio marketing website.",
    lang: "CSS",
    repo: "https://github.com/Naush-zd/Yoga-Friend-Website",
  },
  {
    name: "YouTube Downloader",
    description: "A Python script/utility for downloading YouTube videos.",
    lang: "Python",
    repo: "https://github.com/Naush-zd/Youtube-Downloader",
  },
  {
    name: "Leetcode Solved",
    description: "A running archive of solved LeetCode problems in C++.",
    lang: "C++",
    repo: "https://github.com/Naush-zd/Leetcode-solved",
  },
];

export const skillGroups = [
  {
    title: "AI / ML",
    skills: [
      "LLM Integration",
      "AWS Bedrock",
      "RAG Pipelines",
      "Vector Search",
      "LangGraph",
      "Prompt Engineering",
      "Knowledge Graphs (Neo4j)",
      "LLM-as-Judge Eval",
    ],
  },
  {
    title: "Backend & APIs",
    skills: [
      "Node.js",
      "FastAPI",
      "Fastify",
      "Express.js",
      "Next.js",
      "REST APIs",
      "GraphQL",
      "Microservices",
      "Event-Driven Architecture",
    ],
  },
  {
    title: "Languages",
    skills: ["Python", "JavaScript", "TypeScript", "C++", "SQL"],
  },
  {
    title: "Data, Infra & Auth",
    skills: [
      "PostgreSQL",
      "Redis",
      "Docker",
      "Docker Compose",
      "AWS (S3, Bedrock)",
      "SAML / OAuth2 SSO",
    ],
  },
  {
    title: "Frontend",
    skills: ["React", "Tailwind CSS", "HTML/CSS"],
  },
];
