/* ==========================================================================
   Balamban Liempo — sub-page behaviour (delivery.html / whatsnew.html)
   Vanilla ES6. Bootstrap's bundle must be loaded before this file.
   ========================================================================== */

/* honour reduced motion: never auto-rotate the featured carousel */
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('[data-bs-ride]').forEach((el) => el.removeAttribute('data-bs-ride'));
}

/* ---------- news feed filter (Bootstrap nav-pills) ---------- */
const filterButtons = document.querySelectorAll('[data-filter]');
if (filterButtons.length) {
  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const category = btn.dataset.filter;
      filterButtons.forEach((b) => b.classList.toggle('active', b === btn));
      document.querySelectorAll('#newsGrid > [data-cat]').forEach((col) => {
        col.classList.toggle('d-none', category !== 'all' && col.dataset.cat !== category);
      });
    });
  });
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

  newsCards.forEach((card) => {
    card.addEventListener('click', (event) => {
      /* links inside a story (e.g. the catering number) keep their own
         job — swallow the bubble so the data-api does not open the dialog */
      if (event.target.closest('a')) {
        event.stopPropagation();
        return;
      }
      activeCard = card;
    });

    card.addEventListener('keydown', (event) => {
      if (event.target !== card || event.repeat) return;
      if (event.key !== 'Enter' && event.key !== ' ' && event.key !== 'Spacebar') return;
      event.preventDefault();
      open(card);
    });
  });

  newsModal.addEventListener('show.bs.modal', () => {
    if (activeCard) populate(activeCard);
  });
}
