(() => {
  'use strict';

  const menuBtn = document.querySelector('.menu-btn');
  const nav = document.getElementById('nav');

  const setMenu = (open) => {
    nav.classList.toggle('is-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
  };

  menuBtn.addEventListener('click', () => setMenu(!nav.classList.contains('is-open')));

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenu(false));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && nav.classList.contains('is-open')) {
      setMenu(false);
      menuBtn.focus();
    }
  });

  const mq = window.matchMedia('(min-width: 760px)');
  const handleMq = (event) => {
    if (event.matches) setMenu(false);
  };
  if (mq.addEventListener) {
    mq.addEventListener('change', handleMq);
  } else {
    mq.addListener(handleMq);
  }

  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
