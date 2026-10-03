/* ==========================================================================
   Balamban Liempo — homepage ambient grill sound
   Vanilla ES6, no dependencies: the loop is the recorded sizzle in
   assets/sizzling.mp3, played through an HTMLAudioElement so the file is
   cached and autoplay policy is never fought — playback only ever starts
   from a user gesture.

   • OFF by default; the hero corner toggle and the floating twin share state
   • the floating twin appears once the hero scrolls out of view and sits
     directly above Back to Top
   • homepage only: every entry point bails out when the hero is missing
   ========================================================================== */

(() => {
  const hero = document.querySelector('.hero');
  const heroBtn = document.getElementById('heroSound');
  const floatBtn = document.getElementById('floatSound');
  if (!hero || (!heroBtn && !floatBtn)) return;

  const SRC = 'assets/sizzling.mp3';
  const LEVEL = 0.3;       /* ambience, not a soundtrack */
  const FADE_IN = 0.7;
  const FADE_OUT = 0.4;

  const buttons = [heroBtn, floatBtn].filter(Boolean);

  const audio = new Audio(SRC);
  audio.loop = true;
  audio.preload = 'auto';
  audio.volume = 0;

  let playing = false;
  let fadeTimer = 0;

  /* ---------- transport ------------------------------------------------- */
  function fade(to, ms, done) {
    window.clearInterval(fadeTimer);
    const from = audio.volume;
    const steps = Math.max(1, Math.round(ms / 40));
    let step = 0;
    fadeTimer = window.setInterval(() => {
      step += 1;
      audio.volume = from + (to - from) * (step / steps);
      if (step >= steps) {
        window.clearInterval(fadeTimer);
        audio.volume = to;
        if (done) done();
      }
    }, 40);
  }

  function play() {
    if (playing) return;
    playing = true;
    sync();
    audio.currentTime = 0;
    const started = audio.play();
    if (started && typeof started.catch === 'function') {
      started.catch(() => {
        playing = false;
        sync();
      });
    }
    fade(LEVEL, FADE_IN * 1000);
  }

  function stop() {
    if (!playing) return;
    playing = false;
    sync();
    fade(0, FADE_OUT * 1000, () => {
      if (!playing) audio.pause();
    });
  }

  function toggle() {
    if (playing) stop();
    else play();
  }

  /* ---------- shared button state --------------------------------------- */
  function sync() {
    /* the accessible name keeps the visible "Hear the Sizzling" label so the
       spoken name matches what is on screen (WCAG 2.5.3 Label in Name) */
    const label = playing
      ? 'Hear the Sizzling — turn sound off'
      : 'Hear the Sizzling — turn sound on';
    const title = playing
      ? 'Hear the Sizzling — sound on'
      : 'Hear the Sizzling — sound off';
    buttons.forEach((btn) => {
      btn.setAttribute('aria-pressed', playing ? 'true' : 'false');
      btn.setAttribute('aria-label', label);
      btn.setAttribute('title', title);
    });
  }

  buttons.forEach((btn) => btn.addEventListener('click', toggle));
  sync();

  /* ---------- floating twin, revealed past the hero ---------------------- */
  if (floatBtn) {
    if ('IntersectionObserver' in window) {
      new IntersectionObserver((entries) => {
        floatBtn.classList.toggle('is-visible', !entries[0].isIntersecting);
      }, { threshold: 0 }).observe(hero);
    } else {
      let ticking = false;
      const syncVisibility = () => {
        floatBtn.classList.toggle('is-visible', window.scrollY > hero.offsetHeight);
        ticking = false;
      };
      window.addEventListener('scroll', () => {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(syncVisibility);
      }, { passive: true });
      syncVisibility();
    }
  }

  /* ---------- don't burn cycles on a hidden tab -------------------------- */
  document.addEventListener('visibilitychange', () => {
    if (!playing) return;
    if (document.hidden) audio.pause();
    else audio.play().catch(() => {});
  });
})();
