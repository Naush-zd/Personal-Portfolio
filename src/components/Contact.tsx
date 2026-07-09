import { ArrowUpRight, Download, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { profile } from "../data";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";
import { MagneticButton } from "./ui/MagneticButton";
import { sfx } from "../lib/sound";

export function Contact() {
  return (
    <section id="contact" className="relative mx-auto max-w-6xl px-6 py-28 sm:py-36">
      <SectionHeading
        index="06"
        title="Let's build something"
        subtitle="Open to Software Engineer and AI Engineer roles. Reach out."
      />

      <Reveal>
        <div className="glass relative overflow-hidden rounded-3xl p-8 sm:p-14">
          <div
            className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full blur-3xl"
            style={{ background: "rgba(232, 169, 158, 0.14)" }}
          />

          <div className="relative flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h3 className="font-display text-5xl text-[var(--color-ivory)] sm:text-6xl">
                Say <span className="italic text-accent">hello</span>.
              </h3>
              <p className="mt-4 max-w-md text-[var(--color-muted)]">
                Whether it's a role, a collaboration, or just a question about
                Rudra AI's orchestration engine, my inbox is open.
              </p>

              <span onClick={() => sfx("click")}>
                <MagneticButton
                  as="a"
                  href={`mailto:${profile.email}`}
                  className="mt-7 inline-flex items-center gap-2 rounded-md bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-white"
                >
                  <Mail size={18} /> {profile.email}
                </MagneticButton>
              </span>
            </div>

            <div className="flex flex-col gap-3 sm:min-w-[260px]">
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                data-cursor="hover"
                className="group flex items-center justify-between rounded-xl border border-espresso/10 bg-white/50 px-5 py-3.5 transition-colors hover:border-accent/40"
              >
                <span className="flex items-center gap-3 text-[var(--color-ivory)]">
                  <FaLinkedin size={18} /> LinkedIn
                </span>
                <ArrowUpRight
                  size={16}
                  className="text-espresso/40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                />
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                data-cursor="hover"
                className="group flex items-center justify-between rounded-xl border border-espresso/10 bg-white/50 px-5 py-3.5 transition-colors hover:border-accent/40"
              >
                <span className="flex items-center gap-3 text-[var(--color-ivory)]">
                  <FaGithub size={18} /> GitHub
                </span>
                <ArrowUpRight
                  size={16}
                  className="text-espresso/40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                />
              </a>

              <div className="mt-2 grid grid-cols-2 gap-3">
                {Object.entries(profile.resumeFiles).map(([label, href]) => (
                  <a
                    key={label}
                    href={href}
                    download
                    data-cursor="hover"
                    className="flex flex-col items-center gap-1.5 rounded-xl border border-dashed border-espresso/20 px-3 py-3 text-center transition-colors hover:border-accent/50"
                  >
                    <Download size={16} className="text-accent" />
                    <span className="font-mono text-[11px] text-espresso/70">{label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
