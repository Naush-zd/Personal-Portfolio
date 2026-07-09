import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Briefcase } from "lucide-react";
import { experience } from "../data";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 60%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="relative mx-auto max-w-6xl px-6 py-28 sm:py-36">
      <SectionHeading
        index="02"
        title="Experience"
        subtitle="Where I've taken things from idea to production."
      />

      <div ref={containerRef} className="relative">
        <div className="absolute left-[9px] top-2 bottom-2 w-px bg-espresso/12 sm:left-[13px]" />
        <motion.div
          style={{ height: lineHeight }}
          className="absolute left-[9px] top-2 w-px bg-[var(--color-accent)] sm:left-[13px]"
        />

        <div className="space-y-14">
          {experience.map((job, i) => (
            <Reveal key={job.org} delay={i * 0.1} className="relative pl-10 sm:pl-14">
              <span className="absolute left-0 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-ink)] ring-1 ring-[var(--color-accent)] sm:h-7 sm:w-7">
                <Briefcase size={12} className="text-accent" />
              </span>

              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-2xl text-[var(--color-ivory)] sm:text-3xl">
                  {job.role}
                </h3>
                <span className="font-mono text-xs text-[var(--color-muted)] sm:text-sm">
                  {job.period}
                </span>
              </div>
              <p className="mt-1 text-accent">
                {job.org}{" "}
                <span className="text-[var(--color-muted)]">· {job.location}</span>
              </p>

              <ul className="mt-5 space-y-3">
                {job.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex gap-3 text-sm leading-relaxed text-[var(--color-muted)] sm:text-base"
                  >
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--color-accent)]" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
