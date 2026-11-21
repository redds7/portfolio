(() => {
  'use strict';

  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.getElementById('site-nav');

  const setMenu = (open) => {
    nav.classList.toggle('is-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
    menuButton.textContent = open ? 'Закрыть' : 'Меню';
  };

  menuButton.addEventListener('click', () => setMenu(!nav.classList.contains('is-open')));
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && nav.classList.contains('is-open')) {
      setMenu(false);
      menuButton.focus();
    }
  });

  const wideScreen = window.matchMedia('(min-width: 761px)');
  const closeMenuOnWide = (event) => {
    if (event.matches) setMenu(false);
  };
  if (wideScreen.addEventListener) {
    wideScreen.addEventListener('change', closeMenuOnWide);
  } else {
    wideScreen.addListener(closeMenuOnWide);
  }

  const filters = Array.from(document.querySelectorAll('.filter'));
  const cards = Array.from(document.querySelectorAll('.card'));
  const status = document.getElementById('gallery-status');
  const categoryNames = {
    all: 'все работы',
    portraits: 'портреты',
    weddings: 'свадьбы',
    city: 'город'
  };

  filters.forEach((button) => {
    button.addEventListener('click', () => {
      const value = button.dataset.filter;
      filters.forEach((item) => {
        const active = item === button;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-pressed', String(active));
      });

      let visibleCount = 0;
      cards.forEach((card) => {
        const visible = value === 'all' || card.dataset.category === value;
        card.hidden = !visible;
        if (visible) visibleCount += 1;
      });
      status.textContent = 'Показано кадров: ' + visibleCount + '. Категория: ' + categoryNames[value] + '.';
    });
  });

  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');
  let lastTrigger = null;

  document.querySelectorAll('.card__open').forEach((button) => {
    button.addEventListener('click', () => {
      lastTrigger = button;
      lightboxImage.src = button.dataset.src;
      lightboxImage.alt = button.dataset.alt;
      lightboxCaption.textContent = button.dataset.caption;
      lightbox.showModal();
      document.body.classList.add('is-locked');
      lightboxClose.focus();
    });
  });

  const closeLightbox = () => {
    if (lightbox.open) lightbox.close();
  };

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  lightbox.addEventListener('close', () => {
    document.body.classList.remove('is-locked');
    if (lastTrigger && !lastTrigger.closest('[hidden]')) lastTrigger.focus();
  });

  document.getElementById('year').textContent = String(new Date().getFullYear());
})();
