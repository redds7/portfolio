(() => {
  'use strict';

  const menuBtn = document.querySelector('.menu-btn');
  const nav = document.getElementById('nav');
  const setMenu = (open) => {
    nav.classList.toggle('is-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.textContent = open ? 'Закрыть' : 'Меню сайта';
  };
  menuBtn.addEventListener('click', () => setMenu(!nav.classList.contains('is-open')));
  nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) { setMenu(false); menuBtn.focus(); }
  });
  window.matchMedia('(min-width: 760px)').addEventListener('change', (e) => { if (e.matches) setMenu(false); });

  const box = document.getElementById('lightbox');
  const boxImg = document.getElementById('lightbox-img');
  const boxCap = document.getElementById('lightbox-cap');
  document.querySelectorAll('.gallery button').forEach((btn) => {
    btn.addEventListener('click', () => {
      boxImg.src = btn.dataset.src;
      boxImg.alt = btn.dataset.alt;
      boxCap.textContent = btn.dataset.alt;
      box.showModal();
    });
  });
  document.getElementById('lightbox-close').addEventListener('click', () => box.close());
  box.addEventListener('click', (e) => { if (e.target === box) box.close(); });

  document.getElementById('year').textContent = new Date().getFullYear();
})();
