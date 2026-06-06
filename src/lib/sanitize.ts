/* =========================================================================
   Chat input sanitizer. Pure, dependency-free, and unit-tested
   (sanitize.test.ts). Shared by the serverless route src/pages/api/chat.ts.
   Defends the upstream call: caps length and history, drops non-user/assistant
   roles (so a client-supplied "system" message can't override the persona),
   collapses whitespace, and requires the last turn to be the user's.
   ========================================================================= */

export const MAX_CHARS = 500; // per user message
export const MAX_HISTORY = 8; // messages kept from the client

export type Role = 'user' | 'assistant';
export interface ChatMessage {
  role: Role;
  content: string;
}

export function sanitizeMessages(raw: unknown): ChatMessage[] {
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
