/* ==========================================================================
   Balamban Liempo — product detail pages
   Bootstrap lightbox (modal) wiring for .gallery-lightbox-section.
   Vanilla ES6, no dependencies; Bootstrap's bundle must load first.
   ========================================================================== */

(() => {
  const modalEl = document.getElementById('productLightbox');
  if (!modalEl) return;

  const img = document.getElementById('lightboxImg');
  const counter = document.getElementById('lightboxCounter');
  const thumbs = Array.from(document.querySelectorAll('.gallery-thumb'));
  if (!img || !thumbs.length) return;

  let index = 0;

  const show = (next) => {
    index = (next + thumbs.length) % thumbs.length;
    const thumb = thumbs[index];
    img.src = thumb.dataset.img;
    img.alt = thumb.dataset.alt || '';
    /* Carry the slide's own dimensions over: the aspect box is reserved
       before the file arrives, so the dialog does not reflow underneath. */
    const thumbImg = thumb.querySelector('img');
    const w = thumbImg && thumbImg.getAttribute('width');
    const h = thumbImg && thumbImg.getAttribute('height');
    if (w && h) {
      img.setAttribute('width', w);
      img.setAttribute('height', h);
    }
    if (counter) counter.textContent = `${index + 1} / ${thumbs.length}`;
  };

  thumbs.forEach((thumb, i) => thumb.addEventListener('click', () => show(i)));

  document.getElementById('lightboxPrev')
    ?.addEventListener('click', () => show(index - 1));
  document.getElementById('lightboxNext')
    ?.addEventListener('click', () => show(index + 1));

  modalEl.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') show(index - 1);
    if (e.key === 'ArrowRight') show(index + 1);
  });
})();
