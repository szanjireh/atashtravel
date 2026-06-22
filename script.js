(() => {
  'use strict';

  // ── Sticky Header ──────────────────────────────────────────
  const header = document.getElementById('site-header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 60);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ── Mobile Menu ────────────────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const nav       = document.getElementById('main-nav');

  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-label', isOpen ? 'بستن منو' : 'باز کردن منو');
    });

    // Close menu when a link is clicked
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-label', 'باز کردن منو');
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!header.contains(e.target)) {
        nav.classList.remove('open');
        hamburger.classList.remove('open');
      }
    });
  }

  // ── Fade-in on scroll ──────────────────────────────────────
  const fadeEls = document.querySelectorAll(
    '.tour-card, .why-card, .contact-card, .services-inner > *'
  );

  if ('IntersectionObserver' in window && fadeEls.length) {
    fadeEls.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = 'opacity .55s ease, transform .55s ease';
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
            }, 80 * (entry.target.dataset.delay || 0));
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    fadeEls.forEach((el, i) => {
      el.dataset.delay = i % 4;
      io.observe(el);
    });
  }

  // ── Active nav link on scroll ──────────────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (sections.length && navLinks.length) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            navLinks.forEach(link => {
              link.style.color = '';
              if (link.getAttribute('href') === `#${entry.target.id}`) {
                link.style.color = 'var(--gold-light, #e8c76a)';
              }
            });
          }
        });
      },
      { rootMargin: '-40% 0px -50% 0px' }
    );
    sections.forEach(s => sectionObserver.observe(s));
  }
})();
