/* ─────────────────────────────────────────────────────────────
   Treevolution – site scripts (no dependencies)
   Header · mobile menu · reveals · services explorer · lightbox
   · quote form · sticky mobile bar · pausing off-screen animation
   ───────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Year ─────────────────────────────────────────────────── */
  $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ── Header background on scroll ─────────────────────────── */
  var header = $('[data-header]');
  var onScroll = function () {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 12);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ── Mobile menu ─────────────────────────────────────────── */
  var menuBtn = $('[data-menu-btn]');
  var menu = $('[data-menu]');
  function setMenu(open) {
    document.body.classList.toggle('menu-open', open);
    if (menuBtn) {
      menuBtn.setAttribute('aria-expanded', String(open));
      menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }
    if (open && header) header.classList.add('is-scrolled');
    else onScroll();
  }
  if (menuBtn && menu) {
    menuBtn.addEventListener('click', function () {
      setMenu(!document.body.classList.contains('menu-open'));
    });
    $$('a', menu).forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && document.body.classList.contains('menu-open')) { setMenu(false); menuBtn.focus(); }
    });
    document.addEventListener('click', function (e) {
      if (document.body.classList.contains('menu-open') && !menu.contains(e.target) && !menuBtn.contains(e.target)) setMenu(false);
    });
  }

  /* ── Scroll reveals ──────────────────────────────────────── */
  var reveals = $$('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ── Pause looping scenery when it's off-screen ──────────── */
  if ('IntersectionObserver' in window) {
    var pauser = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { en.target.classList.toggle('paused', !en.isIntersecting); });
    });
    $$('[data-hero], #about, .treeline').forEach(function (el) { pauser.observe(el); });
  }

  /* ── Services explorer (tabs) ────────────────────────────── */
  var tabs = $$('[data-tab]');
  function selectTab(tab, focus) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      var panel = document.getElementById(t.getAttribute('aria-controls'));
      if (panel) panel.hidden = !on;
    });
    if (focus) tab.focus();
    // keep the active chip in view on phones
    var list = tab.parentElement;
    if (list && list.scrollWidth > list.clientWidth) {
      list.scrollTo({ left: tab.offsetLeft - 20, behavior: reduceMotion ? 'auto' : 'smooth' });
    }
  }
  tabs.forEach(function (tab, i) {
    tab.addEventListener('click', function () { selectTab(tab); });
    tab.addEventListener('keydown', function (e) {
      var next = null;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = tabs[(i + 1) % tabs.length];
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = tabs[(i - 1 + tabs.length) % tabs.length];
      if (e.key === 'Home') next = tabs[0];
      if (e.key === 'End') next = tabs[tabs.length - 1];
      if (next) { e.preventDefault(); selectTab(next, true); }
    });
  });

  // "Get a quote" inside a service pre-selects it in the form
  var serviceSelect = $('#f-service');
  $$('[data-quote]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (!serviceSelect) return;
      var want = btn.getAttribute('data-quote');
      $$('option', serviceSelect).forEach(function (o) { if (o.textContent === want) serviceSelect.value = o.value || o.textContent; });
      var f = serviceSelect.closest('.field');
      if (f) f.classList.remove('invalid');
    });
  });

  /* ── Lightbox ────────────────────────────────────────────── */
  var lb = $('[data-lightbox]');
  var items = $$('[data-gallery-item]');
  if (lb && items.length) {
    var lbImg = $('[data-lb-img]', lb);
    var lbCap = $('[data-lb-caption]', lb);
    var lbCount = $('[data-lb-count]', lb);
    var current = 0;
    var lastFocus = null;

    var show = function (i) {
      current = (i + items.length) % items.length;
      var it = items[current];
      var img = $('img', it);
      lbImg.classList.add('swap');
      var src = it.getAttribute('data-src');
      var pre = new Image();
      pre.onload = pre.onerror = function () {
        lbImg.src = src;
        lbImg.alt = img ? img.alt : '';
        lbImg.classList.remove('swap');
      };
      pre.src = src;
      lbCap.textContent = it.getAttribute('data-caption') || '';
      lbCount.textContent = (current + 1) + ' / ' + items.length;
    };
    var open = function (i) {
      lastFocus = document.activeElement;
      show(i);
      lb.classList.add('open');
      document.documentElement.style.overflow = 'hidden';
      $('[data-lb-close]', lb).focus();
    };
    var close = function () {
      lb.classList.remove('open');
      document.documentElement.style.overflow = '';
      if (lastFocus) lastFocus.focus();
    };

    items.forEach(function (it, i) { it.addEventListener('click', function () { open(i); }); });
    $('[data-lb-close]', lb).addEventListener('click', close);
    $('[data-lb-prev]', lb).addEventListener('click', function () { show(current - 1); });
    $('[data-lb-next]', lb).addEventListener('click', function () { show(current + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb || e.target.hasAttribute('data-lb-stage')) close(); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(current - 1);
      if (e.key === 'ArrowRight') show(current + 1);
      if (e.key === 'Tab') {
        // keep focus inside the viewer
        var f = $$('button', lb).filter(function (b) { return b.offsetParent !== null; });
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    // swipe on touch screens
    var sx = 0, sy = 0;
    lb.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
    lb.addEventListener('touchend', function (e) {
      var dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) show(current + (dx < 0 ? 1 : -1));
      else if (dy > 90 && Math.abs(dy) > Math.abs(dx)) close();
    }, { passive: true });
  }

  /* ── Quote form: inline validation + sending state ───────── */
  var form = $('[data-form]');
  if (form) {
    var rules = {
      name: function (v) { return v.trim().length > 1; },
      phone: function (v) { return v.replace(/[^0-9]/g, '').length >= 6; },
      email: function (v) { return v.trim() === '' || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()); },
      service: function (v) { return v !== ''; },
      message: function (v) { return v.trim().length > 3; },
    };
    var check = function (input) {
      var rule = rules[input.name];
      if (!rule) return true;
      var ok = rule(input.value);
      var field = input.closest('.field');
      field.classList.toggle('invalid', !ok);
      input.setAttribute('aria-invalid', String(!ok));
      var err = document.getElementById(input.id + '-err');
      if (err) { if (!ok) input.setAttribute('aria-describedby', err.id); else input.removeAttribute('aria-describedby'); }
      return ok;
    };
    // An error appearing on blur would shift the button mid-tap, so skip the
    // blur check when the blur was caused by pressing "Send" (submit validates anyway).
    var submitBtn = $('[data-submit]', form);
    var pressingSubmit = false;
    submitBtn.addEventListener('pointerdown', function () { pressingSubmit = true; });
    document.addEventListener('pointerup', function () { setTimeout(function () { pressingSubmit = false; }, 0); });
    $$('input, select, textarea', form).forEach(function (input) {
      if (!rules[input.name]) return;
      input.addEventListener('blur', function () { if (input.value !== '' && !pressingSubmit) check(input); });
      input.addEventListener('input', function () { if (input.closest('.field').classList.contains('invalid')) check(input); });
      input.addEventListener('change', function () { if (input.closest('.field').classList.contains('invalid')) check(input); });
    });
    form.addEventListener('submit', function (e) {
      var firstBad = null;
      $$('input, select, textarea', form).forEach(function (input) {
        if (rules[input.name] && !check(input) && !firstBad) firstBad = input;
      });
      if (firstBad) { e.preventDefault(); firstBad.focus(); return; }
      var btn = $('[data-submit]', form);
      btn.disabled = true;
      btn.classList.add('opacity-90');
      $('[data-label]', btn).textContent = 'Sending…';
      var arrow = $('[data-arrow]', btn);
      if (arrow) arrow.outerHTML = '<span class="spinner" aria-hidden="true"></span>';
    });
  }

  /* ── Sticky call/quote bar on phones ─────────────────────── */
  var bar = $('[data-mobile-bar]');
  var hero = $('[data-hero]');
  var contact = $('[data-contact]');
  if (bar && hero && 'IntersectionObserver' in window) {
    var heroVisible = true, contactVisible = false;
    var update = function () { bar.classList.toggle('show', !heroVisible && !contactVisible); };
    new IntersectionObserver(function (en) { heroVisible = en[0].isIntersecting; update(); }, { rootMargin: '-40% 0px 0px 0px' }).observe(hero);
    if (contact) new IntersectionObserver(function (en) { contactVisible = en[0].isIntersecting; update(); }, { threshold: 0.15 }).observe(contact);
  } else if (bar) {
    bar.classList.add('show');
  }
})();
