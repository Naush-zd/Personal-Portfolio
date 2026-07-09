import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Send, Sparkles, X } from "lucide-react";
import { profile } from "../data";

type Message = { role: "user" | "assistant"; content: string };

const STARTERS = [
  "What did she build at Warner Bros. Discovery?",
  "Tell me about Rudra AI.",
  "What's her GATE rank?",
  "What roles is she looking for?",
];

const WELCOME: Message = {
  role: "assistant",
  content: `Hi! I'm a small AI assistant trained on ${profile.name}'s resume and notes. Ask me about her experience, projects, or skills.`,
};

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const nextMessages: Message[] = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages
            .filter((m) => m !== WELCOME)
            .map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "Something went wrong.");
      }

      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch (err) {
      setError(
        (err as Error).message ||
          `Couldn't reach the assistant. Feel free to email ${profile.email} instead.`
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <motion.button
        onClick={() => setOpen((o) => !o)}
        data-cursor="hover"
        aria-label="Open chat assistant"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-accent)] text-[var(--color-ink)] shadow-lg shadow-black/40"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-accent)] opacity-20" />
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}>
              <X size={22} />
            </motion.span>
          ) : (
            <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}>
              <Bot size={24} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="glass fixed bottom-24 right-4 left-4 sm:left-auto z-50 flex h-[70vh] max-h-[560px] w-auto sm:w-[380px] flex-col overflow-hidden rounded-3xl"
          >
            <div className="flex items-center gap-3 border-b border-espresso/10 px-5 py-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-accent)]">
                <Sparkles size={16} className="text-[var(--color-ink)]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--color-ivory)]">
                  Ask about Nausheen
                </p>
                <p className="text-xs text-[var(--color-muted)]">
                  AI assistant &middot; ask me anything
                </p>
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-[var(--color-accent)] text-[var(--color-ink)] font-medium"
                        : "bg-white/60 text-espresso/90 border border-espresso/10"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1.5 rounded-2xl border border-espresso/10 bg-white/60 px-4 py-3">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="h-1.5 w-1.5 rounded-full bg-espresso/50"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {error && (
                <p className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-2.5 text-xs text-red-300">
                  {error}
                </p>
              )}

              {messages.length === 1 && !loading && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {STARTERS.map((q) => (
                    <button
                      key={q}
                      onClick={() => send(q)}
                      data-cursor="hover"
                      className="rounded-full border border-espresso/10 bg-white/50 px-3 py-1.5 text-left text-xs text-espresso/70 transition-colors hover:border-accent/50 hover:text-[var(--color-ivory)]"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 border-t border-espresso/10 p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question..."
                maxLength={500}
                className="flex-1 rounded-full bg-white/60 px-4 py-2.5 text-sm text-[var(--color-ivory)] placeholder:text-espresso/40 outline-none ring-1 ring-espresso/12 focus:ring-accent/50"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                data-cursor="hover"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)] text-[var(--color-ink)] disabled:opacity-40"
                aria-label="Send"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
