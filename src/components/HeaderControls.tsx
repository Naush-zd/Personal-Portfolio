import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Moon, Sun, Volume2, VolumeX } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { getMuted, setMuted, sfx, subscribeMuted } from "../lib/sound";

export function HeaderControls() {
  const { cinema, toggle } = useTheme();
  const [muted, setMutedState] = useState(getMuted());

  useEffect(() => subscribeMuted(setMutedState), []);

  return (
    <div className="flex items-center gap-1.5">
      <button
        type="button"
        data-cursor="hover"
        aria-label={muted ? "Unmute sound" : "Mute sound"}
        onClick={() => {
          const next = !muted;
          setMuted(next);
          if (!next) sfx("blip");
        }}
        className="grid h-9 w-9 place-items-center rounded-full text-[var(--color-muted)] transition-colors hover:text-accent"
      >
        {muted ? <VolumeX size={17} /> : <Volume2 size={17} />}
      </button>

      <button
        type="button"
        data-cursor="hover"
        aria-label={cinema ? "Switch to light theme" : "Switch to dark theme"}
        onClick={toggle}
        className="group grid h-9 w-9 place-items-center rounded-full text-[var(--color-muted)] transition-colors hover:text-accent"
      >
        <motion.span
          key={cinema ? "on" : "off"}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {cinema ? <Sun size={17} /> : <Moon size={17} />}
        </motion.span>
      </button>
    </div>
  );
}
