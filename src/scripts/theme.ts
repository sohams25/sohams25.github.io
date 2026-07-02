/* Theme toggle. The no-flash default (localStorage or OS preference) is set by
   an inline script in Base.astro before paint; this wires the button, persists
   the choice, and keeps the mobile address-bar colour in sync. */
const root = document.documentElement;
const btn = document.querySelector<HTMLButtonElement>('[data-theme-toggle]');
const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');

function current(): 'light' | 'dark' {
  return root.dataset.theme === 'dark' ? 'dark' : 'light';
}

function apply(theme: 'light' | 'dark') {
  root.dataset.theme = theme;
  try {
    localStorage.setItem('theme', theme);
  } catch {
    /* storage blocked; in-memory only */
  }
  // read the paper token so this never drifts from tokens.css
  const bg = getComputedStyle(root).getPropertyValue('--c-paper').trim();
  if (meta && bg) meta.setAttribute('content', bg);
  if (btn) {
    btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    btn.setAttribute('aria-pressed', String(theme === 'dark'));
  }
}

apply(current());
btn?.addEventListener('click', () => apply(current() === 'dark' ? 'light' : 'dark'));
