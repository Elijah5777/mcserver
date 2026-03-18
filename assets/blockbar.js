/* [10] */
(function() {
  var script = document.currentScript;
  var root = script ? (script.getAttribute('data-root') || '') : '';
  var ASSET_PATH = root + 'assets/blocks/';
  var BLOCK_PX = 32;

  /* [11] */
  var BLOCK_LAYERS = ['grass', 'dirt', 'stone'];

  /* [12] */
  var ORES = [
    { name: 'coal_ore',    chance: 0.06, veinSize: 3 },
    { name: 'iron_ore',    chance: 0.04, veinSize: 2 },
    { name: 'lapis_ore',   chance: 0.02, veinSize: 2 },
    { name: 'diamond_ore', chance: 0.01, veinSize: 1 }
  ];

  /* [13] */
  function buildBar() {
    var bar = document.getElementById('block-bar');
    if (!bar) return;

    BLOCK_LAYERS.forEach(function(name) {
      var row = document.createElement('div');
      row.className = 'block-row';

      if (name === 'stone') {
        var canvas = document.createElement('canvas');
        var slots = Math.ceil(window.innerWidth / BLOCK_PX) + 2;
        canvas.width = slots * BLOCK_PX;
        canvas.height = BLOCK_PX;
        canvas.style.cssText = 'display:block;width:100%;height:' + BLOCK_PX + 'px;image-rendering:pixelated;';
        row.style.height = BLOCK_PX + 'px';
        row.appendChild(canvas);
        bar.appendChild(row);

        /* [14] */
        var stoneImg = new Image();
        stoneImg.onload = function() {
          var ctx = canvas.getContext('2d');
          ctx.imageSmoothingEnabled = false;
          for (var x = 0; x < slots; x++) {
            ctx.drawImage(stoneImg, x * BLOCK_PX, 0, BLOCK_PX, BLOCK_PX);
          }

          /* [15] */
          var oreSlots = [];
          ORES.forEach(function(ore) {
            var x = 0;
            while (x < slots) {
              if (Math.random() < ore.chance) {
                var vein = Math.ceil(Math.random() * ore.veinSize);
                for (var v = 0; v < vein && (x + v) < slots; v++) {
                  oreSlots.push({ x: x + v, ore: ore.name });
                }
                x += vein + 2;
              } else { x++; }
            }
          });

          /* [16] */
          var imgCache = {};
          oreSlots.forEach(function(slot) {
            function draw(img) { ctx.drawImage(img, slot.x * BLOCK_PX, 0, BLOCK_PX, BLOCK_PX); }
            if (imgCache[slot.ore] && imgCache[slot.ore].complete) {
              draw(imgCache[slot.ore]);
            } else if (!imgCache[slot.ore]) {
              var img = new Image();
              imgCache[slot.ore] = img;
              img.onload = (function(s) { return function() { draw(imgCache[s.ore]); }; })(slot);
              img.src = ASSET_PATH + slot.ore + '.png';
            } else {
              imgCache[slot.ore].addEventListener('load', (function(s) { return function() { draw(imgCache[s.ore]); }; })(slot));
            }
          });
        };
        stoneImg.src = ASSET_PATH + 'stone.png';

      } else {
        row.style.backgroundImage = "url('" + ASSET_PATH + name + ".png')";
        bar.appendChild(row);
      }
    });
  }

  /* [17] */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildBar);
  } else {
    buildBar();
  }
})();
