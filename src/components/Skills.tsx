import {
  SiPython,
  SiTypescript,
  SiJavascript,
  SiReact,
  SiNodedotjs,
  SiFastapi,
  SiPostgresql,
  SiRedis,
  SiDocker,
  SiGraphql,
  SiCplusplus,
  SiNextdotjs,
  SiExpress,
  SiTailwindcss,
  SiGit,
  SiLinux,
  SiPostman,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { motion } from "framer-motion";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";

const TECH_STACK = [
  { Icon: SiPython, label: "Python" },
  { Icon: SiTypescript, label: "TypeScript" },
  { Icon: SiJavascript, label: "JavaScript" },
  { Icon: SiCplusplus, label: "C++" },
  { Icon: SiNodedotjs, label: "Node.js" },
  { Icon: SiFastapi, label: "FastAPI" },
  { Icon: SiExpress, label: "Express" },
  { Icon: SiNextdotjs, label: "Next.js" },
  { Icon: SiReact, label: "React" },
  { Icon: SiGraphql, label: "GraphQL" },
  { Icon: SiPostgresql, label: "PostgreSQL" },
  { Icon: SiRedis, label: "Redis" },
  { Icon: SiDocker, label: "Docker" },
  { Icon: FaAws, label: "AWS" },
  { Icon: SiTailwindcss, label: "Tailwind" },
  { Icon: SiGit, label: "Git" },
  { Icon: SiLinux, label: "Linux" },
  { Icon: SiPostman, label: "Postman" },
];

// Higher-level capabilities that don't map to a logo; no overlap with the grid.
const CAPABILITIES = [
  {
    title: "AI / ML",
    items: [
      "RAG Pipelines",
      "LangGraph",
      "Vector Search",
      "Knowledge Graphs (Neo4j)",
      "Prompt Engineering",
      "LLM-as-Judge Eval",
      "AWS Bedrock",
    ],
  },
  {
    title: "Architecture",
    items: [
      "Microservices",
      "Event-Driven Systems",
      "REST APIs",
      "SAML / OAuth2 SSO",
      "Distributed Systems",
    ],
  },
];

export function Skills() {
  return (
    <section id="skills" className="relative mx-auto max-w-6xl px-6 py-28 sm:py-36">
      <SectionHeading
        index="04"
        title="Skills & Stack"
        subtitle="The tools I build with, and the ideas I build on."
      />

      <Reveal>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
          {TECH_STACK.map(({ Icon, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03, duration: 0.4 }}
              data-cursor="hover"
              className="group glass card-hover flex flex-col items-center justify-center gap-2.5 rounded-2xl py-5 hover:-translate-y-1"
            >
              <Icon
                size={26}
                className="text-espresso/45 transition-colors duration-300 group-hover:text-accent"
              />
              <span className="font-mono text-[11px] text-[var(--color-muted)] transition-colors group-hover:text-[var(--color-ivory)]">
                {label}
              </span>
            </motion.div>
          ))}
        </div>
      </Reveal>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {CAPABILITIES.map((group, i) => (
          <Reveal key={group.title} delay={i * 0.1}>
            <div className="glass card-hover h-full rounded-2xl p-6">
              <div className="mb-4 flex items-center gap-2">
                <span className="font-mono text-xs text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-mono text-xs uppercase tracking-wider text-[var(--color-muted)]">
                  {group.title}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-espresso/10 bg-white/50 px-3 py-1.5 text-xs text-espresso/80 transition-colors hover:border-accent/60 hover:text-accent sm:text-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
