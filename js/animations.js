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

  // ── Force Mobile Video Autoplay ──
  // Fixes iOS/Android showing a play button instead of looping background videos
  const bgVideos = document.querySelectorAll('video[autoplay]');
  bgVideos.forEach(vid => {
    // Force properties
    vid.muted = true;
    vid.loop = true;
    vid.setAttribute('playsinline', '');
    
    // Attempt play immediately
    const playPromise = vid.play();
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        // Some browsers block auto-play. Adding a touch listener as a fallback.
        console.log('Autoplay prevented by browser. Waiting for interaction.');
        document.body.addEventListener('touchstart', () => {
          vid.play().catch(e => console.log('Still prevented:', e));
        }, { once: true });
      });
    }
  });
});
