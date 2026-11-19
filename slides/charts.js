(function () {
  'use strict';
  const NS = 'http://www.w3.org/2000/svg';
  const instances = [];
  const fmt = value => new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 1 }).format(value);
  function el(tag, attrs, text) {
    const node = document.createElement(tag);
    Object.entries(attrs || {}).forEach(([key, value]) => node.setAttribute(key, value));
    if (text !== undefined) node.textContent = text;
    return node;
  }
  function svgEl(tag, attrs, text) {
    const node = document.createElementNS(NS, tag);
    Object.entries(attrs || {}).forEach(([key, value]) => node.setAttribute(key, value));
    if (text !== undefined) node.textContent = text;
    return node;
  }
  function baseSvg(title, description) {
    const node = svgEl('svg', { viewBox: '0 0 860 270', role: 'img', 'aria-label': title + '. ' + description });
    node.append(svgEl('title', {}, title), svgEl('desc', {}, description));
    return node;
  }
  function makeTable(data, temporal) {
    const table = el('table');
    const head = el('thead'), row = el('tr');
    row.append(el('th', { scope: 'col' }, 'Fonte'));
    (temporal ? data.years : [data.year]).forEach(year => row.append(el('th', { scope: 'col' }, year + ' (%)')));
    head.append(row); table.append(head);
    const body = el('tbody');
    data.series.forEach(series => {
      const r = el('tr'); r.append(el('th', { scope: 'row' }, series.label));
      (temporal ? series.values : [series.value]).forEach(v => r.append(el('td', {}, v == null ? 'Não disponível' : fmt(v))));
      body.append(r);
    });
    table.append(body); return table;
  }
  function mount(container) {
    const temporal = container.dataset.energyChart === 'temporal';
    const data = window.ENERGY_DATA && window.ENERGY_DATA[container.dataset.energyChart];
    if (!data || container.dataset.chartMounted) return;
    container.dataset.chartMounted = 'true'; container.classList.add('energy-chart');
    let index = 0, timer = null;
    const visible = new Set(data.series.map(s => s.id));
    const controls = el('div', { class: 'chart-controls' });
    const fieldset = el('div', { class: 'chart-series', role: 'group', 'aria-label': 'Séries visíveis' });
    const screen = el('div', { class: 'chart-screen' });
    const print = el('div', { class: 'chart-print' });
    const readout = el('p', { class: 'chart-readout', role: 'status', 'aria-live': 'polite', 'aria-atomic': 'true' });
    const play = el('button', { type: 'button' }, 'Reproduzir');
    const reset = el('button', { type: 'button' }, 'Reiniciar');
    const yearLabel = el('span');
    const range = el('input', { type: 'range', min: 0, max: data.years ? data.years.length - 1 : 0, step: 1, value: 0, 'aria-label': 'Ano observado' });
    function stop() { clearInterval(timer); timer = null; play.textContent = 'Reproduzir'; play.setAttribute('aria-pressed', 'false'); }
    function announce() {
      readout.textContent = (temporal ? data.years[index] : data.year) + ' — ' + data.series.filter(s => visible.has(s.id)).map(s => s.label + ': ' + fmt(temporal ? s.values[index] : s.value) + '%').join(' · ');
    }
    function draw(target, full) {
      target.replaceChildren();
      const active = full ? data.series : data.series.filter(s => visible.has(s.id));
      const description = full ? 'Todos os dados observados. Consulte a tabela de dados.' : 'Use os controles e consulte os valores abaixo do gráfico.';
      const svg = baseSvg(data.title + ' — ' + data.geography, description);
      if (temporal) {
        const x = n => 115 + n * 320;
        const y = v => 125 - v;
        [-100, -50, 0, 50, 100].forEach(v => {
          svg.append(svgEl('line', { x1: 80, x2: 805, y1: y(v), y2: y(v), stroke: 'currentColor', opacity: v === 0 ? '.6' : '.15', 'stroke-dasharray': v === 0 ? '' : '4 5' }));
          svg.append(svgEl('text', { x: 64, y: y(v) + 5, 'text-anchor': 'end' }, v + '%'));
        });
        data.years.forEach((year, i) => svg.append(svgEl('text', { x: x(i), y: 254, 'text-anchor': 'middle' }, year)));
        active.forEach((series, seriesIndex) => {
          // Sparse observations remain discrete; no line implies unobserved annual values.
          series.values.forEach((v, i) => {
            if (v == null || (!full && i > index)) return;
            const point = svgEl('circle', { cx: x(i) + (seriesIndex - 1.5) * 13, cy: y(v), r: 6, fill: series.color, stroke: 'currentColor', 'stroke-width': 1 });
            point.append(svgEl('title', {}, series.label + ', ' + data.years[i] + ': ' + fmt(v) + '%'));
            if (!full) {
              point.setAttribute('tabindex', '0'); point.setAttribute('role', 'button');
              point.setAttribute('aria-label', series.label + ', ' + data.years[i] + ': ' + fmt(v) + '%');
              const inspect = () => { readout.textContent = series.label + ' · ' + data.years[i] + ' · ' + fmt(v) + '%'; };
              point.addEventListener('focus', inspect); point.addEventListener('pointerenter', inspect); point.addEventListener('click', inspect);
              point.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); inspect(); } });
            }
            svg.append(point);
            if (full) svg.append(svgEl('text', { x: x(i) + 18, y: y(v) + (seriesIndex % 2 ? 17 : -9), fill: series.color }, fmt(v)));
          });
        });
      } else {
        [0, 10, 20, 30, 40].forEach(v => {
          const x = 250 + v * 13;
          svg.append(svgEl('line', { x1: x, x2: x, y1: 20, y2: 222, stroke: 'currentColor', opacity: '.15' }));
          svg.append(svgEl('text', { x, y: 252, 'text-anchor': 'middle' }, v + '%'));
        });
        active.forEach((series, i) => {
          const y = 35 + i * 65;
          svg.append(svgEl('text', { x: 235, y: y + 23, 'text-anchor': 'end' }, series.label));
          const bar = svgEl('rect', { x: 250, y, width: series.value * 13, height: 34, fill: series.color, rx: 4 });
          bar.append(svgEl('title', {}, series.label + ': ' + fmt(series.value) + '%'));
          svg.append(bar, svgEl('text', { x: 260 + series.value * 13, y: y + 23 }, fmt(series.value) + '%'));
        });
      }
      target.append(svg);
    }
    function update() {
      if (temporal) { range.value = index; range.setAttribute('aria-valuetext', String(data.years[index])); yearLabel.textContent = 'Ano: ' + data.years[index]; }
      draw(screen, false); announce();
    }
    if (temporal) {
      controls.append(yearLabel, range, play, reset);
      play.setAttribute('aria-pressed', 'false');
      range.addEventListener('input', () => { stop(); index = Number(range.value); update(); });
      play.addEventListener('click', () => {
        if (timer) { stop(); return; }
        if (index === data.years.length - 1) index = 0;
        play.textContent = 'Pausar'; play.setAttribute('aria-pressed', 'true'); update();
        timer = setInterval(() => { index++; update(); if (index >= data.years.length - 1) stop(); }, 1800);
      });
      reset.addEventListener('click', () => { stop(); index = 0; update(); });
    }
    data.series.forEach(series => {
      const label = el('label');
      const input = el('input', { type: 'checkbox', checked: '', 'aria-label': 'Exibir ' + series.label });
      const swatch = el('span', { class: 'chart-swatch', 'aria-hidden': 'true' }); swatch.style.backgroundColor = series.color;
      label.append(input, swatch, document.createTextNode(series.label)); fieldset.append(label);
      input.addEventListener('change', () => { if (input.checked) visible.add(series.id); else visible.delete(series.id); update(); });
    });
    // Keep keyboard input inside chart controls instead of advancing Reveal slides.
    container.addEventListener('keydown', e => { if (/^(INPUT|BUTTON|SUMMARY)$/.test(e.target.tagName) || e.target.closest('svg')) e.stopPropagation(); });
    const details = el('details'); details.append(el('summary', {}, 'Consultar tabela de dados'), makeTable(data, temporal));
    container.append(controls, fieldset, screen, print, readout, details, el('p', { class: 'chart-note' }, data.note), el('p', { class: 'chart-source' }, data.source));
    draw(print, true);
    // Print includes the complete legend, even if the screen series are filtered.
    const legend = el('p', { class: 'chart-note' });
    data.series.forEach(s => {
      const item = el('span');
      const swatch = el('span', { class: 'chart-swatch', 'aria-hidden': 'true' });
      swatch.style.backgroundColor = s.color;
      item.append(swatch, document.createTextNode(s.label + '  ')); legend.append(item);
    });
    print.append(legend);
    update();
    instances.push({ container, stop, update });
  }
  let revealBound = false;
  function mountAll() {
    document.querySelectorAll('[data-energy-chart]').forEach(mount);
    if (window.Reveal && typeof window.Reveal.on === 'function' && !revealBound) {
      revealBound = true;
      window.Reveal.on('slidechanged', event => instances.forEach(instance => {
        if (!event.currentSlide.contains(instance.container)) instance.stop();
        else instance.update();
      }));
      window.Reveal.on('paused', () => instances.forEach(instance => instance.stop()));
    }
  }
  document.addEventListener('visibilitychange', () => { if (document.hidden) instances.forEach(instance => instance.stop()); });
  window.addEventListener('pagehide', () => instances.forEach(instance => instance.stop()));
  window.EnergyCharts = { mountAll };
}());
