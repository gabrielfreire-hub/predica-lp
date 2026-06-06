/* ===================================================================
   PROYECTO PREDICA — Landing V2 — interactions (minimal)
   =================================================================== */

(function(){
  'use strict';

  // ---------- MOBILE NAV ----------
  const nav = document.getElementById('nav');
  const burger = document.getElementById('navBurger');
  if (burger) {
    burger.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
  document.querySelectorAll('.nav__links a').forEach(a => {
    a.addEventListener('click', () => {
      if (nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // ---------- ACTIVE LINK (scrollspy) ----------
  const ids = ['top','curso','audiencia','comunidad','testimonios','sumate','contacto'];
  const sections = ids.map(id => document.getElementById(id)).filter(Boolean);
  const navLinks = document.querySelectorAll('.nav__links a');
  const spy = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const id = '#' + e.target.id;
        navLinks.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === id));
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
  sections.forEach(s => spy.observe(s));

  // ---------- REVEAL ON SCROLL ----------
  const targets = document.querySelectorAll(
    '.hero, .manifiesto__grid, .featured__grid, .review__grid, .course-card, .testi, .subscribe__grid, .footer__inner, .roadmap .cards, .audience .cards'
  );
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in-view'); });
  }, { threshold: 0.08 });
  targets.forEach(el => io.observe(el));

  // ---------- SMOOTH ANCHOR (offset for fixed nav) ----------
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const top = target.getBoundingClientRect().top + window.scrollY - 70;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    });
  });

  // ---------- ESC closes mobile menu ----------
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      nav.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
    }
  });

  // ---------- HERO TYPING (5s digita, 5s parado, apaga) + BAR (100s loop independente) ----------
  const heroText = document.getElementById('heroType');
  const heroBar = document.getElementById('heroBar');
  const heroPointer = document.getElementById('heroPointer');
  if (heroText && heroBar && heroPointer) {
    const fullText = heroText.getAttribute('data-text') || heroText.textContent;
    const TYPE_MS = 5000;
    const HOLD_MS = 5000;
    const ERASE_MS = 5000;
    const charDelay = TYPE_MS / fullText.length;
    const eraseDelay = ERASE_MS / fullText.length;
    const BAR_MS = 100000;
    const bar = heroBar.querySelector('span');

    // barra: 0% -> 100% em 100s, em loop (independente do texto)
    let barStart = null;
    function barLoop(ts){
      if (barStart === null) barStart = ts;
      const elapsed = (ts - barStart) % BAR_MS;
      bar.style.width = ((elapsed / BAR_MS) * 100) + '%';
      requestAnimationFrame(barLoop);
    }
    requestAnimationFrame(barLoop);

    function positionPointer(){
      const page = heroText.parentElement;
      const pRect = page.getBoundingClientRect();
      const screen = heroText.closest('.hero__media-screen');
      const sRect = screen.getBoundingClientRect();

      const range = document.createRange();
      const node = heroText.firstChild;
      const len = heroText.textContent.length;
      if (!node) return;
      try {
        range.setStart(node, Math.max(0, len));
        range.setEnd(node, Math.max(0, len));
        const rect = range.getBoundingClientRect();
        const x = (rect.right || pRect.right) - sRect.left + 6;
        const y = (rect.top || pRect.top) - sRect.top;
        heroPointer.style.left = x + 'px';
        heroPointer.style.top = y + 'px';
        heroPointer.style.transform = 'translate(0,0)';
      } catch(e) {}
    }

    function typeStep(i){
      heroText.textContent = fullText.slice(0, i);
      positionPointer();
      if (i < fullText.length) {
        setTimeout(() => typeStep(i + 1), charDelay);
      } else {
        setTimeout(eraseStep, HOLD_MS);
      }
    }
    function eraseStep(){
      let i = fullText.length;
      function next(){
        heroText.textContent = fullText.slice(0, i);
        positionPointer();
        if (i > 0) {
          i--;
          setTimeout(next, eraseDelay);
        } else {
          setTimeout(() => typeStep(0), 400);
        }
      }
      next();
    }

    heroText.textContent = '';
    typeStep(0);
    window.addEventListener('resize', positionPointer);
  }

})();
