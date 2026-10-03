/* ==========================================================================
   Balamban Liempo — interactions
   ========================================================================== */
(function () {
  'use strict';

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ----------------------------------------------------------------------
     1. Banderitas — festive fiesta pennants strung across the hero
     ---------------------------------------------------------------------- */
  function buildBanderitas() {
    const group = document.querySelector('.banderitas .flags');
    if (!group) return;

    const NS = 'http://www.w3.org/2000/svg';
    const colors = ['#D48C28', '#3E6B34', '#8C9E5B', '#F5EBE0', '#E9A63F'];
    const count = 30;
    const w = 16, h = 26;

    // two quadratic segments mirroring the drawn string path
    const seg = [
      { p0: [0, 12], c: [300, 62], p1: [600, 22] },
      { p0: [600, 22], c: [900, -18], p1: [1200, 30] }
    ];

    const pointAt = (t) => {
      const s = seg[t <= 0.5 ? 0 : 1];
      const u = t <= 0.5 ? t * 2 : (t - 0.5) * 2;
      const m = 1 - u;
      return [
        m * m * s.p0[0] + 2 * m * u * s.c[0] + u * u * s.p1[0],
        m * m * s.p0[1] + 2 * m * u * s.c[1] + u * u * s.p1[1]
      ];
    };

    for (let i = 0; i < count; i++) {
      const t = (i + 0.5) / count;
      const [x, y] = pointAt(t);

      const tri = document.createElementNS(NS, 'polygon');
      tri.setAttribute('points',
        `${x - w / 2},${y} ${x + w / 2},${y} ${x},${y + h}`);
      tri.setAttribute('fill', colors[i % colors.length]);
      tri.setAttribute('opacity', '0.94');
      tri.setAttribute('class', 'flag');
      tri.style.animationDelay = (i * 0.11).toFixed(2) + 's';
      group.appendChild(tri);
    }
  }

  /* ----------------------------------------------------------------------
     1b. Embers — sparks lifting off the charcoal pit in the hero
     ---------------------------------------------------------------------- */
  function initEmbers() {
    const canvas = document.getElementById('emberCanvas');
    if (!canvas || reduced) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const hero = canvas.closest('.hero');
    const COLORS = ['233,166,63', '212,140,40', '245,235,224', '140,158,91'];
    const COUNT = 44;
    const parts = [];

    let w = 0, h = 0, raf = 0, visible = true;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function spawn(p, initial) {
      p.x = Math.random() * w;
      p.y = initial ? Math.random() * h : h + 12 + Math.random() * 40;
      p.size = 0.7 + Math.random() * 2.1;
      p.speed = 0.22 + Math.random() * 0.8;
      p.drift = (Math.random() - 0.5) * 0.42;
      p.phase = Math.random() * Math.PI * 2;
      p.sway = 0.35 + Math.random() * 1.1;
      p.life = 0;
      p.max = 320 + Math.random() * 420;
      p.color = COLORS[(Math.random() * COLORS.length) | 0];
      p.alpha = 0.3 + Math.random() * 0.55;
      return p;
    }

    for (let i = 0; i < COUNT; i++) parts.push(spawn({}, true));

    function frame() {
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';

      for (let i = 0; i < parts.length; i++) {
        const p = parts[i];
        p.life++;
        if (p.life > p.max || p.y < -20) { spawn(p, false); continue; }

        p.y -= p.speed;
        p.x += p.drift + Math.sin(p.phase + p.life * 0.022) * p.sway * 0.4;

        const t = p.life / p.max;
        const fade = t < 0.12 ? t / 0.12 : t > 0.68 ? (1 - t) / 0.32 : 1;
        ctx.fillStyle = 'rgba(' + p.color + ',' + (p.alpha * fade).toFixed(3) + ')';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = visible ? requestAnimationFrame(frame) : 0;
    }

    function start() {
      if (raf || !visible) return;
      raf = requestAnimationFrame(frame);
    }

    resize();
    start();

    window.addEventListener('resize', () => { resize(); }, { passive: true });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        if (raf) cancelAnimationFrame(raf);
        raf = 0;
      } else start();
    });

    if (hero && 'IntersectionObserver' in window) {
      new IntersectionObserver((entries) => {
        visible = entries[0].isIntersecting;
        if (visible) start();
        else if (raf) { cancelAnimationFrame(raf); raf = 0; }
      }, { threshold: 0 }).observe(hero);
    }
  }

  /* ----------------------------------------------------------------------
     2. Reveal on scroll — staggered entry, transform/opacity only
     ---------------------------------------------------------------------- */
  function initReveal() {
    const items = document.querySelectorAll('.reveal');
    if (!items.length) return;

    items.forEach((el) => {
      const delay = el.dataset.delay;
      if (delay) el.style.setProperty('--reveal-delay', delay + 'ms');
    });

    if (reduced || !('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('is-in'));
      return;
    }

    const RATIO = 0.12;

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const tall = entry.boundingClientRect.height > window.innerHeight;
        if (!tall && entry.intersectionRatio < RATIO) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: [0, RATIO] });

    items.forEach((el) => io.observe(el));
  }

  /* ----------------------------------------------------------------------
     3. Sticky nav shadow + scroll-spy for the current section
     ---------------------------------------------------------------------- */
  function initNav() {
    const nav = document.getElementById('blNav');
    const toggler = nav && nav.querySelector('.navbar-toggler');
    const collapseEl = document.getElementById('navMenu');

    if (nav) {
      const onScroll = () => nav.classList.toggle('is-stuck', window.scrollY > 40);
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    // close the mobile drawer after picking a link.
    // the "About Us" toggle only expands its own submenu, so it must not shut
    // the drawer out from under it.
    if (collapseEl) {
      let pendingHash = null;

      collapseEl.querySelectorAll('a[href^="#"]:not(.dropdown-toggle)').forEach((a) => {
        a.addEventListener('click', (e) => {
          const instance = bootstrap.Collapse.getInstance(collapseEl);
          if (!instance || !collapseEl.classList.contains('show')) return;

          // the drawer sits in normal flow: collapsing it reflows the page, so
          // letting the browser scroll straight away lands off-target. Wait for
          // the layout to settle, then navigate.
          e.preventDefault();
          pendingHash = a.getAttribute('href');
          instance.hide();
        });
      });

      collapseEl.addEventListener('hidden.bs.collapse', () => {
        const open = collapseEl.querySelector('.dropdown-toggle[aria-expanded="true"]');
        if (open) bootstrap.Dropdown.getOrCreateInstance(open).hide();

        if (!pendingHash) return;
        const hash = pendingHash;
        pendingHash = null;

        let target = null;
        if (hash.length > 1) {
          try { target = document.querySelector(hash); } catch (e) { target = null; }
        }
        if (!target) return;

        if (location.hash === hash) {
          target.scrollIntoView({ block: 'start', behavior: 'instant' });
        } else {
          location.hash = hash;
        }
      });
    }

    // scroll-spy
    const links = Array.from(document.querySelectorAll('.bl-nav .nav-link[href^="#"]'));
    const targets = links
      .map((l) => document.querySelector(l.getAttribute('href')))
      .filter(Boolean);

    if (!targets.length || !('IntersectionObserver' in window)) return;

    const visible = new Map();
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((e) => visible.set(e.target.id, e.intersectionRatio));
      let best = null, bestRatio = 0;
      visible.forEach((ratio, id) => {
        if (ratio > bestRatio) { bestRatio = ratio; best = id; }
      });
      links.forEach((l) => {
        l.classList.toggle('is-current', best !== null && l.getAttribute('href') === '#' + best);
      });
    }, { threshold: [0, 0.2, 0.5, 0.75], rootMargin: '-15% 0px -45% 0px' });

    targets.forEach((t) => spy.observe(t));
  }

  /* ----------------------------------------------------------------------
     3b. "About Us" sub-menu — hover on desktop, tap on mobile
     ---------------------------------------------------------------------- */
  function initAboutDropdown() {
    const item = document.querySelector('.bl-nav .dropdown');
    if (!item || typeof bootstrap === 'undefined' || !bootstrap.Dropdown) return;

    const toggle = item.querySelector('.dropdown-toggle');
    const menu = item.querySelector('.dropdown-menu');
    if (!toggle || !menu) return;

    const dd = bootstrap.Dropdown.getOrCreateInstance(toggle, { autoClose: false });
    const canHover = window.matchMedia('(min-width: 992px) and (hover: hover) and (pointer: fine)');
    const isOpen = () => menu.classList.contains('show');

    const nativeFocus = toggle.focus.bind(toggle);
    toggle.focus = (options) => nativeFocus(Object.assign({ preventScroll: true }, options));

    // show() focuses the toggle, which re-enters focusin — guard so we do not
    // stand up a second Popper instance every time the menu opens.
    let opening = false;
    let quiet = false;      // we are undoing show()'s focus — skip the focusout close
    let swallowUntil = 0;   // a pointer open still owes the toggle its focus back
    let refocusing = false; // Escape handed focus back — don't read it as an open
    const show = () => {
      if (isOpen() || opening) return;
      opening = true;
      try { dd.show(); } finally { opening = false; }
    };

    // show() hands focus to the toggle once the menu has finished opening, so a
    // pointer open has to catch it on the way in: no halo under the cursor.
    // Keyboard opens never arm the swallow — Tab has to walk into the sub-menu.
    const releaseFocus = () => {
      if (document.activeElement !== toggle) return;
      quiet = true;
      try { toggle.blur(); } finally { quiet = false; }
    };
    const openForPointer = () => {
      if (isOpen()) return;   // already up: leave focus where it is
      swallowUntil = Date.now() + 1000;
      show();
      if (document.activeElement === toggle) {
        swallowUntil = 0;
        releaseFocus();
      }
    };
    const openForFocus = () => {
      if (refocusing) return;
      // Touch focuses the link before the click lands — on those devices the
      // tap owns the open, or the two handlers cancel each other out.
      if (!canHover.matches) return;
      if (swallowUntil && Date.now() < swallowUntil) {
        swallowUntil = 0;
        releaseFocus();
        return;
      }
      show();
    };
    const close = () => { if (!isOpen()) return; dd.hide(); };

    item.addEventListener('mouseenter', () => { if (canHover.matches) openForPointer(); });
    item.addEventListener('mouseleave', close);

    item.addEventListener('focusin', openForFocus);
    item.addEventListener('focusout', (e) => {
      if (quiet) return;
      if (!item.contains(e.relatedTarget)) close();
    });

    // Desktop: hover owns the sub-menu, so a click under the pointer keeps it
    // open instead of toggling it shut. Mobile: a plain tap toggles it and the
    // parent link must never jump away.
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const fromPointer = e.detail > 0;
      if (isOpen()) {
        if (fromPointer && canHover.matches) return;
        close();
        return;
      }
      if (fromPointer) openForPointer();
      else { swallowUntil = 0; show(); }   // keyboard activation keeps focus
    });

    // click away, pick a sub-entry, or press Escape — all close it
    document.addEventListener('click', (e) => {
      if (!item.contains(e.target)) close();
    });
    menu.addEventListener('click', (e) => {
      if (e.target.closest('a')) close();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
    });

    // Bootstrap's dropdown keydown data-api is delegated on document in the
    // capture phase, hunting for a [data-bs-toggle="dropdown"] ancestor that
    // this toggle deliberately dropped — fed nothing it throws. Swallow those
    // keys on window capture, which runs before document capture, and own them.
    window.addEventListener('keydown', (e) => {
      if (!menu.contains(e.target)) return;
      if (e.key !== 'Escape' && e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;

      e.preventDefault();
      e.stopPropagation();

      if (e.key === 'Escape') {
        close();
        // focusin on the toggle would reopen — hold it off for the refocus.
        refocusing = true;
        try { toggle.focus(); } finally { refocusing = false; }
        return;
      }

      const items = Array.from(menu.querySelectorAll('a[href]'));
      const i = items.indexOf(document.activeElement);
      const at = e.key === 'ArrowDown'
        ? (i < 0 ? 0 : (i + 1) % items.length)
        : (i < 0 ? items.length - 1 : (i - 1 + items.length) % items.length);
      if (items[at]) items[at].focus();
    }, true);

    canHover.addEventListener('change', close);
  }

  /* ----------------------------------------------------------------------
     4. Herb stuffing pop-outs
     ---------------------------------------------------------------------- */
  const HERBS = [
    {
      name: 'Lemongrass', cebu: 'Tanglad',
      text: 'The backbone of Cebuano lechon. Stalks are bruised and laid along the cavity so the steam carrying the citrus aroma cooks the meat from the inside out.',
      note: 'Why it matters: it is the top note you smell before the first bite.'
    },
    {
      name: 'Scallion', cebu: 'Sibuyas dahon',
      text: 'Long green onion leaves packed in whole. They break down during the roast and leave a sweet, faintly sharp liquor that bastes the belly.',
      note: 'Why it matters: gives the stuffing its deep green colour.'
    },
    {
      name: 'Green onion & chives', cebu: 'Balatoy',
      text: 'A finer cut worked in with the scallion for the background savoury note. This is the "secret green ingredient" people try to reverse-engineer.',
      note: 'Why it matters: the savoury backbone under the herbs.'
    },
    {
      name: 'Garlic', cebu: 'Ahos',
      text: 'Crushed cloves tucked between the herb bundle. Roasting mellows the raw edge into something nutty that reads as part of the crackling.',
      note: 'Why it matters: bridges the herbs and the pork fat.'
    },
    {
      name: 'Black pepper', cebu: 'Paminta',
      text: 'Cracked peppercorns through the belly. Enough to warm the finish without turning the roast into a pepper dish.',
      note: 'Why it matters: the slow heat behind the initial crunch.'
    },
    {
      name: 'Bay leaf', cebu: 'Laurel',
      text: 'Dried laurel leaves laid against the meat. They lend the faintest resinous, tea-like note that reads as "lechon" to anyone who grew up in Cebu.',
      note: 'Why it matters: the aroma of a Sunday family salo-salo.'
    },
    {
      name: 'Chili (spicy line)', cebu: 'Sili',
      text: 'Added only to BL Spicy and Balambanok Spicy. Sili is worked into the same herb bundle so the heat infuses the meat rather than sitting on the skin.',
      note: 'Why it matters: heat inside the roast, not a sauce on top.'
    }
  ];

  function initHerbs() {
    const chipWrap = document.querySelector('.herb-chips');
    const detail = document.getElementById('herbDetail');
    const popout = document.getElementById('herbPopout');
    if (!chipWrap || !detail) return;

    let current = 0;

    HERBS.forEach((herb, i) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'herb-chip' + (i === 0 ? ' is-active' : '');
      btn.textContent = herb.name;
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
      btn.addEventListener('click', () => {
        // second tap on the active ingredient opens the pop-out
        if (current === i && popout) return openPopout(i);
        select(i);
      });
      chipWrap.appendChild(btn);
    });

    const chips = Array.from(chipWrap.querySelectorAll('.herb-chip'));

    function select(index) {
      const herb = HERBS[index];
      current = index;

      chips.forEach((c, i) => {
        c.classList.toggle('is-active', i === index);
        c.setAttribute('aria-selected', i === index ? 'true' : 'false');
      });

      detail.classList.remove('is-swapping');
      // force reflow so the animation restarts on repeat clicks
      void detail.offsetWidth;

      detail.innerHTML =
        '<span class="herb-detail-kicker">Cebuano stuffing</span>' +
        '<h3 class="herb-detail-title">' + herb.name +
        '<span class="herb-detail-cebu">' + herb.cebu + '</span></h3>' +
        '<p class="herb-detail-text">' + herb.text + '</p>' +
        '<p class="herb-detail-note"><strong>Note.</strong> ' + herb.note + '</p>' +
        '<button class="herb-popout-trigger" type="button">' +
        'Open the pop-out<span aria-hidden="true"> &rarr;</span></button>';

      detail.classList.add('is-swapping');
    }

    detail.addEventListener('click', (e) => {
      if (e.target.closest('.herb-popout-trigger')) openPopout(current);
    });

    function openPopout(index) {
      const herb = HERBS[index];
      if (!popout) return;

      popout.querySelector('.herb-popout-name').textContent = herb.name;
      popout.querySelector('.herb-popout-cebu').textContent = herb.cebu;
      document.getElementById('herbPopoutText').textContent = herb.text;
      document.getElementById('herbPopoutNote').innerHTML =
        '<strong>Note.</strong> ' + herb.note;
      document.getElementById('herbPopoutCebu2').textContent = herb.cebu;

      if (typeof popout.showModal === 'function') popout.showModal();
      else popout.setAttribute('open', '');
    }

    if (popout) {
      const close = () => {
        if (typeof popout.close === 'function') popout.close();
        else popout.removeAttribute('open');
      };

      document.getElementById('herbPopoutClose').addEventListener('click', close);
      popout.addEventListener('click', (e) => {
        if (e.target === popout) close();
      });
    }

    select(0);
  }

  /* ----------------------------------------------------------------------
     5. Store locator — real branch directory with region + text filtering
     ---------------------------------------------------------------------- */
  const BRANCHES = [
    // ---- Luzon ----
    ['P. Tuazon', 'P. Tuazon Street, Project 4, Quezon City', 'luzon'],
    ['Antipolo', '60 Hon. B. Soliven Avenue, Antipolo', 'luzon'],
    ['Mandaluyong', '1550 Sierra Madre, Mandaluyong, Metro Manila', 'luzon'],
    ['Sta. Rosa, Laguna', 'Brgy. Balibago, Sta. Rosa City — beside Uno1 Fuel Gasoline Station', 'luzon'],
    ['Biñan, Laguna', 'National Highway, Canlalay, Biñan City, Laguna', 'luzon'],

    // ---- Visayas — Cebu ----
    ['Panagdait', 'F. Cabahug St., Kasambagan, Cebu City', 'visayas', 'Dine-in'],
    ['Escario', 'Escario St., Cebu City', 'visayas'],
    ['Banawa', 'P. Duterte St., Banawa, Cebu City', 'visayas'],
    ['Guadalupe', 'V. Rama, Cebu City', 'visayas'],
    ['Bulacao', 'Prince Warehouse, Bulacao, Cebu City', 'visayas'],
    ['Urgello', 'Urgello, Cebu City', 'visayas'],
    ['Katipunan', 'Katipunan St., Brgy. Tisa, Cebu City', 'visayas'],
    ['Talamban 2', 'Minza St. cor. Kauswagan Road, Cebu City', 'visayas'],
    ['Punta', 'F. Llamas St., Punta Princesa, Cebu City', 'visayas'],
    ['Minglanilla', 'Minglanilla Proper, Cebu', 'visayas'],
    ['Pakigne', 'Pakigne, Minglanilla, Cebu', 'visayas'],
    ['Cortes', 'Cabahug Street, Ibabao, Mandaue City', 'visayas'],
    ['Sugbo Merkado', 'Sugbo Merkado, IT Park, Cebu City', 'visayas', 'Dine-in & take-out'],
    ['BL Cordova', 'Cordova Poblacion, beside Mimi’s Petshop', 'visayas'],
    ['Gabi, Cordova', 'M.L. Quezon National Highway, Brgy. Gabi, Cordova', 'visayas'],
    ['Tisa, Labangon', 'Tisa, Labangon, Cebu City', 'visayas'],
    ['Atlantis', 'Atlantis Food Park, Liloan', 'visayas', 'Dine-in & take-out'],
    ['Bogo 2', 'Colon St., Bogo City', 'visayas'],
    ['Paknaan', 'Plaridel St., Paknaan, Mandaue City', 'visayas'],
    ['Naga', 'Poblacion, Naga City', 'visayas'],
    ['Calawisan', 'Babag 1 cor. Calawisan, Cebu City', 'visayas'],
    ['Moalboal', 'Poblacion, Moalboal, Cebu', 'visayas'],
    ['Marigondon', 'Kadulang, Marigondon, Lapu-Lapu City', 'visayas'],
    ['Carmen', 'Washington St., Cogon West, Carmen, Cebu', 'visayas'],
    ['Danao 2', 'Sabang, Danao City', 'visayas'],
    ['Talamban 1', 'Piazza Elisea, Nasipit, Talamban, Cebu City', 'visayas'],
    ['Pardo', 'Pardo, Cebu City', 'visayas'],
    ['Lahug', 'Lot 1 & 2 Block 2, Gorordo Ave., Lahug, Cebu City', 'visayas'],
    ['Buanoy, Balamban', 'Buanoy, Balamban, Cebu', 'visayas'],
    ['Bogo 1', 'Surdirovio St., Sto. Rosario, Bogo City', 'visayas'],
    ['Danao 1', 'F. Rallota St., Danao City', 'visayas'],
    ['Carcar', 'P. Nellas St., Carcar City', 'visayas'],
    ['Banilad', 'Banilad, Cebu City', 'visayas'],
    ['Casuntingan', '828-L Quezon St., Casuntingan, Mandaue City', 'visayas'],
    ['Dalaguete', 'Poblacion, Dalaguete', 'visayas'],
    ['Dumlog', 'Dumlog, Talisay City', 'visayas'],
    ['Mohon', 'Upper Mohon, Talisay City', 'visayas'],
    ['Pajak', 'Pajak, Lapu-Lapu City', 'visayas'],
    ['Pusok', 'Pusok, Lapu-Lapu City', 'visayas'],
    ['Sangi', 'Sangi, Toledo City', 'visayas'],

    // ---- Visayas — Iloilo / Bacolod ----
    ['Alta Tierra', 'Alta Tierra Village, McArthur Hiway, Taboc Suba, Jaro, Iloilo', 'visayas'],
    ['Pavia', 'Zone 1, Aganan, Pavia, Iloilo', 'visayas'],
    ['Baluarte (East)', 'Lopez Jaena St., Barangay East, Iloilo City', 'visayas'],
    ['Baluarte (Molo)', 'Molo, Iloilo City', 'visayas'],
    ['Lapuz', 'Jalandoni, Lapuz, Iloilo City', 'visayas'],
    ['Villa', 'Quezon St., Arevalo, Iloilo City', 'visayas'],
    ['Lapaz', 'La Granja Sur, Lapaz, Iloilo City', 'visayas'],
    ['Singko', 'Banga Singko, Brgy. Jibao-an, Pavia, Iloilo City', 'visayas'],
    ['Tagbak', 'North Central, Iloilo Transport Terminal, Brgy. Tagbak, Jaro, Iloilo City', 'visayas'],
    ['Libertad', 'Unit 1, Uptown Arcade, Libertad Ext., Taculing, Bacolod City', 'visayas'],
    ['Libertad Taculing', 'Hernaez St., Libertad Taculing Ext., Bacolod City', 'visayas'],
    ['Burgos', 'Near Lopez East Center, Villamonte, Bacolod City', 'visayas'],
    ['Kabankalan', 'Guanzon St., Brgy. 5, Kabankalan City', 'visayas'],
    ['Fortune Town', 'Celina Homes Subdivision, Brgy. Estefania, Bacolod City', 'visayas'],
    ['Silay', 'Balamban Liempo Silay, Bacolod', 'visayas'],

    // ---- Visayas — Eastern / Dumaguete / Bohol ----
    ['Caibaan', 'Brgy. 95, Caibaan, Tacloban City, Leyte', 'visayas'],
    ['San Jose', 'San Jose, Brgy. 84, Tacloban City', 'visayas'],
    ['VNG', 'Calanipawan, Brgy. 96, Tacloban City', 'visayas'],
    ['Nula Tula', 'PHHC Subn, Brgy. 72, Tacloban City', 'visayas'],
    ['Campetic', 'Brgy. Pawing, Palo, Leyte', 'visayas'],
    ['Apitong', 'Brgy. 110 Utap, Tacloban City', 'visayas'],
    ['Real', 'Brgy. 60 Aslum, Sagkahan, Tacloban City', 'visayas'],
    ['Sogod', 'Sogod, Southern Leyte', 'visayas'],
    ['Duma 1', 'San Jose Extension, Daro, Dumaguete', 'visayas'],
    ['Duma 2', '36 North National Highway, West Bantayan, Dumaguete', 'visayas'],
    ['Duma 3', 'Bagacay, Dumaguete', 'visayas'],
    ['Tagbilaran', 'Near ACE Medical Center, Tagbilaran, Bohol', 'visayas'],
    ['Dauis', 'Dauis, Bohol', 'visayas'],

    // ---- Mindanao — CDO / Bukidnon ----
    ['Nazareth', 'Nazareth, Cagayan de Oro', 'mindanao'],
    ['Cogon', 'Pres. Quirino–Hayee Sts., Brgy. 37, Cagayan de Oro', 'mindanao'],
    ['Patag', 'Brgy. Patag, Cagayan de Oro', 'mindanao'],
    ['Gusa', 'Brgy. Gusa, Cagayan de Oro', 'mindanao'],
    ['Canitoan', 'Zone 6, Calaanan, Canitoan, Cagayan de Oro', 'mindanao'],
    ['Calaanan', 'Canitoan, Cagayan de Oro City', 'mindanao'],
    ['BL Agusan', 'Agusan, Cagayan de Oro', 'mindanao'],
    ['Valencia', 'Poblacion, Valencia City', 'mindanao'],
    ['Malaybalay', 'Brgy. 2, Malaybalay City, Bukidnon', 'mindanao'],

    // ---- Mindanao — Davao / SOX ----
    ['Bacaca', 'Lenares Bldg., Garcia Heights, Bajada, Brgy. 19-B, Davao City', 'mindanao'],
    ['Catalunan', 'Catalunan Grande, Davao City', 'mindanao'],
    ['Buhangin', 'San Nicolas, Buhangin, Davao City', 'mindanao'],
    ['Tagum 1', 'Visayan Village, Tagum City', 'mindanao'],
    ['Tagum 2', 'Magugpo, Poblacion, Tagum City', 'mindanao'],
    ['Tagum 3', 'Pioneer Ave., Ferido Bldg., Tagum City', 'mindanao'],
    ['Gensan 1', 'Rivera St., Lagao, General Santos City', 'mindanao'],
    ['Gensan 2', 'Adarante St., General Santos City', 'mindanao'],
    ['Digos', 'Digos City, Davao del Sur', 'mindanao'],
    ['Kidapawan', 'Quezon Boulevard, Kidapawan', 'mindanao'],
    ['Toril', 'Crossing Bayabas, Toril, Davao City', 'mindanao'],
    ['Dipolog', 'Osmeña Street, beside Minute Burger, Dipolog', 'mindanao'],
    ['Dipolog (Miputak)', 'Miputak, Dipolog', 'mindanao'],
    ['Surigao City', 'Surigao City, Surigao del Norte', 'mindanao']
  ];

  /* ----------------------------------------------------------------------
     Branch contacts — one realistic sample number per branch.
     Seeded off the branch's own name + address, so every render (filter,
     search, resize) shows the exact number its tel: link dials. Landlines
     take the area code of the city they sit in and read (032) 123-4567;
     mobiles take a standard 09XX prefix and read 0921 123 4567. Roughly
     six in ten branches are landlines, the rest mobiles — a directory
     should look like a directory, not like one repeated placeholder.
     Swap the generator for the live per-branch numbers when they land.
     ---------------------------------------------------------------------- */
  const TEL_MOBILE_PREFIX = [
    '0905', '0906', '0908', '0916', '0917', '0919', '0921', '0922',
    '0926', '0927', '0929', '0932', '0939', '0947', '0955', '0977',
    '0995', '0996'
  ];

  /* area code looked up off the branch's own text — first match wins */
  const TEL_AREA_CODE = [
    [/tagum/, '084'],
    [/quezon city|antipolo|mandaluyong|sta\. rosa|bi[ñn]an/, '02'],
    [/iloilo|pavia/, '033'],
    [/bacolod|kabankalan|silay/, '034'],
    [/dumaguete/, '035'],
    [/bohol|tagbilaran|dauis/, '038'],
    [/tacloban|leyte/, '053'],
    [/dipolog/, '065'],
    [/kidapawan/, '064'],
    [/cagayan|valencia|malaybalay|bukidnon/, '088'],
    [/davao|digos/, '082'],
    [/general santos|gensan|surigao/, '086'],
    [/cebu|mandaue|talisay|lapu-lapu|minglanilla|toledo|danao|bogo|carcar|dalaguete|moalboal|balamban|liloan|naga|cordova/, '032']
  ];

  function telAreaCode(name, addr) {
    const hay = ((name || '') + ' ' + (addr || '')).toLowerCase();
    for (let i = 0; i < TEL_AREA_CODE.length; i++) {
      if (TEL_AREA_CODE[i][0].test(hay)) return TEL_AREA_CODE[i][1];
    }
    return '032';
  }

  /* FNV-1a + mulberry32: a tiny deterministic generator, so the numbers are
     random-looking but never actually random at runtime */
  function telSeed(str) {
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  function telRandom(seed) {
    let a = seed;
    return function () {
      a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function branchTel(entry) {
    const [name, addr] = entry;
    const rnd = telRandom(telSeed((name || '') + '|' + (addr || '')));
    /* len digits, first one pinned so no number opens on 0 or 1 */
    const digits = (len, first) => {
      let s = String(first);
      while (s.length < len) s += Math.floor(rnd() * 10);
      return s;
    };

    if (rnd() < 0.58) {
      const area = telAreaCode(name, addr);
      /* Metro Manila is the one 8-digit area code; everywhere else is 7 */
      const len = area === '02' ? 8 : 7;
      const start = 2 + Math.floor(rnd() * 7);
      const line = digits(len, area === '02' ? 8 : start);
      const cut = len - 4;
      return {
        display: '(' + area + ') ' + line.slice(0, cut) + '-' + line.slice(cut),
        dial: '+63' + area.slice(1) + line
      };
    }

    const prefix = TEL_MOBILE_PREFIX[Math.floor(rnd() * TEL_MOBILE_PREFIX.length)];
    const line = digits(7, 1 + Math.floor(rnd() * 9));
    return {
      display: prefix + ' ' + line.slice(0, 3) + ' ' + line.slice(3),
      dial: '+63' + prefix.slice(1) + line
    };
  }

  const BRANCH_TEL = new Map(BRANCHES.map((entry) => [entry, branchTel(entry)]));
  const telFor = (entry) => BRANCH_TEL.get(entry);


  // Approximate branch coordinates (city/barangay centroid) used by the map.
  const COORDS = {
    "P. Tuazon": [14.62835, 121.03166],
    "Antipolo": [14.58720, 121.17592],
    "Mandaluyong": [14.57458, 121.04788],
    "Sta. Rosa, Laguna": [14.31460, 121.11370],
    "Bi\u00f1an, Laguna": [14.34359, 121.06860],
    "Panagdait": [10.32560, 123.91649],
    "Escario": [10.31829, 123.89873],
    "Banawa": [10.30763, 123.87596],
    "Guadalupe": [10.29719, 123.88884],
    "Bulacao": [10.27373, 123.84941],
    "Urgello": [10.30485, 123.89308],
    "Katipunan": [10.29500, 123.87700],
    "Talamban 2": [10.36936, 123.91693],
    "Punta": [10.29845, 123.86976],
    "Minglanilla": [10.24603, 123.79606],
    "Pakigne": [10.25111, 123.80557],
    "Cortes": [10.33700, 123.93400],
    "Sugbo Merkado": [10.31250, 123.90700],
    "BL Cordova": [10.25219, 123.94947],
    "Gabi, Cordova": [10.26352, 123.96167],
    "Tisa, Labangon": [10.30032, 123.87405],
    "Atlantis": [10.41600, 123.96600],
    "Bogo 2": [11.05127, 124.00351],
    "Paknaan": [10.34622, 123.96021],
    "Naga": [10.20780, 123.75050],
    "Calawisan": [10.28383, 123.93821],
    "Moalboal": [9.94097, 123.38980],
    "Marigondon": [10.27442, 123.97608],
    "Carmen": [10.59421, 124.01702],
    "Danao 2": [10.51956, 124.02713],
    "Talamban 1": [10.36936, 123.91693],
    "Pardo": [10.27943, 123.85542],
    "Lahug": [10.33093, 123.89813],
    "Buanoy, Balamban": [10.46865, 123.70072],
    "Bogo 1": [11.05127, 124.00351],
    "Danao 1": [10.51956, 124.02713],
    "Carcar": [10.10556, 123.64067],
    "Banilad": [10.34652, 123.91111],
    "Casuntingan": [10.34530, 123.93054],
    "Dalaguete": [9.76248, 123.53154],
    "Dumlog": [10.24501, 123.83955],
    "Mohon": [10.24937, 123.82715],
    "Pajak": [10.29932, 123.97910],
    "Pusok": [10.32453, 123.97430],
    "Sangi": [10.35000, 123.63500],
    "Alta Tierra": [10.73000, 122.56000],
    "Pavia": [10.76936, 122.53370],
    "Baluarte (East)": [10.69210, 122.54935],
    "Baluarte (Molo)": [10.69704, 122.54407],
    "Lapuz": [10.70423, 122.57390],
    "Villa": [10.68761, 122.52161],
    "Lapaz": [10.69700, 122.56500],
    "Singko": [10.77300, 122.54800],
    "Tagbak": [10.74400, 122.57000],
    "Libertad": [10.61700, 122.96400],
    "Libertad Taculing": [10.64754, 122.96213],
    "Burgos": [10.65000, 122.97200],
    "Kabankalan": [9.99195, 122.81397],
    "Fortune Town": [10.65600, 122.96200],
    "Silay": [10.79941, 122.97561],
    "Caibaan": [11.20600, 124.99137],
    "San Jose": [11.20414, 125.02149],
    "VNG": [11.20740, 124.99871],
    "Nula Tula": [11.25032, 124.97409],
    "Campetic": [11.18223, 125.00256],
    "Apitong": [11.22595, 124.99084],
    "Real": [11.22562, 125.00156],
    "Sogod": [10.38459, 124.98080],
    "Duma 1": [9.33500, 123.30200],
    "Duma 2": [9.33500, 123.31200],
    "Duma 3": [9.29967, 123.29328],
    "Tagbilaran": [9.64026, 123.85598],
    "Dauis": [9.62525, 123.86517],
    "Nazareth": [8.46934, 124.64704],
    "Cogon": [8.47300, 124.64300],
    "Patag": [8.48812, 124.62716],
    "Gusa": [8.47477, 124.68514],
    "Canitoan": [8.46932, 124.60567],
    "Calaanan": [8.47212, 124.59346],
    "BL Agusan": [8.48870, 124.73794],
    "Valencia": [7.91112, 125.09337],
    "Malaybalay": [8.15885, 125.12517],
    "Bacaca": [7.07800, 125.60800],
    "Catalunan": [7.08016, 125.54379],
    "Buhangin": [7.11203, 125.61749],
    "Tagum 1": [7.43184, 125.80379],
    "Tagum 2": [7.44874, 125.80165],
    "Tagum 3": [7.44708, 125.80949],
    "Gensan 1": [6.12512, 125.19253],
    "Gensan 2": [6.11222, 125.17219],
    "Digos": [6.74410, 125.35553],
    "Kidapawan": [7.00822, 125.08958],
    "Toril": [7.02296, 125.49482],
    "Dipolog": [8.58636, 123.34488],
    "Dipolog (Miputak)": [8.58244, 123.33833],
    "Surigao City": [9.79050, 125.49357],
  };

  const REGION_LABEL = { luzon: 'Luzon', visayas: 'Visayas', mindanao: 'Mindanao' };
  const REGION_ORDER = ['visayas', 'luzon', 'mindanao'];

  /* ----------------------------------------------------------------------
     5b. Interactive map — Leaflet pins kept in lock-step with the list
     ---------------------------------------------------------------------- */
  function initMap() {
    const el = document.getElementById('branchMap');
    const wrap = document.getElementById('branchMapWrap');
    const hide = () => { if (wrap) wrap.hidden = true; };
    if (!el || typeof L === 'undefined') { hide(); return null; }

    let map;
    try {
      map = L.map(el, { scrollWheelZoom: false, zoomControl: true })
        .setView([10.55, 123.95], 7);
    } catch (err) {
      hide();
      return null;
    }

    const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    let tilesDown = false;
    tiles.on('tileerror', () => {
      if (tilesDown) return;
      tilesDown = true;
      document.body.classList.add('map-tiles-down');
    });

    document.body.classList.add('map-ready');

    const layer = L.layerGroup().addTo(map);
    const markers = new Map();
    let lastKey = '';

    function popupFor(entry) {
      const box = document.createElement('div');
      box.className = 'bl-popup';
      const name = document.createElement('strong');
      name.textContent = entry[0];
      const addr = document.createElement('span');
      addr.textContent = entry[1];
      const tel = document.createElement('a');
      tel.className = 'bl-popup-tel';
      const num = telFor(entry);
      tel.href = 'tel:' + num.dial;
      tel.textContent = num.display;
      const meta = document.createElement('em');
      meta.textContent = REGION_LABEL[entry[2]] + (entry[3] ? ' · ' + entry[3] : '');
      box.append(name, addr, tel, meta);
      return box;
    }

    function setVisible(list) {
      layer.clearLayers();
      markers.clear();

      const pts = [];
      list.forEach((entry) => {
        const ll = COORDS[entry[0]];
        if (!ll) return;
        const marker = L.marker(ll, {
          icon: L.divIcon({
            className: 'bl-pin',
            html: '<span class="bl-pin-core"></span>',
            iconSize: [18, 18],
            iconAnchor: [9, 9],
            popupAnchor: [0, -11]
          }),
          title: entry[0],
          alt: entry[0]
        });
        marker.bindPopup(popupFor(entry), { closeButton: false, className: 'bl-popup-shell' });
        marker.addTo(layer);
        markers.set(entry[0], marker);
        pts.push(ll);
      });

      const key = list.map((e) => e[0]).join('|');
      if (key === lastKey) return;
      lastKey = key;

      if (!pts.length) return;
      if (pts.length === 1) {
        map.setView(pts[0], 13, { animate: !reduced });
      } else {
        map.fitBounds(L.latLngBounds(pts), { padding: [28, 28], maxZoom: 11 });
      }
    }

    function focus(entry) {
      const ll = COORDS[entry[0]];
      const marker = markers.get(entry[0]);
      if (!ll) return;
      map.flyTo(ll, Math.max(map.getZoom(), 12), { duration: reduced ? 0 : 0.75 });
      if (marker) marker.openPopup();
    }

    window.setTimeout(() => map.invalidateSize(), 250);

    return { setVisible: setVisible, focus: focus };
  }

  function initLocator() {
    const wrap = document.getElementById('branchGroups');
    const countEl = document.getElementById('branchCount');
    const emptyEl = document.getElementById('branchEmpty');
    const searchEl = document.getElementById('branchSearch');
    const chips = Array.from(document.querySelectorAll('.locator-filters .chip'));
    if (!wrap) return;

    const mapApi = initMap();
    let region = 'all';
    let query = '';

    /* The filter is part of the view, so it lives in the URL: a refresh, a
       Back/Forward step or a pasted link lands on the same branch list. */
    function readState() {
      let params;
      try { params = new URLSearchParams(window.location.search); }
      catch (e) { return; }

      const want = (params.get('region') || '').toLowerCase();
      if (want && chips.some((c) => c.dataset.region === want)) region = want;

      const q = (params.get('q') || '').trim();
      if (q) {
        query = q.toLowerCase();
        if (searchEl) searchEl.value = q;
      }
    }

    function writeState() {
      try {
        const url = new URL(window.location.href);
        if (region === 'all') url.searchParams.delete('region');
        else url.searchParams.set('region', region);

        const q = searchEl ? searchEl.value.trim() : '';
        if (q) url.searchParams.set('q', q);
        else url.searchParams.delete('q');

        window.history.replaceState(null, '', url.pathname + url.search + url.hash);
      } catch (e) {
        /* file:// has no history API — the filter itself still works */
      }
    }

    function syncChips() {
      chips.forEach((c) => {
        const on = c.dataset.region === region;
        c.classList.toggle('is-active', on);
        c.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
    }

    // fill the filter counters once
    chips.forEach((chip) => {
      const key = chip.dataset.region;
      const n = key === 'all'
        ? BRANCHES.length
        : BRANCHES.filter((b) => b[2] === key).length;
      const slot = chip.querySelector('[data-count-for]');
      if (slot) slot.textContent = '(' + n + ')';
    });

    function matches(entry) {
      const [name, addr, reg] = entry;
      if (region !== 'all' && reg !== region) return false;
      if (query && !((name || '') + ' ' + (addr || '')).toLowerCase().includes(query)) return false;
      return true;
    }

    /* Bootstrap Icons, geo-alt-fill and phone, inlined: the home page ships
       no icon font, and these are the only two glyphs the cards need. Both
       sit on one 13px box. The handset silhouette (telephone / telephone-fill)
       collapses into an unreadable diagonal blob at card size — the phone
       outline keeps its shape, and it matches the pin's outline weight, so
       the two glyphs read as a single set */
    const ICON_PIN =
      '<svg viewBox="0 0 16 16" width="13" height="13" fill="currentColor" ' +
      'aria-hidden="true" focusable="false"><path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/></svg>';
    const ICON_TEL =
      '<svg viewBox="0 0 16 16" width="13" height="13" fill="currentColor" ' +
      'aria-hidden="true" focusable="false">' +
      '<path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>' +
      '<path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/></svg>';

    function render() {
      const visible = BRANCHES.filter(matches);
      wrap.innerHTML = '';
      if (mapApi) mapApi.setVisible(visible);

      if (!visible.length) {
        emptyEl.hidden = false;
        countEl.textContent = 'No branches found';
        return;
      }
      emptyEl.hidden = true;

      const groups = REGION_ORDER
        .map((reg) => [reg, visible.filter((b) => b[2] === reg)])
        .filter(([, list]) => list.length);

      groups.forEach(([reg, list]) => {
        const h = document.createElement('h3');
        h.className = 'branch-region';
        h.textContent = REGION_LABEL[reg] + ' · ' + list.length;
        wrap.appendChild(h);

        list.forEach((entry) => {
          const [name, addr] = entry;
          const branchName = (name || '').trim();
          const item = document.createElement('div');
          item.className = 'branch-item';

          /* strict content scope: branch name → address → contact number.
             No service badges, no status pills, nothing else */
          const card = document.createElement('button');
          card.type = 'button';
          card.className = 'branch-card';
          card.dataset.branch = String(BRANCHES.indexOf(entry));
          card.innerHTML =
            '<span class="branch-name"></span>' +
            '<span class="branch-addr">' + ICON_PIN +
              '<span class="branch-addr-text"></span></span>';

          const nameEl = card.querySelector('.branch-name');
          if (branchName) {
            nameEl.textContent = branchName;
          } else {
            /* empty name: a muted italic placeholder keeps every grid cell on
               the same rhythm instead of collapsing the first line */
            nameEl.classList.add('branch-name-placeholder');
            nameEl.textContent = 'Branch Location';
          }
          card.querySelector('.branch-addr-text').textContent = addr;

          /* the call link is a sibling of the card button, never a child — a
             <button> may not contain interactive content, and the click on it
             must not fly the map. It still renders inside the card box, right
             after the address, so the order reads name → address → number */
          const tel = document.createElement('a');
          const num = telFor(entry);
          tel.className = 'branch-tel';
          tel.href = 'tel:' + num.dial;
          tel.setAttribute(
            'aria-label',
            'Call ' + (branchName ? branchName + ' branch' : 'this branch') +
              ', ' + num.display
          );
          tel.innerHTML = ICON_TEL + '<span class="branch-tel-num"></span>';
          tel.querySelector('.branch-tel-num').textContent = num.display;

          /* "show on map" is a real link, so it cannot sit inside the card
             <button> either — it overlays the card box instead, anchored to
             the same corner. Built only when Leaflet came up, because there
             would be no map to scroll to otherwise. */
          item.append(card, tel);
          if (mapApi) {
            const cue = document.createElement('a');
            cue.className = 'branch-map-cue';
            cue.href = '#branchMapWrap';
            cue.textContent = 'show on map';
            cue.setAttribute(
              'aria-label',
              'Show ' + (branchName ? branchName + ' branch' : 'this branch') + ' on the map'
            );
            item.appendChild(cue);
          }
          wrap.appendChild(item);
        });
      });

      countEl.textContent =
        'Showing ' + visible.length + ' of ' + BRANCHES.length + ' branches';

      equalizeRows();
    }

    /* one batched read pass after a render, then a single write: every card
       lands on the same height, not just the cards in the same row. The
       previous value is dropped first so a filter can shrink the row again */
    function equalizeRows() {
      wrap.style.removeProperty('--branch-row-h');
      const items = wrap.querySelectorAll('.branch-item');
      if (!items.length) return;
      let tallest = 0;
      items.forEach((el) => {
        const h = el.offsetHeight;
        if (h > tallest) tallest = h;
      });
      if (tallest) wrap.style.setProperty('--branch-row-h', tallest + 'px');
    }

    let rowSyncTimer = 0;
    window.addEventListener('resize', () => {
      window.clearTimeout(rowSyncTimer);
      rowSyncTimer = window.setTimeout(equalizeRows, 150);
    }, { passive: true });

    wrap.addEventListener('click', (e) => {
      const cue = e.target.closest('.branch-map-cue');
      const item = e.target.closest('.branch-item');
      const card = item && item.querySelector('.branch-card');
      if (!card) return;

      /* the cue does both: bring the map into view, then fly to the branch */
      if (cue) {
        e.preventDefault();
        const mapWrap = document.getElementById('branchMapWrap');
        if (mapWrap && !mapWrap.hidden) {
          mapWrap.scrollIntoView({
            behavior: reduced ? 'auto' : 'smooth',
            block: 'start'
          });
        }
      }

      const entry = BRANCHES[Number(card.dataset.branch)];
      if (entry && mapApi) mapApi.focus(entry);
    });

    chips.forEach((chip) => {
      chip.addEventListener('click', () => {
        region = chip.dataset.region;
        syncChips();
        writeState();
        render();
      });
    });

    if (searchEl) {
      searchEl.addEventListener('input', () => {
        query = searchEl.value.trim().toLowerCase();
        writeState();
        render();
      });
    }

    readState();
    syncChips();
    render();
  }

  /* ----------------------------------------------------------------------
     6. Contact form — validation + visual CAPTCHA
     ---------------------------------------------------------------------- */
  const CAPTCHA_LEN = 4;
  const CAPTCHA_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

  function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const visual = document.getElementById('captchaVisual');
    const codeInput = document.getElementById('cfCaptcha');
    const refreshBtn = document.getElementById('captchaRefresh');
    const statusEl = document.getElementById('formStatus');
    const subjectEl = document.getElementById('cfSubject');
    let code = '';

    const FIELDS = {
      cfName: {
        test: (v) => v.length >= 2,
        msg: 'Please tell us your name.'
      },
      cfEmail: {
        test: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v),
        msg: 'Please enter a valid e-mail address.'
      },
      cfPhone: {
        test: (v) => /^[+()\d\s-]{7,20}$/.test(v),
        msg: 'Please enter a valid phone number — digits, spaces and + only.'
      },
      cfMessage: {
        test: (v) => v.length >= 5,
        msg: 'A few more words, please — what do you need?'
      },
      cfCaptcha: {
        test: (v) => v.toUpperCase() === code,
        msg: 'That code does not match. Try the new one.'
      }
    };

    function drawCaptcha() {
      const W = 178, H = 66;
      let out = '';
      for (let i = 0; i < CAPTCHA_LEN; i++) {
        out += CAPTCHA_ALPHABET[Math.floor(Math.random() * CAPTCHA_ALPHABET.length)];
      }
      code = out;

      const palette = ['#3A2312', '#D48C28', '#3E6B34', '#8C9E5B', '#B87418'];
      let lines = '';
      for (let i = 0; i < 4; i++) {
        lines += '<path d="M0 ' + (Math.random() * H).toFixed(1) +
          ' Q ' + (W / 2) + ' ' + (Math.random() * H).toFixed(1) +
          ' ' + W + ' ' + (Math.random() * H).toFixed(1) +
          '" fill="none" stroke="rgba(62,107,52,.32)" stroke-width="1.4"/>';
      }

      let chars = '';
      for (let i = 0; i < code.length; i++) {
        const x = 27 + i * 39 + (Math.random() * 7 - 3.5);
        const y = 45 + (Math.random() * 9 - 4.5);
        const rot = (Math.random() * 30 - 15).toFixed(1);
        const size = (30 + Math.random() * 7).toFixed(1);
        const fill = palette[Math.floor(Math.random() * palette.length)];
        chars += '<text x="' + x.toFixed(1) + '" y="' + y.toFixed(1) +
          '" transform="rotate(' + rot + ' ' + x.toFixed(1) + ' ' + y.toFixed(1) + ')"' +
          ' font-family="Fraunces, Georgia, serif" font-size="' + size + '"' +
          ' font-weight="700" fill="' + fill + '" text-anchor="middle">' + code[i] + '</text>';
      }

      if (visual) {
        visual.innerHTML = '<svg viewBox="0 0 ' + W + ' ' + H + '" xmlns="http://www.w3.org/2000/svg" ' +
          'preserveAspectRatio="xMidYMid meet" aria-hidden="true">' + lines + chars + '</svg>';
      }
      if (codeInput) codeInput.value = '';
      setError(codeInput, '');
    }

    function setError(input, message) {
      if (!input) return;
      const err = document.getElementById(input.id + 'Err');
      input.classList.toggle('is-invalid', Boolean(message));
      input.setAttribute('aria-invalid', message ? 'true' : 'false');
      if (err) err.textContent = message;
    }

    function validateField(input) {
      const rule = FIELDS[input.id];
      if (!rule) return true;
      const value = input.value.trim();
      if (rule.optional && !value) { setError(input, ''); return true; }
      const ok = rule.test(value);
      setError(input, ok ? '' : rule.msg);
      return ok;
    }

    function showStatus(kind, html) {
      if (!statusEl) return;
      statusEl.className = 'form-status is-shown is-' + kind;
      statusEl.innerHTML = html;
    }

    Object.keys(FIELDS).forEach((id) => {
      const input = document.getElementById(id);
      if (!input) return;
      input.addEventListener('blur', () => validateField(input));
      input.addEventListener('input', () => {
        if (input.classList.contains('is-invalid')) validateField(input);
      });
    });

    if (refreshBtn) refreshBtn.addEventListener('click', drawCaptcha);

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      let firstBad = null;
      Object.keys(FIELDS).forEach((id) => {
        const input = document.getElementById(id);
        if (input && !validateField(input) && !firstBad) firstBad = input;
      });

      if (firstBad) {
        showStatus('error', 'Please fix the highlighted fields and try again.');
        firstBad.focus();
        return;
      }

      const name = document.getElementById('cfName').value.trim();
      const email = document.getElementById('cfEmail').value.trim();
      const phone = document.getElementById('cfPhone').value.trim();
      const subjectText = subjectEl
        ? subjectEl.options[subjectEl.selectedIndex].text
        : 'General Inquiries';
      const message = document.getElementById('cfMessage').value.trim();

      const body = [
        'Name: ' + name,
        'E-mail: ' + email,
        'Phone: ' + (phone || '—'),
        '',
        message
      ].join('\n');

      const mailto = 'mailto:balamban.liemponline@gmail.com' +
        '?subject=' + encodeURIComponent('[' + subjectText + '] Message from ' + name) +
        '&body=' + encodeURIComponent(body);

      showStatus(
        'success',
        'Salamat, ' + name.replace(/[<>&]/g, '') + '! Your message passed the check — ' +
        '<a href="' + mailto + '">send it now from your e-mail app</a>, ' +
        'or call <a href="tel:+639165146144">0916 514 6144</a>.'
      );
    });

    // franchise CTAs: pick the subject, then jump straight into the form
    // instead of opening the visitor's mail client
    document.querySelectorAll('a[data-subject]').forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        if (subjectEl) subjectEl.value = link.dataset.subject;
        form.scrollIntoView({
          behavior: reduced ? 'auto' : 'smooth',
          block: 'start'
        });
        form.focus({ preventScroll: true });
      });
    });

    drawCaptcha();
  }

  /* ----------------------------------------------------------------------
     7. Misc
     ---------------------------------------------------------------------- */
  function initYear() {
    const el = document.getElementById('year');
    if (el) el.textContent = String(new Date().getFullYear());
  }

  function boot() {
    buildBanderitas();
    initEmbers();
    initReveal();
    initNav();
    initAboutDropdown();
    initHerbs();
    initLocator();
    initContactForm();
    initYear();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
