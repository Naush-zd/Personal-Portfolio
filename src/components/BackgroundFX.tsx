export function BackgroundFX() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base: flips between light docs and dark IDE via CSS var */}
      <div
        className="absolute inset-0 transition-[background] duration-700"
        style={{ background: "var(--fx-gradient)" }}
      />
      {/* Single restrained accent glow, top-center */}
      <div
        className="absolute -top-1/4 left-1/2 h-[46vw] w-[46vw] -translate-x-1/2 rounded-full blur-[150px]"
        style={{ background: "color-mix(in srgb, var(--color-accent) 16%, transparent)" }}
      />
      {/* Technical grid, fading downward */}
      <div className="absolute inset-0 bg-grid [mask-image:linear-gradient(to_bottom,#000_0%,transparent_85%)]" />
      <div className="absolute inset-0 bg-noise" />
    </div>
  );
}
