import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { sfx } from "../lib/sound";

type ThemeCtx = { cinema: boolean; toggle: () => void };

const Ctx = createContext<ThemeCtx>({ cinema: false, toggle: () => {} });
export const useTheme = () => useContext(Ctx);

const BULBS = Array.from({ length: 22 });

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [cinema, setCinema] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    // Dark IDE theme is the default; light "docs" mode is opt-in.
    const saved = localStorage.getItem("nnz-cinema");
    const dark = saved === null ? true : saved === "on";
    document.documentElement.classList.toggle("cinema", dark);
    setCinema(dark);
  }, []);

  const toggle = useCallback(() => {
    sfx("whoosh");
    setTransitioning(true);
    // Flip the theme while the shutter covers the screen.
    window.setTimeout(() => {
      setCinema((c) => {
        const next = !c;
        document.documentElement.classList.toggle("cinema", next);
        localStorage.setItem("nnz-cinema", next ? "on" : "off");
        return next;
      });
    }, 480);
    window.setTimeout(() => setTransitioning(false), 1050);
  }, []);

  return (
    <Ctx.Provider value={{ cinema, toggle }}>
      {children}
      <AnimatePresence>
        {transitioning && (
          <motion.div
            className="pointer-events-none fixed inset-0 z-[400] flex flex-col"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Top shutter */}
            <motion.div
              className="relative flex-1 overflow-hidden bg-[#0c0706]"
              initial={{ y: "-100%" }}
              animate={{ y: ["-100%", "0%", "0%", "-100%"] }}
              transition={{ duration: 1.05, times: [0, 0.42, 0.6, 1], ease: "easeInOut" }}
            >
              <div className="absolute bottom-0 inset-x-0 flex justify-between px-4">
                {BULBS.map((_, i) => (
                  <span
                    key={i}
                    className="mb-1 h-1.5 w-1.5 rounded-full bg-[#dcae52]"
                    style={{ boxShadow: "0 0 8px #dcae52" }}
                  />
                ))}
              </div>
            </motion.div>
            {/* Center title flash */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{ duration: 1.05, times: [0.3, 0.45, 0.58, 0.7] }}
            >
              <span className="font-mono text-lg tracking-tight text-[#e9e8e4] sm:text-xl">
                {cinema ? "$ theme set --light" : "$ theme set --dark"}
                <span className="ml-1 inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-[#e87a5b]" />
              </span>
            </motion.div>
            {/* Bottom shutter */}
            <motion.div
              className="relative flex-1 overflow-hidden bg-[#0c0706]"
              initial={{ y: "100%" }}
              animate={{ y: ["100%", "0%", "0%", "100%"] }}
              transition={{ duration: 1.05, times: [0, 0.42, 0.6, 1], ease: "easeInOut" }}
            >
              <div className="absolute top-0 inset-x-0 flex justify-between px-4">
                {BULBS.map((_, i) => (
                  <span
                    key={i}
                    className="mt-1 h-1.5 w-1.5 rounded-full bg-[#dcae52]"
                    style={{ boxShadow: "0 0 8px #dcae52" }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Ctx.Provider>
  );
}
