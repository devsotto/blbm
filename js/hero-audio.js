/* ==========================================================================
   Balamban Liempo — homepage ambient grill sound
   Vanilla ES6, no dependencies, no media file: the loop is synthesised with
   the Web Audio API, so nothing downloads and autoplay policy is never
   fought — the AudioContext is only ever built from a user gesture.

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

  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) {
    /* no Web Audio: drop the controls rather than ship dead buttons */
    if (heroBtn) heroBtn.hidden = true;
    if (floatBtn) floatBtn.hidden = true;
    return;
  }

  const LEVEL = 0.3;       /* ambience, not a soundtrack */
  const FADE_IN = 0.7;
  const FADE_OUT = 0.4;

  const buttons = [heroBtn, floatBtn].filter(Boolean);

  let ctx = null;
  let master = null;
  let noise = null;
  let crackleTimer = 0;
  let playing = false;
  let starting = false;

  /* ---------- the graph -------------------------------------------------
     A sizzle is mostly noise: a band-limited bed for the rendering fat, a
     high-passed hiss for the crisping skin, both breathing on a slow LFO —
     then short random band-passed bursts on top for the crackle.        */
  function build() {
    ctx = new AudioCtx();

    master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);

    const frames = Math.floor(ctx.sampleRate * 4);
    noise = ctx.createBuffer(2, frames, ctx.sampleRate);
    for (let ch = 0; ch < 2; ch++) {
      const data = noise.getChannelData(ch);
      for (let i = 0; i < frames; i++) data[i] = Math.random() * 2 - 1;
    }

    /* bed — fat rendering against the grate */
    const bed = ctx.createBufferSource();
    bed.buffer = noise;
    bed.loop = true;
    const bedBand = ctx.createBiquadFilter();
    bedBand.type = 'bandpass';
    bedBand.frequency.value = 2100;
    bedBand.Q.value = 0.6;
    const bedGain = ctx.createGain();
    bedGain.gain.value = 0.5;
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.28;
    const lfoDepth = ctx.createGain();
    lfoDepth.gain.value = 0.18;
    bed.connect(bedBand);
    bedBand.connect(bedGain);
    bedGain.connect(master);
    lfo.connect(lfoDepth);
    lfoDepth.connect(bedGain.gain);

    /* hiss — the dry edge of crisping skin */
    const hiss = ctx.createBufferSource();
    hiss.buffer = noise;
    hiss.loop = true;
    hiss.playbackRate.value = 0.9;
    const hissHP = ctx.createBiquadFilter();
    hissHP.type = 'highpass';
    hissHP.frequency.value = 5200;
    const hissGain = ctx.createGain();
    hissGain.gain.value = 0.32;
    hiss.connect(hissHP);
    hissHP.connect(hissGain);
    hissGain.connect(master);

    bed.start();
    hiss.start();
    lfo.start();
  }

  function crackle() {
    if (!ctx || ctx.state !== 'running') return;
    const t = ctx.currentTime;
    const src = ctx.createBufferSource();
    src.buffer = noise;
    src.playbackRate.value = 0.7 + Math.random() * 1.6;

    const band = ctx.createBiquadFilter();
    band.type = 'bandpass';
    band.frequency.value = 1300 + Math.random() * 4200;
    band.Q.value = 1.1 + Math.random() * 3;

    const gain = ctx.createGain();
    const peak = 0.05 + Math.random() * 0.16;
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(peak, t + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.05 + Math.random() * 0.14);

    src.connect(band);
    band.connect(gain);
    gain.connect(master);
    src.start(t + Math.random() * 0.02, Math.random() * (noise.duration - 0.4), 0.4);
  }

  function scheduleCrackle() {
    window.clearTimeout(crackleTimer);
    crackleTimer = window.setTimeout(() => {
      if (!playing) return;
      crackle();
      /* fat spits in clusters — a second pop straight after, now and then */
      if (Math.random() < 0.3) {
        window.setTimeout(() => { if (playing) crackle(); }, 40 + Math.random() * 90);
      }
      scheduleCrackle();
    }, 45 + Math.random() * 320);
  }

  /* ---------- transport ------------------------------------------------- */
  async function play() {
    if (playing || starting) return;
    starting = true;
    /* claim the state first: a second click has to be able to cancel us
       while the context is still resuming */
    playing = true;
    sync();
    try {
      if (!ctx) build();
      await ctx.resume();
      if (!playing) return;
      const t = ctx.currentTime;
      master.gain.cancelScheduledValues(t);
      master.gain.setValueAtTime(master.gain.value, t);
      master.gain.linearRampToValueAtTime(LEVEL, t + FADE_IN);
      scheduleCrackle();
    } catch (err) {
      playing = false;
      sync();
    } finally {
      starting = false;
    }
  }

  function stop() {
    if (!playing) return;
    playing = false;
    sync();
    window.clearTimeout(crackleTimer);
    if (!ctx) return;
    const t = ctx.currentTime;
    master.gain.cancelScheduledValues(t);
    master.gain.setValueAtTime(master.gain.value, t);
    master.gain.linearRampToValueAtTime(0, t + FADE_OUT);
    window.setTimeout(() => {
      if (!playing && ctx && ctx.state === 'running') ctx.suspend();
    }, FADE_OUT * 1000 + 150);
  }

  function toggle() {
    if (playing) stop();
    else play();
  }

  /* ---------- shared button state --------------------------------------- */
  function sync() {
    const label = playing ? 'Turn the grill sound off' : 'Turn the grill sound on';
    const title = playing ? 'Sound on' : 'Sound off';
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
    if (!ctx || !playing) return;
    if (document.hidden) {
      ctx.suspend();
    } else {
      const resumed = ctx.resume();
      if (resumed && typeof resumed.catch === 'function') resumed.catch(() => {});
    }
  });
})();
