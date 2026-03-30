/* ============================================
   MELOVAR'S TALE — Ember Particle System
   Canvas-based floating ember particles
   ============================================ */

class EmberParticles {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.maxParticles = 60;
    this.animationId = null;
    this.resizeTimeout = null;

    this.resize();
    this.init();
    this.animate();

    window.addEventListener('resize', () => {
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(() => this.resize(), 200);
    });
  }

  resize() {
    const rect = this.canvas.parentElement.getBoundingClientRect();
    this.canvas.width = rect.width;
    this.canvas.height = rect.height;
  }

  createParticle() {
    const isAzure = Math.random() > 0.5;
    return {
      x: Math.random() * this.canvas.width,
      y: this.canvas.height + Math.random() * 50,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.8,
      speedY: -(Math.random() * 1.5 + 0.5),
      opacity: Math.random() * 0.6 + 0.2,
      fadeSpeed: Math.random() * 0.003 + 0.001,
      hue: isAzure ? 210 : 20 + Math.random() * 15,
      saturation: isAzure ? 100 : 100,
      lightness: isAzure ? 56 : 50 + Math.random() * 15,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: Math.random() * 0.02 + 0.01,
      wobbleAmount: Math.random() * 1.5 + 0.5,
    };
  }

  init() {
    for (let i = 0; i < this.maxParticles; i++) {
      const p = this.createParticle();
      p.y = Math.random() * this.canvas.height;
      this.particles.push(p);
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];

      // Update position
      p.wobble += p.wobbleSpeed;
      p.x += p.speedX + Math.sin(p.wobble) * p.wobbleAmount * 0.1;
      p.y += p.speedY;

      // Fade
      p.opacity -= p.fadeSpeed;

      // Remove dead particles
      if (p.opacity <= 0 || p.y < -20) {
        this.particles.splice(i, 1);
        continue;
      }

      // Draw
      this.ctx.save();
      this.ctx.globalAlpha = p.opacity;
      this.ctx.fillStyle = `hsl(${p.hue}, ${p.saturation}%, ${p.lightness}%)`;
      this.ctx.shadowBlur = p.size * 4;
      this.ctx.shadowColor = `hsla(${p.hue}, ${p.saturation}%, ${p.lightness}%, 0.5)`;
      
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }

    // Replenish particles
    while (this.particles.length < this.maxParticles) {
      this.particles.push(this.createParticle());
    }

    this.animationId = requestAnimationFrame(() => this.animate());
  }

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
  new EmberParticles('hero-particles');
});
