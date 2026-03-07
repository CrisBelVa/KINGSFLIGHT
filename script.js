// ============================================================
// KINGS FLIGHTS – Landing Page JavaScript
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- NAVBAR SCROLL EFFECT ----
  const navbar = document.getElementById('navbar');
  function onScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---- MOBILE MENU ----
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  // Close mobile menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ---- INTERSECTION OBSERVER – FADE IN ANIMATIONS ----
  const fadeEls = document.querySelectorAll(
    '.service-card, .why-card, .step, .dest-card, .testimonial-card, .values-inner > *, .proof-stat'
  );
  fadeEls.forEach(el => el.classList.add('fade-in'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  fadeEls.forEach((el, i) => {
    el.style.transitionDelay = `${(i % 4) * 0.08}s`;
    observer.observe(el);
  });

  // ---- SMOOTH ANCHOR SCROLLING WITH OFFSET ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = navbar.offsetHeight + 16;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ---- WHATSAPP FAB VISIBILITY ----
  const fab = document.getElementById('whatsapp-fab');
  let lastScrollY = window.scrollY;

  function handleFabVisibility() {
    const current = window.scrollY;
    if (current > 300) {
      fab.style.opacity = '1';
      fab.style.pointerEvents = 'auto';
    } else {
      fab.style.opacity = '0.5';
    }
    lastScrollY = current;
  }
  window.addEventListener('scroll', handleFabVisibility, { passive: true });
  handleFabVisibility();

  // ---- COUNTER ANIMATION FOR PROOF BAR ----
  const counters = document.querySelectorAll('.proof-stat strong');
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        countObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => countObserver.observe(c));

  function animateCounter(el) {
    const text = el.textContent;
    const numMatch = text.match(/[\d.]+/);
    if (!numMatch) return;
    const target = parseFloat(numMatch[0]);
    const isFloat = text.includes('.');
    const suffix = text.replace(/[\d.]+/, '');
    const duration = 1400;
    const start = performance.now();

    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target * eased;
      el.textContent = (isFloat ? value.toFixed(1) : Math.round(value)) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // ---- STICKY CTA PULSE ON SCROLL ----
  const navCta = document.getElementById('nav-cta-btn');
  let pulseCount = 0;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 600 && pulseCount < 3) {
      navCta.style.animation = 'none';
      setTimeout(() => {
        navCta.style.animation = '';
        navCta.classList.add('pulse-once');
        setTimeout(() => navCta.classList.remove('pulse-once'), 600);
      }, 10);
      pulseCount++;
    }
  });

});
