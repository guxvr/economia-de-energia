(function () {
  'use strict';
  const container = document.getElementById('slide-content');
  const content = window.SLIDE_CONTENT || [];
  content.forEach(function (slide, index) {
    const section = document.createElement('section');
    section.id = slide.id;
    section.className = 'energy-slide ' + (slide.className || '');
    section.setAttribute('aria-label', slide.title.replace(/<br\s*\/?\s*>/gi, ' ').replace(/<[^>]*>/g, ''));
    section.innerHTML = '<div class="slide-inner"><p class="eyebrow">' + slide.chapter + '</p>' +
      '<h1>' + slide.title + '</h1>' + slide.html +
      '<footer class="slide-footer"><span>' + slide.source + '</span><span class="page-count">' +
      String(index + 1).padStart(2, '0') + ' / ' + content.length + '</span></footer></div>' +
      '<aside class="notes">' + slide.notes + '</aside>';
    container.appendChild(section);
  });
  if (!window.Reveal) {
    document.body.classList.add('fallback-mode');
    const notice = document.createElement('p');
    notice.className = 'dependency-notice';
    notice.textContent = 'A navegação não foi carregada. Consulte as instruções de instalação para incluir os recursos locais do Reveal.js.';
    document.body.prepend(notice);
    return;
  }
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const deck = new Reveal({
    width: 1280, height: 720, margin: 0.04, minScale: 0.2, maxScale: 1.6,
    hash: true, center: false, controls: true, progress: true,
    transition: reducedMotion ? 'none' : 'fade', backgroundTransition: 'none',
    slideNumber: false, showNotes: false, pdfSeparateFragments: false,
    plugins: window.RevealNotes ? [RevealNotes] : []
  });
  window.energyDeck = deck;
  deck.initialize().then(function () {
    if (window.EnergyCharts) window.EnergyCharts.mountAll();
  });
  document.getElementById('overview-button').addEventListener('click', function () { deck.toggleOverview(); });
  document.getElementById('fullscreen-button').addEventListener('click', function () {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(function () {});
    } else if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(function () {});
    }
  });
  // Reveal must leave keyboard events inside chart controls to those controls.
  container.addEventListener('keydown', function (event) {
    if (event.target.closest('button, input, select, textarea, [role="slider"]')) event.stopPropagation();
  });
}());
