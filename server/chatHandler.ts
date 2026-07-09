import { buildKnowledgeBase, SYSTEM_PROMPT } from "./knowledgeBase.js";

export type ChatMessage = { role: "user" | "assistant"; content: string };

export type ChatRequestBody = {
  messages: ChatMessage[];
};

export type ChatResult =
  | { ok: true; reply: string }
  | { ok: false; status: number; error: string };

const GROQ_MODEL = process.env.GROQ_MODEL ?? "openai/gpt-oss-120b";
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

const MAX_MESSAGE_LENGTH = 800;
const MAX_HISTORY_MESSAGES = 12;

function validate(body: unknown): ChatRequestBody | null {
  if (!body || typeof body !== "object") return null;
  const messages = (body as Record<string, unknown>).messages;
  if (!Array.isArray(messages) || messages.length === 0) return null;

  const cleaned: ChatMessage[] = [];
  for (const m of messages.slice(-MAX_HISTORY_MESSAGES)) {
    if (!m || typeof m !== "object") continue;
    const role = (m as Record<string, unknown>).role;
    if (role !== "user" && role !== "assistant") continue;
    const content = (m as Record<string, unknown>).content;
    if (typeof content !== "string" || content.trim().length === 0) continue;
    cleaned.push({ role, content: content.slice(0, MAX_MESSAGE_LENGTH) });
  }

  if (cleaned.length === 0) return null;
  return { messages: cleaned };
}

/**
 * Core chat logic shared between the Vercel serverless function (production
 * — see api/chat.ts) and the local Vite dev middleware (development — see
 * vite.config.ts). Keeping this framework-agnostic (plain JSON in, result
 * out) means both call sites stay tiny adapters around the same behavior.
 */
export async function handleChatRequest(body: unknown): Promise<ChatResult> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return {
      ok: false,
      status: 500,
      error:
        "GROQ_API_KEY is not configured on the server. Add it to .env.local (dev) or your Vercel project's environment variables (production).",
    };
  }

  const parsed = validate(body);
  if (!parsed) {
    return { ok: false, status: 400, error: "Invalid request body." };
  }

  const context = buildKnowledgeBase();

  let groqResponse: Response;
  try {
    groqResponse = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        temperature: 0.4,
        max_tokens: 400,
        messages: [
          { role: "system", content: `${SYSTEM_PROMPT}\n\nCONTEXT:\n${context}` },
          ...parsed.messages,
        ],
      }),
    });
  } catch (err) {
    return {
      ok: false,
      status: 502,
      error: `Failed to reach Groq API: ${(err as Error).message}`,
    };
  }

  if (!groqResponse.ok) {
    const detail = await groqResponse.text().catch(() => "");
    return {
      ok: false,
      status: 502,
      error: `Upstream LLM request failed (${groqResponse.status}). ${detail.slice(0, 300)}`,
    };
  }

  const data = (await groqResponse.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  const reply = data.choices?.[0]?.message?.content?.trim();

  if (!reply) {
    return { ok: false, status: 502, error: "Empty response from LLM." };
  }

  return { ok: true, reply };
}
