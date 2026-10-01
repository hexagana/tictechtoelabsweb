// Afton Chemical MS365 Learning Hub - click any screenshot to enlarge it
(function () {
  var box = document.createElement('div');
  box.className = 'lightbox';
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-label', 'Enlarged screenshot');
  var big = document.createElement('img');
  box.appendChild(big);
  document.body.appendChild(box);
  function close() { box.classList.remove('open'); big.removeAttribute('src'); }
  box.addEventListener('click', close);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  document.querySelectorAll('figure.shot img').forEach(function (img) {
    img.addEventListener('click', function () {
      big.src = img.src;
      big.alt = img.alt;
      box.classList.add('open');
    });
  });
})();
