/* ============================================
   MELOVAR'S TALE — Scroll Animations
   Intersection Observer reveal system
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // ── Scroll Reveal ──
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ── Counter Animation ──
  const counters = document.querySelectorAll('[data-count]');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || '';
        const prefix = el.dataset.prefix || '';
        const duration = 2000;
        const start = performance.now();

        function animate(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.round(target * eased);
          el.textContent = prefix + current.toLocaleString() + suffix;

          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        }

        requestAnimationFrame(animate);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => counterObserver.observe(el));

  // ── Video Play/Pause on Scroll ──
  // Videos play from the start when 30% visible, pause when scrolled away
  const allVideos = document.querySelectorAll('video[autoplay]');
  allVideos.forEach(vid => {
    // Ensure muted + playsinline for mobile compatibility
    vid.muted = true;
    vid.setAttribute('playsinline', '');

    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          vid.currentTime = 0;
          vid.play().catch(() => {
            // Fallback: wait for first touch on mobile
            document.body.addEventListener('touchstart', () => {
              vid.currentTime = 0;
              vid.play().catch(() => {});
            }, { once: true });
          });
        } else {
          vid.pause();
        }
      });
    }, { threshold: 0.3 });

    videoObserver.observe(vid);
  });
});
