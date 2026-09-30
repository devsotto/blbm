/* ==========================================================================
   Balamban Liempo — site-wide floating "Back to Top" behaviour
   Vanilla ES6, no dependencies. Load after the button markup.

   • hidden on load, revealed (fade + slide) once scrollY > 300px
   • rAF-throttled passive scroll listener — no layout thrash, no CLS
   • click → smooth scroll to top (auto under prefers-reduced-motion)
   ========================================================================== */

(() => {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  const prefersReducedMotion = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let ticking = false;
  const sync = () => {
    btn.classList.toggle('is-visible', window.scrollY > 300);
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(sync);
  }, { passive: true });

  sync();

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  });
})();
