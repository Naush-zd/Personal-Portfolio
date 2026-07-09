import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  type MotionValue,
} from "framer-motion";

const TRAIL_COLORS = [
  "#c96a54",
  "#d67c5f",
  "#e08a6e",
  "#e6a07f",
  "#e8b48f",
  "#dcae52",
  "#e6c06a",
  "#e29aa6",
  "#d98a8f",
  "#cf7f6a",
];

function TrailDot({
  x,
  y,
  index,
  hidden,
}: {
  x: MotionValue<number>;
  y: MotionValue<number>;
  index: number;
  hidden: boolean;
}) {
  const stiffness = 620 - index * 52;
  const sx = useSpring(x, { stiffness, damping: 22, mass: 0.6 });
  const sy = useSpring(y, { stiffness, damping: 22, mass: 0.6 });
  const size = 13 - index * 0.95;
  const opacity = hidden ? 0 : 0.85 - index * 0.075;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[99] rounded-full blur-[0.5px]"
      style={{
        x: sx,
        y: sy,
        width: size,
        height: size,
        marginLeft: -size / 2,
        marginTop: -size / 2,
        backgroundColor: TRAIL_COLORS[index],
        opacity,
        mixBlendMode: "multiply",
      }}
    />
  );
}

export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const ringY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });
  const [hovering, setHovering] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(max-width: 768px)").matches) return;
    setEnabled(true);

    function move(e: MouseEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
      setHidden(false);
      const target = e.target as HTMLElement;
      setHovering(!!target.closest("[data-cursor='hover'], a, button"));
    }
    function leave() {
      setHidden(true);
    }

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      {TRAIL_COLORS.map((_, i) => (
        <TrailDot key={i} x={x} y={y} index={i} hidden={hidden} />
      ))}

      {/* Zooming ring */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:block"
        style={{ x: ringX, y: ringY, opacity: hidden ? 0 : 1 }}
      >
        <motion.div
          className="rounded-full border-2"
          animate={{
            width: hovering ? 64 : 20,
            height: hovering ? 64 : 20,
            x: hovering ? -32 : -10,
            y: hovering ? -32 : -10,
            borderColor: hovering ? "rgba(201,106,84,0.9)" : "rgba(201,106,84,0.5)",
            backgroundColor: hovering
              ? "rgba(201,106,84,0.1)"
              : "rgba(201,106,84,0)",
          }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
        />
      </motion.div>
    </>
  );
}
