import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Rocket } from "lucide-react";
import { fireConfetti } from "./Confetti";
import { profile } from "../data";
import { sfx } from "../lib/sound";

export function HireRocket() {
  const [flying, setFlying] = useState(false);

  useEffect(() => {
    let buffer = "";

    function launch() {
      setFlying(true);
      sfx("launch");
      fireConfetti(window.innerWidth / 2, window.innerHeight * 0.55);
      const first = Object.values(profile.resumeFiles)[0];
      window.setTimeout(() => {
        if (first) window.open(first, "_blank");
      }, 1300);
      window.setTimeout(() => setFlying(false), 2200);
    }

    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return;
      if (e.key.length !== 1) return;
      buffer = (buffer + e.key.toLowerCase()).slice(-4);
      if (buffer === "hire") {
        buffer = "";
        launch();
      }
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <AnimatePresence>
      {flying && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-[360] overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute flex items-center gap-3"
            initial={{ x: "-20vw", y: "80vh", rotate: -35 }}
            animate={{ x: "85vw", y: "-30vh", rotate: -35 }}
            transition={{ duration: 2, ease: [0.4, 0, 0.6, 1] }}
          >
            <div className="rounded-2xl bg-[var(--color-accent)] px-4 py-2 font-mono text-sm font-semibold text-white shadow-xl">
              résumé incoming!
            </div>
            <div className="relative">
              <Rocket size={54} className="text-[var(--color-accent)]" fill="#dcae52" />
              <motion.div
                className="absolute -left-6 top-1/2 h-2 w-16 -translate-y-1/2 rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, #dcae52, #e08a6e)",
                }}
                animate={{ opacity: [0.4, 1, 0.4], scaleX: [0.8, 1.3, 0.8] }}
                transition={{ duration: 0.2, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
