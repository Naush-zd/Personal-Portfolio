import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { profile, education } from "../data";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";

export function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-6 py-28 sm:py-36">
      <SectionHeading index="01" title="About" subtitle="A quick introduction." />

      <div className="grid gap-14 lg:grid-cols-5">
        <Reveal delay={0.1} className="lg:col-span-3">
          <p className="font-display text-2xl leading-snug text-[var(--color-ivory)] sm:text-3xl">
            {profile.blurb}
          </p>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-[var(--color-muted)] sm:text-lg">
            Currently based in{" "}
            <span className="text-[var(--color-ivory)]">{profile.location}</span>,
            pursuing an M.Tech in Machine Intelligence &amp; Automation while working
            full-time on production backend systems and shipping ambitious personal
            projects in the space between.
          </p>
        </Reveal>

        <Reveal delay={0.2} className="lg:col-span-2">
          <div className="glass rounded-3xl p-6 sm:p-8">
            <div className="mb-6 flex items-center gap-2 text-[var(--color-ivory)]">
              <GraduationCap size={18} className="text-accent" />
              <h3 className="font-mono text-xs uppercase tracking-wider text-[var(--color-muted)]">
                Education
              </h3>
            </div>
            <div className="space-y-6">
              {education.map((edu, i) => (
                <motion.div
                  key={edu.school}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.5 }}
                  className="relative border-l border-espresso/12 pl-5"
                >
                  <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-[var(--color-accent)]" />
                  <p className="font-medium leading-snug text-[var(--color-ivory)]">
                    {edu.school}
                  </p>
                  <p className="mt-1 text-sm text-[var(--color-muted)]">{edu.degree}</p>
                  <div className="mt-2 flex items-center gap-2 font-mono text-xs text-[var(--color-muted)]">
                    <span>{edu.period}</span>
                    <span className="h-1 w-1 rounded-full bg-espresso/25" />
                    <span className="text-accent">{edu.meta}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
