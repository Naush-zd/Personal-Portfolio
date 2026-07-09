import { Fragment } from "react";
import { motion } from "framer-motion";
import { Reveal } from "./Reveal";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.028, delayChildren: 0.05 } },
};

const letter = {
  hidden: { y: "115%" },
  show: {
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const },
  },
};

function RisingTitle({ title }: { title: string }) {
  const words = title.split(" ");
  return (
    <motion.h2
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-12%" }}
      className="font-display text-5xl leading-[1.05] tracking-tight text-[var(--color-ivory)] sm:text-6xl md:text-7xl"
    >
      {words.map((word, wi) => (
        <Fragment key={wi}>
          <span className="inline-block overflow-hidden pb-[0.12em] align-bottom">
            {[...word].map((ch, ci) => (
              <motion.span key={ci} variants={letter} className="inline-block">
                {ch}
              </motion.span>
            ))}
          </span>
          {wi < words.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </motion.h2>
  );
}

export function SectionHeading({
  index,
  title,
  subtitle,
}: {
  index: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <Reveal className="mb-14">
      <div className="mb-4 flex items-center gap-3">
        <span className="font-mono text-xs text-accent">{index}</span>
        <div className="h-px flex-1 bg-gradient-to-r from-espresso/20 to-transparent" />
      </div>
      <RisingTitle title={title} />
      {subtitle && (
        <p className="mt-4 max-w-xl text-base text-[var(--color-muted)] sm:text-lg">
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
