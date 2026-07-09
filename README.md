# Nausheen Noor Zaidi — Portfolio

A single-page, animation-forward portfolio built with React, TypeScript, Tailwind CSS v4, and Framer Motion. Dark theme, animated gradient background, custom cursor, magnetic buttons, tilt-on-hover project cards, scroll-driven reveals, and a count-up achievements section.

## Stack

- **Vite + React 19 + TypeScript**
- **Tailwind CSS v4** (via `@tailwindcss/vite`)
- **Framer Motion** — all animation/scroll-reveal/gesture logic
- **lucide-react** + **react-icons** — iconography

## Getting started

```bash
npm install
cp .env.example .env.local   # then paste in a free Groq API key (see below)
npm run dev                  # http://localhost:5173
npm run build                # production build -> dist/
npm run preview              # preview the production build locally
npm run typecheck:server     # typecheck server/ and api/ (not part of the main build)
```

## Project structure

```
src/
  data.ts               single source of truth for all content (profile, education,
                         experience, projects, skills, achievements)
  components/
    Hero.tsx             landing section with role-rotator + magnetic CTAs
    About.tsx             bio + education timeline
    Experience.tsx        animated scroll-driven timeline (WBD, The Digital Geek)
    Projects.tsx           featured project cards (Rudra AI, Career Twin, Mockserver)
                            + publication + "more on GitHub" grid
    Skills.tsx             grouped skill chips + tech logo marquee
    Achievements.tsx       count-up stat cards (GATE rank, CGPA, publication)
    Contact.tsx             email / LinkedIn / GitHub / resume downloads
    Cursor.tsx, BackgroundFX.tsx, Preloader.tsx, Navbar.tsx, Footer.tsx
    ui/                    MagneticButton, TiltCard, Reveal, SectionHeading
  hooks/
    useActiveSection.ts     scroll-spy for the navbar
    useCountUp.ts            animated number counter
  components/Chatbot.tsx     floating chat widget (talks to /api/chat)
server/
  knowledgeBase.ts            compiles src/data.ts + notes.md into one context blob
  notes.md                    freeform extra knowledge you edit directly (the "db")
  chatHandler.ts               shared logic: validates input, calls Groq, returns a reply
api/
  chat.ts                      Vercel serverless function — thin adapter over chatHandler.ts
```

## The chatbot

A floating "Ask about Nausheen" widget backed by a tiny RAG-style pipeline:

1. **Knowledge base, not a vector DB.** `server/knowledgeBase.ts` formats everything
   in `src/data.ts` (profile, experience, projects, skills, achievements) plus the
   freeform `server/notes.md` into one text blob. At this content size (a few KB),
   a vector store would be pure overhead — the whole thing is just handed to the
   model as context on every request. It's still "RAG" in spirit: answers are
   grounded in retrieved documents, not the model's parametric memory.
2. **Your editable "database" is `server/notes.md`.** Add anecdotes, availability,
   what you're looking for, war-stories — anything not already in `data.ts`. Redeploy
   and the chatbot immediately knows it. No embeddings/indexing step required.
3. **The LLM is Groq** (`openai/gpt-oss-120b` by default, OpenAI-compatible API,
   generous free tier). Get a free key at
   [console.groq.com](https://console.groq.com), put it in `.env.local` for local
   dev, and add it as an Environment Variable (`GROQ_API_KEY`) in your Vercel
   project for production. Override the model with `GROQ_MODEL` if you want.
4. **One handler, two adapters.** `server/chatHandler.ts` has all the actual logic
   (validation, prompt assembly, calling Groq). `api/chat.ts` adapts it for Vercel's
   serverless runtime in production; a small Vite dev-server middleware
   (`vite.config.ts`) adapts the same function for `npm run dev`, so you can test
   the whole thing locally without the Vercel CLI.
5. **Known limitations (fine for a portfolio, worth knowing):** there's no
   persistent per-visitor rate limiting (a busy day could burn through your Groq
   free-tier quota — the API will just start erroring, nothing breaks, nothing
   costs money it just stops answering). Input is capped at 800 characters and 12
   messages of history per request as a basic guard.

## Before you deploy — things to finish

1. **Resume PDFs.** The "Download Resume" buttons in the Contact section point to
   `/public/resume/Nausheen_Zaidi_SDE_Backend.pdf` and
   `/public/resume/Nausheen_Zaidi_AI_Engineer.pdf`. Export the final LaTeX resumes
   as PDF from Overleaf and drop them into `public/resume/` with those exact names
   (or update the paths in `src/data.ts` under `profile.resumeFiles`).
2. **Rudra AI repository.** There's no public GitHub repo for Rudra AI under
   `Naush-zd`, so the site currently shows it as "Private repository" with no link.
   If you make it public (or it lives under a different account/org), update the
   `repo` field for the `rudra-ai` entry in `src/data.ts`.
3. **Phone number.** Intentionally left off the public site to avoid spam/scraping.
   Add it to the Contact section yourself if you'd prefer it listed.
4. **"More on GitHub" grid.** Populated from a snapshot of your public repos at
   build time (`src/data.ts` → `miniProjects`). If you push new projects, add them
   there manually, or wire up a live fetch to the GitHub REST API
   (`https://api.github.com/users/Naush-zd/repos`) if you'd rather it stay dynamic.

## Deploying

Any static host works (it's a Vite SPA):

- **Vercel:** `vercel` (or connect the repo in the dashboard) — zero config needed.
- **Netlify:** build command `npm run build`, publish directory `dist`.
- **GitHub Pages:** build, then push `dist/` to a `gh-pages` branch (or use the
  `gh-pages` npm package / a GitHub Action).
