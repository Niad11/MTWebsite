/* ============================================
   MELOVAR'S TALE — Trailer Modal Controller
   Injects FAB + modal into every page
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // ── Inject Trailer FAB + Modal HTML ──
  const trailerHTML = `
    <!-- Floating Trailer Button -->
    <button class="trailer-fab" id="trailer-fab" aria-label="Watch the official launch trailer">
      <span class="trailer-fab-icon">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <polygon points="5,3 19,12 5,21"/>
        </svg>
      </span>
      <span>Watch Trailer</span>
    </button>

    <!-- Trailer Modal Overlay -->
    <div class="trailer-modal-overlay" id="trailer-modal-overlay" role="dialog" aria-modal="true" aria-label="Official Launch Trailer">
      <div class="trailer-modal" id="trailer-modal">
        <button class="trailer-modal-close" id="trailer-modal-close" aria-label="Close trailer">
          <svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
        <video id="trailer-video" controls preload="metadata" poster="">
          <source src="assets/trailer.mp4" type="video/mp4">
          Your browser does not support the video tag.
        </video>
        <div class="trailer-modal-title">Melovar's Tale — Official Launch Trailer</div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', trailerHTML);

  // ── Elements ──
  const fab = document.getElementById('trailer-fab');
  const overlay = document.getElementById('trailer-modal-overlay');
  const closeBtn = document.getElementById('trailer-modal-close');
  const video = document.getElementById('trailer-video');

  // ── Open Modal ──
  function openTrailer() {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    // Attempt autoplay
    video.currentTime = 0;
    video.play().catch(() => {
      // Autoplay blocked — user can tap play manually
    });
  }

  // ── Close Modal ──
  function closeTrailer() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    video.pause();
  }

  // ── Event Listeners ──
  fab.addEventListener('click', openTrailer);
  closeBtn.addEventListener('click', closeTrailer);

  // Close on overlay click (outside video)
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      closeTrailer();
    }
  });

  // Close on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) {
      closeTrailer();
    }
  });
});
