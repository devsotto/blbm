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

/* ---------- shared detail modal (Bootstrap modal) ---------- */
const newsModal = document.getElementById('newsDetail');
if (newsModal) {
  const modalTitle = document.getElementById('newsDetailTitle');
  const modalBody = document.getElementById('newsDetailBody');

  document.querySelectorAll('[data-news]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const card = trigger.closest('.card');
      if (!card) return;
      const title = card.querySelector('.card-title');
      const text = card.querySelector('.card-text');
      modalTitle.textContent = title ? title.textContent : '';
      modalBody.textContent = text ? text.textContent : '';
    });
  });
}
