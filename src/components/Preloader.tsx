import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const STEPS = [
  "initializing runtime",
  "loading modules",
  "connecting services",
  "ready",
];

export function Preloader() {
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (step >= STEPS.length) {
      const t = setTimeout(() => setVisible(false), 380);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setStep((s) => s + 1), 340);
    return () => clearTimeout(t);
  }, [step]);

  const pct = Math.min(100, Math.round((step / STEPS.length) * 100));

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#0a0a0c]"
          exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
        >
          <div className="w-[min(360px,80vw)] font-mono">
            <div className="mb-3 flex items-center justify-between text-[11px] text-white/40">
              <span>nnz@portfolio</span>
              <span>{pct}%</span>
            </div>

            <div className="h-px w-full bg-white/10">
              <motion.div
                className="h-full bg-[#e87a5b]"
                initial={{ width: "0%" }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>

            <div className="mt-4 space-y-1 text-xs">
              {STEPS.slice(0, step).map((s) => (
                <div key={s} className="flex items-center gap-2 text-white/45">
                  <span className="text-[#6f9e6a]">✓</span> {s}
                </div>
              ))}
              {step < STEPS.length && (
                <div className="flex items-center gap-2 text-white/70">
                  <span className="text-[#e87a5b]">▍</span>
                  {STEPS[step]}
                  <span className="animate-pulse">…</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
