$path = "C:\AntiGrav\www.melovarstale.co.uk\lore.html"
$content = Get-Content $path -Raw -Encoding UTF8

$startMarker = '          <!-- Blood Knight Draefus -->'
$endMarker = '    <!-- CTA -->'

$startIdx = $content.IndexOf($startMarker)
$endIdx = $content.IndexOf($endMarker, $startIdx)

if ($startIdx -eq -1 -or $endIdx -eq -1) { 
    Write-Host "Could not find markers" 
    exit
}

$top = $content.Substring(0, $startIdx)
$bottom = $content.Substring($endIdx)

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

"@

$newContent = $top + $replacement + $bottom
[System.IO.File]::WriteAllText($path, $newContent, [System.Text.Encoding]::UTF8)
Write-Host "Zoros Restored!"