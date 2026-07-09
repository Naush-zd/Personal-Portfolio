import { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useMotionTemplate,
} from "framer-motion";
import { ArrowDown, ArrowUpRight, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { profile } from "../data";
import { MagneticButton } from "./ui/MagneticButton";
import { SystemMonitor } from "./SystemMonitor";

function RoleRotator() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % profile.roles.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <span className="relative flex h-[1.5em] items-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: "110%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-110%", opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="whitespace-nowrap"
        >
          {profile.roles[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function Hero() {
  const mx = useMotionValue(-500);
  const my = useMotionValue(-500);
  const spotlight = useMotionTemplate`radial-gradient(340px circle at ${mx}px ${my}px, color-mix(in srgb, var(--color-accent) 12%, transparent), transparent 70%)`;

  return (
    <section
      id="home"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mx.set(e.clientX - rect.left);
        my.set(e.clientY - rect.top);
      }}
      onMouseLeave={() => {
        mx.set(-500);
        my.set(-500);
      }}
      className="relative mx-auto grid min-h-screen max-w-6xl grid-cols-1 items-center gap-12 px-6 pt-28 pb-20 lg:grid-cols-[1.1fr_0.9fr]"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-[1]"
        style={{ background: spotlight }}
      />

      <div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 inline-flex w-fit items-center gap-2.5 rounded-md border border-[var(--color-line)] bg-[var(--color-surface)]/40 px-3 py-1.5 font-mono text-xs text-[var(--color-muted)]"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-accent)] opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
          </span>
          available for software / ai engineer roles
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-6xl leading-[0.92] tracking-tight text-[var(--color-ivory)] sm:text-7xl md:text-8xl"
        >
          Nausheen
          <br />
          Noor <span className="italic text-accent">Zaidi</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-6 flex items-center gap-3 font-mono text-sm text-[var(--color-muted)] sm:text-base"
        >
          <span className="text-accent">&gt;</span>
          <RoleRotator />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.42 }}
          className="mt-7 max-w-xl text-lg leading-relaxed text-[var(--color-muted)]"
        >
          I build <span className="text-[var(--color-ivory)]">backend systems</span>,
          developer platforms, and{" "}
          <span className="text-[var(--color-ivory)]">AI infrastructure</span> from
          proof-of-concept to production.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <MagneticButton
            as="a"
            href="#projects"
            className="inline-flex items-center gap-2 rounded-md bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-white"
          >
            View Projects <ArrowUpRight size={17} />
          </MagneticButton>
          <MagneticButton
            as="a"
            href="#contact"
            className="inline-flex items-center gap-2 rounded-md border border-[var(--color-line)] px-6 py-3 text-sm font-semibold text-[var(--color-ivory)]"
          >
            Get in Touch
          </MagneticButton>

          <div className="ml-1 flex items-center gap-4">
            {[
              { icon: FaGithub, href: profile.github, label: "GitHub" },
              { icon: FaLinkedin, href: profile.linkedin, label: "LinkedIn" },
              { icon: Mail, href: `mailto:${profile.email}`, label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                aria-label={label}
                data-cursor="hover"
                className="text-[var(--color-muted)] transition-colors hover:text-accent"
              >
                <Icon size={19} />
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Neural-graph system monitor */}
      <div className="flex justify-center lg:justify-end">
        <SystemMonitor />
      </div>

      <motion.a
        href="#about"
        data-cursor="hover"
        className="absolute bottom-8 left-6 flex items-center gap-2 text-[var(--color-muted)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <ArrowDown size={15} className="animate-bounce-y" />
        <span className="font-mono text-[11px] tracking-widest">SCROLL</span>
      </motion.a>
    </section>
  );
}
