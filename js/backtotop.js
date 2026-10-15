/* ==========================================================================
   Balamban Liempo — site-wide floating "Back to Top" behaviour
   Vanilla ES6, no dependencies. Load after the button markup.

   • hidden on load, revealed (fade + slide) once scrollY > 300px — the same
     gate at every width, so the control never goes missing mid-page
   • >= 768px: docks centred on the footer's legal bar (.footer-bottom) —
     vertically and horizontally, so it can never sit on the Privacy/Terms
     links. Inline top/left beat the bottom-0/end-0 utilities because an
     over-constrained fixed box drops its far edge; m-4's leading margins
     are measured and subtracted so the centre lands exactly on the bar.
     The footer is a docking target only: while the bar cannot be centred
     on screen the control keeps the bottom-right utility position, so it
     is never parked below the fold or hidden behind the reveal.
   • < 768px: pinned to the right edge, 24px in (the m-4 utility)
   • rAF-throttled passive scroll listener — no layout thrash, no CLS; the
     dock maths early-outs unless the legal bar is on screen, and the
     control's own metrics are measured once (init/resize/`load`), never
     per frame
   • click → smooth scroll to top (auto under prefers-reduced-motion)
   ========================================================================== */

(() => {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  const footerBar = document.querySelector('.footer-bottom');
  const dockQuery = window.matchMedia('(min-width: 768px)');

  const prefersReducedMotion = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* the control's own metrics never change on scroll — read them once and
     again only when the viewport (or its safe areas) change, so the scroll
     path below reads no styles at all */
  let marginTop = 0;
  let marginLeft = 0;
  let btnWidth = 0;
  let btnHeight = 0;
  const measure = () => {
    const cs = window.getComputedStyle(btn);
    marginTop = parseFloat(cs.marginTop) || 0;
    marginLeft = parseFloat(cs.marginLeft) || 0;
    btnWidth = btn.offsetWidth;
    btnHeight = btn.offsetHeight;
  };

  /* undock is a state change, not a per-frame chore: removeProperty writes
     the style attribute even when there is nothing to remove */
  let docked = false;
  const undock = () => {
    if (!docked) return;
    docked = false;
    btn.style.removeProperty('top');
    btn.style.removeProperty('left');
  };

  let ticking = false;
  const sync = () => {
    ticking = false;
    /* one gate at every width — the footer never decides visibility */
    btn.classList.toggle('is-visible', window.scrollY > 300);

    /* the dock maths runs only for the handful of frames in which the bar
       is actually on screen; everywhere else it early-outs here */
    if (!footerBar || !dockQuery.matches) return undock();

    /* the bar is a docking target only: centre on it while it can be centred
       on screen, otherwise fall back to the bottom-right utility position so
       the control is never parked below the fold.
       The ±1px tolerance is load-bearing: at full scroll the document bottom
       lands within a fraction of a pixel of the fold, and a strict <= rejects
       the dock about half the time — dropping the control onto the very
       Privacy/Terms links the dock exists to clear. Sub-pixel slack is still
       "centred on screen"; a pixel more is not. */
    const bar = footerBar.getBoundingClientRect();
    if (!(bar.top >= -1 && bar.bottom <= window.innerHeight + 1)) return undock();

    docked = true;
    btn.style.top =
      `${Math.round(bar.top + (bar.height - btnHeight) / 2 - marginTop)}px`;
    btn.style.left =
      `${Math.round(bar.left + (bar.width - btnWidth) / 2 - marginLeft)}px`;
  };

  const schedule = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(sync);
  };

  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', () => { measure(); schedule(); }, { passive: true });
  if (dockQuery.addEventListener) {
    dockQuery.addEventListener('change', () => { measure(); schedule(); });
  }

  /* late images/fonts reflow the page and move the bar (and the control's
     safe-area margins) after the first sync — re-measure and re-dock on
     load so an inline position set at parse time never goes stale */
  window.addEventListener('load', () => { measure(); sync(); });

  measure();
  sync();

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  });
})();
