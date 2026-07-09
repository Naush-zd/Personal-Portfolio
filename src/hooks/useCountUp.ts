import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

/** Animates a count up from 0 to `end` once the element scrolls into view. */
export function useCountUp(end: number, duration = 1400, decimals = 0) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    let frame: number;
    const factor = 10 ** decimals;

    const step = (timestamp: number) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * end * factor) / factor);
      if (progress < 1) frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [inView, end, duration, decimals]);

  return { ref, value };
}
