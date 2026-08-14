/* Next Gen Title — interactions
   Sticky nav state, mobile menu, scroll-reveal, placeholder form. */
(function () {
  'use strict';

  /* Sticky nav shadow on scroll */
  var nav = document.querySelector('.nav');
  function onScroll() {
    if (!nav) return;
    nav.classList.toggle('scrolled', window.scrollY > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Mobile menu toggle */
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        links.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* Scroll reveal via IntersectionObserver */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* Subtle parallax on hero floaties */
  var floaties = document.querySelectorAll('.floaty');
  if (floaties.length && window.matchMedia('(min-width: 941px)').matches) {
    window.addEventListener('scroll', function () {
      var y = window.scrollY;
      floaties.forEach(function (f, i) {
        f.style.transform = 'translateY(' + (y * (0.04 + i * 0.02)) + 'px)';
      });
    }, { passive: true });
  }

  /* Placeholder form handler --------------------------------------------
     NOTE: This is a front-end placeholder. No data is transmitted yet.
     To go live, point FORM_ENDPOINT at a real handler (Formspree, GHL
     webhook, serverless function, etc.) and set FORM_LIVE = true. */
  var FORM_LIVE = false;
  var FORM_ENDPOINT = ''; // e.g. 'https://formspree.io/f/xxxxxx'

  var form = document.querySelector('[data-order-form]');
  if (form) {
    var statusEl = form.querySelector('.form-status');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }

      if (FORM_LIVE && FORM_ENDPOINT) {
        var data = new FormData(form);
        var btn = form.querySelector('button[type="submit"]');
        if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
        fetch(FORM_ENDPOINT, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
          .then(function (r) { return r.ok ? r : Promise.reject(r); })
          .then(function () {
            showStatus('Thank you — your request has been received. We’ll be in touch shortly.');
            form.reset();
          })
          .catch(function () {
            showStatus('Something went wrong. Please call us at 704-467-3031.', false);
          })
          .finally(function () { if (btn) { btn.disabled = false; btn.textContent = 'Order Title'; } });
      } else {
        /* Placeholder mode — confirm UI works without sending anything. */
        showStatus('Thanks! This form is a preview — connect an endpoint to start receiving orders. (No data was sent.)');
        form.reset();
      }
    });

    function showStatus(msg, ok) {
      if (!statusEl) return;
      statusEl.textContent = msg;
      statusEl.classList.add('show');
      statusEl.classList.toggle('ok', ok !== false);
      statusEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  /* Footer year */
  var yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();
})();
