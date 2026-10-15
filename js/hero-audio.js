/* ==========================================================================
   Balamban Liempo — homepage ambient grill sound
   Vanilla ES6, no dependencies: the loop is the recorded sizzle in
   assets/sizzling.mp3, played through an HTMLAudioElement so the file is
   cached and autoplay policy is never fought — playback only ever starts
   from a user gesture.

   • OFF by default; the hero corner toggle and the floating twin share state
   • the floating twin appears once the hero scrolls out of view, parked on
     the bottom-right stack above Back to Top (and out of the content
     column); at ≥ 1440px it claims the viewport midline instead, where the
     shell's outer margin keeps it clear
   • the volume fade starts when the element reports `playing` — the first
     press has to fetch the file, and the toggle wears a busy spinner until
     the sizzle is actually running
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

  const audio = new Audio();
  audio.preload = 'none';   /* the 897 KB sizzle waits for the first press */
  audio.loop = true;
  audio.volume = 0;
  audio.src = SRC;

  let playing = false;
  let loading = false;
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

  function reset() {
    playing = false;
    setLoading(false);
    window.clearInterval(fadeTimer);
    audio.volume = 0;
    sync();
  }

  function play() {
    if (playing) return;
    playing = true;
    setLoading(true);
    sync();
    audio.currentTime = 0;
    const started = audio.play();
    if (started && typeof started.catch === 'function') {
      /* autoplay refusal, a dead source, a cancelled fetch — all of them land
         here, and none of them may leave the control spinning */
      started.catch(reset);
    }
  }

  function stop() {
    if (!playing) return;
    playing = false;
    setLoading(false);
    sync();
    fade(0, FADE_OUT * 1000, () => {
      if (!playing) audio.pause();
    });
  }

  function toggle() {
    if (playing) stop();
    else play();
  }

  /* the fade waits for the element itself: the first press has to fetch the
     897 KB sizzle, and ramping volume while the engine is still buffering is
     a fade nobody hears (and one that leaves the next play starting loud) */
  audio.addEventListener('playing', () => {
    if (!playing) return;
    setLoading(false);
    fade(LEVEL, FADE_IN * 1000);
  });
  audio.addEventListener('error', reset);

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

  /* the first press fetches the 897 KB sizzle, so the control reports the
     wait with a spinner and aria-busy instead of looking dead */
  function setLoading(on) {
    if (loading === on) return;
    loading = on;
    buttons.forEach((btn) => {
      btn.classList.toggle('is-loading', on);
      if (on) btn.setAttribute('aria-busy', 'true');
      else btn.removeAttribute('aria-busy');
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
