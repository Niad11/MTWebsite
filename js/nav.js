/* ============================================
   MELOVAR'S TALE — Navigation Controller
   Scroll effects, mobile toggle
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileOverlay = document.querySelector('.mobile-nav-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-nav-overlay .nav-link, .mobile-nav-overlay .nav-cta');

  // ── Scroll effect on header ──
  let lastScroll = 0;
  const scrollThreshold = 50;

  function handleScroll() {
    const currentScroll = window.scrollY;

    if (currentScroll > scrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  // ── Mobile menu toggle ──
  if (mobileToggle && mobileOverlay) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      mobileOverlay.classList.toggle('open');
      document.body.style.overflow = mobileOverlay.classList.contains('open') ? 'hidden' : '';
    });

    // Close mobile nav when a link is clicked
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        mobileOverlay.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileOverlay.classList.contains('open')) {
        mobileToggle.classList.remove('active');
        mobileOverlay.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // ── Active nav link detection ──
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || 
        (currentPage === '' && href === 'index.html') ||
        (currentPage === '/' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
});
