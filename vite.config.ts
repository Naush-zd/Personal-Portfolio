import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

/**
 * Dev-only middleware that emulates the `/api/chat` Vercel serverless
 * function (see api/chat.ts) so the chatbot works locally under `npm run
 * dev`, without needing the Vercel CLI. Both call sites share the same
 * `handleChatRequest` logic from server/chatHandler.ts.
 */
function apiDevMiddleware(): Plugin {
  return {
    name: "api-dev-middleware",
    configureServer(server) {
      server.middlewares.use("/api/chat", async (req, res) => {
        if (req.method !== "POST") {
          res.statusCode = 405;
          res.end("Method not allowed");
          return;
        }

        try {
          const chunks: Buffer[] = [];
          for await (const chunk of req) chunks.push(chunk as Buffer);
          const raw = Buffer.concat(chunks).toString("utf-8");
          const body = raw ? JSON.parse(raw) : {};

          const { handleChatRequest } = await server.ssrLoadModule(
            "/server/chatHandler.ts"
          );
          const result = await handleChatRequest(body);

          res.setHeader("Content-Type", "application/json");
          if (!result.ok) {
            res.statusCode = result.status;
            res.end(JSON.stringify({ error: result.error }));
            return;
          }
          res.statusCode = 200;
          res.end(JSON.stringify({ reply: result.reply }));
        } catch (err) {
          res.statusCode = 500;
          res.end(JSON.stringify({ error: (err as Error).message }));
        }
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load .env.local etc. (including non-VITE_-prefixed vars like GROQ_API_KEY)
  // onto process.env so the dev middleware's server-side handler can read
  // them the same way the Vercel serverless function does in production.
  const env = loadEnv(mode, process.cwd(), "");
  Object.assign(process.env, env);

  return {
    plugins: [react(), tailwindcss(), apiDevMiddleware()],
  };
});
