import { profile } from "../data";

export function Footer() {
  return (
    <footer className="relative border-t border-espresso/10 px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="font-mono text-xs text-[var(--color-muted)]">
          © {new Date().getFullYear()} {profile.name}. Built with React, Tailwind
          &amp; Framer Motion.
        </p>
        <p className="font-mono text-xs text-[var(--color-muted)]">
          Designed &amp; coded from scratch.
        </p>
      </div>
    </footer>
  );
}
