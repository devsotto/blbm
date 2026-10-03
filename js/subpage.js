/* ==========================================================================
   Balamban Liempo — sub-page behaviour (delivery.html / whatsnew.html)
   Vanilla ES6. Bootstrap's bundle must be loaded before this file.
   ========================================================================== */

/* honour reduced motion: never auto-rotate the featured carousel */
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('[data-bs-ride]').forEach((el) => el.removeAttribute('data-bs-ride'));
}

/* ---------- featured carousel pause / play ----------
   Auto-rotation runs alongside the feed, so it carries a visible control to
   stop it. The guard above strips data-bs-ride under reduced motion, which
   means that state starts paused — the visitor can still opt in. */
const featuredCarousel = document.getElementById('featuredNews');
const featuredToggle = document.getElementById('carouselToggle');

if (featuredCarousel && featuredToggle && typeof bootstrap !== 'undefined' && bootstrap.Carousel) {
  const carousel = bootstrap.Carousel.getOrCreateInstance(featuredCarousel);
  let playing = featuredCarousel.hasAttribute('data-bs-ride');

  const sync = () => {
    featuredToggle.dataset.state = playing ? 'playing' : 'paused';
    featuredToggle.setAttribute(
      'aria-label',
      playing ? 'Pause the featured updates' : 'Play the featured updates'
    );
  };

  featuredToggle.addEventListener('click', () => {
    playing = !playing;
    if (playing) carousel.cycle();
    else carousel.pause();
    sync();
  });

  if (!playing) carousel.pause();
  sync();
}

/* ---------- news feed filter (Bootstrap nav-pills) ----------
   The category is part of the view, so it lives in the URL: a refresh, a
   Back/Forward step or a pasted link lands on the same set of cards. Each
   pill also carries aria-pressed — selected is a state, not a colour. */
const filterButtons = document.querySelectorAll('[data-filter]');
if (filterButtons.length) {
  const apply = (category) => {
    filterButtons.forEach((btn) => {
      const on = btn.dataset.filter === category;
      btn.classList.toggle('active', on);
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    document.querySelectorAll('#newsGrid > [data-cat]').forEach((col) => {
      col.classList.toggle('d-none', category !== 'all' && col.dataset.cat !== category);
    });
  };

  const writeState = (category) => {
    try {
      const url = new URL(window.location.href);
      if (category === 'all') url.searchParams.delete('cat');
      else url.searchParams.set('cat', category);
      window.history.replaceState(null, '', url.pathname + url.search + url.hash);
    } catch (e) {
      /* file:// has no history API — the filter itself still works */
    }
  };

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      apply(btn.dataset.filter);
      writeState(btn.dataset.filter);
    });
  });

  let initial = 'all';
  try {
    const wanted = (new URLSearchParams(window.location.search).get('cat') || '').toLowerCase();
    if (wanted && Array.prototype.some.call(filterButtons, (b) => b.dataset.filter === wanted)) {
      initial = wanted;
    }
  } catch (e) { /* file:// */ }
  apply(initial);
}

/* ---------- shared detail modal (Bootstrap modal) --------------------------
   Every .news-card is a full-card trigger: Bootstrap's data-api opens the
   dialog on click, this handler supplies it with the card's payload
   (badge, thumbnail, title, date, teaser) and wires the keyboard path
   that data-api does not cover for role="button" containers.            */
const newsModal = document.getElementById('newsDetailModal');

if (newsModal) {
  const modalTitle = document.getElementById('newsDetailModalTitle');
  const modalDate = document.getElementById('newsDetailModalDate');
  const modalBadge = document.getElementById('newsDetailModalBadge');
  const modalMedia = document.getElementById('newsDetailModalMedia');
  const modalBody = document.getElementById('newsDetailModalBody');
  const newsCards = document.querySelectorAll('#newsGrid .news-card');
  let activeCard = null;

  const empty = (el) => {
    while (el.firstChild) el.removeChild(el.firstChild);
  };

  /* give every card an accessible name — the button role makes its
     contents presentational, so the label has to carry the headline */
  newsCards.forEach((card) => {
    const title = card.querySelector('.card-title');
    if (title && !card.hasAttribute('aria-label')) {
      card.setAttribute('aria-label', 'Read the story: ' + title.textContent.trim());
    }
  });

  function populate(card) {
    const title = card.querySelector('.card-title');
    const teaser = card.querySelector('.card-text');
    const date = card.querySelector('.news-card-date');
    const badge = card.querySelector('.badge-soft');
    const media = card.querySelector('.card-img-top');

    modalTitle.textContent = title ? title.textContent.trim() : '';
    modalBody.textContent = teaser ? teaser.textContent.trim() : '';

    empty(modalBadge);
    if (badge) {
      const variant = Array.from(badge.classList)
        .filter((name) => name.indexOf('badge-soft-') === 0)[0] || '';
      const clone = document.createElement('span');
      clone.className = 'badge badge-soft' + (variant ? ' ' + variant : '');
      clone.textContent = badge.textContent;
      modalBadge.appendChild(clone);
      modalBadge.hidden = false;
    } else {
      modalBadge.hidden = true;
    }

    empty(modalDate);
    if (date) {
      modalDate.textContent = date.textContent.trim();
      if (date.dateTime) modalDate.dateTime = date.dateTime;
      modalDate.hidden = false;
    } else {
      modalDate.hidden = true;
    }

    empty(modalMedia);
    if (media) {
      modalMedia.appendChild(media.cloneNode(true));
      modalMedia.hidden = false;
    } else {
      modalMedia.hidden = true;
    }
  }

  function open(card) {
    activeCard = card;
    if (typeof bootstrap !== 'undefined' && bootstrap.Modal) {
      bootstrap.Modal.getOrCreateInstance(newsModal).show();
    }
  }

  /* a link inside a story (e.g. the catering number) keeps its own job: catch
     the click at the top of the capture pass, before the data-api can see it */
  window.addEventListener('click', (event) => {
    if (event.target.closest && event.target.closest('.news-card a')) {
      event.stopPropagation();
    }
  }, true);

  newsCards.forEach((card) => {
    card.addEventListener('click', () => {
      activeCard = card;
    });

    card.addEventListener('keydown', (event) => {
      if (event.target !== card || event.repeat) return;
      if (event.key !== 'Enter' && event.key !== ' ' && event.key !== 'Spacebar') return;
      event.preventDefault();
      open(card);
    });
  });

  /* Bootstrap's data-api delegates from the document in the capture phase, so
     the dialog opens *before* this card's own click handler has run and the
     click-ordered `activeCard` fallback is still empty. The data-api passes
     the trigger through, so take the card straight off the event — and keep
     `activeCard` for the keyboard path, which opens the dialog itself. */
  newsModal.addEventListener('show.bs.modal', (event) => {
    const trigger = event.relatedTarget;
    const card = trigger && trigger.closest ? trigger.closest('.news-card') : null;
    if (card) activeCard = card;
    if (activeCard) populate(activeCard);
  });
}

/* ---------- share chips (Facebook / Instagram / Pinterest) ----------------
   The anchors ship with a static fallback href for no-JS readers; on load
   they are rebuilt from the live address so they share the page the reader
   is actually on. Instagram exposes no web share endpoint, so its chip
   copies the link to the clipboard instead and says so.                */
const shareLinks = document.querySelectorAll('[data-share]');

if (shareLinks.length) {
  const shareUrl = encodeURIComponent(window.location.href);
  const shareTitle = encodeURIComponent(document.title);
  const toast = document.getElementById('newsShareToast');
  let toastTimer = 0;

  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.hidden = false;
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => { toast.hidden = true; }, 2400);
  };

  shareLinks.forEach((link) => {
    const kind = link.dataset.share;

    if (kind === 'facebook') {
      link.href = 'https://www.facebook.com/sharer/sharer.php?u=' + shareUrl;
      return;
    }

    if (kind === 'pinterest') {
      link.href = 'https://www.pinterest.com/pin/create/button/?url=' +
                  shareUrl + '&description=' + shareTitle;
      return;
    }

    if (kind === 'instagram') {
      link.addEventListener('click', () => {
        if (!navigator.clipboard || !navigator.clipboard.writeText) {
          showToast('Copy the page address');
          return;
        }
        navigator.clipboard.writeText(window.location.href)
          .then(() => showToast('Link copied'))
          .catch(() => showToast('Copy the page address'));
      });
    }
  });
}
