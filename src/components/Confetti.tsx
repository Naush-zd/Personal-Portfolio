import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Burst = { id: number; x: number; y: number };

const COLORS = ["#c96a54", "#dcae52", "#e29aa6", "#e0967d", "#b3872f", "#fffaf6"];

export function fireConfetti(x?: number, y?: number) {
  window.dispatchEvent(
    new CustomEvent("confetti", {
      detail: {
        x: x ?? window.innerWidth / 2,
        y: y ?? window.innerHeight / 2,
      },
    }),
  );
}

function Piece({ originX, originY }: { originX: number; originY: number }) {
  const angle = Math.random() * Math.PI * 2;
  const dist = 120 + Math.random() * 220;
  const dx = Math.cos(angle) * dist;
  const dy = Math.sin(angle) * dist - 120;
  const color = COLORS[Math.floor(Math.random() * COLORS.length)];
  const size = 6 + Math.random() * 7;
  const rect = Math.random() > 0.5;

  return (
    <motion.span
      initial={{ x: originX, y: originY, opacity: 1, scale: 1, rotate: 0 }}
      animate={{
        x: originX + dx,
        y: originY + dy + 400,
        opacity: [1, 1, 0],
        rotate: Math.random() * 720 - 360,
        scale: 0.6,
      }}
      transition={{ duration: 1.5 + Math.random() * 0.7, ease: [0.2, 0.6, 0.4, 1] }}
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: size,
        height: rect ? size * 1.6 : size,
        borderRadius: rect ? 2 : "50%",
        background: color,
      }}
    />
  );
}

export function Confetti() {
  const [bursts, setBursts] = useState<Burst[]>([]);

  useEffect(() => {
    let id = 0;
    function onFire(e: Event) {
      const { x, y } = (e as CustomEvent).detail;
      const burst = { id: id++, x, y };
      setBursts((b) => [...b, burst]);
      window.setTimeout(
        () => setBursts((b) => b.filter((it) => it.id !== burst.id)),
        2500,
      );
    }
    window.addEventListener("confetti", onFire);
    return () => window.removeEventListener("confetti", onFire);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[350]">
      <AnimatePresence>
        {bursts.map((b) => (
          <motion.div key={b.id} exit={{ opacity: 0 }}>
            {Array.from({ length: 70 }).map((_, i) => (
              <Piece key={i} originX={b.x} originY={b.y} />
            ))}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
