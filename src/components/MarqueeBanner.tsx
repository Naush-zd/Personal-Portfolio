const WORDS = [
  "Python",
  "TypeScript",
  "FastAPI",
  "Node.js",
  "React",
  "PostgreSQL",
  "Redis",
  "Docker",
  "AWS",
  "LangGraph",
  "RAG Pipelines",
  "Vector Search",
  "Microservices",
  "Event-Driven Systems",
];

export function MarqueeBanner({ reverse = false }: { reverse?: boolean }) {
  const items = [...WORDS, ...WORDS];

  return (
    <div className="marquee-pause relative my-6 w-screen overflow-hidden border-y border-[var(--color-line)] bg-[var(--color-surface)]/30 py-3">
      <div
        className={`flex w-max animate-marquee items-center gap-8 whitespace-nowrap ${
          reverse ? "[animation-direction:reverse]" : ""
        }`}
      >
        {items.map((word, i) => (
          <span
            key={i}
            className="flex items-center gap-8 font-mono text-sm text-[var(--color-muted)]"
          >
            <span className="transition-colors hover:text-accent">{word}</span>
            <span className="text-accent/50">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}
