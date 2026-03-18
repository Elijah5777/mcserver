/* [4] */
(function() {
  function init() {
    var cfg = window.CC_CONFIG;
    if (!cfg) return;

    /* [5] */
    document.querySelectorAll('.site-title').forEach(function(el) {
      el.innerHTML =
        '<span style="color:' + cfg.siteName.color1 + '">' + cfg.siteName.part1 + '</span>' +
        '<span style="color:' + cfg.siteName.color2 + '">' + cfg.siteName.part2 + '</span>';
    });

    /* [6] */
    if (document.title) {
      document.title = document.title.replace('Flint Haven', cfg.siteName.part1 + cfg.siteName.part2);
    }

    /* [7] */
    var btn = document.createElement('button');
    btn.id = 'form-float-btn';
    btn.textContent = cfg.form.buttonLabel;
    btn.setAttribute('aria-label', 'Open application form');
    document.body.appendChild(btn);

    /* [8] */
    var overlay = document.createElement('div');
    overlay.id = 'form-modal-overlay';
    overlay.innerHTML =
      '<div id="form-modal">' +
        '<div id="form-modal-header">' +
          '<span id="form-modal-title">' + cfg.form.modalTitle + '</span>' +
          '<button id="form-modal-close" aria-label="Close">X</button>' +
        '</div>' +
        '<div id="form-modal-body">' +
          '<iframe src="' + cfg.form.url + '" frameborder="0" allowfullscreen></iframe>' +
        '</div>' +
      '</div>';
    document.body.appendChild(overlay);

    /* [9] */
    btn.addEventListener('click', function() {
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
    document.getElementById('form-modal-close').addEventListener('click', close);
    overlay.addEventListener('click', function(e) { if (e.target === overlay) close(); });
    document.addEventListener('keydown', function(e) { if (e.key === 'Escape') close(); });

    function close() {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
