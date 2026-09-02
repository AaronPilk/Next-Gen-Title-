/* =========================================================================
   Valiant Title — interactions
   Mobile menu · scroll reveal · sticky nav state · floating-card tilt · year
   ========================================================================= */
(function () {
  "use strict";

  /* ---- Mobile menu ---- */
  (function () {
    var btn = document.querySelector('[data-nav-toggle]');
    var menu = document.querySelector('[data-menu]');
    var close = document.querySelector('[data-menu-close]');
    if (!btn || !menu) return;
    if (menu.parentElement !== document.body) document.body.appendChild(menu);
    function open() { menu.dataset.open = 'true'; btn.setAttribute('aria-expanded', 'true'); document.body.style.overflow = 'hidden'; }
    function shut() { menu.dataset.open = 'false'; btn.setAttribute('aria-expanded', 'false'); document.body.style.overflow = ''; }
    btn.addEventListener('click', open);
    if (close) close.addEventListener('click', shut);
    menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', shut); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') shut(); });
    var mq = window.matchMedia('(min-width: 980px)');
    (mq.addEventListener ? mq.addEventListener.bind(mq, 'change') : mq.addListener.bind(mq))(function (e) { if (e.matches) shut(); });
  })();

  /* ---- Sticky nav state ---- */
  (function () {
    var header = document.querySelector('.site-header');
    if (!header) return;
    var t = false;
    function up() { header.classList.toggle('is-scrolled', window.scrollY > 8); t = false; }
    window.addEventListener('scroll', function () { if (!t) { requestAnimationFrame(up); t = true; } }, { passive: true });
    up();
  })();

  /* ---- Scroll reveal ---- */
  (function () {
    var els = [].slice.call(document.querySelectorAll('[data-reveal]'));
    if (!els.length) return;
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) { els.forEach(function (el) { el.classList.add('in'); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
  })();

  /* ---- Floating-card 3D tilt on pointer ---- */
  (function () {
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var fine = window.matchMedia && window.matchMedia('(pointer: fine)').matches;
    if (reduce || !fine) return;
    var cards = [].slice.call(document.querySelectorAll('[data-tilt]'));
    cards.forEach(function (card) {
      var raf = null;
      function move(e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(function () {
          card.style.setProperty('--rx', (px * 6).toFixed(2) + 'deg');
          card.style.setProperty('--ry', (-py * 6).toFixed(2) + 'deg');
        });
      }
      function leave() { card.style.setProperty('--rx', '0deg'); card.style.setProperty('--ry', '0deg'); }
      card.addEventListener('pointermove', move);
      card.addEventListener('pointerleave', leave);
    });
  })();

  /* ---- Footer year ---- */
  (function () { var y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear(); })();

})();
