import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Clapperboard } from "lucide-react";
import { fireConfetti } from "./Confetti";
import { sfx } from "../lib/sound";

const SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

const BULBS = Array.from({ length: 14 });

export function CinemaEasterEgg() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let progress = 0;

    function reveal() {
      sfx("clap");
      fireConfetti(window.innerWidth / 2, window.innerHeight / 2);
      setOpen(true);
    }

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      const expected = SEQUENCE[progress];
      if (e.key.toLowerCase() === expected.toLowerCase()) {
        progress += 1;
        if (progress === SEQUENCE.length) {
          progress = 0;
          reveal();
        }
      } else {
        progress = e.key === SEQUENCE[0] ? 1 : 0;
      }
    }

    function onOpen() {
      reveal();
    }

    window.addEventListener("keydown", onKey);
    window.addEventListener("open-cinema", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-cinema", onOpen);
    };
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[300] flex items-center justify-center bg-black/80 px-6 backdrop-blur-sm"
        >
          {/* Spotlight sweep */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              background:
                "radial-gradient(60% 50% at 50% 40%, rgba(232,169,158,0.16), transparent 70%)",
            }}
          />

          <motion.div
            initial={{ scale: 0.85, rotate: -3, opacity: 0, y: 20 }}
            animate={{ scale: 1, rotate: 0, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 10 }}
            transition={{ type: "spring", stiffness: 220, damping: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg rounded-2xl border border-champagne/50 bg-[#1a1210] p-1"
            style={{ boxShadow: "0 0 90px rgba(201,106,84,0.35)" }}
          >
            {/* Marquee bulbs */}
            <div className="flex justify-between px-4 pt-3">
              {BULBS.map((_, i) => (
                <motion.span
                  key={`t-${i}`}
                  className="h-1.5 w-1.5 rounded-full bg-[#dcae52]"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.08 }}
                />
              ))}
            </div>

            <div className="px-8 py-7 text-center">
              <div className="mb-4 flex items-center justify-center gap-2 text-[#dcae52]">
                <Clapperboard size={16} />
                <span className="font-mono text-xs uppercase tracking-[0.35em]">
                  Now Showing
                </span>
              </div>

              <h3 className="font-display text-4xl italic leading-tight text-[#fdf4ee] sm:text-5xl">
                From POC to Production
              </h3>

              <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/45">
                A Nausheen Noor Zaidi Production
              </p>

              <p className="mx-auto mt-5 max-w-sm text-sm leading-relaxed text-white/60">
                Once shipped features at{" "}
                <span className="text-accent">Warner Bros. Discovery</span>, now
                writing, directing &amp; starring in her own systems. Roll credits.
              </p>

              <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
                Click anywhere / Esc to exit
              </p>
            </div>

            <div className="flex justify-between px-4 pb-3">
              {BULBS.map((_, i) => (
                <motion.span
                  key={`b-${i}`}
                  className="h-1.5 w-1.5 rounded-full bg-[#dcae52]"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.08 }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
