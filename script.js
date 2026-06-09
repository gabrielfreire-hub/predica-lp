/* ===================================================================
   PROYECTO PREDICA - Landing V3 - interactions
   =================================================================== */

(function () {
  'use strict';

  document.documentElement.classList.add('js');

  var nav = document.getElementById('nav');
  var burger = document.getElementById('navBurger');

  // ---------- MOBILE NAV ----------
  function closeNav() {
    if (!nav) return;
    nav.classList.remove('is-open');
    if (burger) burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  function openNav() {
    if (!nav) return;
    nav.classList.add('is-open');
    if (burger) burger.setAttribute('aria-expanded', 'true');
  }

  if (burger && nav) {
    burger.addEventListener('click', function () {
      if (nav.classList.contains('is-open')) {
        closeNav();
      } else {
        openNav();
      }
    });
  }

  document.querySelectorAll('.nav__links a').forEach(function (a) {
    a.addEventListener('click', closeNav);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav && nav.classList.contains('is-open')) {
      closeNav();
    }
  });

  var mqDesktop = window.matchMedia('(min-width: 961px)');
  function handleMq() {
    if (mqDesktop.matches) closeNav();
  }
  if (mqDesktop.addEventListener) mqDesktop.addEventListener('change', handleMq);
  else if (mqDesktop.addListener) mqDesktop.addListener(handleMq);

  // ---------- ACTIVE LINK (scrollspy) ----------
  var ids = ['top', 'manifiesto', 'metodo', 'curso', 'sumate', 'contacto'];
  var sections = ids
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);
  var navLinks = document.querySelectorAll('.nav__links a');

  if ('IntersectionObserver' in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          var id = '#' + e.target.id;
          navLinks.forEach(function (a) {
            a.classList.toggle('is-active', a.getAttribute('href') === id);
          });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sections.forEach(function (s) { spy.observe(s); });
  }

  // ---------- REVEAL ON SCROLL ----------
  var revealTargets = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealTargets.length) {
    var io = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in-view');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    revealTargets.forEach(function (el) { io.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add('in-view'); });
  }

  // ---------- SMOOTH ANCHOR (offset for fixed nav) ----------
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var href = a.getAttribute('href');
      if (!href || href.length <= 1) return;
      var target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      var navEl = document.getElementById('nav');
      var offset = navEl ? navEl.offsetHeight : 64;
      var top = target.getBoundingClientRect().top + window.pageYOffset - offset - 8;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  // ---------- PARALLAX ----------
  var parallaxEls = document.querySelectorAll('[data-parallax]');
  var heroBg = document.querySelector('[data-parallax-hero] .hero__bg');
  if (parallaxEls.length || heroBg) {
    var parallaxRaf = null;
    function updateParallax() {
      var scrollY = window.pageYOffset || document.documentElement.scrollTop;

      // manifesto & audience parallax
      parallaxEls.forEach(function (el) {
        var section = el.closest('section') || el.parentElement;
        if (!section) return;
        var sectionTop = section.offsetTop;
        var sectionH = section.offsetHeight;
        var vh = window.innerHeight;
        var relativeScroll = scrollY - sectionTop + vh;
        var total = sectionH + vh;
        if (relativeScroll < 0 || relativeScroll > total) return;
        var progress = relativeScroll / total;
        var offset = (progress - 0.5) * 500;
        el.style.transform = 'translateY(calc(-50% + ' + offset + 'px))';
      });

      // hero background parallax
      if (heroBg) {
        var heroH = heroBg.parentElement.offsetHeight;
        if (scrollY <= heroH + 200) {
          var heroOffset = scrollY * 0.4;
          heroBg.style.transform = 'scale(1.15) translateY(' + heroOffset + 'px)';
        }
      }
    }
    window.addEventListener('scroll', function () {
      if (parallaxRaf) cancelAnimationFrame(parallaxRaf);
      parallaxRaf = requestAnimationFrame(updateParallax);
    }, { passive: true });
    updateParallax();
  }

})();
