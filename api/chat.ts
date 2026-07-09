import type { VercelRequest, VercelResponse } from "@vercel/node";
import { handleChatRequest } from "../server/chatHandler.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const result = await handleChatRequest(req.body);

  if (!result.ok) {
    res.status(result.status).json({ error: result.error });
    return;
  }

  res.status(200).json({ reply: result.reply });
}
