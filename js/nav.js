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


  // ── Launch Date State Swap ──
  // Automatically flips 'Wishlist' to 'Buy' on or after May 11th, 2026
  const launchDate = new Date('2026-05-11T00:00:00Z');
  const now = new Date();
  const isLaunched = now >= launchDate;

  // Handle all Steam CTA buttons safely
  document.querySelectorAll('a').forEach(link => {
    // Only target CTAs
    if ((link.href && link.href.includes('store.steampowered.com')) || link.id === 'hero-cta-steam' || link.id === 'cta-steam') {
      if (isLaunched) {
        link.innerHTML = link.innerHTML.replace('Wishlist on Steam', 'Buy on Steam');
        link.innerHTML = link.innerHTML.replace('Wishlist', 'Buy');
      } else {
        link.innerHTML = link.innerHTML.replace('Buy on Steam', 'Wishlist on Steam');
      }
    }
  });

  // Handle specific text on Steam/Index pages safely
  const steamH1 = document.querySelector('.steam-hero-content h1');
  if (steamH1) {
    if (isLaunched && steamH1.textContent.trim() === 'Wishlist Now') {
      steamH1.textContent = 'Purchase Now';
    } else if (!isLaunched && steamH1.textContent.trim() === 'Purchase Now') {
      steamH1.textContent = 'Wishlist Now';
    }
  }

  // Specifically check paragraphs containing wishlist prompt
  if (isLaunched) {
    document.querySelectorAll('p').forEach(p => {
      if (p.textContent.includes(Wishlist Melovar's Tale)) {
        p.innerHTML = p.innerHTML.replace(Wishlist Melovar's Tale, Buy Melovar's Tale);
      }
      if (p.textContent.includes('Wishlist now on')) {
        p.innerHTML = p.innerHTML.replace('Wishlist now on', 'Buy now on');
      }
    });
  }
});