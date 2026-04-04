// Afinity - script.js

(function () {
  'use strict';

  // ============================================
  // NAVBAR: scroll effect + mobile toggle
  // ============================================

  var navbar = document.getElementById('navbar');
  var toggle = document.getElementById('navbar-toggle');
  var mobileMenu = document.getElementById('navbar-mobile');

  if (navbar) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  if (toggle && mobileMenu) {
    toggle.addEventListener('click', function () {
      var isOpen = mobileMenu.classList.contains('open');
      mobileMenu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(!isOpen));
      mobileMenu.setAttribute('aria-hidden', String(isOpen));
    });

    var mobileLinks = mobileMenu.querySelectorAll('.navbar-mobile-link');
    mobileLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
      });
    });
  }

  // ============================================
  // SMOOTH SCROLL for anchor links
  // ============================================

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        var offset = 72;
        var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  // ============================================
  // FADE-IN ANIMATIONS on scroll
  // ============================================

  var fadeEls = document.querySelectorAll('.fade-in');

  if ('IntersectionObserver' in window && fadeEls.length > 0) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    fadeEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    fadeEls.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // ============================================
  // SIGNUP FORM
  // ============================================

  var form = document.getElementById('signup-form');
  var successMsg = document.getElementById('form-success');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var email = document.getElementById('email');
      var ageConfirm = document.getElementById('age-confirm');
      var privacyConfirm = document.getElementById('privacy-confirm');

      if (!email || !email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        email.style.borderColor = '#ef4444';
        email.focus();
        setTimeout(function () { email.style.borderColor = ''; }, 2500);
        return;
      }

      if (!ageConfirm || !ageConfirm.checked) {
        alert('Voce precisa confirmar que e maior de 18 anos.');
        return;
      }

      if (!privacyConfirm || !privacyConfirm.checked) {
        alert('Voce precisa aceitar a politica de privacidade.');
        return;
      }

      form.style.display = 'none';
      if (successMsg) {
        successMsg.style.display = 'block';
      }
    });
  }

})();
