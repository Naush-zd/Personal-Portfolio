import { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { X } from "lucide-react";
import { sfx } from "../lib/sound";

const PAIRS = [
  { in: 'query: "best role fit?"', out: "AI Engineer · score 0.94" },
  { in: "input: resume + github", out: "42 skills extracted" },
  { in: 'prompt: "summarize exp"', out: "3 systems · poc to prod" },
  { in: "doc: api_spec.yaml", out: "mock server: ready" },
];

const WIRE = "var(--color-ivory)";
const ACC = "var(--color-accent)";

const NET = { layers: [4, 6, 6, 3], xs: [40, 118, 196, 280], w: 320, h: 176 };

const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v));

function useNet() {
  return useMemo(() => {
    const nodes = NET.layers.map((count, li) => {
      const gap = 24;
      const startY = NET.h / 2 - ((count - 1) * gap) / 2;
      return Array.from({ length: count }, (_, i) => ({
        x: NET.xs[li],
        y: startY + i * gap,
      }));
    });
    const edges: { x1: number; y1: number; x2: number; y2: number }[] = [];
    for (let l = 0; l < nodes.length - 1; l++)
      for (const a of nodes[l])
        for (const b of nodes[l + 1])
          edges.push({ x1: a.x, y1: a.y, x2: b.x, y2: b.y });
    const pulses = edges.filter((_, i) => i % 5 === 0).slice(0, 12);
    return { nodes, edges, pulses };
  }, []);
}

export function SystemMonitor() {
  const { nodes, edges, pulses } = useNet();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);
  const [processing, setProcessing] = useState(false);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 160, damping: 16 });
  const sy = useSpring(py, { stiffness: 160, damping: 16 });

  useEffect(() => {
    function move(e: MouseEvent) {
      const el = wrapRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height * 0.4;
      px.set(clamp((e.clientX - cx) / 30, -3.5, 3.5));
      py.set(clamp((e.clientY - cy) / 30, -3, 3));
    }
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [px, py]);

  useEffect(() => {
    if (!open) return;
    const t = window.setInterval(() => setI((p) => (p + 1) % PAIRS.length), 3000);
    return () => window.clearInterval(t);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    setProcessing(true);
    const t = window.setTimeout(() => setProcessing(false), 1050);
    return () => window.clearTimeout(t);
  }, [i, open]);

  function openNet() {
    setI(0);
    setProcessing(true);
    setOpen(true);
    sfx("blip");
  }

  return (
    <div
      ref={wrapRef}
      className="relative flex min-h-[380px] w-full max-w-md items-center justify-center"
    >
      <AnimatePresence mode="wait">
        {!open ? (
          /* ───────────── ROBOT ───────────── */
          <motion.button
            key="robot"
            type="button"
            onClick={openNet}
            data-cursor="hover"
            aria-label="Run a live inference"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.35 }}
            className="group relative flex flex-col items-center"
          >
            <motion.svg
              width="280"
              height="320"
              viewBox="0 0 280 320"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <defs>
                <radialGradient id="eyeGlow" cx="0.5" cy="0.5" r="0.5">
                  <stop offset="0" stopColor={ACC} stopOpacity="0.5" />
                  <stop offset="1" stopColor={ACC} stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* shadow */}
              <motion.ellipse
                cx="140"
                cy="306"
                rx="62"
                ry="9"
                fill="rgba(0,0,0,0.35)"
                animate={{ rx: [62, 70, 62], opacity: [0.35, 0.24, 0.35] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* antenna */}
              <line x1="140" y1="44" x2="140" y2="28" stroke={WIRE} strokeOpacity="0.4" strokeWidth="2" />
              <motion.circle
                cx="140"
                cy="24"
                r="5"
                fill={ACC}
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* arms */}
              <g stroke={WIRE} strokeOpacity="0.4" strokeWidth="6" strokeLinecap="round" fill="none">
                <path d="M78 210 q-20 6 -22 34" />
                <path d="M202 210 q20 6 22 34" />
              </g>

              {/* body */}
              <rect x="86" y="192" width="108" height="92" rx="26" fill="var(--color-surface)" stroke={WIRE} strokeOpacity="0.4" strokeWidth="2" />
              {/* chest panel */}
              <rect x="112" y="212" width="56" height="34" rx="8" fill="rgba(0,0,0,0.32)" />
              <motion.circle
                cx="126"
                cy="229"
                r="3.5"
                fill={ACC}
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.4, repeat: Infinity }}
              />
              <rect x="136" y="226" width="22" height="5" rx="2.5" fill={WIRE} opacity="0.25" />
              {/* feet */}
              <rect x="108" y="284" width="24" height="10" rx="5" fill={WIRE} opacity="0.3" />
              <rect x="148" y="284" width="24" height="10" rx="5" fill={WIRE} opacity="0.3" />

              {/* neck */}
              <rect x="128" y="176" width="24" height="18" fill="var(--color-surface)" stroke={WIRE} strokeOpacity="0.4" strokeWidth="2" />

              {/* ears */}
              <rect x="60" y="118" width="14" height="30" rx="5" fill="var(--color-surface)" stroke={WIRE} strokeOpacity="0.4" strokeWidth="2" />
              <rect x="206" y="118" width="14" height="30" rx="5" fill="var(--color-surface)" stroke={WIRE} strokeOpacity="0.4" strokeWidth="2" />

              {/* head */}
              <rect x="74" y="70" width="132" height="108" rx="40" fill="var(--color-surface)" stroke={WIRE} strokeOpacity="0.4" strokeWidth="2" />
              {/* visor band */}
              <rect x="88" y="98" width="104" height="46" rx="22" fill="rgba(0,0,0,0.4)" />

              {/* eyes (track cursor + blink) */}
              <motion.g
                animate={{ scaleY: [1, 1, 0.15, 1, 1] }}
                transition={{ duration: 5, repeat: Infinity, times: [0, 0.5, 0.53, 0.56, 1] }}
                style={{ transformOrigin: "140px 121px" }}
              >
                <circle cx="118" cy="121" r="15" fill="url(#eyeGlow)" />
                <circle cx="162" cy="121" r="15" fill="url(#eyeGlow)" />
                <motion.g style={{ x: sx, y: sy }}>
                  <circle cx="118" cy="121" r="7" fill={ACC} />
                  <circle cx="162" cy="121" r="7" fill={ACC} />
                  <circle cx="118" cy="121" r="3" fill="#fff" opacity="0.85" />
                  <circle cx="162" cy="121" r="3" fill="#fff" opacity="0.85" />
                </motion.g>
              </motion.g>

              {/* head detail bolts */}
              <circle cx="86" cy="82" r="2" fill={WIRE} opacity="0.3" />
              <circle cx="194" cy="82" r="2" fill={WIRE} opacity="0.3" />
            </motion.svg>

            {/* hint */}
            <span className="mt-1 flex items-center gap-1.5 font-mono text-xs text-[var(--color-muted)] transition-colors group-hover:text-accent">
              <span className="h-1.5 w-1.5 animate-ping rounded-full bg-accent" />
              click to run inference
            </span>
          </motion.button>
        ) : (
          /* ───────────── NEURAL NET WINDOW ───────────── */
          <motion.div
            key="net"
            initial={{ opacity: 0, scale: 0.94, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 8 }}
            transition={{ duration: 0.35 }}
            className="glass w-full overflow-hidden rounded-xl font-mono"
          >
            <div className="flex items-center gap-2 border-b border-[var(--color-line)] px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#e0685a]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#d8b26a]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#6f9e6a]" />
              <span className="ml-2 text-[11px] text-[var(--color-muted)]">
                neural_net.live
              </span>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  sfx("click");
                }}
                data-cursor="hover"
                aria-label="Back to robot"
                className="ml-auto text-[var(--color-muted)] transition-colors hover:text-accent"
              >
                <X size={15} />
              </button>
            </div>

            {/* INPUT */}
            <div className="flex items-center gap-2 px-4 pt-3.5 text-xs">
              <span className="rounded bg-accent/15 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-accent">
                in
              </span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="truncate text-[var(--color-ivory)]"
                >
                  {PAIRS[i].in}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* graph */}
            <div className="px-3 pt-1">
              <svg viewBox={`0 0 ${NET.w} ${NET.h}`} className="w-full">
                <text x={NET.xs[0]} y="14" textAnchor="middle" fontSize="9" fill="var(--color-muted)">
                  input
                </text>
                <text x={NET.xs[3]} y="14" textAnchor="middle" fontSize="9" fill="var(--color-muted)">
                  output
                </text>
                {edges.map((e, idx) => (
                  <line key={idx} x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2} stroke={WIRE} strokeOpacity="0.16" strokeWidth="1" />
                ))}
                {pulses.map((p, idx) => (
                  <motion.circle
                    key={`p-${idx}`}
                    r="2.2"
                    fill={ACC}
                    initial={{ cx: p.x1, cy: p.y1, opacity: 0 }}
                    animate={{ cx: [p.x1, p.x2], cy: [p.y1, p.y2], opacity: [0, 1, 0] }}
                    transition={{ duration: 0.85, repeat: Infinity, delay: idx * 0.16, ease: "easeInOut", repeatDelay: 0.3 }}
                  />
                ))}
                {nodes.map((layer, li) =>
                  layer.map((n, idx) => {
                    const isOut = li === nodes.length - 1;
                    return (
                      <motion.circle
                        key={`${li}-${idx}`}
                        cx={n.x}
                        cy={n.y}
                        r="4.5"
                        fill="var(--color-surface)"
                        stroke={ACC}
                        strokeWidth="1.5"
                        animate={
                          isOut && !processing
                            ? { opacity: [0.6, 1, 0.6], r: [4.5, 6.5, 4.5] }
                            : { opacity: [0.4, 0.85, 0.4] }
                        }
                        transition={{ duration: isOut ? 1.1 : 2, repeat: Infinity, delay: li * 0.3 + idx * 0.08, ease: "easeInOut" }}
                      />
                    );
                  }),
                )}
              </svg>
            </div>

            {/* OUTPUT */}
            <div className="flex items-center gap-2 px-4 pb-1 text-xs">
              <span className="rounded bg-[#6f9e6a]/15 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-[#6f9e6a]">
                out
              </span>
              <AnimatePresence mode="wait">
                {processing ? (
                  <motion.span key="proc" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-[var(--color-muted)]">
                    computing<span className="animate-pulse">…</span>
                  </motion.span>
                ) : (
                  <motion.span key={`out-${i}`} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="truncate text-accent">
                    {"->"} {PAIRS[i].out}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-[var(--color-line)] px-4 py-2.5 text-[10px] text-[var(--color-muted)]">
              <span>
                <span className="text-accent">rag</span> pipeline
              </span>
              <span>vector store: ready</span>
              <span>
                p50 <span className="text-[var(--color-ivory)]">34ms</span>
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
