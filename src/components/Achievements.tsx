import { motion } from "framer-motion";
import { ArrowUpRight, Award, GraduationCap } from "lucide-react";
import { publication } from "../data";
import { useCountUp } from "../hooks/useCountUp";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";

function StatCard({
  icon: Icon,
  end,
  decimals = 0,
  suffix = "",
  prefix = "",
  tag,
  label,
  detail,
}: {
  icon: typeof Award;
  end: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  tag: string;
  label: string;
  detail: string;
}) {
  const { ref, value } = useCountUp(end, 1400, decimals);

  return (
    <div
      ref={ref as never}
      className="glass card-hover group relative overflow-hidden rounded-xl p-6 sm:p-7"
    >
      <div className="flex items-center justify-between">
        <span className="grid h-9 w-9 place-items-center rounded-md bg-accent/10 text-accent">
          <Icon size={17} />
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-muted)]">
          {tag}
        </span>
      </div>

      <div className="mt-6 font-display text-5xl leading-none text-[var(--color-ivory)] tabular-nums sm:text-6xl">
        {prefix}
        {value.toLocaleString()}
        {suffix}
      </div>
      <p className="mt-3 text-sm font-medium text-accent">{label}</p>
      <p className="mt-1 text-sm text-[var(--color-muted)]">{detail}</p>

      <div className="absolute inset-x-0 bottom-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-accent to-transparent transition-transform duration-500 group-hover:scale-x-100" />
    </div>
  );
}

export function Achievements() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-28 sm:py-36">
      <SectionHeading
        index="05"
        title="Achievements"
        subtitle="A few numbers, and the research behind them."
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Reveal delay={0}>
          <StatCard
            icon={Award}
            end={8399}
            prefix="AIR "
            tag="rank"
            label="GATE (CS) 2024"
            detail="All India Rank, Computer Science"
          />
        </Reveal>
        <Reveal delay={0.1}>
          <StatCard
            icon={GraduationCap}
            end={8.45}
            decimals={2}
            suffix=" / 10"
            tag="cgpa"
            label="M.Tech"
            detail="NIT Jalandhar"
          />
        </Reveal>
      </div>

      <Reveal delay={0.25} className="mt-6">
        <motion.a
          href={publication.repo}
          target="_blank"
          rel="noreferrer"
          data-cursor="hover"
          className="glass card-hover group flex items-center justify-between gap-4 rounded-xl p-6 sm:p-7"
        >
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-champagne">
              Publication
            </p>
            <h3 className="mt-2 font-display text-2xl text-[var(--color-ivory)]">
              {publication.title}
            </h3>
            <p className="mt-1 text-sm text-[var(--color-muted)]">{publication.venue}</p>
          </div>
          <ArrowUpRight
            size={20}
            className="shrink-0 text-[var(--color-muted)] transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
          />
        </motion.a>
      </Reveal>
    </section>
  );
}
