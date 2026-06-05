# sohamshinde.com

Personal site for Soham Shinde — ML / computer vision / robotics. A field-notes
portfolio built in Astro, with a "field radio" chat that answers as Soham,
grounded in his CV and run through Groq.

## Stack

- **Astro 5**, static output. No framework runtime ships to the browser.
- One on-demand route, `src/pages/api/chat.ts`, runs as a Vercel serverless
  function and holds the Groq key. Everything else is prerendered HTML.
- Vanilla CSS with custom-property design tokens. Fonts: Newsreader + Space Mono,
  self-hosted via `@fontsource`.
- ~4 KB of inline JS (scroll reveal + the chat client). No client framework.

## Develop

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static build + the serverless function
npm run check      # astro + TypeScript diagnostics
```

## The field-radio chat

The widget calls `/api/chat`, which proxies Groq with a system prompt that keeps
the model in Soham's voice and grounded in `src/lib/chat-knowledge.ts`. The key
lives only in the serverless environment and never reaches the browser.

1. Get a free key at <https://console.groq.com/keys>.
2. Local: `cp .env.example .env` and set `GROQ_API_KEY`.
3. Production: set `GROQ_API_KEY` (and optional `GROQ_MODEL`) in the Vercel
   project's environment variables.

Without a key the widget still renders and shows a graceful fallback that points
visitors to email.

## Deploy (Vercel)

The Vercel adapter is already wired in `astro.config.mjs`.

1. Import the repo at <https://vercel.com/new>. Framework preset: Astro.
2. Add `GROQ_API_KEY` under Settings → Environment Variables.
3. Add the custom domain `sohamshinde.com` under Settings → Domains and point the
   registrar's records as Vercel instructs.

Security headers (CSP and friends) ship via `vercel.json`.

## Where things live

```
src/
  data/site.ts          all portfolio content (edit here)
  data/chatbot.ts       client-safe chat copy
  lib/chat-knowledge.ts server-only system prompt + knowledge base
  layouts/Base.astro    head, SEO, JSON-LD
  components/            Hero, About, Experience, Publications, Projects, Contact, Footer, FieldRadio
  pages/index.astro     the page; pages/api/chat.ts the chat function
  styles/               tokens.css + base.css
  scripts/              reveal.ts, field-radio.ts
```

Designed and built by Soham.
