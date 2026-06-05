/* =========================================================================
   Field-radio chat client. Progressive enhancement: the markup renders without
   JS (with a mailto fallback); this wires the live conversation.
   Model/user text is rendered with textContent only — never innerHTML — so a
   reply can't inject markup.
   ========================================================================= */
import { fieldRadio } from '../data/chatbot';

type Role = 'user' | 'assistant';
interface Msg { role: Role; content: string; }

const root = document.querySelector<HTMLElement>('[data-field-radio]');
if (root) init(root);

function init(root: HTMLElement) {
  const toggle = root.querySelector<HTMLButtonElement>('[data-fr-toggle]');
  const panel = root.querySelector<HTMLElement>('[data-fr-panel]');
  const closeBtn = root.querySelector<HTMLButtonElement>('[data-fr-close]');
  const log = root.querySelector<HTMLElement>('[data-fr-log]');
  const form = root.querySelector<HTMLFormElement>('[data-fr-form]');
  const input = root.querySelector<HTMLTextAreaElement>('[data-fr-input]');
  const sendBtn = root.querySelector<HTMLButtonElement>('[data-fr-send]');
  const suggestWrap = root.querySelector<HTMLElement>('[data-fr-suggest]');

  if (!toggle || !panel || !log || !form || !input || !sendBtn) return;

  const history: Msg[] = [];
  let open = false;
  let pending = false;
  let seeded = false;

  // Everything outside the radio gets `inert` while the dialog is open, so Tab
  // can't escape the conversation into the page behind it.
  const inertTargets = Array.from(document.body.children).filter(
    (el): el is HTMLElement => el instanceof HTMLElement && el !== root,
  );

  function setOpen(next: boolean) {
    open = next;
    root!.classList.toggle('is-open', open);
    toggle!.setAttribute('aria-expanded', String(open));
    panel!.hidden = !open;
    inertTargets.forEach((el) => (open ? el.setAttribute('inert', '') : el.removeAttribute('inert')));
    if (open) {
      if (!seeded) seed();
      requestAnimationFrame(() => input!.focus());
    } else {
      toggle!.focus();
    }
  }

  function seed() {
    seeded = true;
    addBubble('assistant', fieldRadio.greeting);
    if (suggestWrap) suggestWrap.hidden = false;
  }

  function addBubble(role: Role, text: string): HTMLElement {
    const li = document.createElement('li');
    li.className = `fr-msg fr-msg--${role}`;
    const who = document.createElement('span');
    who.className = 'fr-msg__who label';
    who.textContent = role === 'user' ? 'you' : 'soham';
    const body = document.createElement('p');
    body.className = 'fr-msg__body';
    body.textContent = text; // safe: text node, no markup
    li.append(who, body);
    log!.append(li);
    log!.scrollTop = log!.scrollHeight;
    return li;
  }

  function showTyping(): HTMLElement {
    const li = document.createElement('li');
    li.className = 'fr-msg fr-msg--assistant fr-msg--typing';
    li.setAttribute('aria-label', 'Soham is replying');
    const dots = document.createElement('span');
    dots.className = 'fr-dots';
    dots.setAttribute('aria-hidden', 'true');
    dots.append(document.createElement('i'), document.createElement('i'), document.createElement('i'));
    li.append(dots);
    log!.append(li);
    log!.scrollTop = log!.scrollHeight;
    return li;
  }

  async function send(textRaw: string) {
    const text = textRaw.replace(/\s+/g, ' ').trim().slice(0, fieldRadio.maxChars);
    if (!text || pending) return;
    if (suggestWrap) suggestWrap.hidden = true;

    pending = true;
    sendBtn!.disabled = true;
    input!.value = '';
    autosize();
    addBubble('user', text);
    history.push({ role: 'user', content: text });

    const typing = showTyping();
    try {
      const res = await fetch(fieldRadio.endpoint, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ messages: history.slice(-fieldRadio.maxHistory) }),
      });
      const data = await res.json().catch(() => null);
      typing.remove();
      const reply: string | null = data && typeof data.reply === 'string' ? data.reply : null;
      if (res.ok && reply) {
        addBubble('assistant', reply);
        history.push({ role: 'assistant', content: reply });
      } else {
        addBubble('assistant', fieldRadio.fallbackMessage);
      }
    } catch {
      typing.remove();
      addBubble('assistant', fieldRadio.fallbackMessage);
    } finally {
      pending = false;
      sendBtn!.disabled = false;
      requestAnimationFrame(() => input!.focus());
    }
  }

  function autosize() {
    input!.style.height = 'auto';
    input!.style.height = Math.min(input!.scrollHeight, 132) + 'px';
  }

  /* ---- events ---- */
  toggle.addEventListener('click', () => setOpen(!open));
  closeBtn?.addEventListener('click', () => setOpen(false));

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    send(input.value);
  });

  input.addEventListener('input', autosize);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send(input.value);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && open) setOpen(false);
  });

  suggestWrap?.querySelectorAll<HTMLButtonElement>('[data-fr-q]').forEach((btn) => {
    btn.addEventListener('click', () => send(btn.textContent || ''));
  });
}
