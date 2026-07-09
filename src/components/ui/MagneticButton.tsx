import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type CommonProps = {
  children: ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
};

type ButtonProps = CommonProps & {
  as?: "button";
  href?: undefined;
};

type AnchorProps = CommonProps & {
  as: "a";
  href: string;
  target?: string;
  rel?: string;
};

type Props = ButtonProps | AnchorProps;

/** A button/link that gently follows the cursor within its bounds, snapping back on leave. */
export function MagneticButton(props: Props) {
  const { children, className = "", strength = 0.35 } = props;
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.3 });
  const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.3 });

  function handleMouseMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const shared = {
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    style: { x: springX, y: springY },
    "data-cursor": "hover",
  } as const;

  if (props.as === "a") {
    return (
      <motion.a
        ref={ref as never}
        href={props.href}
        target={props.target}
        rel={props.rel}
        className={className}
        {...shared}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as never}
      type="button"
      onClick={props.onClick}
      className={className}
      {...shared}
    >
      {children}
    </motion.button>
  );
}
