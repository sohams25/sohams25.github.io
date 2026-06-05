import type { APIRoute } from 'astro';
import { SYSTEM_PROMPT } from '../../lib/chat-knowledge';

// On-demand serverless function (holds GROQ_API_KEY). Everything else is static.
export const prerender = false;

/* ---- config ---- */
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
const DEFAULT_MODEL = 'llama-3.3-70b-versatile';
const MAX_CHARS = 500; // per user message
const MAX_HISTORY = 8; // messages kept from the client
const MAX_TOKENS = 320;

// Best-effort in-memory rate limit (per warm instance). Not a substitute for an
// edge limiter, but it blunts abuse from a single client within an instance.
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 12;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 1000) hits.clear(); // crude cap so the map can't grow unbounded
  return recent.length > RATE_MAX;
}

interface GroqResponse {
  choices?: Array<{ message?: { content?: string } }>;
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
      'x-content-type-options': 'nosniff',
    },
  });
}

type Role = 'user' | 'assistant';
interface ChatMessage { role: Role; content: string; }

function sanitize(raw: unknown): ChatMessage[] {
  if (!Array.isArray(raw)) return [];
  const out: ChatMessage[] = [];
  for (const m of raw) {
    if (!m || typeof m !== 'object') continue;
    const role = (m as Record<string, unknown>).role;
    const content = (m as Record<string, unknown>).content;
    if ((role !== 'user' && role !== 'assistant') || typeof content !== 'string') continue;
    const trimmed = content.replace(/\s+/g, ' ').trim().slice(0, MAX_CHARS);
    if (!trimmed) continue;
    out.push({ role, content: trimmed });
  }
  // keep only the tail, and require the last turn to be the user's
  const tail = out.slice(-MAX_HISTORY);
  while (tail.length && tail[tail.length - 1].role !== 'user') tail.pop();
  return tail;
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const apiKey = process.env.GROQ_API_KEY ?? import.meta.env.GROQ_API_KEY;
  if (!apiKey) {
    return json({ error: 'unconfigured', reply: null }, 503);
  }

  // Prefer the platform-provided client address (trusted). Only fall back to the
  // client-controllable x-forwarded-for header when the adapter omits it.
  const ip =
    clientAddress ||
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    'unknown';
  if (rateLimited(ip)) {
    return json({ error: 'rate_limited', reply: null }, 429);
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return json({ error: 'bad_json', reply: null }, 400);
  }

  const history = sanitize((payload as Record<string, unknown>)?.messages);
  if (history.length === 0) {
    return json({ error: 'empty', reply: null }, 400);
  }

  const model =
    process.env.GROQ_MODEL ?? import.meta.env.GROQ_MODEL ?? DEFAULT_MODEL;

  let groqRes: Response;
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20_000);
    groqRes = await fetch(GROQ_URL, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${apiKey}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model,
        temperature: 0.5,
        max_tokens: MAX_TOKENS,
        messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...history],
      }),
      signal: controller.signal,
    });
    clearTimeout(timeout);
  } catch {
    return json({ error: 'upstream_unreachable', reply: null }, 502);
  }

  if (!groqRes.ok) {
    console.error(`[chat] groq upstream ${groqRes.status}`); // server-side only; not exposed to client
    return json({ error: 'upstream_error', reply: null }, 502);
  }

  let data: GroqResponse;
  try {
    data = (await groqRes.json()) as GroqResponse;
  } catch {
    return json({ error: 'upstream_parse', reply: null }, 502);
  }

  const reply: string | undefined = data?.choices?.[0]?.message?.content;
  if (!reply || typeof reply !== 'string') {
    return json({ error: 'no_reply', reply: null }, 502);
  }

  return json({ reply: reply.trim() }, 200);
};

// Anything other than POST gets a clean 405.
export const ALL: APIRoute = () =>
  json({ error: 'method_not_allowed' }, 405);
