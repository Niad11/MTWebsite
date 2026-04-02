$path = "C:\AntiGrav\www.melovarstale.co.uk\lore.html"
$content = Get-Content $path -Raw -Encoding UTF8

$startMarker = '          <!-- Blood Knight Draefus -->'
$startIdx = $content.IndexOf($startMarker)

if ($startIdx -eq -1) { 
    Write-Host "Could not find start marker" 
    exit
}

$top = $content.Substring(0, $startIdx)

$replacement = @"
          <!-- Blood Knight Draefus -->
          <div class="lore-char-card reveal reveal-delay-2" id="lore-draefus">
            <div style="overflow:hidden;">
              <img src="assets/images/blood-knight-draefus-still.jpg" alt="Blood Knight Draefus" class="lore-char-card-img" loading="lazy" style="object-position: center 20%;">
            </div>
            <div class="lore-char-card-body">
              <div class="char-role fire">The Antagonist - Commander of the Undying Legion</div>
              <h3>Blood Knight Draefus</h3>
              <p>
                The towering commander of the undying legion, Draefus is the dark, demonic assailant from across the mountain 
                who led the infernal creatures that destroyed Melovar's village. Clad in blood-soaked crimson armor adorned 
                with skulls, he commands an army of darkness that marches to extinguish all hope from the realm. His very 
                presence corrupts the air and brings desolation wherever he treads.
              </p>
            </div>
          </div>

          <!-- Blade Crafter Zoros -->
          <div class="lore-char-card reveal reveal-delay-3" id="lore-zoros">
            <div style="overflow:hidden;">
              <img src="assets/images/blade-crafter-zoros.png" alt="Blade Crafter Zoros" class="lore-char-card-img" loading="lazy" style="object-position: center 15%;">
            </div>
            <div class="lore-char-card-body">
              <div class="char-role azure">The Mentor - Blade Crafter</div>
              <h3>Blade Crafter Zoros</h3>
              <p>
                Bor's most trusted friend and a mystic craftsman whose skill rivalled only Melovar's father. 
                After learning of Bor's fate, Zoros took it upon himself to train Melovar and his brothers in the 
                craftsmanship of the blade, alongside the restraint and technique it required to wield one. 
                His guidance would forge the greatest warrior the realm had ever known.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section cta-section" id="lore-cta">
      <div class="ambient-grid"></div>
      <div class="container">
        <div class="cta-content reveal">
          <h2>Enter the World</h2>
          <div class="cta-actions">
            <a href="https://store.steampowered.com/app/4582580/Melovars_Tale/" target="_blank" rel="noopener" class="btn btn-primary btn-lg">Wishlist on Steam</a>
            <a href="game.html" class="btn btn-secondary btn-lg">Explore the Game</a>
          </div>
        </div>
      </div>
    </section>
  </main>

  <!-- FOOTER -->
  <footer class="site-footer" id="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="index.html" class="logo">
            <div class="logo-icon">⚔</div>
            <span>Melovar's Tale</span>
          </a>
          <p>A premium roguelike deckbuilder card game. Forge your deck, face the darkness, and write your tale. Support the journey together.</p>
        </div>
        <div class="footer-nav">
          <h4 class="footer-heading">Explore</h4>
          <div class="footer-links">
            <a href="game.html">The Game</a>
            <a href="art.html">Art Gallery</a>
            <a href="lore.html">Lore & World</a>
            <a href="developer.html">Developer</a>
            <a href="steam.html">Steam</a>
          </div>
        </div>
        <div class="footer-connect">
          <h4 class="footer-heading">Contact</h4>
          <div class="footer-contact-info">
            <p>Niad Chowdhury</p>
            <a href="mailto:niaduz@gmail.com">niaduz@gmail.com</a>
            <p>United Kingdom</p>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <span>&copy; 2026 Melovar's Tale. All rights reserved.</span>
        <span>A Dark Fantasy Deckbuilder</span>
      </div>
    </div>
  </footer>

  <script src="js/nav.js"></script>
  <script src="js/animations.js"></script>
  <script>
    document.querySelectorAll('video[autoplay]').forEach(video => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            video.currentTime = 0;
            video.play();
          } else {
            video.pause();
          }
        });
      }, { threshold: 0.3 });
      observer.observe(video);
    });
  </script>
</body>
</html>
"@

$newContent = $top + $replacement
[System.IO.File]::WriteAllText($path, $newContent, [System.Text.Encoding]::UTF8)
Write-Host "Zoros and Bottom Restored!"