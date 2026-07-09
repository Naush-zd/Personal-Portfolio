import { motion, useScroll, useSpring } from "framer-motion";

const PERFS = Array.from({ length: 60 });

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  return (
    <div className="fixed inset-x-0 top-0 z-[120] h-1.5">
      {/* Film-strip perforation track */}
      <div className="absolute inset-0 flex items-center justify-between px-1 opacity-40">
        {PERFS.map((_, i) => (
          <span key={i} className="h-[3px] w-1.5 rounded-[1px] bg-espresso/25" />
        ))}
      </div>
      {/* Progress fill */}
      <motion.div
        className="h-full origin-left"
        style={{
          scaleX,
          background:
            "linear-gradient(90deg, var(--color-accent), var(--color-champagne), var(--color-accent))",
          boxShadow: "0 0 12px rgba(201,106,84,0.6)",
        }}
      />
    </div>
  );
}
