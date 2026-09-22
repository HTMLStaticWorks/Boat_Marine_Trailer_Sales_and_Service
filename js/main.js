/**
 * MarineTrailer Pro — Shared JavaScript
 * Handles: Theme Toggle, RTL Toggle, Mobile Menu, Sticky Header, Back-to-Top, Form Validation
 */

(function () {
  'use strict';

  /* =====================================================
     THEME TOGGLE
  ===================================================== */
  const THEME_KEY = 'marine_theme';
  const RTL_KEY = 'marine_rtl';

  function applyTheme(theme) {
    const html = document.documentElement;
    if (theme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
    // Update toggle buttons
    document.querySelectorAll('[data-theme-icon]').forEach(function (el) {
      el.textContent = theme === 'dark' ? '☀️' : '🌙';
    });
    document.querySelectorAll('[data-theme-label]').forEach(function (el) {
      el.textContent = theme === 'dark' ? 'Light Mode' : 'Dark Mode';
    });
  }

  function initTheme() {
    const saved = localStorage.getItem(THEME_KEY) || 'dark';
    applyTheme(saved);

    document.querySelectorAll('[data-toggle-theme]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const current = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
        const next = current === 'dark' ? 'light' : 'dark';
        localStorage.setItem(THEME_KEY, next);
        applyTheme(next);
      });
    });
  }

  /* =====================================================
     RTL TOGGLE
  ===================================================== */
  function applyRTL(isRTL) {
    const html = document.documentElement;
    if (isRTL) {
      html.setAttribute('dir', 'rtl');
      html.classList.add('rtl');
    } else {
      html.setAttribute('dir', 'ltr');
      html.classList.remove('rtl');
    }
    document.querySelectorAll('[data-rtl-label]').forEach(function (el) {
      el.textContent = isRTL ? 'LTR' : 'RTL';
    });
    document.querySelectorAll('[data-rtl-icon]').forEach(function (el) {
      el.textContent = isRTL ? '⇆' : '⇄';
    });
  }

  function initRTL() {
    const saved = localStorage.getItem(RTL_KEY) === 'true';
    applyRTL(saved);

    document.querySelectorAll('[data-toggle-rtl]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
        const next = !isRTL;
        localStorage.setItem(RTL_KEY, next);
        applyRTL(next);
      });
    });
  }

  /* =====================================================
     MOBILE MENU
  ===================================================== */
  function initMobileMenu() {
    const toggle = document.getElementById('mobile-menu-toggle');
    const menu = document.getElementById('mobile-menu');
    const overlay = document.getElementById('mobile-menu-overlay');

    if (!toggle || !menu) return;

    function openMenu() {
      menu.classList.remove('translate-x-full', '-translate-x-full', 'opacity-0', 'pointer-events-none');
      menu.classList.add('translate-x-0', 'opacity-100');
      if (overlay) overlay.classList.remove('hidden');
      toggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
      menu.classList.add(isRTL ? '-translate-x-full' : 'translate-x-full');
      menu.classList.remove('translate-x-0');
      if (overlay) overlay.classList.add('hidden');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    toggle.addEventListener('click', function () {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      expanded ? closeMenu() : openMenu();
    });

    if (overlay) {
      overlay.addEventListener('click', closeMenu);
    }

    // Close when a nav link is clicked
    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
  }

  /* =====================================================
     STICKY HEADER
  ===================================================== */
  function initStickyHeader() {
    const header = document.getElementById('main-header');
    if (!header) return;

    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        header.classList.add('header-scrolled');
      } else {
        header.classList.remove('header-scrolled');
      }
    }, { passive: true });
  }

  /* =====================================================
     BACK TO TOP
  ===================================================== */
  function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
        btn.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
        btn.classList.add('opacity-100', 'translate-y-0');
      } else {
        btn.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
        btn.classList.remove('opacity-100', 'translate-y-0');
      }
    }, { passive: true });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* =====================================================
     DROPDOWN MENU
  ===================================================== */
  function initDropdowns() {
    document.querySelectorAll('[data-dropdown]').forEach(function (trigger) {
      const targetId = trigger.getAttribute('data-dropdown');
      const dropdown = document.getElementById(targetId);
      if (!dropdown) return;

      let timeout;

      trigger.addEventListener('mouseenter', function () {
        clearTimeout(timeout);
        dropdown.classList.remove('hidden', 'opacity-0', 'scale-95');
        dropdown.classList.add('opacity-100', 'scale-100');
      });

      trigger.addEventListener('mouseleave', function () {
        timeout = setTimeout(function () {
          dropdown.classList.add('opacity-0', 'scale-95');
          setTimeout(function () { dropdown.classList.add('hidden'); }, 150);
        }, 100);
      });

      dropdown.addEventListener('mouseenter', function () {
        clearTimeout(timeout);
      });

      dropdown.addEventListener('mouseleave', function () {
        timeout = setTimeout(function () {
          dropdown.classList.add('opacity-0', 'scale-95');
          setTimeout(function () { dropdown.classList.add('hidden'); }, 150);
        }, 100);
      });
    });
  }

  /* =====================================================
     FORM VALIDATION
  ===================================================== */
  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validatePhone(phone) {
    return /^[\+\d\s\-\(\)]{7,20}$/.test(phone);
  }

  function showError(field, message) {
    clearError(field);
    field.classList.add('border-red-500', 'focus:ring-red-500');
    field.classList.remove('border-amber-500');
    const err = document.createElement('p');
    err.className = 'text-red-400 text-xs mt-1 field-error';
    err.textContent = message;
    field.parentNode.appendChild(err);
  }

  function showSuccess(field) {
    clearError(field);
    field.classList.remove('border-red-500', 'focus:ring-red-500');
    field.classList.add('border-green-500');
  }

  function clearError(field) {
    field.classList.remove('border-red-500', 'focus:ring-red-500', 'border-green-500');
    const existing = field.parentNode.querySelector('.field-error');
    if (existing) existing.remove();
  }

  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      let valid = true;

      const name = form.querySelector('#cf-name');
      const email = form.querySelector('#cf-email');
      const phone = form.querySelector('#cf-phone');
      const message = form.querySelector('#cf-message');

      if (name && name.value.trim().length < 2) { showError(name, 'Please enter your full name.'); valid = false; } else if (name) showSuccess(name);
      if (email && !validateEmail(email.value)) { showError(email, 'Please enter a valid email address.'); valid = false; } else if (email) showSuccess(email);
      if (phone && phone.value && !validatePhone(phone.value)) { showError(phone, 'Please enter a valid phone number.'); valid = false; } else if (phone) showSuccess(phone);
      if (message && message.value.trim().length < 10) { showError(message, 'Please enter a message (min 10 characters).'); valid = false; } else if (message) showSuccess(message);

      if (valid) {
        const btn = form.querySelector('[type="submit"]');
        const orig = btn.textContent;
        btn.textContent = 'Message Sent! ✓';
        btn.disabled = true;
        btn.classList.add('bg-green-600');
        setTimeout(function () {
          btn.textContent = orig;
          btn.disabled = false;
          btn.classList.remove('bg-green-600');
          form.reset();
          form.querySelectorAll('.border-green-500').forEach(function (el) { el.classList.remove('border-green-500'); });
        }, 3000);
      }
    });
  }

  function initLoginForm() {
    const form = document.getElementById('login-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      let valid = true;

      const email = form.querySelector('#login-email');
      const password = form.querySelector('#login-password');

      if (email && !validateEmail(email.value)) { showError(email, 'Please enter a valid email address.'); valid = false; } else if (email) showSuccess(email);
      if (password && password.value.length < 6) { showError(password, 'Password must be at least 6 characters.'); valid = false; } else if (password) showSuccess(password);

      if (valid) {
        const btn = form.querySelector('[type="submit"]');
        btn.textContent = 'Authenticating...';
        btn.disabled = true;
        setTimeout(function () { btn.textContent = 'Sign In'; btn.disabled = false; }, 2000);
      }
    });
  }

  function initSignupForm() {
    const form = document.getElementById('signup-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      let valid = true;

      const name = form.querySelector('#su-name');
      const email = form.querySelector('#su-email');
      const phone = form.querySelector('#su-phone');
      const password = form.querySelector('#su-password');
      const confirm = form.querySelector('#su-confirm');
      const terms = form.querySelector('#su-terms');

      if (name && name.value.trim().length < 2) { showError(name, 'Please enter your full name.'); valid = false; } else if (name) showSuccess(name);
      if (email && !validateEmail(email.value)) { showError(email, 'Please enter a valid email address.'); valid = false; } else if (email) showSuccess(email);
      if (phone && phone.value && !validatePhone(phone.value)) { showError(phone, 'Please enter a valid phone number.'); valid = false; } else if (phone) showSuccess(phone);
      if (password && password.value.length < 8) { showError(password, 'Password must be at least 8 characters.'); valid = false; } else if (password) showSuccess(password);
      if (confirm && confirm.value !== password.value) { showError(confirm, 'Passwords do not match.'); valid = false; } else if (confirm && confirm.value) showSuccess(confirm);
      if (terms && !terms.checked) {
        const errEl = form.querySelector('#terms-error');
        if (errEl) { errEl.classList.remove('hidden'); }
        valid = false;
      } else if (terms) {
        const errEl = form.querySelector('#terms-error');
        if (errEl) errEl.classList.add('hidden');
      }

      if (valid) {
        const btn = form.querySelector('[type="submit"]');
        btn.textContent = 'Creating Account...';
        btn.disabled = true;
        setTimeout(function () { btn.textContent = 'Account Created! ✓'; btn.classList.add('bg-green-600'); }, 2000);
      }
    });
  }

  /* =====================================================
     SMOOTH SCROLL FOR ANCHOR LINKS
  ===================================================== */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  /* =====================================================
     ACTIVE NAV LINK
  ===================================================== */
  function initActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('[data-nav-link]').forEach(function (link) {
      const href = link.getAttribute('href');
      if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('nav-active');
      }
    });
  }

  /* =====================================================
     COUNTER ANIMATION
  ===================================================== */
  function animateCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-counter'));
          let current = 0;
          const duration = 2000;
          const step = target / (duration / 16);
          const timer = setInterval(function () {
            current += step;
            if (current >= target) {
              el.textContent = target.toLocaleString();
              clearInterval(timer);
            } else {
              el.textContent = Math.floor(current).toLocaleString();
            }
          }, 16);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(function (c) { observer.observe(c); });
  }

  /* =====================================================
     REVEAL ON SCROLL
  ===================================================== */
  function initScrollReveal() {
    const els = document.querySelectorAll('[data-reveal]');
    if (!els.length) return;

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    els.forEach(function (el) { observer.observe(el); });
  }

  /* =====================================================
     INIT ALL
  ===================================================== */
  function initAll() {
    initTheme();
    initRTL();
    initMobileMenu();
    initStickyHeader();
    initBackToTop();
    initDropdowns();
    initContactForm();
    initLoginForm();
    initSignupForm();
    initSmoothScroll();
    initActiveNav();
    animateCounters();
    initScrollReveal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }

})();
