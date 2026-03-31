/* ============================================
   MELOVAR'S TALE — Gallery Lightbox & Filtering
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // ── Gallery Filter Tabs ──
  const tabs = document.querySelectorAll('.gallery-tab');
  const items = document.querySelectorAll('.gallery-item');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const filter = tab.dataset.filter;

      // Update active tab
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Filter items
      items.forEach(item => {
        const category = item.dataset.category;
        if (filter === 'all' || category === filter) {
          item.style.display = '';
          item.style.animation = 'fadeInUp 0.4s ease forwards';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // ── Lightbox ──
  const lightbox = document.getElementById('lightbox');
  const lightboxContent = document.getElementById('lightbox-content');
  const lightboxCaption = document.getElementById('lightbox-caption-title');
  const lightboxType = document.getElementById('lightbox-caption-type');
  const lightboxClose = document.getElementById('lightbox-close');

  if (!lightbox) return;

  items.forEach(item => {
    item.addEventListener('click', () => {
      const media = item.querySelector('img, video');
      const title = item.dataset.title || '';
      const type = item.dataset.type || '';
      const src = item.dataset.src || media.src;
      const isVideo = item.dataset.media === 'video';

      // Clear previous content
      lightboxContent.innerHTML = '';

      if (isVideo) {
        const video = document.createElement('video');
        video.src = src;
        video.autoplay = true;
        video.loop = true;
        video.muted = true;
        video.playsInline = true;
        video.controls = true;
        lightboxContent.appendChild(video);
      } else {
        const img = document.createElement('img');
        img.src = src;
        img.alt = title;
        lightboxContent.appendChild(img);
      }

      lightboxCaption.textContent = title;
      lightboxType.textContent = type;
      if (type.toLowerCase().includes('legendary')) {
        lightboxType.className = 'legendary';
      } else {
        lightboxType.className = '';
      }

      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close lightbox
  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    // Stop any video
    const video = lightboxContent.querySelector('video');
    if (video) video.pause();
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
});
