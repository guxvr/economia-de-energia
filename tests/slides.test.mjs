import { test } from 'node:test';
import assert from 'node:assert/strict';
import { chromium } from '@playwright/test';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { mkdir } from 'node:fs/promises';

const url = pathToFileURL(resolve('slides/index.html')).href;
test('apresentação offline: navegação, dados, reprodução, teclado e impressão', async () => {
  const browser = await chromium.launch(process.env.BROWSER_EXECUTABLE ? { executablePath: process.env.BROWSER_EXECUTABLE } : {});
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
    const errors = [], external = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('request', request => { if (/^https?:/.test(request.url())) external.push(request.url()); });
    await page.goto(url);
    await page.waitForFunction(() => window.energyDeck?.isReady());
    assert.ok(await page.locator('.slides > section').count() >= 16);
    const overlaps = await page.evaluate(() => {
      const issues = [];
      document.querySelectorAll('.slides > section').forEach((section, index) => {
        window.energyDeck.slide(index);
        const footer = section.querySelector('footer').getBoundingClientRect();
        section.querySelectorAll('.slide-inner > :not(footer)').forEach(block => {
          const bounds = block.getBoundingClientRect();
          if (bounds.bottom > footer.top - 3 || bounds.right > footer.right + 3) issues.push(`${section.id}: ${block.className || block.tagName}`);
        });
      });
      return issues;
    });
    assert.deepEqual(overlaps, [], 'Conteúdo deve caber acima e dentro do rodapé');
    const chart = page.locator('[data-energy-chart="temporal"]');
    await page.evaluate(() => {
      const section = document.querySelector('[data-energy-chart="temporal"]').closest('section');
      window.energyDeck.slide([...document.querySelectorAll('.slides > section')].indexOf(section));
    });
    const range = chart.locator('input[type="range"]');
    const yearIndex = await page.evaluate(() => window.energyDeck.getIndices().h);
    await range.focus();
    await range.press('End');
    await page.waitForFunction(() => document.querySelector('[data-energy-chart="temporal"] input[type="range"]').value === '2');
    assert.match(await chart.locator('.chart-readout').textContent(), /2025/);
    assert.equal(await page.evaluate(() => window.energyDeck.getIndices().h), yearIndex);
    await chart.getByRole('button', { name: 'Reiniciar', exact: true }).click();
    assert.equal(await range.inputValue(), '0');
    await chart.getByRole('button', { name: 'Reproduzir', exact: true }).click();
    await page.waitForFunction(() => document.querySelector('[data-energy-chart="temporal"] input[type="range"]').value === '1');
    await page.evaluate(() => window.energyDeck.next());
    assert.equal(await chart.getByRole('button', { name: 'Reproduzir', exact: true, includeHidden: true }).count(), 1);
    await page.evaluate(index => window.energyDeck.slide(index), yearIndex);
    const firstSeries = chart.locator('input[type="checkbox"]').first();
    await firstSeries.uncheck();
    assert.equal(await firstSeries.isChecked(), false);
    await chart.locator('summary').click();
    assert.match(await chart.locator('table').textContent(), /2016.*2021.*2025/s);
    assert.match(await chart.locator('table').textContent(), /−?74|-74/);
    await page.emulateMedia({ media: 'print' });
    assert.equal(await chart.locator('.chart-screen').isVisible(), false);
    assert.equal(await chart.locator('.chart-print').isVisible(), true);
    assert.equal(await chart.locator('.chart-print circle').count(), 12);
    await page.emulateMedia({ media: 'screen' });
    await chart.locator('summary').click();
    await mkdir('test-results', { recursive: true });
    await page.screenshot({ path: 'test-results/grafico.png' });
    await page.evaluate(() => window.energyDeck.slide(0));
    await page.screenshot({ path: 'test-results/capa.png' });
    assert.deepEqual(external, [], 'Recursos offline não devem consultar a internet');
    assert.deepEqual(errors, []);
  } finally { await browser.close(); }
});
