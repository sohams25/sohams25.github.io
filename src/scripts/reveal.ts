/* Scroll-reveal: add `.in` as elements enter the viewport. Content is visible by
   default (CSS hides .reveal only when JS is present and motion is allowed), so
   no-JS and reduced-motion users always see everything. */
const els = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!('IntersectionObserver' in window) || reduce) {
  els.forEach((el) => el.classList.add('in'));
} else {
  const io = new IntersectionObserver(
    (entries, obs) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          obs.unobserve(entry.target);
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.1 },
  );
  els.forEach((el) => io.observe(el));
}
