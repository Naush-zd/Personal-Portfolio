import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Lock, ChevronDown, FileText } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { projects, miniProjects, publication } from "../data";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";
import { TiltCard } from "./ui/TiltCard";

function ProjectCard({ project, index }: { project: (typeof projects)[number]; index: number }) {
  const [open, setOpen] = useState(index === 0);

  return (
    <Reveal delay={index * 0.08}>
      <TiltCard className="rounded-3xl">
        <div className="glass relative overflow-hidden rounded-3xl p-7 sm:p-9">
          <div
            className={`absolute -top-24 -right-24 h-56 w-56 rounded-full bg-gradient-to-br ${project.accent} opacity-20 blur-3xl`}
          />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-[var(--color-muted)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className={`h-2 w-2 rounded-full bg-gradient-to-br ${project.accent}`}
                />
                <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-muted)]">
                  Featured
                </span>
              </div>

              <h3 className="mt-3 font-display text-3xl text-[var(--color-ivory)] sm:text-4xl">
                {project.name}
              </h3>
              <p className="mt-1 text-sm font-semibold text-accent sm:text-base">
                {project.tagline}
              </p>

              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--color-muted)] sm:text-base">
                {project.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-espresso/10 bg-white/50 px-3 py-1 font-mono text-xs text-espresso/70"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col">
              {project.repo ? (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="hover"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-accent)] px-5 py-2.5 text-sm font-semibold text-[var(--color-ink)] transition-transform hover:scale-105"
                >
                  <FaGithub size={16} /> Code
                </a>
              ) : (
                <span className="inline-flex items-center justify-center gap-2 rounded-full border border-espresso/10 bg-white/40 px-5 py-2.5 text-sm font-medium text-espresso/50">
                  <Lock size={14} /> {project.repoLabel}
                </span>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="hover"
                  className="inline-flex items-center justify-center gap-2 rounded-full glass px-5 py-2.5 text-sm font-medium text-[var(--color-ivory)]"
                >
                  <ExternalLink size={14} /> Live Demo
                </a>
              )}
            </div>
          </div>

          <button
            onClick={() => setOpen((o) => !o)}
            data-cursor="hover"
            className="relative mt-6 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-accent"
          >
            {open ? "Hide" : "Show"} engineering highlights
            <motion.span animate={{ rotate: open ? 180 : 0 }}>
              <ChevronDown size={14} />
            </motion.span>
          </button>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative overflow-hidden"
              >
                <ul className="mt-5 space-y-3 border-t border-espresso/10 pt-5">
                  {project.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex gap-3 text-sm leading-relaxed text-[var(--color-muted)]"
                    >
                      <span
                        className={`mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gradient-to-br ${project.accent}`}
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </TiltCard>
    </Reveal>
  );
}

function MiniProjectCard({ project }: { project: (typeof miniProjects)[number] }) {
  return (
    <a
      href={project.homepage ?? project.repo}
      target="_blank"
      rel="noreferrer"
      data-cursor="hover"
      className="group glass card-hover flex flex-col justify-between rounded-2xl p-5 hover:-translate-y-1"
    >
      <div>
        <div className="flex items-center justify-between">
          <h4 className="font-display text-lg text-[var(--color-ivory)]">
            {project.name}
          </h4>
          <ExternalLink
            size={14}
            className="text-espresso/30 transition-colors group-hover:text-accent"
          />
        </div>
        <p className="mt-2 text-sm text-[var(--color-muted)]">{project.description}</p>
      </div>
      <span className="mt-4 font-mono text-xs text-accent">{project.lang}</span>
    </a>
  );
}

export function Projects() {
  const featured = projects.filter((p) => p.featured);
  const research = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="relative mx-auto max-w-6xl px-6 py-28 sm:py-36">
      <SectionHeading
        index="03"
        title="Projects"
        subtitle="Systems I've designed and built end to end, not tutorials, not wrappers."
      />

      <div className="space-y-8">
        {featured.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </div>

      {research.map((project) => (
        <Reveal key={project.slug} delay={0.1} className="mt-8">
          <div className="glass flex flex-col gap-4 rounded-3xl p-7 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2 text-champagne">
                <FileText size={16} />
                <span className="font-mono text-xs uppercase tracking-wider">
                  {project.tagline}
                </span>
              </div>
              <h3 className="mt-2 font-display text-2xl text-[var(--color-ivory)]">
                {project.name}
              </h3>
              <p className="mt-2 max-w-2xl text-sm text-[var(--color-muted)]">
                {project.description}
              </p>
            </div>
            <a
              href={publication.repo}
              target="_blank"
              rel="noreferrer"
              data-cursor="hover"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-espresso/10 bg-white/50 px-5 py-2.5 text-sm font-medium text-[var(--color-ivory)]"
            >
              <FaGithub size={16} /> View Repository
            </a>
          </div>
        </Reveal>
      ))}

      <Reveal delay={0.15} className="mt-20">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="font-display text-2xl text-[var(--color-ivory)]">
            More on GitHub
          </h3>
          <a
            href="https://github.com/Naush-zd"
            target="_blank"
            rel="noreferrer"
            data-cursor="hover"
            className="font-mono text-xs text-accent"
          >
            @Naush-zd →
          </a>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {miniProjects.map((project) => (
            <MiniProjectCard key={project.name} project={project} />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
