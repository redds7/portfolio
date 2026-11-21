(() => {
  'use strict';

  const menuBtn = document.querySelector('.menu-btn');
  const nav = document.getElementById('nav');
  const navLinks = [...nav.querySelectorAll('a')];

  const setMenu = (open) => {
    nav.classList.toggle('is-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.textContent = open ? 'Закрыть' : 'Меню';
  };
  menuBtn.addEventListener('click', () => setMenu(!nav.classList.contains('is-open')));
  navLinks.forEach((link) => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      setMenu(false);
      menuBtn.focus();
    }
  });
  window.matchMedia('(min-width: 720px)').addEventListener('change', (e) => {
    if (e.matches) setMenu(false);
  });

  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          const active = link.getAttribute('href') === '#' + entry.target.id;
          link.classList.toggle('is-active', active);
          if (active) link.setAttribute('aria-current', 'true');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach((section) => observer.observe(section));
  }

  const copyBtn = document.getElementById('copy');
  const status = document.getElementById('copy-status');
  const defaultHint = status.textContent;
  let timer;

  const announce = (text) => {
    status.textContent = text;
    clearTimeout(timer);
    timer = setTimeout(() => { status.textContent = defaultHint; }, 3000);
  };

  copyBtn.addEventListener('click', async () => {
    const value = copyBtn.dataset.copy;
    try {
      await navigator.clipboard.writeText(value);
      announce('Адрес скопирован: ' + value);
    } catch {
      announce('Не удалось скопировать. Выделите адрес и скопируйте вручную.');
    }
  });

  const demo = document.getElementById('demo');
  const demoFrame = document.getElementById('demo-frame');
  const demoTitle = document.getElementById('demo-title');
  const demoExternal = document.getElementById('demo-external');
  document.querySelectorAll('[data-demo]').forEach((btn) => {
    btn.addEventListener('click', () => {
      demoFrame.src = btn.dataset.demo;
      demoFrame.title = 'Сайт: ' + btn.dataset.title;
      demoTitle.textContent = btn.dataset.title;
      demoExternal.href = btn.dataset.demo;
      demo.showModal();
    });
  });
  document.getElementById('demo-close').addEventListener('click', () => demo.close());
  demo.addEventListener('click', (e) => { if (e.target === demo) demo.close(); });

  document.getElementById('year').textContent = new Date().getFullYear();
})();
